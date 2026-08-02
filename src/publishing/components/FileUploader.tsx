import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { CrossUploader } from "crossuploader-react";
import { Button, Checkbox, Layout, Table, Typography } from "@/publishing/components";

const FILE_ICON_BASE = "/crossuploader/app/image/file_icon";

const KNOWN_EXTENSIONS = new Set([
    "ai", "avi", "bmp", "css", "doc", "docx", "eml", "exe", "fla", "flv",
    "gif", "html", "hwp", "jpg", "mp3", "mp4", "mpg", "msg", "pdf", "png",
    "ppt", "psd", "swf", "tif", "txt", "wmv", "xls", "xlsx", "zip",
]);

const EXTENSION_ALIAS: Record<string, string> = {
    jpeg: "jpg", pptx: "ppt", htm: "html",
};

const getFileIconUrl = (filename: string): string => {
    const raw = filename.split(".").pop()?.toLowerCase() ?? "";
    const ext = EXTENSION_ALIAS[raw] ?? raw;
    const name = KNOWN_EXTENSIONS.has(ext) ? ext : "etc";
    return `${FILE_ICON_BASE}/${name}.png`;
};

type UploadStatus = "대기" | "업로드 중" | "완료" | "실패";

const STATUS_CLASS: Record<UploadStatus, string> = {
    "대기": "-waiting",
    "업로드 중": "-uploading",
    "완료": "-done",
    "실패": "-fail",
};

interface UploadFile {
    file: File;
    status: UploadStatus;
}

const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0.00KB";
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(2)}KB`;
    return `${(kb / 1024).toFixed(2)}MB`;
};

interface CrossUploaderInstance {
    event: () => {
        fileUploadManager: {
            deleteAllFiles: () => void;
            startUpload: () => void;
        };
    };
}

export interface FileUploaderProps {
    /** 허용할 파일 타입 (input accept 속성과 동일) */
    accept?: string;
    /** 다중 파일 선택 여부 (기본값: true) */
    multiple?: boolean;
    /** 업로드 버튼 클릭 시 호출되는 콜백 */
    onUpload?: (files: File[]) => void;
    /** 추가 클래스 */
    className?: string;
}

export interface FileUploaderHandle {
    /** 전체 파일 목록 초기화 */
    deleteAllFiles: () => void;
    /** 현재 파일 목록 반환 */
    getFiles: () => File[];
}

const CROSS_UPLOADER_MANAGER = {
    type: "upload",
    baseUrl: "/crossuploader/app",
    uploadUrl: "/crossuploader/Upload/BasicFileUpload/UploadProcess.jsp",
};

/**
 * @description CrossUploader를 업로드 엔진으로 사용하는 파일 업로더 컴포넌트입니다.
 */
export const FileUploader = forwardRef<FileUploaderHandle, FileUploaderProps>(
    ({ accept, multiple = true, onUpload, className = "" }, ref) => {
        const inputRef = useRef<HTMLInputElement>(null);
        const allCheckRef = useRef<HTMLInputElement>(null);
        const crossUploaderRef = useRef<CrossUploaderInstance | null>(null);
        const containerId = useRef(`file_uploader_${Math.floor(Math.random() * 100000)}`);

        const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
        const [checkedIndices, setCheckedIndices] = useState<Set<number>>(new Set());
        const [announcement, setAnnouncement] = useState("");

        const allChecked = uploadFiles.length > 0 && checkedIndices.size === uploadFiles.length;
        const someChecked = checkedIndices.size > 0 && !allChecked;
        const totalSize = uploadFiles.reduce((sum, f) => sum + f.file.size, 0);

        useEffect(() => {
            if (allCheckRef.current) {
                allCheckRef.current.indeterminate = someChecked;
            }
        }, [someChecked]);

        useEffect(() => {
            const prev = {
                start: window.onStartUploadItemCu,
                endItem: window.onEndUploadItemCu,
                end: window.onEndUploadCu,
            };

            window.onStartUploadItemCu = () => {
                setUploadFiles(prev =>
                    prev.map((f, i) => i === 0 ? { ...f, status: "업로드 중" } : f)
                );
            };

            window.onEndUploadItemCu = () => {
                setUploadFiles(prev => {
                    const idx = prev.findIndex(f => f.status === "업로드 중");
                    if (idx === -1) return prev;
                    return prev.map((f, i) => i === idx ? { ...f, status: "완료" } : f);
                });
            };

            window.onEndUploadCu = () => {
                setUploadFiles(prev =>
                    prev.map(f => f.status === "업로드 중" ? { ...f, status: "완료" } : f)
                );
                setAnnouncement("업로드가 완료되었습니다.");
            };

            return () => {
                window.onStartUploadItemCu = prev.start;
                window.onEndUploadItemCu = prev.endItem;
                window.onEndUploadCu = prev.end;
            };
        }, []);

        useImperativeHandle(ref, () => ({
            deleteAllFiles: () => {
                setUploadFiles([]);
                setCheckedIndices(new Set());
                try { crossUploaderRef.current?.event().fileUploadManager.deleteAllFiles(); } catch { /* ignore */ }
            },
            getFiles: () => uploadFiles.map(f => f.file),
        }));

        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newFiles = Array.from(e.target.files ?? []).map(file => ({
                file,
                status: "대기" as UploadStatus,
            }));
            setUploadFiles(prev => [...prev, ...newFiles]);
            setAnnouncement(`${newFiles.length}개 파일이 추가되었습니다.`);
            e.target.value = "";
        };

        const handleAllCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
            setCheckedIndices(
                e.target.checked ? new Set(uploadFiles.map((_, i) => i)) : new Set()
            );
        };

        const handleCheck = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
            setCheckedIndices(prev => {
                const next = new Set(prev);
                if (e.target.checked) next.add(index);
                else next.delete(index);
                return next;
            });
        };

        const handleDelete = () => {
            const deletedCount = checkedIndices.size;
            const remaining = uploadFiles.filter((_, i) => !checkedIndices.has(i));
            setUploadFiles(remaining);
            setCheckedIndices(new Set());
            setAnnouncement(`${deletedCount}개 파일이 삭제되었습니다.`);
            if (remaining.length === 0) {
                try { crossUploaderRef.current?.event().fileUploadManager.deleteAllFiles(); } catch { /* ignore */ }
            }
        };

        const handleUpload = () => {
            setUploadFiles(prev =>
                prev.map(f => f.status === "대기" ? { ...f, status: "업로드 중" } : f)
            );
            try {
                crossUploaderRef.current?.event().fileUploadManager.startUpload();
            } catch { /* ignore */ }
            onUpload?.(uploadFiles.map(f => f.file));
        };

        return (
            <Layout.Row layout="vertical" gap={9} className={["file-uploader", className].filter(Boolean).join(" ")}>

                <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>

                <div className="hidden" aria-hidden="true">
                    <CrossUploader
                        ref={crossUploaderRef}
                        managerProperties={{ ...CROSS_UPLOADER_MANAGER, containerId: containerId.current, width: "1", height: "1" }}
                        onLoaded={() => { }}
                    />
                </div>

                <Layout.Col layout="horizontal" justify="end" gap={8}>
                    <Button variant="outlined" size="sm" onClick={handleDelete} disabled={checkedIndices.size === 0}>
                        삭제
                    </Button>
                    <Button variant="outlined" size="sm" onClick={() => inputRef.current?.click()} aria-label="파일 선택">
                        파일 선택
                    </Button>
                    <Button size="sm" onClick={handleUpload} disabled={uploadFiles.length === 0} aria-label={`${uploadFiles.length}개 파일 업로드`}>
                        업로드
                    </Button>
                    <input
                        ref={inputRef}
                        type="file"
                        accept={accept}
                        multiple={multiple}
                        onChange={handleFileChange}
                        tabIndex={-1}
                        aria-hidden="true"
                        style={{ display: "none" }}
                    />
                </Layout.Col>

                <Layout.Col>
                    <Table caption="첨부 파일 목록" className="file-uploader-table">
                        <colgroup>
                            <col className="col-check" />
                            <col />
                            <col className="col-size" />
                            <col className="col-status" />
                        </colgroup>
                        <Table.Head>
                            <Table.Row>
                                <Table.Header scope="col">
                                    <Checkbox ref={allCheckRef} checked={allChecked} onChange={handleAllCheck} aria-label="전체 선택" />
                                </Table.Header>
                                <Table.Header scope="col">파일이름</Table.Header>
                                <Table.Header scope="col">크기</Table.Header>
                                <Table.Header scope="col">상태</Table.Header>
                            </Table.Row>
                        </Table.Head>
                        <Table.Body>
                            {uploadFiles.map((item, i) => (
                                <Table.Row key={`${item.file.name}-${i}`} className={checkedIndices.has(i) ? "-selected" : ""}>
                                    <Table.Cell>
                                        <Checkbox checked={checkedIndices.has(i)} onChange={handleCheck(i)} aria-label={`${item.file.name} 선택`} />
                                    </Table.Cell>
                                    <Table.Cell className="text-left">
                                        <img src={getFileIconUrl(item.file.name)} alt="" className="file-uploader-file-icon" aria-hidden="true" />
                                        <span className="file-uploader-filename">{item.file.name}</span>
                                    </Table.Cell>
                                    <Table.Cell>{formatFileSize(item.file.size)}</Table.Cell>
                                    <Table.Cell>
                                        <span className={`file-uploader-status ${STATUS_CLASS[item.status]}`} aria-label={`업로드 상태: ${item.status}`}>
                                            {item.status}
                                        </span>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </Layout.Col>

                <Layout.Col layout="horizontal" justify="end">
                    <Typography variant="body-sm" as="span" primary>{uploadFiles.length}</Typography>
                    <Typography variant="body-sm" as="span">개의 파일 : </Typography>
                    <Typography variant="body-sm" as="span" primary>{formatFileSize(totalSize)}</Typography>
                </Layout.Col>
            </Layout.Row>
        );
    }
);

FileUploader.displayName = "FileUploader";
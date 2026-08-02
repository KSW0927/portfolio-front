import { useEffect, useImperativeHandle, useRef, useState } from "react";
import { CrossUploader } from "crossuploader-react";
import type { AttachFileInfo } from "@/types/types.ts";

// 업로드 파일 종류
export type UploadType = "ALL" | "DOC" | "IMG" | "VIDEO";

// 나모 에러 객체 타입
interface NamoErrorResponse {
    code: string;
    message: string;
    detailMessage: string;
}

export interface FileUploaderHandle {
    /** 파일 꺼내기 */
    getFileAt: (index: number) => any;
    /** 업로드 시작 트리거 */
    startUpload: () => boolean; // (파일 있으면 true, 없으면 false 반환)
    /** 현재 전체 파일 목록 개수 조회 */
    getFileCount: () => number;
    /** 현재 업로드 예정인 파일 목록 개수 조회 */
    getUploadReadyFileCount: () => number;
    /** 삭제된 파일이 있으면 처리 */
    processDeleteFiles: () => Promise<boolean>;
}

export interface FileUploaderProps {
    fuRef: React.RefObject<FileUploaderHandle>;
    height?: string;
    /** 파일 제한 (기본값: true) */
    isLimit?: boolean;
    /** 최대 파일 개수 (기본값: 1) */
    maxCount?: number;
    /** 개별 최대 파일 용량 (기본값: 10MB) */
    maxCpct?: number;
    /** 업로드 파일 종류 (기본값: ALL) */
    uploadType?: UploadType;
    /** 첨부파일번호 */
    atchFileNo?: string;
    /** 업로드 버튼 클릭 시 호출되는 콜백 */
    onUploadComplete?: (isSave: boolean, atchFileNo: string) => void;
    /** 파일 목록 더블클릭 시 콜백 */
    onDblClick?: (index: number) => void;
}

/**
 * @description CrossUploader를 업로드 엔진으로 사용하는 파일 업로더 컴포넌트입니다.
 */
export const FileUploader = (props: FileUploaderProps) => {
    const { fuRef, height = "250", isLimit = true, maxCount = 1, maxCpct = 5, uploadType = "ALL", atchFileNo = "", onUploadComplete, onDblClick } = props;
    const contaninerId = useRef("uploaderContainer" + `_${Math.floor(Math.random() * 100000)}`);
    const uploaderRef = useRef<any>(null);
    const fileUploadManagerRef = useRef<any>(null);

    // 허용파일확장자 환경변수 로드
    const docExts = import.meta.env.VITE_ALLOW_ATCH_FILE_EXT_DOC || '';
    const imgExts = import.meta.env.VITE_ALLOW_ATCH_FILE_EXT_IMG || '';
    const videoExts = import.meta.env.VITE_ALLOW_ATCH_FILE_EXT_VIDEO || '';
    let activeExtString = '';
    if(uploadType === "DOC") activeExtString = docExts;
    else if(uploadType === "IMG") activeExtString = imgExts;
    else if(uploadType === "VIDEO") activeExtString = videoExts;
    else {
        // ALL(전체 합치고 중복제거)
        activeExtString = Array.from(new Set([
            ...docExts.split(','),
            ...imgExts.split(','),
            ...videoExts.split(','),
        ])).filter(Boolean).join(',');
    }
    const allowedExtArray = activeExtString.toLowerCase().split(',');
    const namoFilterString = allowedExtArray.map(ext => `.${ext}`).join(',');
    const allowedExtFilter = allowedExtArray.map(ext => `${ext}`).join(';');

    const managerProperties = {
        type: "upload",
        width: "100%",
        height: height,
        containerId: contaninerId.current,
        baseUrl: "/crossuploader/app",
        uploadUrl: "/com/file/attach/upload/crossuploader",
        authToken: sessionStorage.getItem('access_token') || '',
        borderColor: "#C7C7C7",
        topPanelDisplayStyle: "block",
        selectFilesButtonDisplayStyle: "block",
        selectFilesButtonDisabledStyle: false,
        uploadButtonDisplayStyle: "block",
        uploadButtonDisabledStyle: false,
        selectFilesButtonDisplayStyleOnStatus:true,
        maxFileCount: maxCount,
        maxFileSize: maxCpct * 1024 * 1024,
        maxTotalFileSize: maxCpct * 1024 * 1024 * maxCount,
        // 파일 전송 시 함께 전송할 파라메터(atchFileNo)
        atchfileNo: atchFileNo,
        // 탐색기 대화창 전용 필터 적용
        fileFilter: `허용파일 (${activeExtString.replace(/,/g,', ')})|${namoFilterString}|`,
        fileExtensionCheckMode: "FORWARD",
        allowedFileExtensionList: allowedExtFilter,
    };

    const monitorProperties = {
        monitorLayerClass: "monitorLayer",
        monitorBgLayerClass: "monitorBgLayer",
        closeMonitorCheckBoxChecked: true, // 파일 전송 완료 후 자동 닫힘 여부
    };

    // 부모 컴포넌트에 제어 기능 노출
    useImperativeHandle(fuRef, () => ({
        getFileAt: (index: number) => {
            if(!uploaderRef) return undefined;

            const strUploadFile = fileUploadManagerRef.current.getFileInfoAt(index).toString();
            return strUploadFile ? JSON.parse(strUploadFile) : undefined;
        },
        startUpload: () => {
            if(!uploaderRef) return false;

            // 첨부파일번호 있으면 추가
            if(atchFileNo) fileUploadManagerRef.current.setAtchFileNo(atchFileNo);

            // 신규 추가된 파일 개수 파악
            const totalCount = fileUploadManagerRef.current.getTotalFileCount();
            var newFileCount = 0;
            for(var i=0; i < totalCount; i++) {
                const tmpFile = fileUploadManagerRef.current.getFileAt(i);
                if(tmpFile) newFileCount++;
            }

            if(newFileCount > 0) {
                fileUploadManagerRef.current.startUpload(); // 실제 나모 업로드 시작
                return true;
            }
            return false; // 신규 업로드할 파일 없음
        },
        getFileCount: () => {
            console.log(fileUploadManagerRef.current.getUploadedFilesInfo());
            console.log("TotalFileCount: " + fileUploadManagerRef.current.getTotalFileCount());
            return fileUploadManagerRef.current.getTotalFileCount() || 0;
        },
        getUploadReadyFileCount: () => {
            const totalCount = fileUploadManagerRef.current.getTotalFileCount();
            var readyCount = 0;
            for(var i=0; i < totalCount; i++) {
                const tmpFile = fileUploadManagerRef.current.getFileAt(i);
                if(tmpFile) readyCount++;
            }
            return readyCount;
        },
        processDeleteFiles: async (): Promise<boolean> => {
            if (!existingFiles || existingFiles.length === 0) {
                return true;
            }

            try {
                const uploadFileCnt = fileUploadManagerRef.current.getTotalFileCount() || 0;
                const currentGridFileKeys = new Set<string>();
                // 업로드 파일 목록에서 ID 추출
                for(let i = 0; i < uploadFileCnt; i++) {
                    const strUploadFile = fileUploadManagerRef.current.getFileInfoAt(i).toString();
                    const tmpUploadFile = JSON.parse(strUploadFile);
                    if(tmpUploadFile && tmpUploadFile.fileId) {
                        const tmpId = tmpUploadFile.fileId.split("_");
                        if(tmpId.length >= 2) {
                            currentGridFileKeys.add(tmpUploadFile.fileId);
                        }
                    }
                }

                // 기존 파일 목록 중 업로드 파일 목록에 없는 파일 추출
                const filesToDelete = existingFiles.filter((file) => {
                    const fileKey = `${file.atchFileNo}_${file.atchFileSeq}`;
                    return !currentGridFileKeys.has(fileKey);
                })

                if(filesToDelete.length == 0) { return true; }

                // 삭제 대상 파일에 대해 삭제 요청
                const deletePromises = filesToDelete.map((file) => {
                    const { atchFileNo, atchFileSeq } = file;

                    return FileApi.deleteAttachFile({ atchFileNo: atchFileNo, atchFileSeq: atchFileSeq, delYn: "Y" })
                        .then((response: boolean) => {
                            console.log("첨부파일 삭제처리: " + atchFileNo + "-" + atchFileSeq + ", " + response);
                            return response;
                        });
                });

                // 모든 삭제 요청이 끝날 때까지 대기
                await Promise.all(deletePromises);
                return true;

            } catch (error) {
                console.log("첨부파일 삭제처리 중 오류: ", error);
                return false;
            }
        },
    }));


    /* 상태 정의 */
    const saveAtchFileNo = useRef<string>(atchFileNo);
    const [existingFiles, setExistingFiles] = useState<AttachFileInfo[]>([]);
    const [isReady, setIsReady] = useState(false);
    const [isSave, setSave] = useState<boolean>(true);

    useEffect(() => {
        if(atchFileNo) {
            // 첨부파일번호에 해당하는 파일 정보 가져오기
            FileApi.getListGroup({ atchFileNo: atchFileNo })
                .then((response: AttachFileInfo[]) => {
                    if(response) {
                        setExistingFiles(response);
                    }
                })
                .catch(() => {
                    setExistingFiles([]);
                });
        }
    }, [isReady, atchFileNo]);

    useEffect(() => {
        if(existingFiles && existingFiles.length > 0 && fileUploadManagerRef.current) {
            // 파일목록 초기화
            fileUploadManagerRef.current.deleteAllFiles();
            // CrossUploader에 기존 첨부파일 목록 추가
            existingFiles.forEach((file) => {
                fileUploadManagerRef.current.addFile(JSON.stringify({
                    fileId: file.atchFileNo + "_" + file.atchFileSeq,
                    fileName: file.atchFileActlNm,
                    fileSize: (file.atchFileSz ? file.atchFileSz : 0),
                    fileUrl: file.atchFilePath,
                    status: "COMPLETED",
                    isDelete: false,
                }));
            });
        }
    }, [isReady, existingFiles]);


    /* 이벤트 정의 */
    // 파일 업로드 시작 이벤트
    const handleStartUpload = () => {
        console.log("onStartUpload: ");

    };
    // 개별 파일 업로드 시작 이벤트
    const handleStartUploadItem = () => {
        console.log("onStartUploadItem: ");
    };
    // 개별 파일 업로드 완료 이벤트
    const handleEndUploadItem = () => {
        console.log("onEndUploadItem: ");
        // 여러 파일 업로드 시 신규인 경우 첫번째 파일 업로드 이후 생성된 첨부파일번호를 전달하여 동일한 첨부파일번호로 저장되도록 해야함.
        const uploadedFileInfos = fileUploadManagerRef.current.uploadedFileInfoList;
        if(!saveAtchFileNo.current && uploadedFileInfos && uploadedFileInfos.length > 0) {
            const resultInfo = uploadedFileInfos[0].result.data;
            if(resultInfo.saved) {
                saveAtchFileNo.current = resultInfo.atchFileNo;
                fileUploadManagerRef.current.setAtchFileNo(saveAtchFileNo.current);
            }
        }
        console.log("onEndUploadItem2: " + saveAtchFileNo.current);
    };
    // 파일 업로드 완료 이벤트
    const handleEndUpload = () => {
        console.log("onEndUpload - 이벤트 전송완료!");
        const uploadedFileInfos = fileUploadManagerRef.current.uploadedFileInfoList;
        uploadedFileInfos.forEach((fileInfo: any) => {
            const resultInfo = fileInfo.result.data;
            if(resultInfo.saved && isSave) {
                setSave(true);
            } else {
                setSave(false);
            }
        });
    };
    // 파일 업로드 취소 이벤트
    const handleCancelUploadItem = () => {
        console.log("onCancelUploadItem: ");
    };
    // 업로드 모니터링 화면 닫힘 이벤트
    const handleCloseMonitorWindow = () => {
        console.log("onCloseMonitorWindow: " + saveAtchFileNo.current);

        // 파일 전송 완료 후 첨부파일번호 전달.
        onUploadComplete?.(isSave, saveAtchFileNo.current);
    };
    // 업로드 중 오류발생 이벤트
    const handleException = () => {
        console.log("업로드 중 예외 발생!");
        if(fileUploadManagerRef.current.lastExceptionInfo) {
            const error = JSON.parse(fileUploadManagerRef.current.lastExceptionInfo) as NamoErrorResponse;
            if(error) {
                alert(`CODE: ${error.code}, Message: ${error.message}`);
            }
        }
    };

    // 더블클릭 이벤트
    const handleDblClickGridRow = (index: number) => {
        console.log("onDblClickGridRow: " + index);

        if(onDblClick) {
            onDblClick(index);
        } else {
            // 파일 목록 더블클릭에 대한 기본 동작 제공(파일 종류에 따른 이미지 뷰어 또는 문서 뷰어 등)


        }

    };

    // 파일 선택 이벤트(선태된 파일에 대한 제한 사항 확인)

    // 파일 삭제 이벤트(삭제된 파일에 대한 처리)


    // 로드 완료
    const handlerLoaded = (uploader: any) => {
        uploaderRef.current = uploader;

        // 로드된직후, 하드코딩된 전역 설정 객체를 직접 수정
        uploader.skin = "default";
        uploader.uploadMode = "BASIC";

        // 나모가 셋업을 마친 직후 내부적으로 완전히 끝난 직후 실행하여 이벤트를 강제 등록하도록
        setTimeout(() => {
            fileUploadManagerRef.current = uploader.fileUploadManager;

            // 파일 허용 용량 제한
            if(isLimit) {
                uploader.maxFileCount = maxCount;
                uploader.maxFileSize = 1024 * 1024 * maxCpct;
                uploader.maxTotalFileSize = 1024 * 1024 * maxCount;

            }

            window.onStartUploadCu = handleStartUpload;
            window.onStartUploadItemCu = handleStartUploadItem;
            window.onEndUploadItemCu = handleEndUploadItem;
            window.onEndUploadCu = handleEndUpload;
            window.onCancelUploadItemCu = handleCancelUploadItem;
            window.onCloseMonitorWindowCu = handleCloseMonitorWindow;
            window.onExceptionCu = handleException;
            window.onDbClickGridRowCu = handleDblClickGridRow;

            // 안전장치: 나모 엔진이 config.event를 참조할 경우를 대비하여 선언
            /*
            if(window.namoCrossUploaderConfig) {
                if(!window.namoCrossUploaderConfig.event) { window.namoCrossUploaderConfig.event = {}; }

                window.namoCrossUploaderConfig.event.onStartUpload = window.onStartUploadCu;
                window.namoCrossUploaderConfig.event.onStartUploadItem = window.onStartUploadItemCu;
                window.namoCrossUploaderConfig.event.onEndUploadItem = window.onEndUploadItemCu;
                window.namoCrossUploaderConfig.event.onEndUpload = window.onEndUploadCu;
                window.namoCrossUploaderConfig.event.onCancelUploadItem = window.onCancelUploadItemCu;
                window.namoCrossUploaderConfig.event.onCloseMonitorWindow = window.onCloseMonitorWindowCu;
                window.namoCrossUploaderConfig.event.onException = window.onExceptionCu;
            }
             */

            if(existingFiles && existingFiles.length > 0) {
                // 파일목록 초기화
                fileUploadManagerRef.current.deleteAllFiles();
                // CrossUploader에 기존 첨부파일 목록 추가
                existingFiles.forEach((file) => {
                    fileUploadManagerRef.current.addFile(JSON.stringify({
                        fileId: file.atchFileNo + "_" + file.atchFileSeq,
                        fileName: file.atchFileActlNm,
                        fileSize: (file.atchFileSz ? Math.round(file.atchFileSz * 1024) : 0),
                        fileUrl: file.atchFilePath,
                    }));
                });
            }

            setIsReady(true);
            console.log(uploader);

        }, 150);

    };

    return (
        <>
            <CrossUploader
                managerProperties={managerProperties}
                monitorProperties={monitorProperties}
                onLoaded={handlerLoaded}
            />
        </>
    );
};
FileUploader.displayName = "FileUploader";

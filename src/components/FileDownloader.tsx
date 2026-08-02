import { useEffect, useState } from "react";
import { Button, Icon, List } from "@/components";
import type { AttachFileInfo } from "@/types/types.ts";


export interface FileDownloaderProps {
    atchFileNo?: string;
}

/**
 * @description 첨부된 파일 목록 및 다운로드 컴포넌트입니다.
 */
export const FileDownloader = (props: FileDownloaderProps) => {
    const { atchFileNo } = props;

    useEffect(() => {
        if(atchFileNo) {
            FileApi.getListGroup({ atchFileNo: atchFileNo })
                .then((response: AttachFileInfo[]) => {
                    if(response) {
                        setFileList(response);
                    }
                })
                .catch(() => {
                    setFileList([]);
                });
        }
    }, []);


    /* 상태 정의 */
    const [fileList, setFileList] = useState<AttachFileInfo[]>([]);
    const [isDownloading, setIsDownloading] = useState(false);



    /* 이벤트 정의 */
    // 파일 다운로드
    const handleDownload = async (file: AttachFileInfo) => {
        // 중복 클릭 방지
        if(isDownloading) return;

        try {
            setIsDownloading(true);

            await FileApi.downloadFile({ atchFileNo: file.atchFileNo, atchFileSeq: file.atchFileSeq });

        } catch (error) {
            console.error(error);
            alert(error instanceof Error ? error.message : "파일 다운로드 실패.");
        } finally {
            setIsDownloading(false);
        }
    }

    return (
        <>
            { fileList?.map((file: AttachFileInfo) => (
                <List size="sm" key={file.atchFileSeq}>
                    <Button variant="text" size="lg" leftIcon={<Icon name="attachment" size={24} />} onClick={() => { handleDownload(file); }}>
                        {file.atchFileActlNm}
                    </Button>
                </List>
            ))}
        </>
    );
};
FileDownloader.displayName = "FileDownloader";

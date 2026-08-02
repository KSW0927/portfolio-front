import { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DocViewer } from "@/components/Editor/DocViewer";

/**
 * 공통: 문서 뷰어 컴포넌트입니다.
 * @component
 */
type LANGUAGE = "kor" | "enu" | "jpn" | "chs" | "cht" | "vit" | "ind" | "fra" | "auto" | undefined;

export const DocViewerPopup = ()=> {
    const { fileId, lang } = useParams() as { fileId: string, lang: LANGUAGE };
    const vref = useRef<any>(null);

    // 상태


    // 이벤트
    // 상태 콜백 이벤트
    const handlerStatus = (status: string) => {
        console.log("viewer state: " + status);
        if(status === "OPENED") {
            if(vref.current && fileId) {
                //vref.current.loadDocument(fileId);

                //테스트용
                if(fileId === "1234567890") {
                    vref.current.setOpenFile("/docsample/CrossEditor4 업로드 연동가이드_오피스 플러그인.pdf", "pdf");
                }
            }
        }
    };

    return (
        <DocViewer vref={vref} lang={lang} height="100%" filePath={fileId} onStatus={handlerStatus} />
    );
}



import React, {useRef, useState, useImperativeHandle, useEffect} from "react";
import { CrossViewer, type CrossViewerHandle } from "crossviewer-react";


/**
 * 공통 뷰어 컴포넌트 - CrossViewer 이용
 * 기능 추가한 버전으로 참고용
 */
interface DocViewerProps {
    vref?: React.Ref<any>;
    lang?: "kor" | "enu" | "jpn" | "chs" | "cht" | "vit" | "ind" | "fra" | "auto" | undefined;
    height?: string;
    filePath: string;
    onStatus?: (status: string) => void;
}
export const DocViewer = (props: DocViewerProps) => {
    const { vref, lang = "kor", height = "100%", filePath, onStatus = null } = props;
    const viewerRef = useRef<CrossViewerHandle>(null);


    // 상태
    const [status, setStatus] = useState("LOADING");
    const [pageInfo, setPageInfo] = useState({ page: 0, totalPages: 0 });

    useEffect(() => {
        if(viewerRef?.current && filePath) {
            //viewerRef.current.open.url(filePath === "1234567890" ? "/docsample/CrossEditor4 업로드 연동가이드_오피스 플러그인.pdf" : filePath);
        }
    }, [viewerRef]);

    //부모 컴포넌트에서 사용할 수 있는 노출 함수 정의
    useImperativeHandle(vref, () => ({
        //파일 경로 전달
        setOpenFile: (url: string, type: string) => {
            viewerRef.current?.open.url(url);
            viewerRef.current?.showLoading(true);
        },
    }));

    // 열기 콜백 이벤트
    const handlerState = (state: any) => {
        console.log(state);
    };

    // 열기 콜백 이벤트
    const handlerOpen = (payload: any) => {
        console.log("open");
        if(payload.result > 0) setStatus("OPEN");
        else setStatus("FAILED");
    };

    // 열기 완료 후 콜백 이벤트
    const handlerOpenCompleted = () => {
        console.log("opened");
        setStatus("OPENED");
        viewerRef.current?.showLoading(false);
    };

    // 페이지 변경 콜백 이벤트
    const handlerPageChanged = (info: any) => {
        setPageInfo({ page: info.page, totalPages: info.totalPages });
    };

    // 확대 변경 콜백 이벤트
    const handlerZoomChanged = (scale: any) => {
        console.log("Zoom: " + scale);
    };

    // 오류 콜백 이벤트
    const handlerError = (payload: any) => {
        setStatus("ERROR");
        console.log(payload.message);
    };

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <CrossViewer
                ref={viewerRef}
                lang={lang}
                onStateChange={handlerState}
                onOpen={handlerOpen}
                onOpenCompleted={handlerOpenCompleted}
                onPageChanged={handlerPageChanged}
                onZoomChanged={handlerZoomChanged}
                onError={handlerError}
                style={{ width: "100%", height: height }}
            />
        </div>
    );
};
DocViewer.displayName = 'DocViewer';




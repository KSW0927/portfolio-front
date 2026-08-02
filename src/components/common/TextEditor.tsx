import React, { useRef, useState, useImperativeHandle, useEffect } from 'react';
import { CrossEditor } from "crosseditor-react";

/**
 * 공통 에디터 컴포넌트 - CrossEditor4 이용
 * 기능 추가한 버전으로 참고용
 */
interface TextEditorProps {
    eref?: React.Ref<any>;
    name: string;
    value?: string;
    height?: string;
    onLoaded?: () => void;
}
export const TextEditor = (props: TextEditorProps) => {
    const { eref, name, value = '', height = "300px", onLoaded } = props;
    const editorRef = useRef(null);
    const [isReady, setIsReady] = useState(false);

    const params = {
        Width: "100%",
        Height: height,
        DisplayToolbar: true,
        DisplayLoadingBar: true,
        Menu: false,
    };

    //부모 컴포넌트에서 사용할 수 있는 노출 함수 정의
    useImperativeHandle(eref, () => ({
        //에디터 내용 가져가기
        getContent: () => {
            return editorRef.current?.GetBodyValue() || "";
        },
        //에디터 내용 입력
        setContent: (bodyValue: string) => {
            if(editorRef.current) {
                editorRef.current.SetBodyValue(bodyValue || "");
            }
        }
    }));

    useEffect(() => {
        console.log("update: " + value);
        if(isReady && editorRef.current) {
            editorRef.current.SetBodyValue(value || "");
        }
    }, [isReady, value]);

    // 에디터 로드가 완료 시 콜백 이벤트
    const handlerLoaded = (_: any, editor: any) => {
        console.log("에디터 로드 완료!");
        editorRef.current = editor;
        setIsReady(true);

        onLoaded?.();
    };

    return (
        <div style={{ width: "100%" }}>
            <CrossEditor
                //ref={editorRef}
                name={name}
                params={params}
                value={value}
                baseUrl="/crosseditor/js/namo_scripteditor.js"
                onLoaded={handlerLoaded}
            />
        </div>
    );
};
TextEditor.displayName = 'TextEditor';


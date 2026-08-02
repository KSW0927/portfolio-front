import 'jquery';

declare global {
    interface JQuery {
        summernote(): JQuery;
        // 설정을 넘길 때 (객체 형식)
        summernote(options?: {
            height?: number;
            lang?: string;
            placeholder?: string;
            tabsize?: number;
            toolbar?: (string | string[])[][];
            callbacks?: {
                onChange?: (contents: string) => void;
                onImageUpload?: (files: FileList) => void;
                [key: string]: any;
            };
            [key: string]: any;
        }): JQuery;
        summernote(command: string, ...args: any[]): JQuery | any;
        summernote: (options?: any) => JQuery;
    }
}
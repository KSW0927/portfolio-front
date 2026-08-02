/*
 * NamoCrossUploader configuration file.
 * Copyright NAMO Interactive Inc.
 */
;; (function (win) {

    if (!location.origin)
        location.origin = location.protocol + "//" + location.host;

    var namoCrossUploaderEvents = new Object();
    namoCrossUploaderEvents.onStartUpload = "onStartUploadCu";                // 업로드 시작 시 호출됩니다. 
    namoCrossUploaderEvents.onStartUploadItem = "onStartUploadItemCu";        // 개별 파일에 대한 업로드 시작 시 호출됩니다. 
    namoCrossUploaderEvents.onEndUploadItem = "onEndUploadItemCu";            // 개별 파일에 대한 업로드 완료 시 호출됩니다. 
    namoCrossUploaderEvents.onEndUpload = "onEndUploadCu";                    // 업로드 완료 시 호출됩니다.
    namoCrossUploaderEvents.onCloseMonitorWindow = "onCloseMonitorWindowCu";  // 전송창이 닫힐 때 호출됩니다.
    namoCrossUploaderEvents.onCancelUploadItem = "onCancelUploadItemCu";      // 개별 파일에 대한 업로드 취소 시 호출됩니다.
    namoCrossUploaderEvents.onException = "onExceptionCu";                    // 예외 발생 시 호출됩니다
    namoCrossUploaderEvents.onDblClickGridRow = "onDbClickGridRowCu";        // 그리드 행 더블클릭 시 호출됩니다.

    win.namoCrossUploaderConfig = {

        // 제품버전
        //version: "2.3.0",
        version: "2.0.05",
        // 제품경로 
        productPath: location.origin + "/NamoCrossUploaderH5Samples/Samples/",     

        // Event 이름 설정(수정됨 - 원본: eventNames => event)
        event: namoCrossUploaderEvents

    };

})(window);
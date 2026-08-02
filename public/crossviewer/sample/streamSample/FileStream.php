<?php
// PHP 5~8 호환을 고려해 error reporting 조정
error_reporting(E_ALL);
ini_set('display_errors', 1);

// fileId로 실제 경로 매핑
$fileId = isset($_GET['fileId']) ? $_GET['fileId'] : null;
$docRoot = rtrim($_SERVER['DOCUMENT_ROOT'], '/');
$fileMap = array(
    "doc1" => array("path" => $docRoot . "/cv/sample/sample_doc_file.pdf", "name" => "행복주택임대유의사항.pdf"),
    "doc2" => array("path" => $docRoot . "/cv/sample/sample_doc_file.pptx", "name" => "AI 혁신과 주식 시장의 미래.pptx"),
    "doc3" => array("path" => $docRoot . "/cv/sample/sample_doc_file.xlsx", "name" => "예제모음.xlsx"),
    "doc4" => array("path" => $docRoot . "/cv/sample/sample_doc_file.docx", "name" => "돈 절약 팁 체크리스트.docx"),
    "doc5" => array("path" => $docRoot . "/cv/sample/sample_doc_file.hwpx", "name" => "올림픽기념국민생활관_운영_내규.hwpx")
);

if (!isset($fileMap[$fileId])) {
    http_response_code(404);
    echo "File not found";
    exit;
}

$filePath = $fileMap[$fileId]['path'];
$fileName = $fileMap[$fileId]['name'];

if (!file_exists($filePath)) {
    http_response_code(404);
    echo "File does not exist";
    exit;
}

// 확장자 추출
$extension = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));
header("X-File-Extension: " . $extension);

// MIME 타입
$mimeType = mime_content_type($filePath);
if (!$mimeType) {
    $mimeType = "application/octet-stream";
}
header("Content-Type: $mimeType");

// 한글 파일명 -> Base64 인코딩해서 헤더 전달(한글깨짐 방지)
$encodedFileName = base64_encode($fileName);
header("X-File-Name-Base64: $encodedFileName");

// 파일 크기
header("Content-Length: " . filesize($filePath));

// 파일 스트리밍
$fp = fopen($filePath, "rb");
if ($fp) {
    while (!feof($fp)) {
        echo fread($fp, 4096);
        flush();
    }
    fclose($fp);
    exit;
} else {
    http_response_code(500);
    echo "파일을 읽을 수 없습니다.";
    exit;
}
?>

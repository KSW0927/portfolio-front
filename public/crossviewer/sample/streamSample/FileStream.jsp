<%@ page pageEncoding="UTF-8" %>
<%@ page import="java.util.Base64" %>
<%@ page import="java.io.*" %>
<%@ page import="javax.servlet.*" %>
<%@ page import="javax.servlet.http.*" %>

<%
    String fileId = request.getParameter("fileId");
    String filePath = null;
    String fileName = "";

    if ("doc1".equals(fileId)) {
        filePath = application.getRealPath("/crossviewer/sample/sample_doc_file.pdf");
        fileName = "행복주택임대유의사항.pdf";
    } else if ("doc2".equals(fileId)) {
        filePath = application.getRealPath("/cv/sample/sample_doc_file.pptx");
        fileName = "AI 혁신과 주식 시장의 미래.pptx";
    } else if ("doc3".equals(fileId)) {
        filePath = application.getRealPath("/cv/sample/sample_doc_file.xlsx");
        fileName = "예제모음.xlsx";
    } else if ("doc4".equals(fileId)) {
        filePath = application.getRealPath("/cv/sample/sample_doc_file.docx");
        fileName = "돈 절약 팁 체크리스트.docx";
    } else if ("doc5".equals(fileId)) {
        filePath = application.getRealPath("/cv/sample/sample_doc_file.hwpx");
        fileName = "올림픽기념국민생활관_운영_내규.hwpx";
    } else {
        response.sendError(HttpServletResponse.SC_NOT_FOUND, "File not found");
        return;
    }

    File file = new File(filePath);
    if (!file.exists()) {
        response.sendError(HttpServletResponse.SC_NOT_FOUND, "File does not exist");
        return;
    }

    // 확장자 추출 및 헤더 추가
    String extension = "";
    int dotIndex = filePath.lastIndexOf('.');
    if (dotIndex != -1) {
        extension = filePath.substring(dotIndex + 1).toLowerCase();
        response.setHeader("X-File-Extension", extension);
    }

    String mimeType = application.getMimeType(file.getName());
    if (mimeType != null) {
        response.setContentType(mimeType);
    } else {
        response.setContentType("application/octet-stream");
    }

    String encoded = Base64.getEncoder().encodeToString(fileName.getBytes("UTF-8"));
    response.setHeader("X-File-Name-Base64", encoded);

    // Java 1.6 이하에서는 setContentLengthLong이 없기 때문에 아래로 대체
    response.setContentLength((int) file.length());

    BufferedInputStream in = null;
    BufferedOutputStream out2 = null;

    try {
        in = new BufferedInputStream(new FileInputStream(file));
        out2 = new BufferedOutputStream(response.getOutputStream());

        byte[] buffer = new byte[4096];
        int bytesRead;
        while ((bytesRead = in.read(buffer)) != -1) {
            out2.write(buffer, 0, bytesRead);
        }
        out2.flush();
    } finally {
        if (in != null) try { in.close(); } catch (IOException e) {}
        if (out2 != null) try { out2.close(); } catch (IOException e) {}
    }
%>
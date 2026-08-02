<%@ WebHandler Language="C#" Class="FileStream" %>

using System;
using System.Web;
using System.IO;
using System.Text;

public class FileStream : IHttpHandler
{
    public void ProcessRequest(HttpContext context)
    {
        string fileId = context.Request.QueryString["fileId"];
        string filePath = null;
        string fileName = null;

        // fileId 매핑
        switch (fileId)
        {
            case "doc1":
                filePath = context.Server.MapPath("~/cv/sample/sample_doc_file.pdf");
                fileName = "행복주택임대유의사항.pdf";
                break;
            case "doc2":
                filePath = context.Server.MapPath("~/cv/sample/sample_doc_file.pptx");
                fileName = "AI 혁신과 주식 시장의 미래.pptx";
                break;
            case "doc3":
                filePath = context.Server.MapPath("~/cv/sample/sample_doc_file.xlsx");
                fileName = "예제모음.xlsx";
                break;
            case "doc4":
                filePath = context.Server.MapPath("~/cv/sample/sample_doc_file.docx");
                fileName = "돈 절약 팁 체크리스트.docx";
                break;
            case "doc5":
                filePath = context.Server.MapPath("~/cv/sample/sample_doc_file.hwpx");
                fileName = "올림픽기념국민생활관_운영_내규.hwpx";
                break;
            default:
                context.Response.StatusCode = 404;
                context.Response.Write("File not found");
                return;
        }

        if (!File.Exists(filePath))
        {
            context.Response.StatusCode = 404;
            context.Response.Write("File does not exist");
            return;
        }

        // 확장자와 MIME 타입 추출
        string ext = Path.GetExtension(filePath).TrimStart('.').ToLower();
        string mimeType = MimeMapping.GetMimeMapping(filePath) ?? "application/octet-stream";

        // 응답 헤더 설정
        context.Response.ContentType = mimeType;
        context.Response.AddHeader("X-File-Extension", ext);
        context.Response.AddHeader("X-File-Name-Base64", Convert.ToBase64String(Encoding.UTF8.GetBytes(fileName)));
        context.Response.AddHeader("Content-Length", new FileInfo(filePath).Length.ToString());
        context.Response.Buffer = false;

        // 스트리밍
        using (var fs = new System.IO.FileStream(filePath, FileMode.Open, FileAccess.Read))
        {
            byte[] buffer = new byte[4096];
            int bytesRead;
            while ((bytesRead = fs.Read(buffer, 0, buffer.Length)) > 0)
            {
                context.Response.OutputStream.Write(buffer, 0, bytesRead);
                context.Response.Flush();
            }
        }
    }

     public bool IsReusable
    {
        get { return false; }
    }
}

import { useIsMobile } from "@/hooks/useIsMobile";
import { Button, DatePicker, FileUploader, Input, Layout, Table } from "@/publishing/components";
import { AlertService } from "@/utils/AlertService";

export function UI_KSP_8261_W() {
    const isMobile = useIsMobile();

    const handleSave = () => AlertService.success("저장이 완료되었습니다.");

    return (
        <Layout title="자유게시판 등록/수정" favorite={false} activeMenuId="">

            {/* Form Table */}
            <Table variant="horizontal" caption="공지사항 등록 및 수정 양식">
                {isMobile ? (
                    <>
                        <Table.Row>
                            <Table.Header scope="row">작성인</Table.Header>
                            <Table.Cell>
                                <Input value="홍길동" disabled fullWidth />
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header scope="row">작성일</Table.Header>
                            <Table.Cell>
                                <DatePicker disabled fullWidth selected={new Date()} onChange={() => { }} />
                            </Table.Cell>
                        </Table.Row>
                    </>
                ) : (
                    <Table.Row>
                        <Table.Header scope="row">작성인</Table.Header>
                        <Table.Cell>
                            <Input value="홍길동" disabled fullWidth />
                        </Table.Cell>
                        <Table.Header scope="row">작성일</Table.Header>
                        <Table.Cell>
                            <DatePicker disabled fullWidth selected={new Date()} onChange={() => { }} />
                        </Table.Cell>
                    </Table.Row>
                )}
                <Table.Row>
                    <Table.Header scope="row" required>제목</Table.Header>
                    <Table.Cell colSpan={3}>
                        <Input placeholder="제목을 입력해 주세요." fullWidth />
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header scope="row">첨부파일</Table.Header>
                    <Table.Cell colSpan={3}>
                        <FileUploader />
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header scope="row"> </Table.Header>
                    <Table.Cell colSpan={3}>
                        에디터 영역입니다.
                    </Table.Cell>
                </Table.Row>
            </Table>

            <Layout.Row justify="end" gap={8}>
                <Button variant="outlined" size={isMobile ? "md" : "lg"}>목록</Button>
                <Button size={isMobile ? "md" : "lg"} onClick={handleSave}>저장</Button>
            </Layout.Row>
        </Layout>
    );
}

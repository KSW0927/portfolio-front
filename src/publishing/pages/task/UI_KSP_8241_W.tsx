import { useIsMobile } from "@/hooks/useIsMobile";
import { Button, DatePicker, Dropdown, FileUploader, Input, Layout, Table } from "@/publishing/components";
import { AlertService } from "@/utils/AlertService";

const dummyOptions = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
    { label: "Option 4", value: "4" },
    { label: "Option 5", value: "5" },
];

export function UI_KSP_8241_W() {
    const isMobile = useIsMobile();

    const handleSave = () => AlertService.success("저장이 완료되었습니다.");

    return (
        <Layout title="전산 작업 요청 등록/수정" favorite={false} activeMenuId="">

            {/* Form Table */}
            <Table variant="horizontal" caption="전산 작업 요청 등록 및 수정 양식">
                {isMobile ? (
                    <>
                        <Table.Row>
                            <Table.Header scope="row">요청인</Table.Header>
                            <Table.Cell>
                                <Input value="홍길동" disabled fullWidth />
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header scope="row">소속</Table.Header>
                            <Table.Cell>
                                <Input value="ESG경영팀" disabled fullWidth />
                            </Table.Cell>
                        </Table.Row>
                    </>
                ) : (
                    <Table.Row>
                        <Table.Header scope="row">요청인</Table.Header>
                        <Table.Cell>
                            <Input value="홍길동" disabled fullWidth />
                        </Table.Cell>
                        <Table.Header scope="row">소속</Table.Header>
                        <Table.Cell>
                            <Input value="ESG경영팀" disabled fullWidth />
                        </Table.Cell>
                    </Table.Row>
                )}
                <Table.Row>
                    <Table.Header scope="row">요청일</Table.Header>
                    <Table.Cell colSpan={isMobile ? 1 : 3}>
                        <DatePicker disabled fullWidth selected={new Date()} onChange={() => { }} />
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header scope="row" required>요청 유형</Table.Header>
                    <Table.Cell colSpan={isMobile ? 1 : 3}>
                        <Dropdown
                            options={dummyOptions}
                            onChange={() => { }}
                            width={isMobile ? "100%" : 200}
                        />
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header scope="row" required>지원 요청명</Table.Header>
                    <Table.Cell colSpan={isMobile ? 1 : 3}>
                        <Input placeholder="지원 요청명을 입력해 주세요." fullWidth />
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header scope="row">접수 부서(요청대상)</Table.Header>
                    <Table.Cell colSpan={isMobile ? 1 : 3}>
                        <Dropdown
                            options={dummyOptions}
                            onChange={() => { }}
                            width={isMobile ? "100%" : 200}
                        />
                        <Dropdown
                            options={dummyOptions}
                            onChange={() => { }}
                            width={isMobile ? "100%" : 200}
                        />
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header scope="row">첨부파일</Table.Header>
                    <Table.Cell colSpan={isMobile ? 1 : 3}>
                        <FileUploader />
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header scope="row"> </Table.Header>
                    <Table.Cell colSpan={isMobile ? 1 : 3}>
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

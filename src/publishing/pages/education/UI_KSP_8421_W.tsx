import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Badge, Button, DataGrid, DatePicker, Dropdown, FileUploader, Input, Layout, Table, Textarea, Typography } from "@/publishing/components";

const dummyOptions = [
    { label: "전체", value: "all" },
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
    { label: "Option 4", value: "4" },
    { label: "Option 5", value: "5" },
]

const tableColumns: ColDef[] = [
    { headerName: "번호", field: "no", width: 70, minWidth: 70, flex: 0, },
    { headerName: "평가 차수", field: "evalRound", minWidth: 220, flex: 0, },
    { headerName: "피평가자", field: "evaluatee", minWidth: 220, flex: 0, },
    { headerName: "소속", field: "dept", minWidth: 220, flex: 0, },
    { headerName: "평가일시", field: "evalDate", minWidth: 220, flex: 0, },
    {
        headerName: "평가 결과",
        field: "evalResult",
        minWidth: 120,
        cellClass: "text-left",
        flex: 0,
        cellRenderer: ({ value }: ICellRendererParams) => (
            <Badge color={value === "재평가 진행" ? "green" : "gray"} dot>{value}</Badge>
        ),
    },
    { headerName: "평가내역", field: "evalDetail", cellClass: "text-left", flex: 1 },
];

const dummyData = [
    { no: "2", evalRound: "1차", evaluatee: "홍길동(A123456)", dept: "영업본부 > 가스팀", evalDate: "2026.01.01", evalResult: "재평가 진행", evalDetail: "현재 담당업무에 대하여 평가 항목 중 기술부분 과락으로 재평가를 수행하기로 함" },
    { no: "1", evalRound: "2차", evaluatee: "홍길동(A123456)", dept: "영업본부 > 가스팀", evalDate: "2026.02.01", evalResult: "평가종료", evalDetail: "현재 담당업무에 대하여 모두 상 평가로 해당 업무 종료" },
];

export function UI_KSP_8421_W() {
    const isMobile = useIsMobile();

    return (
        <Layout title="업무숙련도 평가 내역 등록/수정" favorite={false} activeMenuId="">

            {/* Form Table */}
            <Table variant="horizontal" caption="업무숙련도 평가 내역 등록 및 수정 양식">
                {isMobile ? (
                    <>
                        <Table.Row>
                            <Table.Header scope="row">평가자</Table.Header>
                            <Table.Cell>
                                <Input value="홍길동" disabled fullWidth />
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header scope="row">최근 수정 일자</Table.Header>
                            <Table.Cell>
                                <DatePicker disabled fullWidth selected={new Date()} onChange={() => { }} />
                            </Table.Cell>
                        </Table.Row>
                    </>
                ) : (
                    <Table.Row>
                        <Table.Header scope="row">평가자</Table.Header>
                        <Table.Cell>
                            <Input value="홍길동" disabled fullWidth />
                        </Table.Cell>
                        <Table.Header scope="row">최근 수정 일자</Table.Header>
                        <Table.Cell>
                            <DatePicker disabled fullWidth selected={new Date()} onChange={() => { }} />
                        </Table.Cell>
                    </Table.Row>
                )}
                {isMobile ? (
                    <>
                        <Table.Row>
                            <Table.Header scope="row">피평가자부서</Table.Header>
                            <Table.Cell>영업본부 &gt; 가스팀</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header scope="row">피평가자부서</Table.Header>
                            <Table.Cell>홍길동(B123456)</Table.Cell>
                        </Table.Row>
                    </>
                ) : (
                    <Table.Row>
                        <Table.Header scope="row">피평가자부서</Table.Header>
                        <Table.Cell>영업본부 &gt; 가스팀</Table.Cell>
                        <Table.Header scope="row">피평가자부서</Table.Header>
                        <Table.Cell>홍길동(B123456)</Table.Cell>
                    </Table.Row>
                )}
                {isMobile ? (
                    <>
                        <Table.Row>
                            <Table.Header scope="row" required>평가완료 예정일자</Table.Header>
                            <Table.Cell>
                                <DatePicker fullWidth selected={null} onChange={() => { }} />
                                <Badge color="red" dot>누락</Badge>
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header scope="row" required>평가결과</Table.Header>
                            <Table.Cell>
                                <Dropdown
                                    options={dummyOptions}
                                    onChange={() => { }}
                                    fullWidth
                                />
                                <Typography variant="body-lg">재평가 진행의 경우 다음 평가 완료 예정일자를 변경해 주세요.</Typography>
                            </Table.Cell>
                        </Table.Row>
                    </>
                ) : (
                    <Table.Row>
                        <Table.Header scope="row" required>평가완료 예정일자</Table.Header>
                        <Table.Cell>
                            <DatePicker selected={null} onChange={() => { }} width={200} />
                            <Badge color="red" dot>누락</Badge>
                        </Table.Cell>
                        <Table.Header scope="row" required>평가결과</Table.Header>
                        <Table.Cell>
                            <Dropdown
                                options={dummyOptions}
                                onChange={() => { }}
                                width={200}
                            />
                            <Typography variant="body-lg" as="span">재평가 진행의 경우 다음 평가 완료 예정일자를 변경해 주세요.</Typography>
                        </Table.Cell>
                    </Table.Row>
                )}
                <Table.Row>
                    <Table.Header scope="row" required>평가결과 내역</Table.Header>
                    <Table.Cell colSpan={3}>
                        <Textarea placeholder="평가에 관련된 내용을 작성해 주세요." fullWidth />
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header scope="row">첨부파일</Table.Header>
                    <Table.Cell colSpan={3}>
                        <FileUploader />
                    </Table.Cell>
                </Table.Row>
            </Table>

            {/* Data Grid */}
            <DataGrid
                columns={tableColumns}
                rowData={dummyData}
                gridLabel="업무숙련도 평가 내역 목록"
                title="업무숙련도 평가 내역"
                topRightButtons={
                    <>
                        <Button variant="outlined">목록</Button>
                        <Button>저장</Button>
                    </>
                }
            />
        </Layout>
    );
}

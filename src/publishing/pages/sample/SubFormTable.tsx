import { useState } from "react";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Badge, Button, Checkbox, DataGrid, DatePicker, Dropdown, FileUploader, Input, Layout, Space, Table, Textarea, Typography } from "@/publishing/components";

const tableColumns: ColDef[] = [
    { headerName: "번호", field: "no", width: 70, minWidth: 70, flex: 0 },
    { headerName: "평가 차수", field: "cnt", width: 220, minWidth: 220 },
    { headerName: "피평가자", field: "name", width: 220, minWidth: 220 },
    { headerName: "소속", field: "dept", width: 220, minWidth: 220 },
    { headerName: "평가일시", field: "date", width: 220, minWidth: 220 },
    {
        headerName: "평가결과",
        field: "status",
        width: 120,
        minWidth: 120,
        flex: 0,
        cellClass: "text-left",
        cellRenderer: ({ value }: ICellRendererParams) => {
            const badgeColor: "green" | "gray" = value === "재평가 진행" ? "green" : "gray";
            return <Badge color={badgeColor} dot>{value}</Badge>;
        },
    },
    { headerName: "평가내역", field: "res", minWidth: 644, cellClass: "text-left" },
];

const dummyData = [
    { no: "4", cnt: "1차", name: "홍길동(A123456)", dept: "영업본부 > 가스팀", date: "2026.01.01", status: "재평가 진행", res: "현재 담당업무에 대하여 평가 항목 중 기술부분 과락으로 재평가를 수행하기로 함" },
    { no: "3", cnt: "2차", name: "홍길동(A123456)", dept: "영업본부 > 가스팀", date: "2026.01.01", status: "평가종료", res: "현재 담당업무에 대하여 모두 '상' 평가로 해당 업무 종료" },
    { no: "2", cnt: "3차", name: "홍길동(A123456)", dept: "영업본부 > 가스팀", date: "2026.01.01", status: "평가종료", res: "현재 담당업무에 대하여 모두 '상' 평가로 해당 업무 종료" },
    { no: "1", cnt: "4차", name: "홍길동(A123456)", dept: "영업본부 > 가스팀", date: "2026.01.01", status: "평가종료", res: "현재 담당업무에 대하여 모두 '상' 평가로 해당 업무 종료" },
];

const dropdownOptions = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
];

const shareOptions1 = [
    { label: "전체공유", value: "1-1" },
    { label: "본사공유", value: "1-2" },
    { label: "해사본부공유", value: "1-3" },
];

const shareOptions2 = [
    { label: "경영관리팀", value: "2-1" }, { label: "자금팀", value: "2-2" },
    { label: "회계팀", value: "2-3" }, { label: "경영지원본부", value: "2-4" },
    { label: "가스팀", value: "2-5" }, { label: "탱커팀", value: "2-6" },
    { label: "케미칼팀", value: "2-7" }, { label: "영업본부", value: "2-8" },
];

const shareOptions3 = [
    { label: "기획전략팀", value: "3-1" }, { label: "ESG경영팀", value: "3-2" },
    { label: "기획관리본부", value: "3-3" }, { label: "비상계획부", value: "3-4" },
    { label: "동경사무소", value: "3-5" }, { label: "싱가포르사무소", value: "3-6" },
    { label: "내부회계관리팀", value: "3-7" },
];

const shareOptions4 = [
    { label: "해상인사팀", value: "4-1" }, { label: "해사기획팀", value: "4-2" },
    { label: "정보기술팀", value: "4-3" }, { label: "해사업무팀", value: "4-4" },
    { label: "해사운영본부", value: "4-5" }, { label: "안전품질 1팀", value: "4-6" },
    { label: "안전품질 2팀", value: "4-7" },
];

const shareOptions5 = [
    { label: "선박관리 1팀", value: "5-1" }, { label: "선박관리 2팀", value: "5-2" },
    { label: "해사관리본부", value: "5-3" }, { label: "안전보건경영팀", value: "5-4" },
];

const ALL_SHARE_VALUES = [
    ...shareOptions1, ...shareOptions2, ...shareOptions3, ...shareOptions4, ...shareOptions5
].map(opt => opt.value);

export function SubFormTable() {
    const isMobile = useIsMobile();
    const [date, setDate] = useState<Date | null>(null);
    const [sdate, setsDate] = useState<Date | null>(null);
    const [edate, seteDate] = useState<Date | null>(null);
    const [checkedList, setCheckedList] = useState<string[]>([]);

    const handleCheckboxChange = (newValues: string[]) => {
        const addedItem = newValues.find(v => !checkedList.includes(v));
        const removedItem = checkedList.find(v => !newValues.includes(v));

        let nextList = [...newValues];
        const subTeams = ALL_SHARE_VALUES.filter(v => v !== "1-1" && v !== "1-2" && v !== "1-3");

        if (addedItem === "1-1") {
            nextList = ["1-1", ...subTeams];
        } else if (removedItem === "1-1") {
            nextList = nextList.filter(v => v === "1-2" || v === "1-3");
        } else {
            if (nextList.includes("1-2") || nextList.includes("1-3")) {
                if (!nextList.includes("4-3")) nextList.push("4-3");
            }
            const isAllSubTeamsChecked = subTeams.every(v => nextList.includes(v));
            if (isAllSubTeamsChecked) {
                if (!nextList.includes("1-1")) nextList.push("1-1");
            } else {
                nextList = nextList.filter(v => v !== "1-1");
            }
        }

        setCheckedList([...new Set(nextList)]);
    };

    return (
        <Layout title="샘플 서브 페이지(Form Table + Data Grid)" activeMenuId="">

            {/* Form Table */}
            <Table variant="horizontal">
                <Table.HeaderArea>
                    <Table.HeaderRight>
                        <Button variant="outlined" size={isMobile ? "md" : "lg"}>목록</Button>
                        <Button variant="solid" size={isMobile ? "md" : "lg"}>저장</Button>
                    </Table.HeaderRight>
                </Table.HeaderArea>

                <Table.Row>
                    <Table.Header required>제목</Table.Header>
                    <Table.Cell colSpan={isMobile ? 0 : 3}>
                        <Input placeholder="제목을 입력해 주세요" fullWidth />
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header required>비정형 설명</Table.Header>
                    <Table.Cell colSpan={isMobile ? 0 : 3}>
                        <Textarea placeholder="비정형 설명을 입력해 주세요." fullWidth />
                    </Table.Cell>
                </Table.Row>
                {isMobile ? (
                    <>
                        <Table.Row>
                            <Table.Header required>회의실</Table.Header>
                            <Table.Cell>
                                <Dropdown options={dropdownOptions} onChange={() => { }} fullWidth />
                                <Dropdown options={dropdownOptions} onChange={() => { }} fullWidth />
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header required>DATA 선택</Table.Header>
                            <Table.Cell>
                                <Dropdown options={dropdownOptions} onChange={() => { }} fullWidth />
                            </Table.Cell>
                        </Table.Row>
                    </>
                ) : (
                    <Table.Row>
                        <Table.Header required>회의실</Table.Header>
                        <Table.Cell>
                            <Dropdown options={dropdownOptions} onChange={() => { }} width={200} />
                            <Dropdown options={dropdownOptions} onChange={() => { }} width={200} />
                        </Table.Cell>
                        <Table.Header required>DATA 선택</Table.Header>
                        <Table.Cell>
                            <Dropdown options={dropdownOptions} onChange={() => { }} width={200} />
                        </Table.Cell>
                    </Table.Row>
                )}
                {isMobile ? (
                    <>
                        <Table.Row>
                            <Table.Header required>회의실 사용 일시</Table.Header>
                            <Table.Cell>
                                <DatePicker selected={sdate} onChange={(newDate) => setsDate(newDate)} isTimer fullWidth />
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header required>회의실 사용 종료일시</Table.Header>
                            <Table.Cell>
                                <DatePicker selected={edate} onChange={(newDate) => seteDate(newDate)} isTimer fullWidth />
                            </Table.Cell>
                        </Table.Row>
                    </>
                ) : (
                    <Table.Row>
                        <Table.Header required>회의실 사용 일시</Table.Header>
                        <Table.Cell>
                            <DatePicker selected={sdate} onChange={(newDate) => setsDate(newDate)} isTimer width={200} />
                        </Table.Cell>
                        <Table.Header required>회의실 사용 종료일시</Table.Header>
                        <Table.Cell>
                            <DatePicker selected={edate} onChange={(newDate) => seteDate(newDate)} isTimer width={200} />
                        </Table.Cell>
                    </Table.Row>
                )}
                {isMobile ? (
                    <>
                        <Table.Row>
                            <Table.Header required>회의실 사용 일시</Table.Header>
                            <Table.Cell>
                                <DatePicker selected={sdate} onChange={(newDate) => setsDate(newDate)} isTimer fullWidth />
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header required>회의실 사용 종료일시</Table.Header>
                            <Table.Cell>
                                <DatePicker selected={edate} onChange={(newDate) => seteDate(newDate)} isTimer fullWidth />
                            </Table.Cell>
                        </Table.Row>
                    </>
                ) : (
                    <Table.Row>
                        <Table.Header required>회의실 사용 일시</Table.Header>
                        <Table.Cell>
                            <DatePicker selected={sdate} onChange={(newDate) => setsDate(newDate)} isTimer width={200} />
                        </Table.Cell>
                        <Table.Header required>회의실 사용 종료일시</Table.Header>
                        <Table.Cell>
                            <DatePicker selected={edate} onChange={(newDate) => seteDate(newDate)} isTimer width={200} />
                        </Table.Cell>
                    </Table.Row>
                )}
                {isMobile ? (
                    <>
                        <Table.Row>
                            <Table.Header required>평가완료 예정일자</Table.Header>
                            <Table.Cell>
                                <DatePicker selected={date} onChange={(newDate) => setDate(newDate)} fullWidth />
                                <Badge color="blue" dot>사용</Badge>
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header required>회의실 사용 종료일시</Table.Header>
                            <Table.Cell>
                                <DatePicker selected={edate} onChange={(newDate) => seteDate(newDate)} isTimer />
                                <Typography variant="body-lg">재평가 진행의 경우 다음 평가 완료 예정일자를 변경해주세요.</Typography>
                            </Table.Cell>
                        </Table.Row>
                    </>
                ) : (
                    <Table.Row>
                        <Table.Header required>평가완료 예정일자</Table.Header>
                        <Table.Cell>
                            <DatePicker selected={date} onChange={(newDate) => setDate(newDate)} width={200} />
                            <Badge color="blue" dot>사용</Badge>
                        </Table.Cell>
                        <Table.Header required>회의실 사용 종료일시</Table.Header>
                        <Table.Cell>
                            <DatePicker selected={edate} onChange={(newDate) => seteDate(newDate)} isTimer width={200} />
                            <Typography variant="body-lg" as="span">재평가 진행의 경우 다음 평가 완료 예정일자를 변경해주세요.</Typography>
                        </Table.Cell>
                    </Table.Row>
                )}
                <Table.Row>
                    <Table.Header>일정공유</Table.Header>
                    <Table.Cell colSpan={isMobile ? 0 : 3}>
                        <Space layout="vertical" size={12}>
                            <Checkbox.Group options={shareOptions1} value={checkedList} onChange={handleCheckboxChange} layout="horizontal" />
                            <Checkbox.Group options={shareOptions2} value={checkedList} onChange={handleCheckboxChange} layout="horizontal" />
                            <Checkbox.Group options={shareOptions3} value={checkedList} onChange={handleCheckboxChange} layout="horizontal" />
                            <Checkbox.Group options={shareOptions4} value={checkedList} onChange={handleCheckboxChange} layout="horizontal" />
                            <Checkbox.Group options={shareOptions5} value={checkedList} onChange={handleCheckboxChange} layout="horizontal" />
                        </Space>
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header>회의자료 업로드</Table.Header>
                    <Table.Cell colSpan={isMobile ? 0 : 3}>
                        <FileUploader />
                    </Table.Cell>
                </Table.Row>
            </Table>

            <Layout.Row gap={14} layout="vertical">
                <Typography variant="heading-sm">데이터 그리드 타이틀</Typography>

                {/* Data Grid */}
                <DataGrid
                    columns={tableColumns}
                    rowData={dummyData}
                    gridLabel="평가내역 목록"
                />
            </Layout.Row>
        </Layout>
    );
}

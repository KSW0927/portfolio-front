import { useState } from "react";
import type { ColDef } from "ag-grid-community";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Box, Button, Card, DataGrid, Icon, Layout, Space, Typography } from "@/publishing/components";

const tableColumns: ColDef[] = [
    { headerName: "번호", field: "no", width: 70, minWidth: 70, flex: 0 },
    { headerName: "구분", field: "type", width: 100, minWidth: 100, flex: 0 },
    { headerName: "과제번호", field: "taskNo", width: 130, minWidth: 130, flex: 0 },
    { headerName: "지시일자", field: "orderDate", width: 130, minWidth: 130, flex: 0 },
    { headerName: "지시사항(제목)", field: "title", minWidth: 824 },
    { headerName: "주관(팀/본부)", field: "dept", width: 200, minWidth: 200, flex: 0 },
    { headerName: "담당자", field: "assignee", width: 130, minWidth: 130, flex: 0 },
    { headerName: "완료일자", field: "endDate", width: 130, minWidth: 130, flex: 0 },
];

const dummyData = [
    { no: "10", type: "종결과제", taskNo: "16-242", orderDate: "2016-09-30", title: "2016년도 년말 김장행사(한국입항시 선박보급예정)", dept: "해사본부 > 해상인사팀", assignee: "홍은아", endDate: "2021-04-30" },
    { no: "9", type: "종결과제", taskNo: "16-242", orderDate: "2016-09-30", title: "2016년도 년말 김장행사(한국입항시 선박보급예정)", dept: "해사본부 > 해상인사팀", assignee: "홍은아", endDate: "2021-04-30" },
    { no: "8", type: "종결과제", taskNo: "16-242", orderDate: "2016-09-30", title: "2016년도 년말 김장행사(한국입항시 선박보급예정)", dept: "해사본부 > 해상인사팀", assignee: "홍은아", endDate: "2021-04-30" },
    { no: "7", type: "종결과제", taskNo: "16-242", orderDate: "2016-09-30", title: "2016년도 년말 김장행사(한국입항시 선박보급예정)", dept: "해사본부 > 해상인사팀", assignee: "홍은아", endDate: "2021-04-30" },
    { no: "6", type: "종결과제", taskNo: "16-242", orderDate: "2016-09-30", title: "2016년도 년말 김장행사(한국입항시 선박보급예정)", dept: "해사본부 > 해상인사팀", assignee: "홍은아", endDate: "2021-04-30" },
    { no: "5", type: "종결과제", taskNo: "16-242", orderDate: "2016-09-30", title: "2016년도 년말 김장행사(한국입항시 선박보급예정)", dept: "해사본부 > 해상인사팀", assignee: "홍은아", endDate: "2021-04-30" },
    { no: "4", type: "종결과제", taskNo: "16-242", orderDate: "2016-09-30", title: "2016년도 년말 김장행사(한국입항시 선박보급예정)", dept: "해사본부 > 해상인사팀", assignee: "홍은아", endDate: "2021-04-30" },
    { no: "3", type: "종결과제", taskNo: "16-242", orderDate: "2016-09-30", title: "2016년도 년말 김장행사(한국입항시 선박보급예정)", dept: "해사본부 > 해상인사팀", assignee: "홍은아", endDate: "2021-04-30" },
    { no: "2", type: "종결과제", taskNo: "16-242", orderDate: "2016-09-30", title: "2016년도 년말 김장행사(한국입항시 선박보급예정)", dept: "해사본부 > 해상인사팀", assignee: "홍은아", endDate: "2021-04-30" },
    { no: "1", type: "종결과제", taskNo: "16-242", orderDate: "2016-09-30", title: "2016년도 년말 김장행사(한국입항시 선박보급예정)", dept: "해사본부 > 해상인사팀", assignee: "홍은아", endDate: "2021-04-30" },
];

export function UI_KSP_8472_L() {
    const isMobile = useIsMobile();
    const [selectedCardIndex, setSelectedCardIndex] = useState<number>(2);
    const [categories, setCategories] = useState([
        { title: "육상직원 인사관리", cnt: 54, isFav: true },
        { title: "육상직원 교육훈련", cnt: 62, isFav: true },
        { title: "육상직원 안전보건관리", cnt: 62, isFav: true },
        { title: "공사 업무처리", cnt: 62, isFav: true },
        { title: "CI관리", cnt: 62, isFav: true },
        { title: "홍보자료 및 사료관리", cnt: 62, isFav: true },
        { title: "회계관리", cnt: 62, isFav: false },
        { title: "자금관리", cnt: 62, isFav: false },
        { title: "영업업무", cnt: 62, isFav: false },
        { title: "예산관리", cnt: 62, isFav: false },
        { title: "보험업무", cnt: 62, isFav: false },
        { title: "선박매매", cnt: 62, isFav: false },
        { title: "홈페이지 운영업무", cnt: 62, isFav: false },
        { title: "문서관리", cnt: 62, isFav: false },
    ]);

    const handleToggleFavorite = (e: React.MouseEvent, targetIndex: number) => {
        e.stopPropagation();
        setCategories(prev =>
            prev.map((item, index) =>
                index === targetIndex
                    ? { ...item, isFav: !item.isFav }
                    : item
            )
        );
    };

    const [selectedSubCardIndex, setSelectedSubCardIndex] = useState<number>(0);
    const [subCategories, setSubCategories] = useState([
        { title: "해원관리팀 기타업무", cnt: 1 },
    ]);

    return (
        <>
            <Layout title="업무별 분류" activeMenuId="">

                {/* Card Grid */}
                <Layout.Row gap={16} layout="vertical">
                    <Typography variant="heading-sm">1차 분류</Typography>

                    <div className={`card-grid ${isMobile ? "-col-2" : "-col-6"} ${!isMobile && categories.length > 18 ? "-scroll" : ""}`}>
                        {categories.map((item, index) => {
                            const favButtonClasses = [
                                "button-fav",
                                item.isFav ? "-active" : ""
                            ].filter(Boolean).join(" ");

                            return (
                                <Card
                                    size="md"
                                    variant="filled"
                                    key={`${item.title}-${index}`}
                                    active={selectedCardIndex === index}
                                    onClick={() => setSelectedCardIndex(index)}
                                >
                                    <Space layout="vertical" size={4}>
                                        <Card.Header
                                            extra={
                                                <Button
                                                    variant="text"
                                                    leftIcon={<Icon name="star-filled" size={24} />}
                                                    className={favButtonClasses}
                                                    aria-label="즐겨찾기"
                                                    onClick={e => handleToggleFavorite(e, index)}
                                                />}
                                        >
                                            <Typography variant="heading-sm" className="title">{item.title}</Typography>
                                        </Card.Header>

                                        <Card.Body>
                                            <Space size={2} align="baseline" justify="end">
                                                <Typography variant="heading-xl" as="strong" primary style={{ fontSize: "3.6rem", lineHeight: 1 }}>{item.cnt}</Typography>
                                                <Typography variant="body-md" as="span" weight="semibold" secondary>건</Typography>
                                            </Space>
                                        </Card.Body>
                                    </Space>
                                </Card>
                            )
                        })}
                    </div>
                </Layout.Row>

                <Layout.Row gap={16} layout="vertical">
                    <Typography variant="heading-sm">2차 분류</Typography>

                    {/* Summary */}
                    <Box gap={24}>
                        <div className={`card-grid ${isMobile ? "-col-2" : "-col-6"} ${!isMobile && subCategories.length > 18 ? "-scroll" : ""}`}>
                            {subCategories.map((item, index) => {
                                return (
                                    <Card
                                        size="md"
                                        variant="filled"
                                        key={`${item.title}-${index}`}
                                        active={selectedSubCardIndex === index}
                                        onClick={() => setSelectedSubCardIndex(index)}
                                    >
                                        <Space layout="vertical" size={4}>
                                            <Card.Header>
                                                <Typography variant="heading-sm" className="title">{item.title}</Typography>
                                            </Card.Header>

                                            <Card.Body>
                                                <Space size={2} align="baseline" justify="end">
                                                    <Typography variant="heading-xl" as="strong" primary style={{ fontSize: "3.6rem", lineHeight: 1 }}>{item.cnt}</Typography>
                                                    <Typography variant="body-md" as="span" weight="semibold" secondary>건</Typography>
                                                </Space>
                                            </Card.Body>
                                        </Space>
                                    </Card>
                                )
                            })}
                        </div>
                    </Box>
                </Layout.Row>

                {/* Data Grid */}
                <DataGrid
                    columns={tableColumns}
                    rowData={dummyData}
                    gridLabel="업무별 분류 목록"
                />
            </Layout>
        </>
    );
}
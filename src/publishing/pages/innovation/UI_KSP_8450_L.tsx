import { useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Box, Button, Card, Divider, Icon, Layout, Space, SummaryCard, Typography } from "@/publishing/components";

export function UI_KSP_8450_L() {
    const isMobile = useIsMobile();

    const taskData = [
        { title: "공통", total: 10, ongoing: 5, continuous: 5, completed: 10 },
        { title: "인사교육", total: 10, ongoing: 5, continuous: 5, completed: 10 },
        { title: "재경", total: 10, ongoing: 5, continuous: 5, completed: 10 },
        { title: "가스", total: 10, ongoing: 5, continuous: 5, completed: 10 },
        { title: "케미칼", total: 10, ongoing: 5, continuous: 5, completed: 10 },
        { title: "경영기획", total: 10, ongoing: 5, continuous: 5, completed: 10 },
        { title: "선박", total: 10, ongoing: 5, continuous: 5, completed: 10 },
        { title: "안전품질", total: 10, ongoing: 5, continuous: 5, completed: 10 },
        { title: "해상인사", total: 10, ongoing: 5, continuous: 5, completed: 10 },
        { title: "업무지원", total: 10, ongoing: 5, continuous: 5, completed: 10 },
        { title: "동경", total: 10, ongoing: 5, continuous: 5, completed: 10 },
        { title: "상해", total: 10, ongoing: 5, continuous: 5, completed: 10 },
    ];

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

    const handleToggleFavorite = (targetIndex: number) => {
        setCategories((prev) =>
            prev.map((item, index) =>
                index === targetIndex
                    ? { ...item, isFav: !item.isFav }
                    : item
            )
        );
    };

    return (
        <>
            <Layout title="총괄현황" activeMenuId="">

                {/* Summary */}
                <Box gap={24} variant={isMobile ? "info" : "default"} size={isMobile ? "lg" : ""}>
                    <Space justify="space-between" layout={isMobile ? "vertical" : "horizontal"} size={isMobile ? "sm" : "md"}>
                        <Typography variant="heading-sm">회사 경영 혁신과제(팀별)</Typography>
                        <Space size={isMobile ? 0 : 14} separator={!isMobile && (<Divider layout="vertical" size={13} />)} layout={isMobile ? "vertical" : "horizontal"}>
                            <Space size="sm" align="center">
                                <Space.Item>
                                    <Typography variant={isMobile ? "body-md" : "body-lg"} as="span">진행과제</Typography>
                                </Space.Item>
                                <Space.Item>
                                    <Typography variant="heading-md" as="strong" primary>4</Typography>
                                    <Typography variant={isMobile ? "body-md" : "body-lg"} as="span">건</Typography>
                                </Space.Item>
                            </Space>
                            <Space size="sm" align="center">
                                <Space.Item>
                                    <Typography variant={isMobile ? "body-md" : "body-lg"} as="span">지속과제</Typography>
                                </Space.Item>
                                <Space.Item>
                                    <Typography variant="heading-md" as="strong" primary>8</Typography>
                                    <Typography variant={isMobile ? "body-md" : "body-lg"} as="span">건</Typography>
                                </Space.Item>
                            </Space>

                            <Space size="sm" align="center">
                                <Space.Item>
                                    <Typography variant={isMobile ? "body-md" : "body-lg"} as="span">종결과제</Typography>
                                </Space.Item>
                                <Space.Item>
                                    <Typography variant="heading-md" as="strong" primary>145</Typography>
                                    <Typography variant={isMobile ? "body-md" : "body-lg"} as="span">건</Typography>
                                </Space.Item>
                            </Space>
                        </Space>
                    </Space>

                    <SummaryCard.Slider>
                        {taskData.map((item, index) => (
                            <SummaryCard
                                key={`${item.title}-${index}`}
                                title={item.title}
                                totalCount={item.total}
                                ongoingCount={item.ongoing}
                                continuousCount={item.continuous}
                                completedCount={item.completed}
                            />
                        ))}
                    </SummaryCard.Slider>
                </Box>

                {/* Card Grid */}
                <Layout.Row gap={isMobile ? 20 : 16} layout="vertical">
                    <Typography variant="heading-sm">경영혁신과제 업무별 분류</Typography>

                    <div className={`card-grid ${isMobile ? "-col-2" : "-col-6"}`}>
                        {categories.map((item, index) => {
                            const favButtonClasses = [
                                "button-fav",
                                item.isFav ? "-active" : ""
                            ].filter(Boolean).join(" ");

                            return (
                                <Card size="md" variant="filled" key={`${item.title}-${index}`}>
                                    <Space layout="vertical" size={isMobile ? 23 : 4}>
                                        <Card.Header
                                            extra={
                                                <Button
                                                    variant="text"
                                                    leftIcon={<Icon name="star-filled" size={24} />}
                                                    className={favButtonClasses}
                                                    aria-label="즐겨찾기"
                                                    onClick={() => handleToggleFavorite(index)}
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
            </Layout>
        </>
    );
}
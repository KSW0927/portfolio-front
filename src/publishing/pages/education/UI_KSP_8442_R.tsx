import { useIsMobile } from "@/hooks/useIsMobile";
import { Badge, Button, Layout, Table, Typography } from "@/publishing/components";

export function UI_KSP_8442_R() {
    const isMobile = useIsMobile();

    return (
        <Layout title="법정교육" favorite={false} activeMenuId="">

            {/* Form Table */}
            <Table variant="horizontal" caption="법정교육 상세 정보">
                <Table.Row>
                    <Table.Header scope="row">교육 분류</Table.Header>
                    <Table.Cell>본부전체</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header scope="row">강의명</Table.Header>
                    <Table.Cell>내부회계관리 제도 교육</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header scope="row">강사</Table.Header>
                    <Table.Cell>내부회계관리팀</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header scope="row">강의일자</Table.Header>
                    <Table.Cell>2020. 10. 10</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header scope="row">교육상태</Table.Header>
                    <Table.Cell><Badge color="green" dot>실시</Badge> 2020. 10. 10 / 10:29:59</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header scope="row">강의내용</Table.Header>
                    <Table.Cell>
                        강의내용 출력<br />
                        강의내용 출력<br />
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header scope="row">강의 자료</Table.Header>
                    <Table.Cell><Button variant="filled">동영상 시청하기</Button></Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header scope="row">
                        강의자료 폴더
                        <Typography variant="body-sm" secondary>(정보시스템 링크)</Typography>
                    </Table.Header>
                    <Table.Cell>
                        <Button variant="text" size="lg" style={{ textDecoration: "underline" }}>교육 자료 폴더 링크</Button>
                        <Typography variant="body-lg" as="span" secondary>버튼을 클릭하면 경로가 복사됩니다. 윈도우 탐색기에서 복사된 주소를 붙여넣으면 교육 자료를 보실 수 있습니다.</Typography>
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header scope="row">유튜브 링크</Table.Header>
                    <Table.Cell>
                        <Button variant="filled">유튜브 동영상 시청하기</Button>
                    </Table.Cell>
                </Table.Row>
            </Table>

            <Layout.Row justify="end" gap={8}>
                <Button variant="outlined" size={isMobile ? "md" : "lg"}>목록</Button>
            </Layout.Row>
        </Layout>
    );
}

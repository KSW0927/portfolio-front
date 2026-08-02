import { useIsMobile } from "@/hooks/useIsMobile";
import { Button, Icon, Layout, List, Table, Typography } from "@/publishing/components";

export function UI_KSP_8242_R() {
    const isMobile = useIsMobile();

    return (
        <Layout title="전산 작업 요청" favorite={false} activeMenuId="">

            {/* Form Table */}
            <Table variant="horizontal" caption="전산 작업 요청 상세 정보">
                <Table.HeaderArea>
                    <Table.HeaderLeft>
                        <Typography variant="heading-sm">요청내역</Typography>
                    </Table.HeaderLeft>
                </Table.HeaderArea>

                {isMobile ? (
                    <>
                        <Table.Row>
                            <Table.Header scope="row">요청인</Table.Header>
                            <Table.Cell>홍길동</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header scope="row">소속</Table.Header>
                            <Table.Cell>ESG경영팀</Table.Cell>
                        </Table.Row>
                    </>
                ) : (
                    <Table.Row>
                        <Table.Header scope="row">요청인</Table.Header>
                        <Table.Cell>홍길동</Table.Cell>
                        <Table.Header scope="row">소속</Table.Header>
                        <Table.Cell>ESG경영팀</Table.Cell>
                    </Table.Row>
                )}
                <Table.Row>
                    <Table.Header scope="row">요청일</Table.Header>
                    <Table.Cell colSpan={isMobile ? 1 : 3}>2026-01-01</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header scope="row">요청 유형</Table.Header>
                    <Table.Cell colSpan={isMobile ? 1 : 3}>오류</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header scope="row">지원 요청명</Table.Header>
                    <Table.Cell colSpan={isMobile ? 1 : 3}>페이지 오류</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header scope="row">접수 부서(요청대상)</Table.Header>
                    <Table.Cell colSpan={isMobile ? 1 : 3}>경영지원본부&gt;경영관리팀</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header scope="row">요청내용</Table.Header>
                    <Table.Cell colSpan={isMobile ? 1 : 3}>
                        페이지 오류 내역
                        <List as="ul">
                            <List.Item>오류 내역 1</List.Item>
                            <List.Item>오류 내역 2</List.Item>
                        </List>
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header scope="row">첨부파일</Table.Header>
                    <Table.Cell colSpan={isMobile ? 1 : 3}>
                        <Button variant="text" size="lg" leftIcon={<Icon name="attachment" size={24} />}>오류_캡쳐_화면.pdf</Button>
                    </Table.Cell>
                </Table.Row>
            </Table>

            {/* Form Table */}
            <Table variant="horizontal" caption="전산 작업 요청 처리 내역 상세 정보">
                <Table.HeaderArea>
                    <Table.HeaderLeft>
                        <Typography variant="heading-sm">처리내역</Typography>
                    </Table.HeaderLeft>
                </Table.HeaderArea>

                <Table.Row>
                    <Table.Header scope="row">대외비</Table.Header>
                    <Table.Cell colSpan={isMobile ? 1 : 3}>공개</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header scope="row">담당자</Table.Header>
                    <Table.Cell colSpan={isMobile ? 1 : 3}>홍길동</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header scope="row">처리상태</Table.Header>
                    <Table.Cell colSpan={isMobile ? 1 : 3}>반려</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header scope="row">반려사유</Table.Header>
                    <Table.Cell colSpan={isMobile ? 1 : 3}>반려내용</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header scope="row">접수 부서</Table.Header>
                    <Table.Cell colSpan={isMobile ? 1 : 3}>ESG경영팀</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header scope="row">접수일</Table.Header>
                    <Table.Cell colSpan={isMobile ? 1 : 3}>2026-01-01</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header scope="row">완료 예정일</Table.Header>
                    <Table.Cell colSpan={isMobile ? 1 : 3}>2026-01-01</Table.Cell>
                </Table.Row>
                {isMobile ? (
                    <>
                        <Table.Row>
                            <Table.Header scope="row">진척도</Table.Header>
                            <Table.Cell>75%</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header scope="row">완료일</Table.Header>
                            <Table.Cell>2026-01-01</Table.Cell>
                        </Table.Row>
                    </>
                ) : (
                    <Table.Row>
                        <Table.Header scope="row">진척도</Table.Header>
                        <Table.Cell>75%</Table.Cell>
                        <Table.Header scope="row">완료일</Table.Header>
                        <Table.Cell>2026-01-01</Table.Cell>
                    </Table.Row>
                )}
                <Table.Row>
                    <Table.Header scope="row">첨부파일</Table.Header>
                    <Table.Cell colSpan={isMobile ? 1 : 3}>
                        <Button variant="text" size="lg" leftIcon={<Icon name="attachment" size={24} />}>처리_캡쳐_화면.pdf</Button>
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header scope="row">처리내용</Table.Header>
                    <Table.Cell colSpan={isMobile ? 1 : 3}>
                        페이지 오류 내역
                        <List as="ul">
                            <List.Item>처리 내역 1</List.Item>
                            <List.Item>처리 내역 2</List.Item>
                        </List>
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header scope="row">수정이력</Table.Header>
                    <Table.Cell colSpan={isMobile ? 1 : 3}>
                        최초 완료 예정일 : 홍길동(B12345) 2010-10-10 10:00<br />
                        완료 예정일 수정 : 홍길동(B12345) 2010-10-10 10:00<br />
                        내용 수정 : 홍길동(B12345) 2010-10-10 10:00<br />
                    </Table.Cell>
                </Table.Row>
            </Table>

            <Layout.Row justify="end" gap={8}>
                <Button variant="outlined" size={isMobile ? "md" : "lg"}>목록</Button>
                <Button size={isMobile ? "md" : "lg"}>처리내역 작성</Button>
            </Layout.Row>
        </Layout>
    );
}

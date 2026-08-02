import { useIsMobile } from "@/hooks/useIsMobile";
import { Button, Layout, Table } from "@/publishing/components";

export function UI_ADM_9201_R() {
    const isMobile = useIsMobile();

    return (
        <Layout title="게시판 상세" favorite={false} activeMenuId="">

            {/* Form Table */}
            <Table variant="horizontal" caption="게시판 상세">
                <Table.Row>
                    <Table.Header scope="row">게시판명</Table.Header>
                    <Table.Cell colSpan={isMobile ? 1 : 3}>XXXXXXXXXX</Table.Cell>
                </Table.Row>
                {isMobile ? (
                    <>
                        <Table.Row>
                            <Table.Header scope="row">화면 ID</Table.Header>
                            <Table.Cell>XXX</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header scope="row">게시판 ID</Table.Header>
                            <Table.Cell>XXXXX</Table.Cell>
                        </Table.Row>
                    </>

                ) : (
                    <Table.Row>
                        <Table.Header scope="row">화면 ID</Table.Header>
                        <Table.Cell>XXX</Table.Cell>
                        <Table.Header scope="row">게시판 ID</Table.Header>
                        <Table.Cell>XXXXX</Table.Cell>
                    </Table.Row>
                )}

                <Table.Row>
                    <Table.Header scope="row">담당자</Table.Header>
                    <Table.Cell colSpan={isMobile ? 1 : 3}>홍길동(test1), 홍길동2(test2)</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header scope="row">게시판  소개</Table.Header>
                    <Table.Cell colSpan={isMobile ? 1 : 3}>XXXXXX</Table.Cell>
                </Table.Row>
                {isMobile ? (
                    <>
                        <Table.Row>
                            <Table.Header scope="row"></Table.Header>
                            <Table.Cell></Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header scope="row">게시판 유형</Table.Header>
                            <Table.Cell>기본</Table.Cell>
                        </Table.Row>
                    </>
                ) : (
                    <Table.Row>
                        <Table.Header scope="row"></Table.Header>
                        <Table.Cell></Table.Cell>
                        <Table.Header scope="row">게시판 유형</Table.Header>
                        <Table.Cell>기본</Table.Cell>
                    </Table.Row>
                )}
                {isMobile ? (
                    <>
                        <Table.Row>
                            <Table.Header scope="row">사용여부</Table.Header>
                            <Table.Cell>사용</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header scope="row">공개 여부</Table.Header>
                            <Table.Cell>공개</Table.Cell>
                        </Table.Row>
                    </>
                ) : (
                    <Table.Row>
                        <Table.Header scope="row">사용여부</Table.Header>
                        <Table.Cell>사용</Table.Cell>
                        <Table.Header scope="row">공개 여부</Table.Header>
                        <Table.Cell>공개</Table.Cell>
                    </Table.Row>
                )}
                {isMobile ? (
                    <>
                        <Table.Row>
                            <Table.Header scope="row">게시여부 사용여부</Table.Header>
                            <Table.Cell>사용</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header scope="row">카테고리 사용여부</Table.Header>
                            <Table.Cell>사용</Table.Cell>
                        </Table.Row>
                    </>
                ) : (
                    <Table.Row>
                        <Table.Header scope="row">게시여부 사용여부</Table.Header>
                        <Table.Cell>사용</Table.Cell>
                        <Table.Header scope="row">카테고리 사용여부</Table.Header>
                        <Table.Cell>사용</Table.Cell>
                    </Table.Row>
                )}
                {isMobile ? (
                    <>
                        <Table.Row>
                            <Table.Header scope="row">댓글 사용여부</Table.Header>
                            <Table.Cell>사용</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header scope="row">카테고리 관리</Table.Header>
                            <Table.Cell>
                                XXXXXX1<br />
                                XXXXXX2<br />
                                XXXXXX3<br />
                                XXXXXX4
                            </Table.Cell>
                        </Table.Row>
                    </>
                ) : (
                    <Table.Row>
                        <Table.Header scope="row">댓글 사용여부</Table.Header>
                        <Table.Cell>사용</Table.Cell>
                        <Table.Header scope="row" rowSpan={4}>카테고리 관리</Table.Header>
                        <Table.Cell rowSpan={4}>
                            XXXXXX1<br />
                            XXXXXX2<br />
                            XXXXXX3<br />
                            XXXXXX4
                        </Table.Cell>
                    </Table.Row>
                )}
                <Table.Row>
                    <Table.Header scope="row">상단 고정 사용여부</Table.Header>
                    <Table.Cell>사용</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header scope="row">출처 사용여부</Table.Header>
                    <Table.Cell>사용</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header scope="row">사용자 익명 여부</Table.Header>
                    <Table.Cell>사용</Table.Cell>
                </Table.Row>
                {isMobile ? (
                    <>
                        <Table.Row>
                            <Table.Header scope="row">공개여부 사용여부</Table.Header>
                            <Table.Cell>사용</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header scope="row">게시물 표시 제한</Table.Header>
                            <Table.Cell>작성자의 게시물만</Table.Cell>
                        </Table.Row>
                    </>
                ) : (
                    <Table.Row>
                        <Table.Header scope="row">공개여부 사용여부</Table.Header>
                        <Table.Cell>사용</Table.Cell>
                        <Table.Header scope="row">게시물 표시 제한</Table.Header>
                        <Table.Cell>작성자의 게시물만</Table.Cell>
                    </Table.Row>
                )}
                {isMobile ? (
                    <>
                        <Table.Row>
                            <Table.Header scope="row">첨부파일 사용여부</Table.Header>
                            <Table.Cell>사용</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header scope="row">첨부파일 가능개수</Table.Header>
                            <Table.Cell>99 사이즈 제한 99MB</Table.Cell>
                        </Table.Row>
                    </>
                ) : (
                    <Table.Row>
                        <Table.Header scope="row">첨부파일 사용여부</Table.Header>
                        <Table.Cell>사용</Table.Cell>
                        <Table.Header scope="row">첨부파일 가능개수</Table.Header>
                        <Table.Cell>99 사이즈 제한 99MB</Table.Cell>
                    </Table.Row>
                )}
                {isMobile ? (
                    <>
                        <Table.Row>
                            <Table.Header scope="row">등록 제한</Table.Header>
                            <Table.Cell>담당자</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header scope="row">답글 제한</Table.Header>
                            <Table.Cell>담당자</Table.Cell>
                        </Table.Row>
                    </>
                ) : (
                    <Table.Row>
                        <Table.Header scope="row">등록 제한</Table.Header>
                        <Table.Cell>담당자</Table.Cell>
                        <Table.Header scope="row">답글 제한</Table.Header>
                        <Table.Cell>담당자</Table.Cell>
                    </Table.Row>
                )}
                <Table.Row>
                    <Table.Header scope="row">파일  업로드 제한</Table.Header>
                    <Table.Cell colSpan={isMobile ? 1 : 3}>담당자</Table.Cell>
                </Table.Row>
                {isMobile ? (
                    <>
                        <Table.Row>
                            <Table.Header scope="row">수정자</Table.Header>
                            <Table.Cell>홍길동(test1)</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header scope="row">최종 수정일</Table.Header>
                            <Table.Cell>YYYY-MM-DD</Table.Cell>
                        </Table.Row>
                    </>
                ) : (
                    <Table.Row>
                        <Table.Header scope="row">수정자</Table.Header>
                        <Table.Cell>홍길동(test1)</Table.Cell>
                        <Table.Header scope="row">최종 수정일</Table.Header>
                        <Table.Cell>YYYY-MM-DD</Table.Cell>
                    </Table.Row>
                )}
                {isMobile ? (
                    <>
                        <Table.Row>
                            <Table.Header scope="row">등록자</Table.Header>
                            <Table.Cell>홍길동(test1)</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header scope="row">등록일</Table.Header>
                            <Table.Cell>YYYY-MM-DD</Table.Cell>
                        </Table.Row>
                    </>
                ) : (
                    <Table.Row>
                        <Table.Header scope="row">등록자</Table.Header>
                        <Table.Cell>홍길동(test1)</Table.Cell>
                        <Table.Header scope="row">등록일</Table.Header>
                        <Table.Cell>YYYY-MM-DD</Table.Cell>
                    </Table.Row>
                )}
            </Table>

            <Layout.Row justify="end" gap={8}>
                <Button variant="outlined" size={isMobile ? "md" : "lg"}>목록</Button>
                <Button size={isMobile ? "md" : "lg"} onClick={() => { }}>수정</Button>
            </Layout.Row>

        </Layout>
    );
}

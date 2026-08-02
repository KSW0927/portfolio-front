import { useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Button, DatePicker, DateRangePicker, Dropdown, FileUploader, Icon, Input, Layout, RadioButton, Table, Textarea, Typography, Space } from "@/publishing/components";

const dummyOptions = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
    { label: "Option 4", value: "4" },
    { label: "Option 5", value: "5" },
];

export function UI_KSP_8192_L() {
    const isMobile = useIsMobile();
    const [radioSelected, setRadioSelected] = useState("radio1");

    return (
        <Layout title="방선동승 결과보고서 등록/수정" favorite={false} activeMenuId="">

            {/* Form Table */}
            <Table variant="horizontal" caption="방선동승 결과보고서 등록 및 수정 양식">
                <Table.Row>
                    <Table.Header scope="row">보고서 제목</Table.Header>
                    <Table.Cell >
                        <Input placeholder="제목을 입력해 주세요." fullWidth />
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header scope="row">첨부파일</Table.Header>
                    <Table.Cell>
                        <FileUploader />
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header scope="row">의견</Table.Header>
                    <Table.Cell >
                        <Textarea placeholder="의견을 작성해 주세요." fullWidth />
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header scope="row">선명</Table.Header>
                    <Table.Cell >
                        <Dropdown options={dummyOptions} onChange={() => { }} width={isMobile ? "100%" : 200} />
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header scope="row">방선/동승 목적</Table.Header>
                    <Table.Cell >
                        <Dropdown options={dummyOptions} onChange={() => { }} width={isMobile ? "100%" : 200} />
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header scope="row">상세 목적</Table.Header>
                    <Table.Cell >
                        <Input placeholder="상세 목적을 입력해 주세요." fullWidth />
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header scope="row">방선/동승 기간</Table.Header>
                    <Table.Cell >
                        <DateRangePicker startDate={null} endDate={null} onChange={() => { }} />
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header scope="row">방선/동승 장소</Table.Header>
                    <Table.Cell >
                        <Input placeholder="방선/동승 장소를 입력해 주세요." fullWidth />
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header scope="row">방선/동승자</Table.Header>
                    <Table.Cell>
                        <Space layout="vertical" size="lg">
                            <Space.Item layout={isMobile ? "vertical" : "horizontal"} align="start" size={10}>
                                <Dropdown options={dummyOptions} onChange={() => { }} width={isMobile ? "100%" : 200} />
                                <Dropdown options={dummyOptions} onChange={() => { }} width={isMobile ? "100%" : 200} />
                                <Dropdown options={dummyOptions} onChange={() => { }} width={isMobile ? "100%" : 200} />
                                <Button size="sm">담당자 추가</Button>
                            </Space.Item>

                            <Space.Item size={14}>
                                <Typography variant="body-lg" secondary>홍길동 (A11111)</Typography>
                                <Button variant="outlined">삭제</Button>
                            </Space.Item>
                            <Space.Item size={14}>
                                <Typography variant="body-lg" secondary>홍길동 (A11111)</Typography>
                                <Button variant="outlined">삭제</Button>
                            </Space.Item>
                        </Space>
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header scope="row">책임사관</Table.Header>
                    <Table.Cell>
                        <Space layout="vertical" size="lg">
                            <Space.Item>
                                <Button size="sm">담당자 선택</Button>
                            </Space.Item>

                            <Space.Item size={4}>
                                <Typography variant="body-lg">선장 홍길동 (2024-11-23 승선)</Typography>
                                <Button variant="text" leftIcon={<Icon name="close" size={24} />} title="삭제"></Button>
                            </Space.Item>
                            <Space.Item size={4}>
                                <Typography variant="body-lg">1항사 홍길동 (2024-11-23 승선)</Typography>
                                <Button variant="text" leftIcon={<Icon name="close" size={24} />} title="삭제"></Button>
                            </Space.Item>
                            <Space.Item size={4}>
                                <Typography variant="body-lg">1항사 홍길동 (2024-11-23 승선)</Typography>
                                <Button variant="text" leftIcon={<Icon name="close" size={24} />} title="삭제"></Button>
                            </Space.Item>
                            <Space.Item size={4}>
                                <Typography variant="body-lg">기관장 홍길동 (2024-11-23 승선)</Typography>
                                <Button variant="text" leftIcon={<Icon name="close" size={24} />} title="삭제"></Button>
                            </Space.Item>
                            <Space.Item size={4}>
                                <Typography variant="body-lg">1항사 홍길동 (2024-11-23 승선)</Typography>
                                <Button variant="text" leftIcon={<Icon name="close" size={24} />} title="삭제"></Button>
                            </Space.Item>
                        </Space>
                    </Table.Cell>
                </Table.Row>
            </Table>

            {/* Form Table */}
            <Table variant="horizontal" caption="방선동승 결과보고서 등록 및 수정 양식">
                <Table.Row>
                    <Table.Header scope="row">보고서 목적 선택</Table.Header>
                    <Table.Cell>
                        <Space size={24}>
                            <RadioButton name="radioGroup1" label="방선 및 동승 보고서" value="radio1" checked={radioSelected === "radio1"} onChange={() => setRadioSelected("radio1")} />
                            <RadioButton name="radioGroup1" label="CEO & Senior leafer visit" value="radio2" checked={radioSelected === "radio2"} onChange={() => setRadioSelected("radio2")} />
                        </Space>
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header scope="row">Best Practice</Table.Header>
                    <Table.Cell>
                        <Button variant="filled" size="sm">추가</Button>
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header scope="row">식별사항</Table.Header>
                    <Table.Cell>
                        <Button variant="filled" size="sm">추가</Button>
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header scope="row">이전 인계사항</Table.Header>
                    <Table.Cell>
                        <Button variant="filled" size="sm" disabled>추가</Button>
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell colSpan={2}>
                        <Layout.Row layout="vertical" gap={10}>
                            <Table variant="horizontal" caption="이전 인계사항 입력 양식">
                                <Table.Row>
                                    <Table.Header scope="row">제목</Table.Header>
                                    <Table.Cell colSpan={3}>
                                        <Input value="중요장비 결함사항(1~8) 차리 D.D 시 수리 결과 확인" fullWidth disabled />
                                    </Table.Cell>
                                </Table.Row>
                                {isMobile ? (
                                    <>
                                        <Table.Row>
                                            <Table.Header scope="row">인계일자(인계자)</Table.Header>
                                            <Table.Cell colSpan={3}>
                                                <Input value="2025-05-09 (홍길동 A12345)" fullWidth disabled />
                                            </Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Header scope="row">구분</Table.Header>
                                            <Table.Cell colSpan={3}>
                                                <Input value="선택 확인" fullWidth disabled />
                                            </Table.Cell>
                                        </Table.Row>
                                    </>
                                ) : (
                                    <Table.Row>
                                        <Table.Header scope="row">인계일자(인계자)</Table.Header>
                                        <Table.Cell colSpan={3}>
                                            <Input value="2025-05-09 (홍길동 A12345)" fullWidth disabled />
                                        </Table.Cell>
                                        <Table.Header scope="row">구분</Table.Header>
                                        <Table.Cell colSpan={3}>
                                            <Input value="선택 확인" fullWidth disabled />
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                                {isMobile ? (
                                    <>
                                        <Table.Row>
                                            <Table.Header scope="row">상태</Table.Header>
                                            <Table.Cell colSpan={3}>
                                                <Input value="진행" disabled />
                                                <Dropdown options={dummyOptions} onChange={() => { }} fullWidth menuPortal />
                                            </Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Header scope="row">인계부서</Table.Header>
                                            <Table.Cell colSpan={3}>
                                                <Dropdown options={dummyOptions} onChange={() => { }} fullWidth menuPortal />
                                            </Table.Cell>
                                        </Table.Row>
                                    </>
                                ) : (
                                    <Table.Row>
                                        <Table.Header scope="row">상태</Table.Header>
                                        <Table.Cell colSpan={3}>
                                            <Input value="진행" disabled />
                                            <Dropdown options={dummyOptions} onChange={() => { }} menuPortal />
                                        </Table.Cell>
                                        <Table.Header scope="row">인계부서</Table.Header>
                                        <Table.Cell colSpan={3}>
                                            <Dropdown options={dummyOptions} onChange={() => { }} menuPortal />
                                        </Table.Cell>
                                    </Table.Row>
                                )}

                                <Table.Row>
                                    <Table.Header scope="row">
                                        <Button variant="outlined" size="sm">삭제</Button>
                                    </Table.Header>
                                    <Table.Cell>
                                        에디터 영역입니다.
                                    </Table.Cell>
                                </Table.Row>
                            </Table>

                            <Layout.Col align="center">
                                <Button variant="filled" size="sm">추가</Button>
                            </Layout.Col>
                        </Layout.Row>
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header scope="row">다음 인계사항</Table.Header>
                    <Table.Cell>
                        <Button variant="filled" size="sm">추가</Button>
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header scope="row">면담사항</Table.Header>
                    <Table.Cell>
                        <Button variant="filled" size="sm" disabled>추가</Button>
                        <Typography variant="body-lg" as={isMobile ? "p" : "span"} secondary>* 면담사항은 MC(해상인사팀) 필수 입력 사항입니다.</Typography>
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell colSpan={2}>
                        <Layout.Row layout="vertical" gap={10}>
                            <Table variant="horizontal" caption="면담사항 입력 양식">
                                {isMobile ? (
                                    <>
                                        <Table.Row>
                                            <Table.Header scope="row">피면담자</Table.Header>
                                            <Table.Cell>
                                                <Input value="갑판장 홍길동 (2024-01-01 승선)" fullWidth disabled />
                                            </Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Header scope="row">면담일자</Table.Header>
                                            <Table.Cell>
                                                <DatePicker selected={null} onChange={() => { }} fullWidth />
                                            </Table.Cell>
                                        </Table.Row>
                                    </>
                                ) : (
                                    <Table.Row>
                                        <Table.Header scope="row">피면담자</Table.Header>
                                        <Table.Cell>
                                            <Input value="갑판장 홍길동 (2024-01-01 승선)" fullWidth disabled />
                                        </Table.Cell>
                                        <Table.Header scope="row">면담일자</Table.Header>
                                        <Table.Cell>
                                            <DatePicker selected={null} onChange={() => { }} />
                                        </Table.Cell>
                                    </Table.Row>
                                )}

                                <Table.Row>
                                    <Table.Header scope="row">
                                    </Table.Header>
                                    <Table.Cell>
                                        에디터 영역입니다.
                                    </Table.Cell>
                                </Table.Row>
                            </Table>

                            <Layout.Col align="center">
                                <Button variant="filled" size="sm">추가</Button>
                            </Layout.Col>
                        </Layout.Row>
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header scope="row">안전보건 면담사항</Table.Header>
                    <Table.Cell>
                        <Button variant="filled" size="sm" disabled>추가</Button>
                        <Typography variant="body-lg" as={isMobile ? "p" : "span"} secondary>* 안전보건 면담사항은 안전보건 경영팀의 입력 사항입니다.</Typography>
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell colSpan={2}>
                        <Layout.Row layout="vertical" gap={10}>
                            <Table variant="horizontal" caption="면담사항 입력 양식">
                                {isMobile ? (
                                    <>
                                        <Table.Row>
                                            <Table.Header scope="row">피면담자</Table.Header>
                                            <Table.Cell>
                                                <Input value="갑판장 홍길동 (2024-01-01 승선)" fullWidth disabled />
                                            </Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Header scope="row">면담일자</Table.Header>
                                            <Table.Cell>
                                                <DatePicker selected={null} onChange={() => { }} />
                                            </Table.Cell>
                                        </Table.Row>
                                    </>
                                ) : (
                                    <Table.Row>
                                        <Table.Header scope="row">피면담자</Table.Header>
                                        <Table.Cell>
                                            <Input value="갑판장 홍길동 (2024-01-01 승선)" fullWidth disabled />
                                        </Table.Cell>
                                        <Table.Header scope="row">면담일자</Table.Header>
                                        <Table.Cell>
                                            <DatePicker selected={null} onChange={() => { }} />
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                                <Table.Row>
                                    <Table.Header scope="row">
                                    </Table.Header>
                                    <Table.Cell>
                                        에디터 영역입니다.
                                    </Table.Cell>
                                </Table.Row>
                            </Table>

                            <Layout.Col align="center">
                                <Button variant="filled" size="sm">추가</Button>
                            </Layout.Col>
                        </Layout.Row>
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header scope="row">기타</Table.Header>
                    <Table.Cell>
                        에디터 영역입니다.
                    </Table.Cell>
                </Table.Row>
            </Table>

            <Layout.Row justify="end" gap={8}>
                <Button variant="outlined" size={isMobile ? "md" : "lg"}>목록</Button>
                <Button variant="outlined" size={isMobile ? "md" : "lg"}>임시저장</Button>
                <Button variant="filled" size={isMobile ? "md" : "lg"}>전자결제</Button>
                <Button size={isMobile ? "md" : "lg"} onClick={() => { }}>저장</Button>
            </Layout.Row>
        </Layout>
    );
}

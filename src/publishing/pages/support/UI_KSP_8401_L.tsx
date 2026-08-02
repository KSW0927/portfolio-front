import { useState } from "react";
import { Box, Collapse, Layout, Typography } from "@/publishing/components";

export function UI_KSP_8401_L() {
    const [openAccordionId, setOpenAccordionId] = useState<number | null>(null);

    const handleAccordionToggle = (id: number) => {
        setOpenAccordionId((prev) => (prev === id ? null : id));
    };


    return (
        <>
            <Layout title="FAQ" activeMenuId="">
                <Collapse.Group className="faq">
                    <Collapse
                        title="휴양시설 이용신청 자격 및 최대 숙박 기간은 어떻게 되나요?"
                        isOpen={openAccordionId === 1}
                        onToggle={() => handleAccordionToggle(1)}
                    >
                        <Box variant="info">
                            <Typography variant="body-md">
                                회사에서 운영하는 모든 휴양시설은 KSS해운 임·직원은 누구나 사용할 수 있습니다.<br />
                                이외, 임·직원의 배우자, 직계존비속, 배우자의 부모에 한하여 임·직원 동행 없이도 이용할 수 있습니다.<br />
                                (단, 미혼 직원에 한하여 형제 자매 이용가능.)<br />
                                휴양시설 이용기간은 최대 3박 4일을 원칙으로 하고 있으나, 이용신청 상황에 따라 조정할 수 있습니다.
                            </Typography>
                        </Box>
                    </Collapse>
                    <Collapse
                        title="휴양시설별 적정인원은 어떻게 되나요?"
                        isOpen={openAccordionId === 2}
                        onToggle={() => handleAccordionToggle(2)}
                    >
                        <Box variant="info">
                            <Typography variant="body-md">
                                설명글이 들어갑니다.
                            </Typography>
                        </Box>
                    </Collapse>
                    <Collapse
                        title="휴양시설 운영관리 및 입퇴실 시간은 어떻게 되나요?"
                        isOpen={openAccordionId === 3}
                        onToggle={() => handleAccordionToggle(3)}
                    >
                        <Box variant="info">
                            <Typography variant="body-md">
                                설명글이 들어갑니다.
                            </Typography>
                        </Box>
                    </Collapse>
                    <Collapse
                        title="휴양시설 이용 후 침구류는 어떻게 정리/관리하나요?"
                        isOpen={openAccordionId === 4}
                        onToggle={() => handleAccordionToggle(4)}
                    >
                        <Box variant="info">
                            <Typography variant="body-md">
                                설명글이 들어갑니다.
                            </Typography>
                        </Box>
                    </Collapse>
                </Collapse.Group>
            </Layout>
        </>
    );
}
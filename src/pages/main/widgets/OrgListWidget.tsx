import { useIsDark } from "@/hooks/useIsDark";
import { Button, Card, Divider, Dropdown, Icon, Layout, Space, Typography } from "@/components";
import type { WidgetCardProps } from "@/types/types.ts";


const ORG_LIST = [
    { id: 1, profileImage: "/src/assets/img/temp/temp_profile.png", name: "홍길동", team: "ESG경영팀", email: "asdfg@kss.kr" },
    { id: 2, profileImage: "/src/assets/img/temp/temp_profile-2.png", name: "김해운", team: "ESG경영팀", email: "asdfg@kss.kr" },
    { id: 3, profileImage: "/src/assets/img/temp/temp_profile.png", name: "홍길동", team: "ESG경영팀", email: "asdfg@kss.kr" },
    { id: 4, profileImage: "/src/assets/img/temp/temp_profile-2.png", name: "김해운", team: "ESG경영팀", email: "asdfg@kss.kr" },
    { id: 5, profileImage: "/src/assets/img/temp/temp_profile.png", name: "홍길동", team: "ESG경영팀", email: "asdfg@kss.kr" },
    { id: 6, profileImage: "/src/assets/img/temp/temp_profile-2.png", name: "김해운", team: "ESG경영팀", email: "asdfg@kss.kr" },
    { id: 7, profileImage: "/src/assets/img/temp/temp_profile.png", name: "홍길동", team: "ESG경영팀", email: "asdfg@kss.kr" },
];


/**
 * 조직도 위젯 컴포넌트
 * @description
 */
export const OrgListWidget = (props: WidgetCardProps) => {
    const { activeKebabId, widget, changeActiveKebab, changeHide, changeExpand } = props;
    const isDark = useIsDark();
    const isKebabOpen = activeKebabId === widget.id;


    /* 상태 정의 */


    /* 이벤트 정의 */



    return (
        <>
            <Card.Header
                leftIcon={<Icon name="organization" size={20} />}
                extra={
                    <Space size="sm">
                        <Dropdown
                            size="md" width={110}
                            options={[{ label: "경영관리팀", value: "1" }, { label: "자금팀", value: "2" }, { label: "회계팀", value: "3" }]}
                            value="1"
                        />
                        <div style={{ position: "relative" }}>
                            <Button
                                variant="text" leftIcon={<Icon name="kebab" size={20} />}
                                className={`button-widget-settings ${isDark && "-invert"}`} rounded
                                aria-label="위젯 설정"
                                aria-haspopup="true"
                                aria-expanded={isKebabOpen}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    changeActiveKebab(isKebabOpen ? null : widget.id);
                                }}
                            />

                            {isKebabOpen && (
                                <div className="widget-setting-popup">
                                    <button onClick={(e) => { e.stopPropagation(); changeHide(widget.id); }}>
                                        위젯 삭제
                                    </button>
                                    <button onClick={(e) => { e.stopPropagation(); changeExpand(widget.id); }}>
                                        {widget.size === "sm" ? "위젯 확대" : "위젯 축소"}
                                    </button>
                                </div>
                            )}
                        </div>
                    </Space>
                }
            >
                <Button variant="text" rightIcon={<Icon name="arrow-right" size={18} />}>
                    <Typography variant="heading-sm" color={isDark ? "var(--dash-text-primary)" : ""}>조직도</Typography>
                </Button>
            </Card.Header>

            <Card.Body>
                <div className="widget-org-list-content">
                    <ul>
                        {ORG_LIST.map((item) => (
                            <li
                                key={`${item.id}`} role="button"
                                tabIndex={0}
                                onClick={() => { }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        // DEV: onClick과 동일한 로직 실행 추가 필요 - 웹접근성
                                    }
                                }}
                            >
                                <Layout.Row justify="space-between" align="center">
                                    <Layout.Col layout="horizontal" align="center" gap={14}>
                                        <div className="avatar">
                                            <img
                                                src={item.profileImage}
                                                alt={item.name}
                                            />
                                        </div>

                                        <Space layout="vertical" size={4}>
                                            <Typography variant="body-lg" weight="semibold" color={isDark ? "var(--dash-text-primary)" : ""}>{item.name}</Typography>

                                            <Space size={8} separator={<Divider layout="vertical" variant="dashed" size={10} color="var(--dash-text-tertiary)" />}>
                                                <Space size={4}>
                                                    <Icon name="user" size={18} color="var(--dash-text-tertiary)" />
                                                    <Typography variant="body-md" tertiary>{item.team}</Typography>
                                                </Space>

                                                <Space size={4}>
                                                    <Icon name="email" size={18} color="var(--dash-text-tertiary)" />
                                                    <Typography variant="body-md" tertiary>{item.email}</Typography>
                                                </Space>
                                            </Space>
                                        </Space>
                                    </Layout.Col>


                                    <Button
                                        variant="text"
                                        leftIcon={<Icon name="message" size={32} color="var(--dash-text-tertiary)" />}
                                        className="button-message"
                                        aria-label={`${item.name}에게 쪽지 보내기`}
                                        onClick={() => { }}
                                    />
                                </Layout.Row>
                            </li>
                        ))}
                    </ul>
                </div>
            </Card.Body>
        </>
    );
}
OrgListWidget.displayName = 'OrgListWidget';


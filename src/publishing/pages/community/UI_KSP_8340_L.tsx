import { useRef } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Box, Button, Dropdown, Icon, Input, Layout, List, SearchBox, Space, TreeList, type TreeData, type TreeListRef, Typography } from "@/publishing/components";

const dummyOptions = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
    { label: "Option 4", value: "4" },
    { label: "Option 5", value: "5" },
];

interface OrgMember {
    id: string;
    name: string;
    position: string;
    department: string;
    tel: string;
    email: string;
    profileImage?: string;
}

const dummyMembers: OrgMember[] = Array.from({ length: 20 }).map((_, idx) => ({
    id: `member-${idx + 1}`,
    name: "홍길동",
    position: "팀장",
    department: "ESG경영팀",
    tel: "02-123-456",
    email: "kss.hw@kss.kr",
}));

export function UI_KSP_8340_L() {
    const isMobile = useIsMobile();
    const treeRef = useRef<TreeListRef>(null);

    /** 좌측 사이드바 트리 컴포넌트용 초기 데이터 */
    const sampleTreeData: TreeData[] = [
        {
            id: "1",
            title: "이사회",
            children: []
        },
        {
            id: "2",
            title: "사장",
            children: [
                {
                    id: "2-1",
                    title: "안전보건환경품질위원회",
                    children: [
                        { id: "2-1-1", title: "안전보건경영팀" },
                    ]
                },
                {
                    id: "2-2",
                    title: "안전관리책임자",
                    children: [
                        {
                            id: "2-2-1",
                            title: "선박",
                            children: [
                                { id: "2-2-1-1", title: "가스선대" },
                                { id: "2-2-1-2", title: "탱커선대" },
                                { id: "2-2-1-3", title: "케미칼선대" },
                            ]
                        },
                        {
                            id: "2-2-2",
                            title: "경영지원본부",
                            children: [
                                { id: "2-2-2-1", title: "경영관리팀" },
                                { id: "2-2-2-2", title: "자금팀" },
                                { id: "2-2-2-3", title: "회계팀" },
                            ]
                        },
                        {
                            id: "2-2-3",
                            title: "영업본부",
                            children: [
                                { id: "2-2-3-1", title: "가스팀" },
                                { id: "2-2-3-2", title: "탱커팀" },
                                { id: "2-2-3-3", title: "케미칼팀" },
                            ]
                        },
                        {
                            id: "2-2-4",
                            title: "기획관리본부",
                            children: [
                                { id: "2-2-4-1", title: "기획전략팀" },
                                { id: "2-2-4-2", title: "ESG 경영팀" },
                            ]
                        },
                        {
                            id: "2-2-5",
                            title: "해사운영본부",
                            children: [
                                { id: "2-2-5-1", title: "해상인사팀" },
                                { id: "2-2-5-2", title: "해사기획팀" },
                                { id: "2-2-5-3", title: "정보기술팀" },
                                { id: "2-2-5-4", title: "해사업무팀" },
                            ]
                        },
                        {
                            id: "2-2-6",
                            title: "해사관리본부",
                            children: [
                                { id: "2-2-6-1", title: "선박관리1팀" },
                                { id: "2-2-6-2", title: "선박관리2팀" },
                                { id: "2-2-6-3", title: "안전품질1팀" },
                                { id: "2-2-6-4", title: "안전품질2팀" },
                            ]
                        },
                        { id: "2-2-7", title: "비상계획부", },
                        { id: "2-2-8", title: "동경사무소", },
                        { id: "2-2-9", title: "싱가포르지사", },
                    ]
                }
            ]
        },
        {
            id: "3",
            title: "감사위원회",
            children: [{ id: "3-1", title: "내부회계관리팀", }]
        }
    ];

    return (
        <Layout title="조직 현황" activeMenuId="">

            {/* SearchBox */}
            <SearchBox>
                <SearchBox.Content>
                    <SearchBox.Row>
                        <SearchBox.Item width={isMobile ? "100%" : 140}>
                            <Dropdown label="부서" options={dummyOptions} fullWidth />
                        </SearchBox.Item>
                        <SearchBox.Item width={isMobile ? "100%" : 380}>
                            <Input label="검색" placeholder="내선번호, 연락처, 이메일을 검색하세요." leftIcon={<Icon name="search" size={20} color="#999" />} fullWidth />
                        </SearchBox.Item>
                    </SearchBox.Row>
                </SearchBox.Content>

                <SearchBox.Actions>
                    <Button variant="text" color="primary" className="button-reset" leftIcon={<Icon name="reset" size={18} style={{ color: "#005AAA" }} />} size={isMobile ? "lg" : "md"}>초기화</Button>
                    <Button variant="solid" className="button-search" size={isMobile ? "sm" : "md"}>검색</Button>
                </SearchBox.Actions>
            </SearchBox>

            <Box className={isMobile ? "-square" : ""}>
                <Layout.Row layout={isMobile ? "vertical" : "horizontal"} >
                    {/* Tree List */}
                    <TreeList.Sidebar
                        mobileButtonText="조직선택"
                        title="KSS해운"
                    >
                        <TreeList
                            ref={treeRef}
                            treeId="budget-tree"
                            initData={sampleTreeData}
                            onSelectItems={(items) => console.log("Selected:", items)}
                        />
                    </TreeList.Sidebar>

                    <Layout.Col gap={isMobile ? 8 : 14}>
                        <Layout.Row justify="space-between">
                            <Typography variant="heading-sm">경영관리팀</Typography>
                            <div className="data-grid-total">
                                <Typography variant={isMobile ? "body-md" : "body-lg"} weight={isMobile ? "semibold" : "medium"} as="span" color="#000">총 </Typography>
                                <Typography variant={isMobile ? "body-md" : "body-lg"} weight="semibold" as="strong" primary>00건</Typography>
                            </div>
                        </Layout.Row>

                        {/* 조직 리스트 */}
                        <div className="org-list">
                            {!isMobile &&
                                <div className="org-list-header">
                                    <div className="org-list-col -profile">프로필</div>
                                    <div className="org-list-col">직급</div>
                                    <div className="org-list-col">부서</div>
                                    <div className="org-list-col">전화번호</div>
                                    <div className="org-list-col">이메일</div>
                                    <div className="org-list-col -action">쪽지</div>
                                </div>
                            }

                            <ul className="org-list-body">
                                {isMobile ? (
                                    dummyMembers.map((member) => (
                                        <li key={member.id} className="org-list-item">
                                            <Space align="start">
                                                <Space.Item>
                                                    {/* 프로필 */}
                                                    <div className="org-list-col -profile">
                                                        <div className="org-list-avatar">
                                                            <img
                                                                src={member.profileImage ?? "/src/assets/img/temp/temp_profile.png"}
                                                                alt={member.name}
                                                            />
                                                        </div>
                                                    </div>
                                                </Space.Item>
                                                <Space.Item>
                                                    <Space layout="vertical" size={12}>
                                                        <Space size="sm">
                                                            {/* 이름 */}
                                                            <Typography variant="body-lg" weight="semibold">{member.name}</Typography>
                                                            {/* 직급 */}
                                                            <Typography variant="body-lg" secondary>{member.position}</Typography>
                                                        </Space>

                                                        <List size="sm" gap={4}>
                                                            <List.Item label="부서" labelWidth={48} labelColor="#666666">{member.department}</List.Item>
                                                            <List.Item label="내선" labelWidth={48} labelColor="#666666">{member.tel}</List.Item>
                                                            <List.Item label="이메일" labelWidth={48} labelColor="#666666">{member.email}</List.Item>
                                                        </List>
                                                    </Space>
                                                </Space.Item>

                                                {/* 쪽지 버튼 */}
                                                <Button
                                                    variant="text"
                                                    leftIcon={<Icon name="message" size={32} color="#999" />}
                                                    className="button-message"
                                                    aria-label={`${member.name}에게 쪽지 보내기`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        console.log("쪽지:", member);
                                                    }}
                                                />
                                            </Space>
                                        </li>
                                    ))
                                ) : (
                                    dummyMembers.map((member) => (
                                        <li key={member.id} className="org-list-item">
                                            {/* 프로필 */}
                                            <div className="org-list-col -profile">
                                                <div className="org-list-avatar">
                                                    <img
                                                        src={member.profileImage ?? "/src/assets/img/temp/temp_profile.png"}
                                                        alt={member.name}
                                                    />
                                                </div>
                                                <span className="org-list-name">{member.name}</span>
                                            </div>

                                            {/* 직급 */}
                                            <div className="org-list-col">{member.position}</div>

                                            {/* 부서 */}
                                            <div className="org-list-col">{member.department}</div>

                                            {/* 전화번호 */}
                                            <div className="org-list-col">{member.tel}</div>

                                            {/* 이메일 */}
                                            <div className="org-list-col">{member.email}</div>

                                            {/* 쪽지 버튼 */}
                                            <div className="org-list-col -action">
                                                <Button
                                                    variant="text"
                                                    leftIcon={<Icon name="message" size={32} color="#999" />}
                                                    className="button-message"
                                                    aria-label={`${member.name}에게 쪽지 보내기`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        console.log("쪽지:", member);
                                                    }}
                                                />
                                            </div>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                    </Layout.Col>
                </Layout.Row >
            </Box >
        </Layout >
    );
}
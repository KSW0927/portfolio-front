import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Box, Button, DataGrid, Divider, Icon, Layout, List, Tab, Typography } from "@/publishing/components";

interface ContactRow {
    _id: string;
    _level: number;
    _hasChildren: boolean;
    _parentId?: string;
    dept: string;
    pos: string;
    name: string;
    tel: string;
    mobile: string;
    home: string;
    email: string;
}

type RawRow = Omit<ContactRow, "_id" | "_level" | "_hasChildren" | "_parentId"> & { children?: RawRow[] };

const rawData: RawRow[] = [
    { dept: "사장(CEO)", pos: "사장(CEO)", name: "박찬도(C.D.PARK)", tel: "02-123-4567", mobile: "010-1234-5678", home: "02-123-4567", email: "cdpark@kssline.com" },
    { dept: "기획관리본부(Planning Division)", pos: "총괄임원(G.Manager)", name: "홍길동(Y.J.SEO)", tel: "02-123-4567", mobile: "010-1234-5678", home: "02-123-4567", email: "yjseo@kssline.com" },
    { dept: "기획관리본부(Planning Division)", pos: "본부장(Head of Div.)", name: "홍길동(M.H.LEE)", tel: "02-123-4567", mobile: "010-1234-5678", home: "-", email: "mhlee@kssline.com" },
    {
        dept: "기획관리본부(Planning Division)", pos: "기획전략팀장(SP Leader)", name: "홍길동(S.M.OK)", tel: "02-123-4567", mobile: "010-1234-5678", home: "010-8809-1167", email: "yjseo@kssline.com",
        children: [
            { dept: "기획관리본부(Planning Division)", pos: "팀원(Team Member)", name: "홍길동(H.S.JOO)", tel: "02-123-4567", mobile: "010-1234-5678", home: "-", email: "dyseo@kssline.com" },
            { dept: "기획관리본부(Planning Division)", pos: "팀원(Team Member)", name: "홍길동(H.CHO)", tel: "02-123-4567", mobile: "010-1234-5678", home: "-", email: "dyseo@kssline.com" },
        ],
    },
];

function flattenRows(data: RawRow[], level = 0, parentId?: string): ContactRow[] {
    return data.flatMap(({ children, ...rest }, idx) => {
        const id = parentId ? `${parentId}-${idx}` : `${idx}`;
        return [
            { ...rest, _id: id, _level: level, _hasChildren: !!children?.length, _parentId: parentId },
            ...flattenRows(children ?? [], level + 1, id),
        ];
    });
}

const flatData = flattenRows(rawData);

interface TreeContextValue {
    expandedIds: Set<string>;
    toggleExpand: (id: string) => void;
}

const TreeContext = createContext<TreeContextValue>({ expandedIds: new Set(), toggleExpand: () => { } });

const PosCellRenderer = ({ value, data }: ICellRendererParams<ContactRow>) => {
    const { expandedIds, toggleExpand } = useContext(TreeContext);
    const hasChildren = data?._hasChildren;
    const id = data?._id ?? "";
    const isExpanded = expandedIds.has(id);

    const isChild = !!data?._parentId;

    return (
        <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            {hasChildren && (
                <button
                    type="button"
                    onClick={() => toggleExpand(id)}
                    style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", flexShrink: 0 }}
                    aria-label={isExpanded ? "접기" : "펼치기"}
                    aria-expanded={isExpanded}
                >
                    <Icon name={isExpanded ? "tree-view-minus" : "tree-view-plus"} size={24} />
                </button>
            )}
            {isChild && <Icon name="expandable-list" size={18} style={{ flexShrink: 0 }} />}
            {value}
        </span>
    );
};

const tableColumns: ColDef[] = [
    { headerName: "본부", field: "dept", minWidth: 200 },
    { headerName: "직책", field: "pos", minWidth: 200, cellRenderer: PosCellRenderer },
    { headerName: "성명", field: "name", minWidth: 150 },
    { headerName: "전화번호", field: "tel", minWidth: 150 },
    { headerName: "휴대전화", field: "mobile", minWidth: 150 },
    { headerName: "자택", field: "home", minWidth: 130 },
    { headerName: "이메일", field: "email", minWidth: 200 },
];

export function UI_KSP_8350_L() {
    const isMobile = useIsMobile();
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
    const [activeTab, setActiveTab] = useState<string | number>("tab1");

    const toggleExpand = useCallback((id: string) => {
        setExpandedIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    }, []);

    const visibleData = useMemo(
        () => flatData.filter(row => !row._parentId || expandedIds.has(row._parentId)),
        [expandedIds]
    );

    const treeContextValue = useMemo(() => ({ expandedIds, toggleExpand }), [expandedIds, toggleExpand]);

    return (
        <TreeContext.Provider value={treeContextValue}>
            <Layout title="비상연락망" activeMenuId="">

                <Layout.Row>
                    <Tab variant="chip" value={activeTab} onChange={(val) => setActiveTab(val as string)}>
                        <Tab.Item value="tab1">본사</Tab.Item>
                        <Tab.Item value="tab2">부산 사무소</Tab.Item>
                        <Tab.Item value="tab3">싱가포르 사무소</Tab.Item>
                        <Tab.Item value="tab4">동경 사무소</Tab.Item>
                        <Tab.Item value="tab4">VESSEL</Tab.Item>
                    </Tab>
                </Layout.Row>

                <Layout.Row layout="vertical" gap={14} style={{ alignItems: "flex-end" }}>
                    {/* Information */}
                    <Button variant="solid">내용 수정</Button>
                    <Box variant="info" size="lg">
                        <List layout={isMobile ? "vertical" : "horizontal"} gap={24}>
                            <List.Item
                                icon={<Icon name="call" size={24} color="#FFF" style={{ backgroundColor: "#003261", borderRadius: "50%", padding: "0.6rem", boxSizing: "content-box" }} />}
                                label={<Typography variant="body-lg" weight="semibold">초기 비상연락처</Typography>}
                                columnGap={11}
                            >
                                <Typography variant="heading-xs" primary>+82 505 - 224 - 2244</Typography>
                            </List.Item>
                            <List.Item
                                icon={<Icon name="siren" size={24} color="#FFF" style={{ backgroundColor: "#003261", borderRadius: "50%", padding: "0.6rem", boxSizing: "content-box" }} />}
                                label={<Typography variant="body-lg" weight="semibold">비상대응실</Typography>}
                                columnGap={11}
                            >
                                <Typography variant="heading-xs" primary>+ 82 51 - 600  -2942, 2943</Typography>
                            </List.Item>
                        </List>

                        <Divider spacing={24} />

                        <List gap={8}>
                            <List.Item bullet label={<Typography variant="body-lg" weight="semibold" secondary>대표</Typography>} columnGap={8}>
                                <Typography variant="body-lg" weight="semibold" as="span">02-3702-2700</Typography>
                                <Typography variant="body-lg" as="span" tertiary> (DIR : 02-3702-2내선번호)</Typography>
                            </List.Item>
                            <List.Item bullet label={<Typography variant="body-lg" weight="semibold" secondary>팩스</Typography>} columnGap={8}>
                                <Typography variant="body-lg" weight="semibold" as="span">02-733-4103</Typography>
                            </List.Item>
                            <List.Item bullet label={<Typography variant="body-lg" weight="semibold" secondary>텔렉스</Typography>} columnGap={8}>
                                <Typography variant="body-lg" weight="semibold" as="span">ksstelex@kssline.com</Typography>
                            </List.Item>
                            <List.Item bullet label={<Typography variant="body-lg" weight="semibold" secondary>E-mail(KSS)</Typography>} columnGap={8}>
                                <Typography variant="body-lg" weight="semibold" as="span">개인ID@kssline.com</Typography>
                                <Typography variant="body-lg" as="span" tertiary> (예.사장 cdpark@kssline.com)</Typography>
                            </List.Item>
                            <List.Item bullet label="" showDivider={false}>
                                <Typography variant="body-lg" weight="semibold" as="span">공휴일 등의 경우 총괄 대표전화를 이용할 것</Typography>
                            </List.Item>
                        </List>
                    </Box>
                </Layout.Row>

                {/* Data Grid */}
                <DataGrid
                    columns={tableColumns}
                    rowData={visibleData}
                    totalCount={flatData.length}
                    gridLabel="비상연락망 목록"
                    topRightButtons={<Button variant="solid">연락처 수정</Button>}
                />
            </Layout>
        </TreeContext.Provider>
    );
}

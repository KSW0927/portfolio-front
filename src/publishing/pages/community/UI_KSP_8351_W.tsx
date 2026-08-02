import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { Button, DataGrid, Icon, Input, Layout, Space } from "@/publishing/components";

interface ContactRow {
    _id: string;
    _level: number;
    _hasChildren: boolean;
    _parentId?: string;
    _isNew?: boolean;
    dept: string;
    pos: string;
    koName: string;
    enName: string;
    tel: string;
    mobile: string;
    home: string;
    email: string;
}

type RawRow = Omit<ContactRow, "_id" | "_level" | "_hasChildren" | "_parentId"> & { children?: RawRow[] };

const initialData: RawRow[] = [
    { dept: "사장(CEO)", pos: "사장(CEO)", koName: "박찬도", enName: "C.D.PARK", tel: "02-123-4567", mobile: "010-1234-5678", home: "02-123-4567", email: "cdpark@kssline.com" },
    { dept: "기획관리본부(Planning Division)", pos: "총괄임원(G.Manager)", koName: "홍길동", enName: "Y.J.SEO", tel: "02-123-4567", mobile: "010-1234-5678", home: "02-123-4567", email: "yjseo@kssline.com" },
    { dept: "기획관리본부(Planning Division)", pos: "본부장(Head of Div.)", koName: "홍길동", enName: "M.H.LEE", tel: "02-123-4567", mobile: "010-1234-5678", home: "-", email: "mhlee@kssline.com" },
    {
        dept: "기획관리본부(Planning Division)", pos: "기획전략팀장(SP Leader)", koName: "홍길동", enName: "S.M.OK", tel: "02-123-4567", mobile: "010-1234-5678", home: "010-8809-1167", email: "yjseo@kssline.com",
        children: [
            { dept: "기획관리본부(Planning Division)", pos: "팀원(Team Member)", koName: "홍길동", enName: "H.S.JOO", tel: "02-123-4567", mobile: "010-1234-5678", home: "-", email: "dyseo@kssline.com" },
            { dept: "기획관리본부(Planning Division)", pos: "팀원(Team Member)", koName: "홍길동", enName: "H.CHO", tel: "02-123-4567", mobile: "010-1234-5678", home: "-", email: "dyseo@kssline.com" },
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

interface TreeContextValue {
    expandedIds: Set<string>;
    toggleExpand: (id: string) => void;
    updateRow: (id: string, changes: Partial<ContactRow>) => void;
}

const TreeContext = createContext<TreeContextValue>({ expandedIds: new Set(), toggleExpand: () => { }, updateRow: () => { } });

const PosCellRenderer = ({ value, data }: ICellRendererParams<ContactRow>) => {
    const { expandedIds, toggleExpand, updateRow } = useContext(TreeContext);
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
            <Input value={value ?? ""} onChange={(e) => updateRow(id, { pos: e.target.value })} fullWidth />
        </span>
    );
};


export function UI_KSP_8351_W() {
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
    const [rows, setRows] = useState<ContactRow[]>(() => flattenRows(initialData));

    const updateRow = useCallback((id: string, changes: Partial<ContactRow>) => {
        setRows(prev => prev.map(row => row._id === id ? { ...row, ...changes } : row));
    }, []);

    const deleteRow = useCallback((id: string, parentId: string) => {
        setRows(prev => {
            const filtered = prev.filter(row => row._id !== id);
            const parentHasChildren = filtered.some(row => row._parentId === parentId);
            return filtered.map(row =>
                row._id === parentId ? { ...row, _hasChildren: parentHasChildren } : row
            );
        });
    }, []);

    const deleteParentRow = useCallback((id: string) => {
        setRows(prev => prev.filter(row => row._id !== id && row._parentId !== id));
    }, []);

    const addChildRow = useCallback((parentId: string) => {
        setRows(prev => {
            let insertIdx = -1;
            for (let i = 0; i < prev.length; i++) {
                if (prev[i]._id === parentId || prev[i]._parentId === parentId) {
                    insertIdx = i;
                }
            }
            if (insertIdx === -1) return prev;

            const newChild: ContactRow = {
                _id: `${parentId}-${Date.now()}`,
                _level: 1,
                _hasChildren: false,
                _parentId: parentId,
                dept: "", pos: "", koName: "", enName: "", tel: "", mobile: "", home: "", email: "", _isNew: true,
            };

            const updated = prev.map(row =>
                row._id === parentId ? { ...row, _hasChildren: true } : row
            );
            return [...updated.slice(0, insertIdx + 1), newChild, ...updated.slice(insertIdx + 1)];
        });
        // 부모 자동 펼치기
        setExpandedIds(prev => new Set([...prev, parentId]));
    }, []);

    const tableColumns: ColDef[] = [
        {
            headerName: "",
            colId: "drag",
            rowDrag: (params) => !params.data?._parentId,
            width: 76,
            minWidth: 76,
            maxWidth: 76,
            flex: 0,
            sortable: false,
            resizable: false,
            cellRenderer: ({ data }: ICellRendererParams<ContactRow>) =>
                !data?._parentId ? <Icon name="up-down" size={32} color="#999" /> : null,
        },
        {
            headerName: "본부", field: "dept", minWidth: 300,
            cellRenderer: ({ value, data }: ICellRendererParams<ContactRow>) => {
                return <Input value={value ?? ""} onChange={(e) => updateRow(data!._id, { dept: e.target.value })} fullWidth />;
            },
        },
        {
            headerName: "직책", field: "pos", minWidth: 300,
            cellRenderer: PosCellRenderer,
        },
        {
            headerName: "성명", field: "name", minWidth: 300,
            cellRenderer: ({ data }: ICellRendererParams<ContactRow>) => {
                return (
                    <Space size={4}>
                        <Button size="sm">불러오기</Button>
                        <Input value={data?.koName ?? ""} onChange={(e) => updateRow(data!._id, { koName: e.target.value })} fullWidth />
                        <Input value={data?.enName ?? ""} onChange={(e) => updateRow(data!._id, { enName: e.target.value })} fullWidth />
                    </Space>
                );
            },
        },
        {
            headerName: "전화번호", field: "tel", minWidth: 150,
            cellRenderer: ({ value, data }: ICellRendererParams<ContactRow>) => {
                return <Input value={value ?? ""} onChange={(e) => updateRow(data!._id, { tel: e.target.value })} fullWidth />;
            },
        },
        {
            headerName: "휴대전화", field: "mobile", minWidth: 150,
            cellRenderer: ({ value, data }: ICellRendererParams<ContactRow>) => {
                return <Input value={value ?? ""} onChange={(e) => updateRow(data!._id, { mobile: e.target.value })} fullWidth />;
            },
        },
        {
            headerName: "자택", field: "home", minWidth: 180,
            cellRenderer: ({ value, data }: ICellRendererParams<ContactRow>) => {
                return <Input value={value ?? ""} onChange={(e) => updateRow(data!._id, { home: e.target.value })} fullWidth />;
            },
        },
        {
            headerName: "이메일", field: "email", minWidth: 180,
            cellRenderer: ({ value, data }: ICellRendererParams<ContactRow>) => {
                return <Input value={value ?? ""} onChange={(e) => updateRow(data!._id, { email: e.target.value })} fullWidth />;
            },
        },
        {
            headerName: "비고", field: "etc", minWidth: 190,
            cellRenderer: ({ data }: ICellRendererParams<ContactRow>) => {
                const isParent = !data?._parentId;
                const isNew = !!data?._isNew;
                const isNewChild = !isParent && isNew;

                if (isParent)
                    return (
                        <span style={{ display: "flex", gap: "0.4rem" }}>
                            <Button size="sm" onClick={() => addChildRow(data!._id)}>하위메뉴 추가</Button>
                            {isNew && <Button variant="outlined" size="sm" onClick={() => deleteParentRow(data!._id)}>삭제</Button>}
                        </span>
                    );
                if (isNewChild)
                    return <Button variant="outlined" size="sm" onClick={() => deleteRow(data!._id, data!._parentId!)}>삭제</Button>;
                return null;
            },
        },
    ];

    const toggleExpand = useCallback((id: string) => {
        setExpandedIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    }, []);

    const visibleData = useMemo(
        () => rows.filter(row => !row._parentId || expandedIds.has(row._parentId)),
        [rows, expandedIds]
    );

    const treeContextValue = useMemo(() => ({ expandedIds, toggleExpand, updateRow }), [expandedIds, toggleExpand, updateRow]);

    const handleRowDragEnd = useCallback((reorderedVisible: unknown[]) => {
        const reordered = reorderedVisible as ContactRow[];
        const reorderedParents = reordered.filter(row => !row._parentId);
        const newRows: ContactRow[] = [];
        for (const parent of reorderedParents) {
            newRows.push(parent);
            const children = rows.filter(row => row._parentId === parent._id);
            newRows.push(...children);
        }
        setRows(newRows);
    }, [rows]);

    const handleAddRow = useCallback(() => {
        const newParent: ContactRow = {
            _id: `root-${Date.now()}`,
            _level: 0,
            _hasChildren: false,
            _isNew: true,
            dept: "", pos: "", koName: "", enName: "", tel: "", mobile: "", home: "", email: "",
        };
        setRows(prev => [...prev, newParent]);
    }, []);

    return (
        <TreeContext.Provider value={treeContextValue}>
            <Layout title="비상연락망 수정" favorite={false} activeMenuId="">

                {/* Data Grid */}
                <DataGrid
                    columns={tableColumns}
                    rowData={visibleData}
                    onRowDragEnd={handleRowDragEnd}
                    rowDragManaged={true}
                    gridLabel="비상연락망 목록"
                    topRightButtons={
                        <>
                            <Button variant="outlined">목록</Button>
                            <Button variant="filled" color="primary" onClick={handleAddRow}>행추가</Button>
                            <Button variant="solid">연락처 수정</Button>
                        </>
                    }
                />
            </Layout>
        </TreeContext.Provider>
    );
}
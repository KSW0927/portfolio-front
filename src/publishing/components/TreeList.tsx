/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { forwardRef, useImperativeHandle, useMemo, useRef, useState } from "react";
import { InteractionMode, StaticTreeDataProvider, Tree, type TreeItem, type TreeItemIndex, UncontrolledTreeEnvironment } from "react-complex-tree";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Box, Button, Icon, Layout, Typography } from "@/publishing/components";
import "react-complex-tree/lib/style-modern.css";

/**
 * TreeData 계층형 구조 타입 (Props)
 */
export interface TreeData {
    /** 트리 노드의 고유 식별자 */
    id: string;
    /** 노드에 표시될 텍스트 */
    title: string;
    /** 하위 노드 배열 (있을 경우) */
    children?: TreeData[] | null;
}

interface TreeItemData {
    title: string;
    isFolder?: boolean;
}

type TreeItemMap = Record<TreeItemIndex, TreeItem<TreeItemData>>;

const convertToFlatMap = (items: TreeData[], map: TreeItemMap = {}): TreeItemMap => {
    items.forEach((item) => {
        map[item.id] = {
            index: item.id,
            isFolder: !!item.children,
            canMove: false,
            children: item.children?.map((c) => c.id) || [],
            data: { title: item.title, isFolder: !!item.children },
        };
        if (item.children) convertToFlatMap(item.children, map);
    });
    return map;
};

export interface TreeListRef {
    getTree: () => unknown;
    addItem: (parentId: string, newItem: TreeData) => void;
    removeItem: (itemId: string) => void;
    focusItem: (index: string) => void;
    moveFocusUp: () => void;
    moveFocusDown: () => void;
    selectItem: (indexs: string[]) => void;
}

/**
 * TreeList 컴포넌트 속성 (Props)
 */
export interface TreeListProps {
    /** 렌더링할 초기 계층형 데이터 배열입니다. */
    initData: TreeData[];
    /** 트리 환경을 식별하는 고유 ID입니다. */
    treeId: string;
    /** 아이템이 선택되었을 때 호출되는 콜백 함수입니다. */
    onSelectItems?: (item: TreeItemIndex[]) => void;
    /** 더블 클릭이나 Enter 키 등 주요 액션이 트리거되었을 때 호출되는 콜백 함수입니다. */
    onPrimaryAction?: (item: TreeItem<TreeItemData>) => void;
    /** 아이템 이름이 변경되었을 때 호출되는 콜백 함수입니다. */
    onRename?: (item: TreeItem<TreeItemData>, newName: string) => void;
}

interface EnvironmentRef {
    focusItem: (treeId: string, itemId: TreeItemIndex) => void;
    moveFocusUp: (treeId: string) => void;
    moveFocusDown: (treeId: string) => void;
    selectItem: (treeId: string, itemId: TreeItemIndex[]) => void;
}

/**
 * @description react-complex-tree를 기반으로 웹 접근성이 완벽히 지원되는 계층형 트리 리스트 컴포넌트입니다.
 */
const TreeListMain = forwardRef<TreeListRef, TreeListProps>((props, ref) => {
    const { initData, treeId, onSelectItems, onPrimaryAction, onRename } = props;

    const environmentRef = useRef<EnvironmentRef>(null);
    const treeRef = useRef(null);

    const [items, setItems] = useState<TreeItemMap>(() => convertToFlatMap(initData, {
        ["root"]: { index: "root", isFolder: true, children: initData.map(i => i.id), data: { title: "Root", isFolder: true } }
    }));

    useImperativeHandle(ref, () => ({
        getTree: () => treeRef?.current,
        addItem: (parentId: string, newItem: TreeData) => {
            setItems((prev: TreeItemMap) => {
                const newMap = { ...prev };
                newMap[newItem.id] = {
                    index: newItem.id,
                    isFolder: !!newItem.children,
                    canMove: false,
                    children: newItem.children?.map((c: TreeData) => c.id) || [],
                    data: { title: newItem.title, isFolder: !!newItem.children },
                };
                if (newMap[parentId]) {
                    newMap[parentId] = {
                        ...newMap[parentId],
                        isFolder: true,
                        children: [...(newMap[parentId].children || []), newItem.id],
                    };
                }
                return newMap;
            });
        },
        removeItem: (itemId: string) => {
            if (itemId === "root") return;
            setItems((prev: TreeItemMap) => {
                const newMap = { ...prev };
                const deleteRecursive = (id: TreeItemIndex) => {
                    const item = newMap[id];
                    if (item && item.children) {
                        item.children.forEach((childId: TreeItemIndex) => deleteRecursive(childId));
                    }
                    delete newMap[id];
                };
                const parent = Object.values(newMap).find((node) => node.children?.includes(itemId));
                if (parent) {
                    newMap[parent.index] = {
                        ...parent,
                        children: parent.children?.filter((id: TreeItemIndex) => id !== itemId),
                    };
                }
                deleteRecursive(itemId);
                return { ...newMap };
            });
        },
        focusItem: (index: string) => environmentRef.current?.focusItem(treeId, index as TreeItemIndex),
        moveFocusUp: () => environmentRef.current?.moveFocusUp(treeId),
        moveFocusDown: () => environmentRef.current?.moveFocusDown(treeId),
        selectItem: (indexs: string[]) => environmentRef.current?.selectItem(treeId, indexs as TreeItemIndex[]),
    }));

    const dataProvider = useMemo(
        () => new StaticTreeDataProvider(items, (item: TreeItem<TreeItemData>, newTitle: string) => ({ ...item, data: { ...item.data, title: newTitle } })),
        [items]
    );

    return (
        <div className="tree-wrap" role="application" aria-label="트리 리스트 컴포넌트">
            <UncontrolledTreeEnvironment
                ref={environmentRef as never}
                dataProvider={dataProvider}
                getItemTitle={(item) => item.data.title}
                viewState={{}}
                defaultInteractionMode={InteractionMode.ClickItemToExpand}
                onSelectItems={onSelectItems}
                onPrimaryAction={onPrimaryAction}
                onRenameItem={onRename}
                canDragAndDrop={false}
                canDropOnFolder={false}
                canReorderItems={false}
                canRename={false}
                renderItem={({ depth, children, title, arrow, context, item }) => {
                    const { type: _type, ...interactiveProps } = context.interactiveElementProps;
                    return (
                        <li {...context.itemContainerWithChildrenProps} className="rct-tree-item-li" role="none">
                            <div
                                {...context.itemContainerWithoutChildrenProps}
                                className={`rct-tree-item-title-container ${context.isSelected ? "-selected" : ""}`}
                                style={{ paddingLeft: `${depth * 22}px` }}
                                role="treeitem"
                                aria-expanded={item.isFolder ? context.isExpanded : undefined}
                                aria-selected={context.isSelected}
                                aria-level={depth + 1}
                            >
                                <button
                                    type="button"
                                    {...interactiveProps}
                                    className={`rct-tree-item-button ${context.isSelected ? "-selected" : ""}`}
                                    title={typeof title === "string" ? title : undefined}
                                >
                                    {arrow}
                                    {title}
                                </button>
                            </div>
                            {children && <ul role="group" className="rct-tree-item-children">{children}</ul>}
                        </li>
                    );
                }}
                renderItemArrow={({ item, context }) => {
                    if (!item.isFolder || !item.children?.length) return null;
                    return (
                        <div
                            {...context.arrowProps}
                            className="rct-tree-item-arrow"
                            style={{
                                transform: context.isExpanded ? "rotate(0deg)" : "rotate(-90deg)",
                                transition: "transform 0.2s ease",
                            }}
                            aria-hidden="true"
                        >
                            <Icon name="down" size={18} aria-hidden="true" />
                        </div>
                    );
                }}
                renderItemTitle={({ title, item }) => (
                    <span className={`tree-title ${item.data.isFolder ? "is-folder" : "is-leaf"}`}>
                        {title}
                    </span>
                )}
            >
                <Tree ref={treeRef} treeId={treeId} rootItem={"root"} treeLabel="리소스 트리" />
            </UncontrolledTreeEnvironment>
        </div>
    );
});
TreeListMain.displayName = "TreeListMain";

/**
 * TreeList.Sidebar 컴포넌트 속성 (Props)
 */
export interface TreeListSidebarProps {
    mobileButtonText: string;
    title?: React.ReactNode;
    pcWidth?: number | string;
    children: React.ReactNode;
}

const TreeListSidebar = ({ mobileButtonText, title, pcWidth = 300, children }: TreeListSidebarProps) => {
    const isMobile = useIsMobile();
    const [isOpen, setIsOpen] = useState(false);

    const mobileHeaderNode = (
        <Layout.Row justify="space-between">
            <Typography variant="heading-sm">{title}</Typography>
            <Button
                variant="text"
                leftIcon={<Icon name="close" size={24} color="#999" />}
                onClick={() => setIsOpen(false)}
                aria-label="닫기"
            />
        </Layout.Row>
    );

    const pcHeaderNode = title ? (typeof title === "string" ? <Typography variant="heading-sm">{title}</Typography> : title) : undefined;

    if (isMobile) {
        return (
            <>
                <Button fullWidth onClick={() => setIsOpen(true)} style={{ flexShrink: 0 }}>{mobileButtonText}</Button>
                <div className={`drawer-wrap ${isOpen ? "-open" : ""}`}>
                    <div className="dim-overlay" onClick={() => setIsOpen(false)} />
                    <div className="drawer-panel">
                        <Box variant="inner" fullHeight header={mobileHeaderNode}>
                            {children}
                        </Box>
                    </div>
                </div>
            </>
        );
    }

    return (
        <Layout.Col width={pcWidth}>
            <Box variant="inner" fullHeight header={pcHeaderNode}>
                {children}
            </Box>
        </Layout.Col>
    );
};

type TreeListCompound = typeof TreeListMain & {
    Sidebar: typeof TreeListSidebar;
    displayName?: string;
};

export const TreeList = Object.assign(TreeListMain, {
    Sidebar: TreeListSidebar,
}) as TreeListCompound;
TreeList.displayName = "TreeList";
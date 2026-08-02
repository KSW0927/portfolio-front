import { useEffect, useState } from "react";
import type { CustomCellRendererProps } from "ag-grid-react";
import type { ICellRendererParams } from "ag-grid-community";
import { Checkbox, Button } from "@/components/common";


// ─── 유틸 ────────────────────────────────────────────────────────────────────


// ─── CheckboxCellRenderer ──────────────────────────────────────────────────────────
// 셀단위 체크박스 랜더링 정의
export const CheckboxCellRenderer = ({ node, api }: ICellRendererParams) => {
    const [checked, setChecked] = useState(() => node.isSelected() ?? false);

    useEffect(() => {
        const handler = () => setChecked(node.isSelected() ?? false);
        api.addEventListener('selectionChanged', handler);
        return () => api.removeEventListener('selectionChanged', handler);
    }, [api, node]);

    return (
        <Checkbox
            checked={checked}
            onChange={(e) => node.setSelected(e.target.checked)}
            aria-label={`${(node.rowIndex ?? 0) + 1}행 선택`}
        />
    );
};
CheckboxCellRenderer.displayName = "CheckboxCellRenderer";

// ─── ButtonCellRenderer ──────────────────────────────────────────────────────────
interface ButtonCellRendererProps extends CustomCellRendererProps {
    label?: string | ((params: CustomCellRendererProps) => string);
    disabled?: boolean | ((params: CustomCellRendererProps) => boolean);
    onClick?: (params: CustomCellRendererProps) => void;
}
export const ButtonCellRenderer = (params: ButtonCellRendererProps) => {
    const { label = "버튼", disabled = false, onClick } = params;

    const buttonText = typeof label === 'function' ? label(params) : label;
    const isDisabled = typeof disabled === 'function' ? disabled(params) : disabled;

    const handleGridButtonClick = (e: React.MouseEvent) => {
        // 이벤트 그리드 행 클릭으로 확산 방지
        e.stopPropagation();
        (e.nativeEvent as any).isButtonClicked = true;

        if(onClick) onClick(params);
    };

    return (
        <Button
            variant="solid"
            size="sm"
            disabled={isDisabled}
            onClick={handleGridButtonClick}
        >
            {buttonText}
        </Button>
    );
};
ButtonCellRenderer.displayName = "ButtonCellRenderer";


import React, { forwardRef, useRef, useState, useEffect, useImperativeHandle } from "react";
import { createPortal } from "react-dom"; // DatePortalContainer에서 사용
import type { ICellEditorParams } from "ag-grid-community";
import type { CustomCellEditorProps } from "ag-grid-react";
import ReactDatePicker from "react-datepicker";
import dayjs from "dayjs";
import { Dropdown, Input, Icon, Textarea } from "@/components";

interface CellEditorHandle {
    getValue: () => string;
    isPopup?: () => boolean;
}

// ─── 유틸 ────────────────────────────────────────────────────────────────────



// ─── TextCellEditor ──────────────────────────────────────────────────────────
interface TextEditorParams extends CustomCellEditorProps {
    maxLength?: number;
}
// params: value, onValueChange, eventKey, rowIndex, column
export const TextCellEditor = forwardRef<CellEditorHandle, TextEditorParams>((params, ref) => {
    const refInput = useRef<HTMLInputElement>(null);

    const updateValue = (val: string) => {
        params.onValueChange(val === "" ? null : val);
    };

    // AG Grid의 에디터가 닫힐 때 최종 값을 수집할 수 있도록 기능 주입
    useImperativeHandle(ref, () => {
       return {
           // 셀 수정이 끝났을 때 AG Grid가 이 함수를 통해 값을 가져감
           getValue() {
               return params.value;
           },
           isPopup: () => true,
       };
    });

    useEffect(() => {
        let startValue;

        if(params.eventKey === "Backspace") {
            startValue = "";
        } else if(params.eventKey && params.eventKey.length === 1) {
            startValue = params.eventKey;
        } else {
            startValue = params.value;
        }

        if(startValue == null) {
            startValue = "";
        }

        updateValue(startValue);

        // 포컷 타이밍을 안전하게 잡기 위해 약간의 지연을 주거나 autoFocus 속성을 활용
        setTimeout(() => {
            refInput.current?.focus();
        }, 50);
    }, []);

    return (
        <Input
            ref={refInput}
            value={params.value}
            onChange={(e) => updateValue(e.target.value)}
            maxLength={params.maxLength}
            fullWidth
            autoFocus
        />
    );
});
TextCellEditor.displayName = "TextCellEditor";


// ─── TextareaCellEditor ──────────────────────────────────────────────────────
interface TextareaEditorParams extends ICellEditorParams {
    maxLength?: number;
}

export const TextareaCellEditor = forwardRef<CellEditorHandle, TextareaEditorParams>((params, ref) => {
    const initial =
        params.eventKey && params.eventKey.length === 1
            ? params.eventKey
            : String(params.value ?? "");

    const [value, setValue] = useState(initial);

    useImperativeHandle(ref, () => ({
        getValue: () => value,
        isPopup: () => true,
    }));

    return (
        <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            maxLength={params.maxLength}
            rows={1}
            fullWidth
            autoFocus
        />
    );
});
TextareaCellEditor.displayName = "TextareaCellEditor";


// ─── SelectCellEditor ────────────────────────────────────────────────────────
interface SelectEditorParams extends CustomCellEditorProps {
    values?: (string | { value: string; label: string })[];
}

export const SelectCellEditor = forwardRef<CellEditorHandle, SelectEditorParams>((params, ref) => {
    const refSelect = useRef<HTMLInputElement>(null);

    // AG Grid의 에디터가 닫힐 때 최종 값을 수집할 수 있도록 기능 주입
    useImperativeHandle(ref, () => {
        return {
            // 셀 수정이 끝났을 때 AG Grid가 이 함수를 통해 값을 가져감
            getValue() {
                return params.value;
            },
            isPopup: () => true,
        };
    });

    const options = (params.values ?? []).map((v) =>
        typeof v === "string" ? { label: v, value: v} : v
    );

    return (
        <Dropdown
            ref={refSelect}
            options={options}
            value={params.value}
            onChange={(val) => {
                params.onValueChange(val === "" ? null : val);
                setTimeout(() => params.stopEditing(), 0);
            }}
            fullWidth
            menuPortal
        />
    );
});
SelectCellEditor.displayName = "SelectCellEditor";


// ─── DateCellEditor ──────────────────────────────────────────────────────────
interface DateEditorParams extends CustomCellEditorProps {
    min?: string;
    max?: string;
    format?: string;
}

const DatePortalContainer = ({ children }: { children?: React.ReactNode }) =>
    createPortal(children ?? null, document.body);

export const DateCellEditor = forwardRef<CellEditorHandle, DateEditorParams>((params, ref) => {
    const tmpFormat = params.format ? params.format : "YYYY-MM-dd";
    const tmpFormats = tmpFormat.split(" ");
    const tmpFormatJs = tmpFormats[0].toUpperCase() + (tmpFormats.length > 1 ? " " + tmpFormats[1] : "");
    const [date, setDate] = useState<Date | null>(params.value ? dayjs(params.value).toDate() : dayjs().toDate());
    const pickerRef = useRef<ReactDatePicker>(null);

    // AG Grid의 에디터가 닫힐 때 최종 값을 수집할 수 있도록 기능 주입
    useImperativeHandle(ref, () => {
        return {
            // 셀 수정이 끝났을 때 AG Grid가 이 함수를 통해 값을 가져감
            getValue() {
                return params.value;
            },
            isPopup: () => true,
        };
    });

    return (
        <div className="datepicker-group w-full">
            <div className="datepicker-wrap">
                <ReactDatePicker
                    ref={pickerRef}
                    selected={date}
                    onChange={(d: Date | null) => {
                        setDate(d);
                        params.onValueChange(d ? dayjs(d).format(tmpFormatJs) : dayjs().format(tmpFormatJs));
                        if (d) setTimeout(() => params.stopEditing(), 100);
                    }}
                    locale="ko"
                    dateFormat={tmpFormat}
                    className="datepicker-field"
                    minDate={dayjs(params.min).toDate() ?? undefined}
                    maxDate={dayjs(params.max).toDate() ?? undefined}
                    placeholderText={tmpFormat}
                    autoComplete="off"
                    popperContainer={DatePortalContainer}
                    popperPlacement="bottom-start"
                />
                <button
                    type="button"
                    className="datepicker-icon"
                    onClick={() => pickerRef.current?.setOpen(true)}
                    aria-label="달력 열기"
                >
                    <Icon name="calendar" size={18} />
                </button>
            </div>
        </div>
    );
});
DateCellEditor.displayName = "DateCellEditor";

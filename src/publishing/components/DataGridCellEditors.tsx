import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { createPortal } from "react-dom"; // DatePortalContainer에서 사용
import ReactDatePicker, { registerLocale } from "react-datepicker";
import { ko } from "date-fns/locale/ko";
import { type ICellEditorParams } from "ag-grid-community";
import { Dropdown, Input, Icon, Textarea } from "@/publishing/components";

registerLocale("ko", ko);

interface CellEditorHandle {
    getValue: () => string;
    isPopup?: () => boolean;
}

// ─── 유틸 ────────────────────────────────────────────────────────────────────

const parseDate = (str: string | null | undefined): Date | null => {
    if (!str) return null;
    const d = new Date(str.replace(/\./g, "-"));
    return isNaN(d.getTime()) ? null : d;
};

const formatDate = (d: Date): string => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}.${m}.${day}`;
};

// ─── TextCellEditor ──────────────────────────────────────────────────────────

interface TextEditorParams extends ICellEditorParams {
    maxLength?: number;
}

export const TextCellEditor = forwardRef<CellEditorHandle, TextEditorParams>((params, ref) => {
    const initial =
        params.eventKey && params.eventKey.length === 1
            ? params.eventKey
            : String(params.value ?? "");

    const [value, setValue] = useState(initial);

    useImperativeHandle(ref, () => ({
        getValue: () => value,
    }));

    return (
        <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
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

interface SelectEditorParams extends ICellEditorParams {
    values?: (string | { value: string; label: string })[];
}

export const SelectCellEditor = forwardRef<CellEditorHandle, SelectEditorParams>((params, ref) => {
    const [value, setValue] = useState(String(params.value ?? ""));
    const options = (params.values ?? []).map((v) =>
        typeof v === "string" ? { label: v, value: v } : v
    );

    useImperativeHandle(ref, () => ({
        getValue: () => value,
    }));

    return (
        <Dropdown
            options={options}
            value={value}
            onChange={(val) => {
                setValue(val);
                setTimeout(() => params.stopEditing(), 0);
            }}
            fullWidth
            menuPortal
        />
    );
});
SelectCellEditor.displayName = "SelectCellEditor";



// ─── DateCellEditor ──────────────────────────────────────────────────────────

interface DateEditorParams extends ICellEditorParams {
    min?: string;
    max?: string;
}

const DatePortalContainer = ({ children }: { children?: React.ReactNode }) =>
    createPortal(children ?? null, document.body);

export const DateCellEditor = forwardRef<CellEditorHandle, DateEditorParams>((params, ref) => {
    const [date, setDate] = useState<Date | null>(parseDate(params.value));
    const pickerRef = useRef<ReactDatePicker>(null);

    useImperativeHandle(ref, () => ({
        getValue: () => (date ? formatDate(date) : (params.value ?? "")),
        isPopup: () => true,
    }));

    return (
        <div className="datepicker-group w-full">
            <div className="datepicker-wrap">
                <ReactDatePicker
                    ref={pickerRef}
                    selected={date}
                    onChange={(d: Date | null) => {
                        setDate(d);
                        if (d) setTimeout(() => params.stopEditing(), 100);
                    }}
                    locale="ko"
                    dateFormat="yyyy.MM.dd"
                    className="datepicker-field"
                    minDate={parseDate(params.min) ?? undefined}
                    maxDate={parseDate(params.max) ?? undefined}
                    placeholderText="YYYY.MM.DD"
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

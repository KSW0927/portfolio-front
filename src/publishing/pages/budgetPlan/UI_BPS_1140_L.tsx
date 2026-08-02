import { useMemo, useRef, useState } from "react";
import type { ColDef, ColGroupDef, ICellRendererParams } from "ag-grid-community";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Button, DataGrid, Dropdown, Icon, Input, Layout, SearchBox, Space, Typography } from "@/publishing/components";

const tableData = [
    { type: "예산", totalKrw: "99,999", totalUsd: "99,999", exchangeRateUsd: "₩1,414" },
    { type: "계획", totalKrw: "88,888", totalUsd: "111,111", exchangeRateUsd: "₩1,414" },
    { type: "실적", totalKrw: "111,111", totalUsd: "88,888", exchangeRateUsd: "₩1,400" },
];

const HeaderGroupWithSearch = () => {
    const [value, setValue] = useState("");
    return (
        <Space size="sm">
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onClear={() => setValue("")}
            />
            <Button size="sm" variant="solid">환율 적용</Button>
        </Space>
    );
};

const tableColumns2: (ColDef | ColGroupDef)[] = [
    { headerName: "예산 항목", field: "budgetItem", },
    {
        headerName: "예산 환율: ₩1,414",
        children: [
            { headerName: "금액(천원)", field: "budgetKrw", },
            { headerName: "금액(USD)", field: "budgetUsd", },
        ],
    },
    {
        headerName: "v1",
        headerGroupComponent: HeaderGroupWithSearch,
        children: [
            {
                headerName: "금액(천원) (증감)", field: "v1Krw",
                cellRenderer: ({ value, data }: ICellRendererParams) => value && value !== "-"
                    ? <>{value} <Typography variant="body-lg" as="span" primary={data?.v1KrwChange?.startsWith("-")} style={!data?.v1KrwChange?.startsWith("-") ? { color: "#D31616" } : undefined}>({data?.v1KrwChange})</Typography></>
                    : value ?? "",
            },
            {
                headerName: "금액(USD) (증감)", field: "v1Usd",
                cellRenderer: ({ value, data }: ICellRendererParams) => value && value !== "-"
                    ? <>{value} <Typography variant="body-lg" as="span" primary={data?.v1UsdChange?.startsWith("-")} style={!data?.v1UsdChange?.startsWith("-") ? { color: "#D31616" } : undefined}>({data?.v1UsdChange})</Typography></>
                    : value ?? "",
            },
        ],
    },
    {
        headerName: "v2",
        headerGroupComponent: HeaderGroupWithSearch,
        children: [
            {
                headerName: "금액(천원) (증감)", field: "v2Krw",
                cellRenderer: ({ value, data }: ICellRendererParams) => value && value !== "-"
                    ? <>{value} <Typography variant="body-lg" as="span" primary={data?.v2KrwChange?.startsWith("-")} style={!data?.v2KrwChange?.startsWith("-") ? { color: "#D31616" } : undefined}>({data?.v2KrwChange})</Typography></>
                    : value ?? "",
            },
            {
                headerName: "금액(USD) (증감)", field: "v2Usd",
                cellRenderer: ({ value, data }: ICellRendererParams) => value && value !== "-"
                    ? <>{value} <Typography variant="body-lg" as="span" primary={data?.v2UsdChange?.startsWith("-")} style={!data?.v2UsdChange?.startsWith("-") ? { color: "#D31616" } : undefined}>({data?.v2UsdChange})</Typography></>
                    : value ?? "",
            },
        ],
    },
    {
        headerName: "v3",
        headerGroupComponent: HeaderGroupWithSearch,
        children: [
            { headerName: "금액(천원) (증감)", field: "v3Krw" },
            { headerName: "금액(USD) (증감)", field: "v3Usd" },
        ],
    },
];

const tableData2 = [
    { budgetItem: "XXX", budgetKrw: "999,999", budgetUsd: "999,999", v1Krw: "999,999", v1KrwChange: "-9.9%", v1Usd: "999,999", v1UsdChange: "+9.9%", v2Krw: "999,999", v2KrwChange: "-9.9%", v2Usd: "999,999", v2UsdChange: "+9.9%", v3Krw: "-", v3Usd: "-" },
    { budgetItem: "XXX", budgetKrw: "888,888", budgetUsd: "888,888", v1Krw: "888,888", v1KrwChange: "+5.2%", v1Usd: "888,888", v1UsdChange: "-3.1%", v2Krw: "888,888", v2KrwChange: "+5.2%", v2Usd: "888,888", v2UsdChange: "-3.1%", v3Krw: "-", v3Usd: "-" },
    { budgetItem: "XXX", budgetKrw: "777,777", budgetUsd: "777,777", v1Krw: "777,777", v1KrwChange: "-1.4%", v1Usd: "777,777", v1UsdChange: "+2.7%", v2Krw: "777,777", v2KrwChange: "-1.4%", v2Usd: "777,777", v2UsdChange: "+2.7%", v3Krw: "-", v3Usd: "-" },
    { budgetItem: "XXX", budgetKrw: "999,999", budgetUsd: "999,999", v1Krw: "999,999", v1KrwChange: "-9.9%", v1Usd: "999,999", v1UsdChange: "+9.9%", v2Krw: "999,999", v2KrwChange: "-9.9%", v2Usd: "999,999", v2UsdChange: "+9.9%", v3Krw: "-", v3Usd: "-" },
    { budgetItem: "XXX", budgetKrw: "888,888", budgetUsd: "888,888", v1Krw: "888,888", v1KrwChange: "+5.2%", v1Usd: "888,888", v1UsdChange: "-3.1%", v2Krw: "888,888", v2KrwChange: "+5.2%", v2Usd: "888,888", v2UsdChange: "-3.1%", v3Krw: "-", v3Usd: "-" },
    { budgetItem: "XXX", budgetKrw: "777,777", budgetUsd: "777,777", v1Krw: "777,777", v1KrwChange: "-1.4%", v1Usd: "777,777", v1UsdChange: "+2.7%", v2Krw: "777,777", v2KrwChange: "-1.4%", v2Usd: "777,777", v2UsdChange: "+2.7%", v3Krw: "-", v3Usd: "-" },
    { budgetItem: "XXX", budgetKrw: "999,999", budgetUsd: "999,999", v1Krw: "999,999", v1KrwChange: "-9.9%", v1Usd: "999,999", v1UsdChange: "+9.9%", v2Krw: "999,999", v2KrwChange: "-9.9%", v2Usd: "999,999", v2UsdChange: "+9.9%", v3Krw: "-", v3Usd: "-" },
    { budgetItem: "XXX", budgetKrw: "888,888", budgetUsd: "888,888", v1Krw: "888,888", v1KrwChange: "+5.2%", v1Usd: "888,888", v1UsdChange: "-3.1%", v2Krw: "888,888", v2KrwChange: "+5.2%", v2Usd: "888,888", v2UsdChange: "-3.1%", v3Krw: "-", v3Usd: "-" },
    { budgetItem: "XXX", budgetKrw: "777,777", budgetUsd: "777,777", v1Krw: "777,777", v1KrwChange: "-1.4%", v1Usd: "777,777", v1UsdChange: "+2.7%", v2Krw: "777,777", v2KrwChange: "-1.4%", v2Usd: "777,777", v2UsdChange: "+2.7%", v3Krw: "-", v3Usd: "-" },
    { budgetItem: "XXX", budgetKrw: "999,999", budgetUsd: "999,999", v1Krw: "999,999", v1KrwChange: "-9.9%", v1Usd: "999,999", v1UsdChange: "+9.9%", v2Krw: "999,999", v2KrwChange: "-9.9%", v2Usd: "999,999", v2UsdChange: "+9.9%", v3Krw: "-", v3Usd: "-" },
    { budgetItem: "XXX", budgetKrw: "888,888", budgetUsd: "888,888", v1Krw: "888,888", v1KrwChange: "+5.2%", v1Usd: "888,888", v1UsdChange: "-3.1%", v2Krw: "888,888", v2KrwChange: "+5.2%", v2Usd: "888,888", v2UsdChange: "-3.1%", v3Krw: "-", v3Usd: "-" },
    { budgetItem: "XXX", budgetKrw: "777,777", budgetUsd: "777,777", v1Krw: "777,777", v1KrwChange: "-1.4%", v1Usd: "777,777", v1UsdChange: "+2.7%", v2Krw: "777,777", v2KrwChange: "-1.4%", v2Usd: "777,777", v2UsdChange: "+2.7%", v3Krw: "-", v3Usd: "-" },
    { budgetItem: "XXX", budgetKrw: "999,999", budgetUsd: "999,999", v1Krw: "999,999", v1KrwChange: "-9.9%", v1Usd: "999,999", v1UsdChange: "+9.9%", v2Krw: "999,999", v2KrwChange: "-9.9%", v2Usd: "999,999", v2UsdChange: "+9.9%", v3Krw: "-", v3Usd: "-" },
    { budgetItem: "XXX", budgetKrw: "888,888", budgetUsd: "888,888", v1Krw: "888,888", v1KrwChange: "+5.2%", v1Usd: "888,888", v1UsdChange: "-3.1%", v2Krw: "888,888", v2KrwChange: "+5.2%", v2Usd: "888,888", v2UsdChange: "-3.1%", v3Krw: "-", v3Usd: "-" },
    { budgetItem: "XXX", budgetKrw: "777,777", budgetUsd: "777,777", v1Krw: "777,777", v1KrwChange: "-1.4%", v1Usd: "777,777", v1UsdChange: "+2.7%", v2Krw: "777,777", v2KrwChange: "-1.4%", v2Usd: "777,777", v2UsdChange: "+2.7%", v3Krw: "-", v3Usd: "-" },
    { budgetItem: "XXX", budgetKrw: "999,999", budgetUsd: "999,999", v1Krw: "999,999", v1KrwChange: "-9.9%", v1Usd: "999,999", v1UsdChange: "+9.9%", v2Krw: "999,999", v2KrwChange: "-9.9%", v2Usd: "999,999", v2UsdChange: "+9.9%", v3Krw: "-", v3Usd: "-" },
    { budgetItem: "XXX", budgetKrw: "888,888", budgetUsd: "888,888", v1Krw: "888,888", v1KrwChange: "+5.2%", v1Usd: "888,888", v1UsdChange: "-3.1%", v2Krw: "888,888", v2KrwChange: "+5.2%", v2Usd: "888,888", v2UsdChange: "-3.1%", v3Krw: "-", v3Usd: "-" },
    { budgetItem: "XXX", budgetKrw: "777,777", budgetUsd: "777,777", v1Krw: "777,777", v1KrwChange: "-1.4%", v1Usd: "777,777", v1UsdChange: "+2.7%", v2Krw: "777,777", v2KrwChange: "-1.4%", v2Usd: "777,777", v2UsdChange: "+2.7%", v3Krw: "-", v3Usd: "-" },
];

const dummyOptions = [
    { label: "전체", value: "all" },
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
    { label: "Option 4", value: "4" },
    { label: "Option 5", value: "5" },
];

export function UI_BPS_1140_L() {
    const isMobile = useIsMobile();
    const exchangeRateRef = useRef("");

    const tableColumns = useMemo<ColDef[]>(() => [
        { headerName: "유형", field: "type" },
        { headerName: "총액(천원)", field: "totalKrw" },
        { headerName: "총액(USD)", field: "totalUsd" },
        {
            headerName: "환율(USD)",
            field: "exchangeRateUsd",
            minWidth: 220,
            cellRenderer: ({ value, data }: ICellRendererParams) => {
                if (data?.type === "계획") {
                    return (
                        <Space size="sm">
                            <Input
                                defaultValue={value ?? ""}
                                onChange={(e) => { exchangeRateRef.current = e.target.value; }}
                                fullWidth
                            />
                            <Button size="sm">환율 저장</Button>
                        </Space>
                    );
                }
                return value ?? "";
            },
        },
    ], []);

    return (
        <Layout title="영업계획 비교" extra={(<Typography variant="heading-md">2026 평균 예산 기준 환율(USD) : ₩1,414</Typography>)} activeMenuId="">

            {/* SearchBox */}
            <SearchBox>
                <SearchBox.Content>
                    <SearchBox.Row>
                        <SearchBox.Item width={isMobile ? "100%" : 140}>
                            <Dropdown label="연도" options={dummyOptions} fullWidth />
                        </SearchBox.Item>
                        <SearchBox.Item width={isMobile ? "100%" : 140}>
                            <Dropdown label="월" options={dummyOptions} fullWidth />
                        </SearchBox.Item>
                    </SearchBox.Row>
                </SearchBox.Content>

                <SearchBox.Actions>
                    <Button variant="text" color="primary" className="button-reset" leftIcon={<Icon name="reset" size={18} style={{ color: "#005AAA" }} />} size={isMobile ? "lg" : "md"}>초기화</Button>
                    <Button variant="solid" className="button-search" size={isMobile ? "sm" : "md"}>검색</Button>
                </SearchBox.Actions>
            </SearchBox>

            <Layout.Row layout="vertical" gap={14}>
                <Typography variant="heading-sm">2026년 2월 총액 & 환율</Typography>

                {/* Data Grid - 월별 총액 & 환율 */}
                <DataGrid
                    columns={tableColumns}
                    rowData={tableData}
                    gridLabel="월별 총액, 환율 목록"
                    infiniteScroll
                />
            </Layout.Row>

            <Layout.Row layout="vertical" gap={14}>
                <Typography variant="heading-sm">비교</Typography>

                {/* Data Grid - 예산 비교 목록 */}
                <DataGrid
                    columns={tableColumns2}
                    rowData={tableData2}
                    gridLabel="예산 비교 목록"
                    infiniteScroll
                    topRightButtons={
                        <>
                            <Button color="green" leftIcon={<Icon name="excel" size={24} color="#FFF" />}>다운로드</Button>
                        </>
                    }
                />
            </Layout.Row>
        </Layout>
    );
}

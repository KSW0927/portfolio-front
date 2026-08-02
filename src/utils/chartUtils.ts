import { type EChartsOption } from "echarts";

// 공통 디자인 상수
const COMMON_CHART_STYLE = {
    color: ['#5470C6', '#91CC75', '#EE6666', '#FAC858', '#73C0DE', '#3BA272', '#FC8452', '#9A60B4', '#EA7CCC'],
    grid: { top: 40, right: 20, bottom: 40, left: 50 },
}

export const getLineChartOption = (xAxisData: string[], seriesData: number[], title?: string): EChartsOption => ({
    ...COMMON_CHART_STYLE,
    title: { text: title },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: xAxisData },
    yAxis: { type: 'value' },
    series: [{ data: seriesData, type: 'line', smooth: true }],
});

export const getBarChartOption = (xAxisData: string[], seriesData: number[], title?: string): EChartsOption => ({
    ...COMMON_CHART_STYLE,
    title: { text: title },
    tooltip: { trigger: 'item' },
    xAxis: { type: 'category', data: xAxisData },
    yAxis: { type: 'value' },
    series: [{ data: seriesData, type: 'bar' }],
});


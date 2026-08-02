import { type EChartsOption, type PieSeriesOption } from "echarts";

/**
 * 공통 차트 옵션 정의
 * 차트 종류 : EChart
 * 제공 그래프 옵션 : Line, Bar, Pie, Radar
 * [Options]
 * title: 제목 설정
 * legend: 범례 설정
 * grid: 그래프 그리드 설정
 * xAxis: X축 설정
 * yAxis: Y축 설정
 * tooltip: 툴팁 설정
 * toolbox: 툴박스 설정
 * series: 그래프 데이터 설정
 * 
 */
export const ChartOptions = {
    // 1. Line & Bar (축 가반 차트)
    getAxisChart: (type: 'line' | 'bar', categories: string[], seriesData: any[], extraOption?: EChartsOption): EChartsOption => {
        //기본 옵션 정의
        const defaultOption: EChartsOption = {
            tooltip: { // 툴팁 설정
                //show: true, // 툴팁 표시 여부
                trigger: 'axis', // 툴팁 표시 방법(item, axis, none)
                //triggerOn: 'mousemove', // 툴팁 표시 방법(mousemove, click, mousemove|click, none)
                //position: [10, 10], // 툴팁 위치
            },
            //toolbox: { // 툴박스 설정
                //show: false, // 툴박스 표시 여부
                //orient: 'horizontal', // 툴박스 정렬 방법(horizontal, vertical)
            //},
            legend: { bottom: 0 },
            grid: { top: '10%', left: '3%', right: '4%', bottom: '15%', containLabel: true },
            xAxis: { type: 'category', data: categories },
            yAxis: { type: 'value' },
            series: seriesData.map((item) => ({
                ...item,
                type,
                smooth: type === 'line', // Line 차트일 때 곡선 처리
                //stack: 'x', // 스택 그룹
                //stackStrategy: 'samesign', // 스택 전략(samesign, all, positive, negative)
                //stackOrder: 'seriesAsc', // 스택 정렬법(seriesAsc, seriesDesc)
                //setp: 'true', // 계단형 표시여부(true, false, start, middle, end)
                //showBackground: false, // Bar 배경 표시여부(Bar형)
                //backgroundStyle: { color: 'rgba(180, 180, 180, 0.2)' }, // Bar 배경 스타일
            })),
        };

        //기본 옵션 위에 추가 옵션 덮어씌워서 정의
        return { ...defaultOption, ...extraOption };
    },

    // 1-1. Hroizontal Bar ( 수평 Bar 차트)
    getHroizontalBarChart: (categories: string[], seriesData: any[], extraOption?: EChartsOption): EChartsOption => {
        //기본 옵션 정의
        const defaultOption: EChartsOption = {
            tooltip: { // 툴팁 설정
                //show: true, // 툴팁 표시 여부
                trigger: 'axis', // 툴팁 표시 방법(item, axis, none)
                //triggerOn: 'mousemove', // 툴팁 표시 방법(mousemove, click, mousemove|click, none)
                //position: [10, 10], // 툴팁 위치
            },
            //toolbox: { // 툴박스 설정
                //show: false, // 툴박스 표시 여부
                //orient: 'horizontal', // 툴박스 정렬 방법(horizontal, vertical)
            //},
            legend: { bottom: 0 },
            grid: { top: '10%', left: '3%', right: '4%', bottom: '15%', containLabel: true },
            xAxis: { type: 'value', boundaryGap: [0, 0.01] },
            yAxis: { type: 'category', data: categories },
            series: seriesData.map((item) => ({
                ...item,
                type: 'bar',
                //stack: 'x', // 스택 그룹
                //stackStrategy: 'samesign', // 스택 전략(samesign, all, positive, negative)
                //stackOrder: 'seriesAsc', // 스택 정렬법(seriesAsc, seriesDesc)
                //setp: 'true', // 계단형 표시여부(true, false, start, middle, end)
                //showBackground: false, // Bar 배경 표시여부(Bar형)
                //backgroundStyle: { color: 'rgba(180, 180, 180, 0.2)' }, // Bar 배경 스타일
            })),
        };

        //기본 옵션 위에 추가 옵션 덮어씌워서 정의
        return { ...defaultOption, ...extraOption };
    },

    // 1-2. Mixed Line and Bar
    getMixedLineAndBarChart: (categories: string[], seriesData: any[], extraOption?: EChartsOption): EChartsOption => {
        //기본 옵션 정의
        const defaultOption: EChartsOption = {
            tooltip: { // 툴팁 설정
                //show: true, // 툴팁 표시 여부
                trigger: 'axis', // 툴팁 표시 방법(item, axis, none)
                //triggerOn: 'mousemove', // 툴팁 표시 방법(mousemove, click, mousemove|click, none)
                //position: [10, 10], // 툴팁 위치
            },
            //toolbox: { // 툴박스 설정
                //show: false, // 툴박스 표시 여부
                //orient: 'horizontal', // 툴박스 정렬 방법(horizontal, vertical)
            //},
            legend: { bottom: 0 },
            grid: { top: '10%', left: '3%', right: '4%', bottom: '15%', containLabel: true },
            xAxis: { type: 'category', data: categories },
            yAxis: { type: 'value' },
            series: seriesData.map((item) => ({
                ...item,
                //stack: 'x', // 스택 그룹
                //stackStrategy: 'samesign', // 스택 전략(samesign, all, positive, negative)
                //stackOrder: 'seriesAsc', // 스택 정렬법(seriesAsc, seriesDesc)
                //setp: 'true', // 계단형 표시여부(true, false, start, middle, end)
                //showBackground: false, // Bar 배경 표시여부(Bar형)
                //backgroundStyle: { color: 'rgba(180, 180, 180, 0.2)' }, // Bar 배경 스타일
            })),
        };

        //기본 옵션 위에 추가 옵션 덮어씌워서 정의
        return { ...defaultOption, ...extraOption };
    },

    // 2. Pie (원형 차트)
    getPieChart: (name: string, data: { value: number, name: string }[], radius?: string[], extraOption?: EChartsOption): EChartsOption => {
        //기본 옵션 정의
        const defaultOption: EChartsOption = {
            tooltip: { trigger: 'item' },
            legend: { orient: 'vertical', left: 'left' },
            series: [
                {
                    name,
                    type: 'pie',
                    radius: radius? radius : ['70%'], // 그래프 반지름 비율
                    avoidLabelOverlap: false, // 레이블 겹침 방지 활성화 여부
                    itemStyle: { borderRadius: 5, borderColor: '#fff', borderWidth: 1 }, // 그래픽 스타일
                    label: { show: false, position: 'center' }, // 라벨 설정
                    emphasis: { label: { show: true, fontSize: '20', fontWeight: 'bold' } }, // 강조 스타일
                    data,
                },
            ],
        };

        //기본 옵션 위에 추가 옵션 덮어씌워서 정의
        return { ...defaultOption, ...extraOption };
    },

    // 2-1. Half Pie (반원형 차트)
    getHalfPieChart: (name: string, data: { value: number, name: string }[], radius?: string[], center?: string[], startAngle?: number, endAngle?: number, extraOption?: EChartsOption): EChartsOption => {
        //기본 옵션 정의
        const defaultOption: EChartsOption = {
            tooltip: { trigger: 'item' },
            legend: { orient: 'vertical', left: 'left' },
            series: [
                {
                    name,
                    type: 'pie',
                    radius: radius? radius : ['0%', '70%'], // 그래프 반지름 비율
                    center: center? center : ['50%', '70%'], // 그래프 중심점
                    startAngle: startAngle? startAngle : 180, // 반원 시작 각도
                    endAngle: endAngle? endAngle : 360, // 반원 종료 각도
                    avoidLabelOverlap: false, // 레이블 겹침 방지 활성화 여부
                    itemStyle: { borderRadius: 5, borderColor: '#fff', borderWidth: 1 }, // 그래픽 스타일
                    label: { show: false, position: 'center' }, // 라벨 설정
                    emphasis: { label: { show: true, fontSize: '20', fontWeight: 'bold' } }, // 강조 스타일
                    data,
                },
            ],
        };

        //기본 옵션 위에 추가 옵션 덮어씌워서 정의
        return { ...defaultOption, ...extraOption };
    },

    // 2-1. Nightingale Pie (장미형 차트)
    getNightinglePieChart: (name: string, data: { value: number, name: string }[], radius?: string[], roseType?: PieSeriesOption['roseType'], extraOption?: EChartsOption): EChartsOption => {
        //기본 옵션 정의
        const defaultOption: EChartsOption = {
            tooltip: { trigger: 'item' },
            legend: { orient: 'vertical', left: 'left' },
            series: [
                {
                    name,
                    type: 'pie',
                    radius: radius? radius : ['0%', '70%'], // 그래프 반지름 비율
                    roseType: roseType? roseType : 'radius',
                    avoidLabelOverlap: false, // 레이블 겹침 방지 활성화 여부
                    itemStyle: { borderRadius: 5, borderColor: '#fff', borderWidth: 1 }, // 그래픽 스타일
                    label: { show: false, position: 'center' }, // 라벨 설정
                    emphasis: { label: { show: true, fontSize: '20', fontWeight: 'bold' } }, // 강조 스타일
                    data,
                },
            ],
        };

        //기본 옵션 위에 추가 옵션 덮어씌워서 정의
        return { ...defaultOption, ...extraOption };
    },

    // 3. Radar (방사형 차트)
    getRadarChart: (indicators: any[], data: any[], extraOption?: EChartsOption): EChartsOption => {
        //기본 옵션 정의
        const defaultOption: EChartsOption = {
            tooltip: {},
            legend: { bottom: 0 },
            radar: {
                indicator: indicators,
                shape: 'polygon', //방사형 모양 설정(circle, polygon)
                //radius: '70%', //방사형 반지름 비율
                //startAngle: 90, //방사형 시작 각도
            },
            series: [
                {
                    type: 'radar',
                    data,
                    areaStyle: { opacity: 0.3}, //영역의 배경 투명도
                },
            ],
        };

        //기본 옵션 위에 추가 옵션 덮어씌워서 정의
        return { ...defaultOption, ...extraOption };
    },

}
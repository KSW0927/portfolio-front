import ReactECharts from 'echarts-for-react';
import { type EChartsOption } from 'echarts';

/**
 * 공통 차트 컴포넌트
 * 기능 추가한 버전으로 참고용
 */
interface BaseChartProps {
    option: EChartsOption;
    style?: React.CSSProperties;
    height?: string;
    loading?: boolean;
    onEvents?: Record<string, (params: any) => void>;
}
export const BaseChart = (props: BaseChartProps) => {
    const { option, style, height = "400px", loading = false, onEvents } = props;

    return (
        <ReactECharts
            theme="light" // dark, light
            option={option}
            style={{ height, width: '100%', ...style }}
            showLoading={loading}
            notMerge={true} // 데이터 변경 시 이전 설정과 섞이지 않도록 설정
            lazyUpdate={true}
            opts={{ renderer: 'svg' }} // 선명한 화질을 위해 SVG 권장(차트가 복잡하면 'canvas')
            onEvents={onEvents}
        />
    );
}
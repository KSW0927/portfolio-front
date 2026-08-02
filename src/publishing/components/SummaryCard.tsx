/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Button, Divider, Icon, Space, Typography } from "@/publishing/components";

/**
 * SummaryCard 컴포넌트 속성 (Props)
 */
export interface SummaryCardProps {
    title: string;
    totalCount: number;
    ongoingCount: number;
    continuousCount: number;
    completedCount: number;
    isActive?: boolean;
    onClick?: (type: "ongoing" | "continuous" | "completed") => void;
    className?: string;
}

/**
 * @description 과제 현황이나 통계 데이터를 요약해서 보여주는 카드형 컴포넌트입니다.
 */
const SummaryCardMain = ({
    title,
    totalCount,
    ongoingCount,
    continuousCount,
    completedCount,
    isActive = false,
    onClick,
    className = ""
}: SummaryCardProps) => {
    const cardClasses = [
        "summary-card",
        isActive ? "is-active" : "",
        className
    ].filter(Boolean).join(" ");

    const clickableStyle = onClick ? { cursor: "pointer" } : {};

    return (
        <div className={cardClasses}>
            <div className="card-header">
                <Space size={6} align="center">
                    <span className="bullet-point" aria-hidden="true"></span>
                    <Typography variant="heading-xs">
                        {title}
                    </Typography>
                </Space>
                <Icon name="arrow-right" size={18} color="#666" />
            </div>

            <div className="card-total-box">
                <Space size={2} align="baseline" justify="center">
                    <strong className="total-number">
                        {totalCount.toLocaleString()}
                    </strong>
                    <Typography variant="body-md" as="span" secondary>
                        건
                    </Typography>
                </Space>
            </div>

            <div className="card-detail-list">
                <Space justify="space-between" align="center" className="detail-item">
                    <Typography variant="body-md" as="span" className="detail-label">진행</Typography>
                    <Typography
                        variant="body-lg"
                        as="strong"
                        weight="semibold"
                        primary
                        className="detail-value"
                        style={clickableStyle}
                        onClick={() => onClick && onClick("ongoing")}
                    >
                        {ongoingCount.toLocaleString()}
                    </Typography>
                </Space>

                <Divider layout="horizontal" variant="dashed" />

                <Space justify="space-between" align="center" className="detail-item">
                    <Typography variant="body-md" as="span" className="detail-label">지속</Typography>
                    <Typography
                        variant="body-lg"
                        as="strong"
                        weight="semibold"
                        className="detail-value"
                        style={clickableStyle}
                        onClick={() => onClick && onClick("continuous")}
                    >
                        {continuousCount.toLocaleString()}
                    </Typography>
                </Space>

                <Divider layout="horizontal" variant="dashed" />

                <Space justify="space-between" align="center" className="detail-item">
                    <Typography variant="body-md" as="span" className="detail-label">종결과제</Typography>
                    <Typography
                        variant="body-lg"
                        as="strong"
                        weight="semibold"
                        className="detail-value"
                        style={clickableStyle}
                        onClick={() => onClick && onClick("completed")}
                    >
                        {completedCount.toLocaleString()}
                    </Typography>
                </Space>
            </div>
        </div >
    );
};

/**
 * SummaryCard.Slider 컴포넌트 속성 (Props)
 */
interface SummaryCardSliderProps {
    children: React.ReactNode;
}

const SummaryCardSlider = ({ children }: SummaryCardSliderProps) => {
    const isMobile = useIsMobile();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);

    const checkScrollPosition = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setIsAtStart(scrollLeft <= 1);
        setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
    };

    const handleSlider = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = 134;
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth"
            });
        }
    };

    useEffect(() => {
        checkScrollPosition();
        window.addEventListener("resize", checkScrollPosition);
        return () => window.removeEventListener("resize", checkScrollPosition);
    }, []);

    return (
        <div className="summary-card-slider">
            {!isMobile && (
                <Button
                    variant="text"
                    className="button-slider -left"
                    leftIcon={<Icon name="arrow-left" size={24} color="#666" />}
                    onClick={() => handleSlider("left")}
                    disabled={isAtStart}
                    aria-label="이전 카드"
                />
            )}

            <div
                className={`summary-card-wrap ${isMobile ? "-mobile" : "-pc"}`}
                ref={scrollRef}
                onScroll={checkScrollPosition}
            >
                <Space size={12} style={{ flexWrap: "nowrap" }}>
                    {children}
                </Space>
            </div>

            {!isMobile && (
                <Button
                    variant="text"
                    className="button-slider -right"
                    leftIcon={<Icon name="arrow-right" size={24} color="#666" />}
                    onClick={() => handleSlider("right")}
                    disabled={isAtEnd}
                    aria-label="다음 카드"
                />
            )}
        </div>
    );
};

type SummaryCardCompound = typeof SummaryCardMain & {
    Slider: typeof SummaryCardSlider;
    displayName?: string;
};

export const SummaryCard = Object.assign(SummaryCardMain, {
    Slider: SummaryCardSlider,
}) as SummaryCardCompound;

SummaryCard.displayName = "SummaryCard";
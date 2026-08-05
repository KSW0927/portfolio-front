import { type ReactNode, useState } from 'react';
import { Outlet } from 'react-router-dom';
import cn from 'classnames';
import { useMenuStore } from "@/store/menuStore";

import { GNB, Typography, Icon, Button } from '@/components';
import { useIsMobile } from "@/hooks/useIsMobile";


/**
 * Layout.Row 컴포넌트 속성 (Props)
 * @interface LayoutRowProps
 */
export interface LayoutRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** * 레이아웃 방향
   * - horizontal (가로 배치, 기본값)
   * - vertical (세로 배치)
   */
  layout?: "horizontal" | "vertical";
  /** 자식 요소 간의 간격 (gap) */
  gap?: number | string;
  /** 주축 정렬 방식 (justify-content) */
  justify?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
  children?: ReactNode;
}

/**
 * 유연한 컨텐츠 배치를 위한 Flex 컨테이너 (Row)
 */
const Row = ({ layout = "horizontal", gap = "2.0rem", justify, className = "", style, children, ...rest }: LayoutRowProps) => {
  const rowStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: layout === "vertical" ? "column" : "row",
    justifyContent: justify,
    gap: gap,
    ...style,
  };

  const classes = ["layout-row", className].filter(Boolean).join(" ");

  return (
      <div className={classes} style={rowStyle} {...rest}>
        {children}
      </div>
  );
};


/**
 * Layout.Col 컴포넌트 속성 (Props)
 * @interface LayoutColProps
 */
export interface LayoutColProps extends React.HTMLAttributes<HTMLDivElement> {
  /** * 레이아웃 방향
   * - horizontal (가로 배치)
   * - vertical (세로 배치, 기본값)
   */
  layout?: "horizontal" | "vertical";
  /** 컬럼의 고정 너비 (미지정 시 flex: 1) */
  width?: number | string;
  /** 자식 요소 간의 간격 (gap) */
  gap?: number | string;
  children?: ReactNode;
}

/**
 * 유연한 컨텐츠 배치를 위한 Flex 아이템 (Col)
 */
const Col = ({ layout = "vertical", width, className = "", gap, style, children, ...rest }: LayoutColProps) => {
  const colStyle: React.CSSProperties = {
    flex: width !== undefined ? "none" : 1,
    display: "flex",
    flexDirection: layout === "vertical" ? "column" : "row",
    width: width,
    gap: gap,
    minWidth: 0,
    ...style,
  };

  const classes = ["layout-col", className].filter(Boolean).join(" ");

  return (
      <div className={classes} style={colStyle} {...rest}>
        {children}
      </div>
  );
};

const Main = () => {
  const { nowMenuTitle } = useMenuStore();

  const extra = false;

  /* 상태 정의 */
  const isMobile = useIsMobile();
  // 즐겨찾기 - 현재는 페이지별 저장 없이 헤더 버튼 토글 상태만 유지
  const [isFavorite, setIsFavorite] = useState(false);
  const handleToggleFavorite = () => setIsFavorite(!isFavorite);

  return (
      <div className="wrap dashboard">
        <GNB />

        <div className="container">
          <main className="content">
            <div className="content-inner">
              {nowMenuTitle && (
                <div className="content-header">
                  <div className='title-wrapper'>
                    <Typography variant={isMobile ? "heading-md" : "heading-xl"} as="h2">{nowMenuTitle}</Typography>
                    <Button
                        variant="text"
                        leftIcon={<Icon name="star-filled" size={isMobile ? 25 : 32} />}
                        className={cn("button-fav", { "-active": isFavorite })}
                        aria-label='즐겨찾기'
                        onClick={handleToggleFavorite}
                    />
                  </div>
                  {extra && (
                      <div className="extra-wrapper">
                        {extra}
                      </div>
                  )}
                </div>
              )}
              <div className='content-body'>
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
  );
};
export default Main;

export const Layout = Object.assign(Main, {
  Row,
  Col,
});
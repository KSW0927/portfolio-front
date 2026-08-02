import type { WidgetCardProps } from "@/types/types.ts";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

const BANNER_LIST = [
    "/src/assets/img/temp/temp_banner-1.png",
    "/src/assets/img/temp/temp_banner-2.png",
    "/src/assets/img/temp/temp_banner-3.png",
];


/**
 * 배너 위젯 컴포넌트
 * @description
 */
export const BannerWidget = (props: WidgetCardProps) => {
    const {  } = props;


    /* 상태 정의 */


    /* 이벤트 정의 */



    return (
        <>
            <div className="widget-banner-content">
                <Swiper
                    modules={[Pagination, Autoplay]}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    loop={true}
                    className="banner-swiper"
                >
                    {BANNER_LIST.map((imgSrc, index) => (
                        <SwiperSlide key={index}>
                            <div className="banner-img-wrap">
                                <img src={imgSrc} alt={`배너 ${index + 1}`} />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
}
BannerWidget.displayName = 'BannerWidget';


import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination'; 

import Illust from '../../assets/image/robotos-illust-left.png';

import AllIcon from '../../assets/category-image/all.png';
import FoodIcon from '../../assets/category-image/food.png';
import ManuFacturingIcon from '../../assets/category-image/manufacturing.png';
import OtherIcon from '../../assets/category-image/other.png';
import RentalIcon from '../../assets/category-image/rentals.png';
import RetailIcon from '../../assets/category-image/retail.png';
import ServicesIcon from '../../assets/category-image/services.png';

import styled from 'styled-components';

const SlideWrap=styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    span{
        display: block;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
    }
    .active-slide{
        background: red;
    }
`
const CategoryWrap=styled.div`
    width: 110px;
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: ease-in-out .3s;
    img{
        width: 96px;
    }
    border-radius: 20px;
`

const SildeBg1=styled.div`
    width: 100%;
    height: 500px;
    background: rgb(255,255,255);
    background: linear-gradient(331deg, rgba(255,255,255,1) 0%, rgba(69,74,252,1) 100%);
`

const SildeBg2=styled.div`
    width: 100%;
    height: 500px;
    background: rgb(255,255,255);
    background: linear-gradient(331deg, rgba(255,255,255,1) 0%, rgba(45,0,235,1) 100%);
`

const SlideContentsWrap=styled.div`
    width: 100%;
    position: absolute;
    top: 50%;
    
    transform: translateY(-50%);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-around;
    h2{
        font-size: 70px;
        font-weight: bold;
        margin-bottom: 50px;
    }
    p{
        font-size: 30px;
        font-weight: bold;
    }
    img{
        width: 400px;
    }
`

const SwiperCustomWrap=styled.div`
    max-width: 1920px;
    position: relative;
    height: 160px;
    display: flex;
    align-items: center;
    margin: 0 auto;
    .swiper{max-width: 1440px !important; height: 200px !important;}
    .swiper-slide{
        span{
            position: relative;
            &::after{
                content: "";
                position: absolute;
                width: 0;
                height: 5px;
                bottom: -5px;
                left: 50%;
                transform: translateX(-50%);
                background: #07E3F1;
                transition: ease-in-out .3s;
            }
        }
    }
    .focused-slide{
        .effect-img{
            transform: translateY(-10px);
        }
        span::after{
            width: 80%;
        }
    }
`

export const BannerSwiper = () => {
    return (
        <Swiper
            autoplay={{ delay: 5000 }}
            cssMode={true}
            speed={500}
            loop={true}
            modules={[Navigation, Pagination, Autoplay]}
        >
            <SwiperSlide>
                <SlideWrap className='slide-wrap'>
                    <SildeBg1></SildeBg1>
                    <SlideContentsWrap>
                        <div>
                            <h2>비즈니스 및 업무</h2>
                            <p>
                                원격 근무 및 스타트업의 이미지부터 작업 중인 엔지니어 및 아티스트의 <br/>
                                사진에 이르기까지 다양한 형태로 현대 작업 공간의 현실을 반영합니다.
                            </p>
                        </div>
                        <div>
                            <img src={Illust} alt="illust"/>
                        </div>
                        
                    </SlideContentsWrap>
                </SlideWrap>
            </SwiperSlide>
            <SwiperSlide>
                <SlideWrap className='slide-wrap'>
                    <SildeBg2></SildeBg2>
                    <SlideContentsWrap>
                        <div>
                            <h2>비즈니스 및 업무</h2>
                            <p>
                                원격 근무 및 스타트업의 이미지부터 작업 중인 엔지니어 및 아티스트의 <br/>
                                사진에 이르기까지 다양한 형태로 현대 작업 공간의 현실을 반영합니다.
                            </p>
                        </div>
                        <div>
                            <img src={Illust} alt="illust"/>
                        </div>
                    </SlideContentsWrap>
                </SlideWrap>
            </SwiperSlide>
        </Swiper>
    );
};

export const CategorySwiper = () => {
    const categoryImage = [
        AllIcon,
        FoodIcon,
        ManuFacturingIcon,
        OtherIcon,
        RentalIcon,
        RetailIcon,
        ServicesIcon,
        AllIcon,
        FoodIcon,
        ManuFacturingIcon,
        OtherIcon,
        RentalIcon,
        RetailIcon,
        ServicesIcon,
    ];
    const [activeSlide, setActiveSlide] = useState(0);
    const handleSlideIndex = (swiper) => {
        /* console.log("현재 활성화된 슬라이드 인덱스:", swiper.activeIndex); */
        setActiveSlide(swiper.activeIndex);
    };

    return(
        <SwiperCustomWrap >
            <Swiper
                autoplay={{
                    delay: 3000,
                }}
                cssMode={true}
                speed={500}
                loop={false}
                spaceBetween={180}
                modules={[Autoplay, Pagination, Navigation]}
                pagination={false}
                navigation={false}
                touchRatio={0}
                onSlideChange={handleSlideIndex}
                slidesPerView={5}
                allowTouchMove={false}
            >
                {categoryImage.map((item, index) => (
                    <SwiperSlide key={index} className={Math.abs(activeSlide + 2) === index ? 'focused-slide' : ''}>
                        <SlideWrap>
                            <div>
                                <CategoryWrap className='effect-img'>
                                    <img src={categoryImage[index]} alt={`${item}아이콘`} />
                                </CategoryWrap>
                                <span></span>
                            </div>
                        </SlideWrap>
                    </SwiperSlide>
                ))}
            </Swiper>
        </SwiperCustomWrap>
    );
};
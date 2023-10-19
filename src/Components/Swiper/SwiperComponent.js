import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination'; 

// import Illust01 from '../../assets/image/illust_01.png';
// import Illust02 from '../../assets/image/illust_02.png';
import { ReactComponent as Illust01 } from '../../assets/image/visualImage1.svg';
import Illust02 from '../../assets/image/illust_02.png';

import AllIcon from '../../assets/category-image/all.png';
import FoodIcon from '../../assets/category-image/food.png';
import ManuFacturingIcon from '../../assets/category-image/manufacturing.png';
import OtherIcon from '../../assets/category-image/other.png';
import RentalIcon from '../../assets/category-image/rentals.png';
import RetailIcon from '../../assets/category-image/retail.png';
import ServicesIcon from '../../assets/category-image/services.png';

import styled, { keyframes } from 'styled-components';

import { FcIdea } from 'react-icons/fc';
import { BsCheck2Square } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import useScrollFadeIn from '../../Hook/useScrollFadeIn';

const moveUp = keyframes`
  0%, 100% {
    top: 10px;
  }
  50% {
    top: -15px;
  }
`;

const wideLine = keyframes`
  0%{
    width: 0;
  }
  100% {
    width: calc(100% + 8px);
  }
`;

const SlideFram=styled.div`
    width: 100%;
    height: 500px;
    position: relative;
        .custom-pagination{
            position: absolute;
            width: 100%;
            top: 90% !important;
            display: flex;
            justify-content: center;
            z-index: 900;
        }
        .custom_bullet{
            width: clamp(80px, 9vw, 126px);
            height: clamp(5px, 1vw, 15px);
            background: #fff;
            opacity: .5;
            margin: 0 20px;
            transition: .3s;
            cursor: pointer;
        }
        .swiper-pagination-custom-bullet-active{
            width: clamp(80px, 9vw, 126px);
            height: clamp(5px, 1vw, 15px);
            background: #fff;
            opacity: 1;
        }
`
const SlideWrap1=styled.div`
    width: 100%;
    height: 500px;
    position: relative;
    span{
        display: block;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
    }
`
const Container=styled.div`
    max-width: 1440px;
    width: 100%;
    height: 500px;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
`
const SildeBg1=styled.div`
    width: 100%;
    height: 100%;
    background: rgb(13,115,255);
    background: linear-gradient(49deg, rgba(13,115,255,1) 0%, rgba(187,227,255,1) 100%);
`

const SildeBg2=styled.div`
    width: 100%;
    height: 100%;
    background: rgb(255,255,255);
    background: linear-gradient(331deg, rgba(255,255,255,1) 0%, rgba(45,0,235,1) 100%);
`

const SlideContentsWrap=styled.div`
    width: 100%;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    img{
        width: 400px;
    }
    .imgBox {
        width: 450px;
    }
    
`
const TitleBox=styled.div`
    position: relative;
    display: inline-block;
    h2{
        font-size: 70px;
        font-weight: bold;
        margin-bottom: 50px;
    }
`
const IconBox=styled.div`
    position: absolute;
    right: -75px;
    top: 5px;
    svg{
        font-size: 60px;
    }
    animation: ${moveUp} 2s ease-in-out infinite;
`
const ContentsBox=styled.div`
    margin-bottom: 50px;
    p:first-child{
        margin-bottom: 5px;
    }
    p{
        font-size: 30px;
        font-weight: bold;
        >i{
            display: inline-block;
            font-style: normal;
            position: relative;
            margin: 0 5px;
            &::before{
                content: "";
                position: absolute;
                bottom: 1px;
                left: -4px;
                /* width: calc(100% + 8px); */
                width: 0;
                height: 10px;
                background: #ffb600;
                animation: ${wideLine} 1.3s ease-out forwards;
            }
    }
    span{
        position: relative;
        font-size: 30px;
        font-weight: bold;
    }
    }
`
const BtnBox=styled.div`
    display: flex;
    >div:first-child{
        margin-right: 20px;
        background: #333;
        a{
            color: #fff;
        }
        svg{
            color: #fff;
        }
    }
`
const BtnItem=styled.div`
    a{
        display: flex;
        align-items: center;
    }
    svg{
        margin-right: 5px;
        color: navy;
    }
    display: flex;
    align-items: center;
    width: auto;
    height: 50px;
    background: #fff;
    box-sizing: border-box;
    padding: 0px 20px;
    border-radius: 15px;
    color: #000;
    font-size: 18px;
`


/* Category Swiper */
const SwiperCustomWrap=styled.div`
    max-width: 1920px;
    position: relative;
    height: 160px;
    display: flex;
    align-items: center;
    margin: 0 auto;
    .swiper{max-width: 1440px !important; height: 200px !important;}
    .swiper-slide{
        width: 100%;
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
const SlideWrap2=styled.div`
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
    /* .active-slide{
        background: red;
    } */
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

export const BannerSwiper = () => {

    const fadeIn1 = useScrollFadeIn('left', 1, 0);
    const fadeIn2 = useScrollFadeIn('up', 1, 200);
    const fadeIn3 = useScrollFadeIn('up', 1, 400);
    const fadeIn4 = useScrollFadeIn('up', 1, 0);

    const fadeIn5 = useScrollFadeIn('left', 1, 0);
    const fadeIn6 = useScrollFadeIn('up', 1, 200);
    const fadeIn7 = useScrollFadeIn('up', 1, 400);
    const fadeIn8 = useScrollFadeIn('up', 1, 0);
    

    return (
        <SlideFram>
                <Swiper
                    /* autoplay={{ delay: 10000 }} */
                    autoplay={false}
                    cssMode={true}
                    speed={500}
                    loop={false}
                    modules={[Navigation, Pagination, Autoplay]}
                    /* pagination={true} */
                    navigation={false}
                    /* allowTouchMove={false} */
                    pagination={{
                        el:'.custom-pagination',
                        clickable: true,
                        bulletClass:"custom_bullet",
                        bulletActiveClass: "swiper-pagination-custom-bullet-active",
                        renderBullet: function (index, className) {
                            return '<div class="'+className+'"></div>'
                        },
                    }}
                >
                    <SwiperSlide>
                        <SlideWrap1 className='slide-wrap'>
                            <SildeBg1></SildeBg1>
                            <Container>
                            <SlideContentsWrap>
                                <div ref={fadeIn4.ref} style={fadeIn4.style}>
                                    <TitleBox>
                                        <h2>후핀 투자 파트너</h2>
                                        <IconBox><FcIdea/></IconBox>
                                    </TitleBox>
                                    <ContentsBox>
                                        <p>다음 단계를 위한 협력 가능한 <i><span>투자 파트너</span></i>를 찾아보세요</p>
                                        <p>기업의 고민을 해결해 드리는 전문가와 연결해 드립니다</p>
                                    </ContentsBox>
                                    <BtnBox>
                                        <BtnItem ref={fadeIn2.ref} style={fadeIn2.style}><Link to="/investment/ongoing"><BsCheck2Square/>투자자 찾기</Link></BtnItem>
                                        <BtnItem ref={fadeIn3.ref} style={fadeIn3.style}><Link to="/member_type"><BsCheck2Square/>간편회원가입</Link></BtnItem>
                                    </BtnBox>
                                </div>
                                <div ref={fadeIn1.ref} style={fadeIn1.style}>
                                    {/* <img src={Illust01} alt="illust"/> */}
                                    <div className='imgBox'>
                                        <Illust01 />
                                    </div>
                                </div>
                            </SlideContentsWrap>
                            </Container>
                        </SlideWrap1>
                    </SwiperSlide>
                    <SwiperSlide>
                        <SlideWrap1 className='slide-wrap'>
                            <SildeBg2></SildeBg2>
                            <Container>
                                <SlideContentsWrap>
                                    <div ref={fadeIn8.ref} style={fadeIn8.style}>
                                        <TitleBox>
                                            <h2>후핀 투자 파트너</h2>
                                            <IconBox><FcIdea/></IconBox>
                                        </TitleBox>
                                        <ContentsBox>
                                            <p>다음 단계를 위한 협력 가능한 <i><span>투자 파트너</span></i>를 찾아보세요</p>
                                            <p>기업의 고민을 해결해 드리는 전문가와 연결해 드립니다</p>
                                        </ContentsBox>
                                        <BtnBox>
                                            <BtnItem ref={fadeIn6.ref} style={fadeIn6.style}><Link to="/investment/ongoing"><BsCheck2Square/>투자자 찾기</Link></BtnItem>
                                            <BtnItem ref={fadeIn7.ref} style={fadeIn7.style}><Link to="/member_type"><BsCheck2Square/>간편회원가입</Link></BtnItem>
                                        </BtnBox>
                                    </div>
                                    <div ref={fadeIn5.ref} style={fadeIn5.style}>
                                        <img src={Illust02} alt="illust"/>
                                    </div>
                                </SlideContentsWrap>
                            </Container>
                        </SlideWrap1>
                    </SwiperSlide>
                </Swiper>
            
            <div className="custom-pagination">
                <div className='custom_bullet'></div>
                <div className='custom_bullet swiper-pagination-custom-bullet-active'></div>
            </div>    
        </SlideFram>
    );
};

export const CategorySwiper = () => {
    const categoryImage = [
        /* { name: "", icon: AllIcon}, */
        { name: "외식", icon: FoodIcon},
        { name: "제조", icon: ManuFacturingIcon},
        { name: "기타", icon: OtherIcon},
        { name: "대여", icon: RentalIcon},
        { name: "운송", icon: RetailIcon},
        { name: "서비스", icon: ServicesIcon},
        /* { name: "", icon: AllIcon}, */
        { name: "외식", icon: FoodIcon},
        { name: "제조", icon: ManuFacturingIcon},
        { name: "기타", icon: OtherIcon},
        { name: "대여", icon: RentalIcon},
        { name: "운송", icon: RetailIcon},
        { name: "서비스", icon: ServicesIcon},
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
                    <React.Fragment key={index}>
                        <SwiperSlide className={Math.abs(activeSlide + 2) === index ? 'focused-slide' : ''}>
                            <SlideWrap2>
                                <div>
                                    <CategoryWrap className='effect-img'>
                                        <img src={item.icon} alt={`${item}아이콘`} />
                                    </CategoryWrap>
                                    <div style={{marginTop:'5px',marginBottom:'10px', textAlign:'center'}}>{item.name}</div>
                                    <span></span>
                                </div>
                            </SlideWrap2>
                        </SwiperSlide>
                    </React.Fragment>
                ))}
            </Swiper>
        </SwiperCustomWrap>
    );
};
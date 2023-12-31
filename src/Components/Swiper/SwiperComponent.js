import React, { useEffect, useRef, useState } from 'react';

/* Hook */
import useScrollFadeIn from '../../Hook/useScrollFadeIn';

/* Swiper */
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination'; 

/* Image */
import { ReactComponent as Illust01 } from '../../assets/image/visualImage1.svg';
import { ReactComponent as Illust02 } from '../../assets/image/visualImage2.svg';
/* import Illust02 from '../../assets/image/illust_02.png'; */

import FoodIcon from '../../assets/category-image/food.png';
import ManuFacturingIcon from '../../assets/category-image/manufacturing.png';
import OtherIcon from '../../assets/category-image/other.png';
import RentalIcon from '../../assets/category-image/rentals.png';
import RetailIcon from '../../assets/category-image/retail.png';
import ServicesIcon from '../../assets/category-image/services.png';

/* Styled-Components */
import styled, { keyframes } from 'styled-components';

/* React-Icons */
import { FcIdea } from 'react-icons/fc';
import { BsCheck2Square } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import PremiumAdCard from '../Advertisement/PremiumAdCard';
import SpecialAdCard from '../Advertisement/SpecialAdCard';
import BannerAdCard from '../Advertisement/BannerAdCard';

/*-----------------------------------------------*\
          Styled-Components : Keyframes
\*-----------------------------------------------*/
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

/*-----------------------------------------------*\
                Main Banner : Styled
\*-----------------------------------------------*/
const SlideFram=styled.div`
    max-width: 1440px;
    height: 500px;
    margin: 0 auto;
    position: relative;
        .custom-pagination{
            position: absolute;
            width: 100%;
            top: 92% !important;
            display: flex;
            justify-content: center;
            z-index: 900;
        }
        .custom_bullet{
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background: #fff;
            opacity: .5;
            margin: 0 10px;
            transition: .3s;
            cursor: pointer;
        }
        .swiper-pagination-custom-bullet-active{
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
    justify-content: space-around;
    /* img{
        width: 400px;
    }
    .imgBox1 {
        width: 450px;
    }
    .imgBox2 {
        width: 520px;
    } */
    
`
const ImgBox=styled.div`
    width: 450px;
`
const TitleBox=styled.div`
    position: relative;
    display: inline-block;
    h2{
        font-size: 50px;
        font-weight: bold;
        margin-bottom: 50px;
    }
`
const IconBox=styled.div`
    position: absolute;
    right: -65px;
    top: 5px;
    svg{
        font-size: 50px;
    }
    animation: ${moveUp} 2s ease-in-out infinite;
`
const ContentsBox=styled.div`
    margin-bottom: 50px;
    p:first-child{
        margin-bottom: 5px;
    }
    p{
        font-size: 25px;
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
    a{
        >div{
            transition: none !important;
            transition-property: all !important;
            transition-duration: .2s !important;
            transition-timing-function: ease-in-out !important;
            transition-delay: none !important;
        }
    }
    a:first-child{
        margin-right: 20px;
        >div{
            background: #333;
            color: #fff;
            svg{
                color: #fff;
            }
        }
    }
    a:first-child:hover{
        >div{
            background: #000;
        }
    }
    a:nth-child(2):hover{
        >div{
            background: #e4e4e4;
        }
    }
`
const BtnItem=styled.div`
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
    svg{
        margin-right: 5px;
        color: navy;
    }
`

export const BannerSwiper = () => {

    /* 1st Slide Hook */
    const fadeIn1 = useScrollFadeIn('left', 1, 0);
    const fadeIn2 = useScrollFadeIn('up', 1, 200);
    const fadeIn3 = useScrollFadeIn('up', 1, 400);
    const fadeIn4 = useScrollFadeIn('up', 1, 0);

    /* 2nd Slide Hook */
    const fadeIn5 = useScrollFadeIn('left', 1, 0);
    const fadeIn6 = useScrollFadeIn('up', 1, 200);
    const fadeIn7 = useScrollFadeIn('up', 1, 400);
    const fadeIn8 = useScrollFadeIn('up', 1, 0);

    return (
        <SlideFram>
                <Swiper
                    /* autoplay={{ delay: 5000 }} */
                    autoplay={false}
                    cssMode={true}
                    speed={500}
                    loop={true}
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation={false}
                    allowTouchMove={false}
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
                                        <h2>당신의 파트너</h2>
                                        <IconBox><FcIdea/></IconBox>
                                    </TitleBox>
                                    <ContentsBox>
                                        <p>다음 단계를 위한 협력 가능한 <i><span>파트너</span></i>를 찾아보세요</p>
                                        <p>기업의 고민을 해결해 드리는 전문가와 연결해 드립니다</p>
                                    </ContentsBox>
                                    <BtnBox>
                                        <Link to="/investment/ongoing"><BtnItem ref={fadeIn2.ref} style={fadeIn2.style}><BsCheck2Square/>파트너 찾기</BtnItem></Link>
                                        <Link to="/signup"><BtnItem ref={fadeIn3.ref} style={fadeIn3.style}><BsCheck2Square/>간편회원가입</BtnItem></Link>
                                    </BtnBox>
                                </div>
                                <ImgBox ref={fadeIn1.ref} style={fadeIn1.style}>
                                    <div className='imgBox'>
                                        <Illust01 />
                                    </div>
                                </ImgBox>
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
                                            <h2>당신의 파트너</h2>
                                            <IconBox><FcIdea/></IconBox>
                                        </TitleBox>
                                        <ContentsBox>
                                            <p>다음 단계를 위한 협력 가능한 <i><span>파트너</span></i>를 찾아보세요</p>
                                            <p>기업의 고민을 해결해 드리는 전문가와 연결해 드립니다</p>
                                        </ContentsBox>
                                        <BtnBox>
                                            <Link to="/investment/ongoing"><BtnItem ref={fadeIn6.ref} style={fadeIn6.style}><BsCheck2Square/>파트너 찾기</BtnItem></Link>
                                            <Link to="/signup"><BtnItem ref={fadeIn7.ref} style={fadeIn7.style}><BsCheck2Square/>간편회원가입</BtnItem></Link>
                                        </BtnBox>
                                    </div>
                                    <ImgBox ref={fadeIn5.ref} style={fadeIn5.style}>
                                        <div className='imgBox'>
                                            <Illust02 />
                                        </div>
                                    </ImgBox>
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

/*-----------------------------------------------*\
              Category Banner : Styled
\*-----------------------------------------------*/
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
        p{
            opacity: 1;
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
const NameBox=styled.div`
    p{
        margin-top: 5px;
        margin-bottom: 10px;
        text-align: center;
        font-weight: bold;
        font-size: 20px;
        opacity: 0;
        transition: .3s ease-in-out;
    }
`
/* 테스트 */
export const CategorySwiper = () => {
    const categoryImage  = [
        { id: 1, name: "외식", icon: FoodIcon},
        { id: 2, name: "제조", icon: ManuFacturingIcon},
        { id: 3, name: "대여", icon: RentalIcon},
        { id: 4, name: "유통", icon: RetailIcon},
        { id: 5, name: "서비스", icon: ServicesIcon},
        { id: 6, name: "기타", icon: OtherIcon},
        { id: 7, name: "외식", icon: FoodIcon},
        { id: 8, name: "제조", icon: ManuFacturingIcon},
        { id: 9, name: "대여", icon: RentalIcon},
        { id: 10, name: "유통", icon: RetailIcon},
        { id: 11, name: "서비스", icon: ServicesIcon},
        { id: 12, name: "기타", icon: OtherIcon},
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
                {categoryImage.map((item, index) => {
                    /* console.log('index',item.id); */
                    return (
                        <SwiperSlide key={item.id}>
                            <SlideWrap2 >
                                    <div className={Math.abs(activeSlide + 2) === index ? 'focused-slide' : ''}>
                                        <CategoryWrap className='effect-img'>
                                            <img src={item.icon} alt={`${item}아이콘`} />
                                        </CategoryWrap>
                                        <NameBox className={Math.abs(activeSlide + 2) === index ? 'focused-slide' : ''}>
                                            <p>{item.name}</p>
                                        </NameBox>
                                        <span></span>
                                    </div>
                            </SlideWrap2>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </SwiperCustomWrap>
    );
};


const SwiperPrAdWrap = styled.div`
    /* max-width: 1030px; */
    max-width: 1042px;
    position: relative;
    .swiper-wrapper{
        display: flex;
    }
    .swiper-slide{
        padding-top: 2px;
        padding-bottom: 2px;
        box-sizing: border-box;
    }
`
const PrAdCardFrame = styled.div`
    height: 100%;
`

const CardTrack = styled.div`
    display: flex;
`

export const PremiumAdCardSwiper = () => {

    const PremiumAdList = [
        { id: 1, title: "타이틀1", company: "ㅇㅇ컴퍼니1", content: "프리미엄 광고 콘텐츠1", region: "화성", tel: "010-1234-1234" },
        { id: 2, title: "타이틀2", company: "ㅇㅇ컴퍼니2", content: "프리미엄 광고 콘텐츠2", region: "서울", tel: "010-1234-1234" },
        { id: 3, title: "타이틀3", company: "ㅇㅇ컴퍼니3", content: "프리미엄 광고 콘텐츠3", region: "서울", tel: "010-1234-1234" },
        { id: 4, title: "타이틀4", company: "ㅇㅇ컴퍼니4", content: "프리미엄 광고 콘텐츠4", region: "서울", tel: "010-1234-1234" },
        { id: 5, title: "타이틀5", company: "ㅇㅇ컴퍼니5", content: "프리미엄 광고 콘텐츠5", region: "서울", tel: "010-1234-1234" },
        { id: 6, title: "타이틀6", company: "ㅇㅇ컴퍼니6", content: "프리미엄 광고 콘텐츠6", region: "서울", tel: "010-1234-1234" },
        { id: 7, title: "타이틀7", company: "ㅇㅇ컴퍼니7", content: "프리미엄 광고 콘텐츠7", region: "서울", tel: "010-1234-1234" },
        { id: 8, title: "타이틀8", company: "ㅇㅇ컴퍼니8", content: "프리미엄 광고 콘텐츠8", region: "서울", tel: "010-1234-1234" },
    ];

    return (
        <SwiperPrAdWrap>
            <PrAdCardFrame>
                <Swiper
                    /* autoplay={{
                        delay: 1000,
                        disableOnInteraction: false
                    }} */
                    /* autoplay={{
                        enabled: true,
                        delay: 3000,          
                        pauseOnMouseEnter: true,
                        disableOnInteraction: false,
                    }} */
                    autoplay={false}
                    /* cssMode={true} */
                    speed={500}
                    loop={true}
                    /* loopedSlidesLimit={false} */
                    /* loopedSlides={3} */

                    /* swiper-slide에 각각 margin-right를 준다. */
                    spaceBetween={10}

                    /* 전체적인 슬라이드의 왼쪽에 px단위로 공백을 준다. */
                    slidesOffsetBefore={2}

                    /* 전체적인 슬라이드의 오른쪽에 px단위로 공백을 준다. */
                    slidesOffsetAfter={0}

                    modules={[Navigation, Pagination, Autoplay]}
                    navigation={false}
                    allowTouchMove={false}
                    slidesPerView={3}
                    /* slidesPerGroup={1} */
                >   
                    <CardTrack >
                        {PremiumAdList.map((item, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <PremiumAdCard
                                        adTitle={item.title}
                                        adCompany={item.company}
                                        adContent={item.content}
                                        adTel={item.tel}
                                    />
                                </SwiperSlide>
                            )
                        })}
                    </CardTrack>
                    
                </Swiper>
            </PrAdCardFrame>
        </SwiperPrAdWrap>
    )
};

const SwiperSpAdWrap = styled.div`
    height: 300px;
    .swiper{
        height: 300px;
        padding-top: 2px;
        padding-left: 5px;
        padding-right: 5px;
    }
    .swiper-wrapper{
        
    }
    .swiper-slide{

    }
`
const SpAdCardFrame = styled.div`
    
`

const SpCardTrack = styled.div`
    
`

export const SpecialAdCardSwiper = () => {

    const SpecialAdList = [
        { id: 1, title: "타이틀1", company: "ㅇㅇ컴퍼니1", content: "스페셜 광고 콘텐츠1", region: "화성", tel: "010-1234-1234" },
        { id: 2, title: "타이틀2", company: "ㅇㅇ컴퍼니2", content: "스페셜 광고 콘텐츠2", region: "서울", tel: "010-1234-1234" },
        { id: 3, title: "타이틀3", company: "ㅇㅇ컴퍼니3", content: "스페셜 광고 콘텐츠3", region: "서울", tel: "010-1234-1234" },
        { id: 4, title: "타이틀4", company: "ㅇㅇ컴퍼니4", content: "스페셜 광고 콘텐츠4", region: "서울", tel: "010-1234-1234" },
        { id: 5, title: "타이틀5", company: "ㅇㅇ컴퍼니5", content: "스페셜 광고 콘텐츠5", region: "서울", tel: "010-1234-1234" },
        { id: 6, title: "타이틀6", company: "ㅇㅇ컴퍼니6", content: "스페셜 광고 콘텐츠6", region: "서울", tel: "010-1234-1234" },
        { id: 7, title: "타이틀7", company: "ㅇㅇ컴퍼니7", content: "스페셜 광고 콘텐츠7", region: "서울", tel: "010-1234-1234" },
        { id: 8, title: "타이틀8", company: "ㅇㅇ컴퍼니8", content: "스페셜 광고 콘텐츠8", region: "서울", tel: "010-1234-1234" },
    ];

    return (
        <SwiperSpAdWrap>
            <SpAdCardFrame>
                <Swiper
                    direction="vertical"
                    /* autoplay={{
                        delay: 5000,
                    }} */
                    autoplay={false}
                    /* cssMode={true} */
                    speed={800}
                    loop={true}
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation={false}
                    allowTouchMove={false}
                    slidesPerView={2}

                    /* swiper-slide에 각각 margin-right를 준다. */
                    spaceBetween={12}

                    /* 전체적인 슬라이드의 왼쪽에 px단위로 공백을 준다. */
                    slidesOffsetBefore={0}
                    

                    /* 전체적인 슬라이드의 오른쪽에 px단위로 공백을 준다. */
                    slidesOffsetAfter={0}
                >   
                    <SpCardTrack >
                        {SpecialAdList.map((item, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <SpecialAdCard
                                        adTitle={item.title}
                                        adCompany={item.company}
                                        adContent={item.content}
                                        adTel={item.tel}
                                    />
                                </SwiperSlide>
                            )
                        })}
                    </SpCardTrack>
                    
                </Swiper>
            </SpAdCardFrame>
        </SwiperSpAdWrap>
    )
};


const SwiperBnAdWrap = styled.div`
    max-width: 1280px;
    margin: 0 auto;
    .swiper{
        
    }
    .swiper-wrapper{
        
    }
    .swiper-slide{
        /* width: 600px !important; */
    }
`
const BnAdCardFrame = styled.div`
    
`

const BnCardTrack = styled.div`
    
`

export const BannerAdCardSwiper = () => {

    const BannerAdList = [
        { id: 1, title: "타이틀1", company: "ㅇㅇ컴퍼니1", content: "배너 광고 콘텐츠1", region: "화성", tel: "010-1234-1234", backgound: "orange" },
        { id: 2, title: "타이틀2", company: "ㅇㅇ컴퍼니2", content: "배너 광고 콘텐츠2", region: "서울", tel: "010-1234-1234", backgound: "blue" },
        { id: 3, title: "타이틀3", company: "ㅇㅇ컴퍼니3", content: "배너 광고 콘텐츠3", region: "서울", tel: "010-1234-1234", backgound: "purple" },
        { id: 4, title: "타이틀4", company: "ㅇㅇ컴퍼니4", content: "배너 광고 콘텐츠4", region: "서울", tel: "010-1234-1234", backgound: "pink" },
    ];

    return (
        <SwiperBnAdWrap>
            <BnAdCardFrame>
                <Swiper
                    autoplay={{
                        delay: 7000,
                    }}
                    /* autoplay={false} */
                    /* cssMode={true} */
                    speed={800}
                    loop={true}
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation={false}
                    allowTouchMove={false}
                    slidesPerView={2}

                    /* swiper-slide에 각각 margin-right를 준다. */
                    spaceBetween={0}

                    /* 전체적인 슬라이드의 왼쪽에 px단위로 공백을 준다. */
                    slidesOffsetBefore={0}
                    

                    /* 전체적인 슬라이드의 오른쪽에 px단위로 공백을 준다. */
                    slidesOffsetAfter={0}
                >   
                    <BnCardTrack >
                        {BannerAdList.map((item, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <BannerAdCard
                                        backgound={item.backgound}
                                        content={item.content}
                                        company={item.company}
                                        tel={item.tel}
                                    />
                                </SwiperSlide>
                            )
                        })}
                    </BnCardTrack>
                </Swiper>
            </BnAdCardFrame>
        </SwiperBnAdWrap>
    )
};
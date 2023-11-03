import React, { useEffect, useState } from 'react';

/* Axios */
import axios from 'axios';

/* Components */
import Header from './Header';
import Footer from './Footer';
import BannerAd from './BannerAd';
import AdCard from './Advertisement/PremiumAdCard';

/* Swiper-Components */
import { BannerAdCardSwiper, BannerSwiper, CategorySwiper, PremiumAdCardSwiper, SpecialAdCardSwiper } from './Swiper/SwiperComponent';

/* React-Icons */
import { LuCheckCircle } from 'react-icons/lu';
import { BsCheck2Square } from 'react-icons/bs';

/* Hook */
import useScrollFadeIn from '../Hook/useScrollFadeIn';

/* Log */
import PageLog from '../Hook/PageLog'

/* Styled-Components */
import { 
    
    /* Category Section */
    StyledFrame, 
    AdContainer,



    CategorySection,
    CategoryContainer,
    CategoryContentsBox,

    /* Service Section */
    ServiceSection,
    ServiceContainer,
    ServiceBox,
    ServiceLeftBox,
    LeftImgBox,
    ImgItem01,
    ImgItem02,
    ServiceRightBox,
    RightContentsBox,
    RightTitle,
    RightTopContent,
    RightBottomContent,
    ServiceItemBox,
    ServiceItem,
    
    /* Bottom Section */
    BannerContainer,
    HomeImgBanner,
    LeftBannerBox,
    TopContent,
    BottomContent,
    ItemBox,
    RightBannerBox,
    ImgBox,
} from './StyledComponents/StyledHome';

/* Image */
import PhoneImg from '../assets/image/banner-phone-img.png';
import ServiceImg01 from '../assets/image/service-01.png';
import ServiceImg02 from '../assets/image/service-02.png';
import Loading from '../Effect/Loading';
import { useSelector } from 'react-redux';
import SpecialAdCard from './Advertisement/SpecialAdCard';
import BannerAdCard from './Advertisement/BannerAdCard';
import InvestOngoingBoard from './Board/InvestmentBoard/OngoingBoard';

const Home = ({parsedCommunityCategoryData}) => {

    /* Hook FadeIn */
    const fadeIn1 = useScrollFadeIn('up', 1, 500);
    const fadeIn2 = useScrollFadeIn('right', 1, 100);
    const fadeIn3 = useScrollFadeIn('up', 1, 200);
    const fadeIn4 = useScrollFadeIn('none', 1, 300);
    const fadeIn5 = useScrollFadeIn('none', 1, 300);
    const fadeIn6 = useScrollFadeIn('img', 1, 200);

   

    /* Basic */
    const baseURL = process.env.REACT_APP_BASEURL;
    const userUid = sessionStorage.getItem('userUid');

    /* Log API */
    const uid = userUid === null ? '' : userUid;

    ///// page log /////
    // PageLog("메인");

    /*-----------------------------------------------------*\
                        Console.log 테스트
    \*-----------------------------------------------------*/


    return (
            <React.Fragment>
                <Header parsedCommunityCategoryData={parsedCommunityCategoryData}/>
                    <StyledFrame>
                        <section>
                            <BannerSwiper/>
                        </section>
                        <section>
                            <AdContainer>
                                <PremiumAdCardSwiper></PremiumAdCardSwiper>
                                <div>
                                    <SpecialAdCardSwiper></SpecialAdCardSwiper>
                                </div>
                            </AdContainer>
                        </section>
                        <section style={{marginLeft:'40px',paddingBottom:'50px'}}>
                            <BannerAdCardSwiper></BannerAdCardSwiper>
                        </section>
                        <section>
                            <InvestOngoingBoard/>
                        </section>
                    </StyledFrame>
                <Footer/>
            </React.Fragment>
    );
};

export default Home;
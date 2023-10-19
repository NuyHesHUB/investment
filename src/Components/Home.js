import React, { useEffect, useState } from 'react';

/* React-Router-Dom */
import { Link } from 'react-router-dom';

/* Axios */
import axios from 'axios';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { setBoardData} from '../store/actions/actions';

/* Components */
import Header from './Header';
import Footer from './Footer';

/* Swiper-Components */
import { BannerSwiper, CategorySwiper } from './Swiper/SwiperComponent';

/* React-Icons */
import { LuCheckCircle } from 'react-icons/lu';
import { BsCheck2Square } from 'react-icons/bs';

/* Hook */
import useScrollFadeIn from '../Hook/useScrollFadeIn';

/* Styled-Components */
import { 
    StyledFrame, 
    CategorySection,
    CategoryContainer,
    CategoryContentsBox,


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
// import { ReactComponent as ServiceImg01 } from '../assets/image/visualImage1.svg';
// import ServiceImg02 from '../assets/image/service-02.png';

const Home = ({parsedCommunityCategoryData}) => {

    const fadeIn1 = useScrollFadeIn('up', 1, 500);
    const fadeIn2 = useScrollFadeIn('right', 1, 100);
    const fadeIn3 = useScrollFadeIn('up', 1, 200);
    const fadeIn4 = useScrollFadeIn('none', 1, 300);
    const fadeIn5 = useScrollFadeIn('none', 1, 300);
    const fadeIn6 = useScrollFadeIn('img', 1, 200);

    /* Basic */
    const baseURL = process.env.REACT_APP_BASEURL;
    const userUid = sessionStorage.getItem('userUid');
    const accessToken = sessionStorage.getItem('accessToken');
    const headers = {
        Authorization: `${accessToken}`
    };

    /* Log API */
    const uid = userUid === null ? '' : userUid;

    ///// page log /////
    useEffect(() => {
        axios.post(`${baseURL}/v1/log/movement/form`, { userUid: uid, "page":"메인" })
        .then((res) => {
        })
        .catch((error) => {
            console.error(error)
        })
    }, []);

    /*-----------------------------------------------------*\
                        Console.log 테스트
    \*-----------------------------------------------------*/
    //console.log('process.env.REACT_APP_BASEURL :',process.env.REACT_APP_BASEURL);
    //console.log('process.env.REACT_APP_KAKAOURI :',process.env.REACT_APP_KAKAOURI);
    //console.log('process.env.REACT_APP_NAVERURI :',process.env.REACT_APP_NAVERURI);
    //console.log('process.env.REACT_APP_TEST :',process.env.REACT_APP_TEST);
    
    /* console.log('home-test',parsedCategoryData); */
    /* const categoryImage = [
        { name: "외식" },
        { name: "제조" },
        { name: "기타" },
        { name: "대여" },
        { name: "운송" },
        { name: "서비스" },
        { name: "외식" },
        { name: "제조" },
        { name: "기타" },
        { name: "대여" },
        { name: "운송" },
        { name: "서비스" },
    ]; */


    return (
            <React.Fragment>
                <Header parsedCommunityCategoryData={parsedCommunityCategoryData}/>
                    <StyledFrame>
                            <section>
                                <BannerSwiper/>
                            </section>
                            <CategorySection>
                                <CategoryContainer>
                                    <CategoryContentsBox ref={fadeIn1.ref} style={fadeIn1.style}>
                                        <h2>투자 파트너를 다양한 <i>업종</i>에서 찾아보세요</h2>
                                    </CategoryContentsBox>
                                    <CategorySwiper/>
                                </CategoryContainer>
                            </CategorySection>
                            <ServiceSection>
                                <ServiceContainer>
                                    <ServiceBox>
                                        <ServiceLeftBox>
                                            <LeftImgBox>
                                                <ImgItem01 ref={fadeIn2.ref} style={fadeIn2.style}><img src={ServiceImg01} alt="service-image01"/></ImgItem01>
                                                <ImgItem02 ref={fadeIn3.ref} style={fadeIn3.style}><img src={ServiceImg02} alt="service-image02"/></ImgItem02>
                                            </LeftImgBox>
                                        </ServiceLeftBox>
                                        <ServiceRightBox ref={fadeIn4.ref} style={fadeIn4.style}>
                                            <RightContentsBox>
                                                <RightTitle >
                                                    <h2>투자에 고민이 있으신가요?</h2>
                                                </RightTitle>
                                                <RightTopContent>
                                                    <p style={{marginBottom:'10px'}}>당신의 투자를 더욱 가치 있게 만들어 드릴</p>
                                                    <p>파트너를 찾아 드리는 전문 플랫폼,</p>
                                                    <p>바로 <i>"</i><span>WhoFin</span><i>"</i>입니다.</p>
                                                </RightTopContent>
                                                <RightBottomContent>
                                                    <p>우리와 함께라면 더 나은 미래로 나아갈 수 있습니다.</p>
                                                </RightBottomContent>
                                                <ServiceItemBox>
                                                    <ServiceItem><BsCheck2Square/>직접투자</ServiceItem>
                                                    <ServiceItem><BsCheck2Square/>다양한 업종</ServiceItem>
                                                </ServiceItemBox>
                                            </RightContentsBox>
                                        </ServiceRightBox>
                                    </ServiceBox>
                                </ServiceContainer>
                            </ServiceSection>
                            

                            <section style={{marginBottom:'100px'}}>
                                <HomeImgBanner>
                                    <BannerContainer>
                                        <LeftBannerBox ref={fadeIn5.ref} style={fadeIn5.style}>
                                            <TopContent>
                                                <p><em>후핀</em>은 여러분의 사업을 위해 <i><span>최상의 도움</span></i>을 드립니다.</p> 
                                                <p>함께 성공을 향해 나아가요!</p>
                                            </TopContent>
                                            <BottomContent>
                                                <ItemBox><LuCheckCircle/>다양한 업종</ItemBox>
                                                <ItemBox><LuCheckCircle/>간편한 회원가입</ItemBox>
                                                <ItemBox><LuCheckCircle/>직접 투자</ItemBox>
                                            </BottomContent>
                                        </LeftBannerBox>
                                        <RightBannerBox ref={fadeIn6.ref} style={fadeIn6.style}>
                                            <ImgBox >
                                                <img src={PhoneImg} alt="BannerImage"/>
                                            </ImgBox>
                                        </RightBannerBox>
                                    </BannerContainer>
                                </HomeImgBanner>
                            </section>

                    </StyledFrame>
                <Footer/>
            </React.Fragment>
            
    );
};

export default Home;
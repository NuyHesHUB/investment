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

/* Styled-Components */
import { 
    StyledFrame, 
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


const Home = ({parsedCommunityCategoryData}) => {

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

    return (
            <React.Fragment>
                <Header parsedCommunityCategoryData={parsedCommunityCategoryData}/>
                    <StyledFrame style={{height:'2000px'}}>
                            <section>
                                <BannerSwiper/>
                            </section>

                            <section style={{marginTop:'500px',height:'500px'}}>
                                <CategorySwiper/>
                            </section>

                            <section>
                                <HomeImgBanner>
                                    <BannerContainer>
                                        <LeftBannerBox>
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
                                        <RightBannerBox>
                                            <ImgBox>
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
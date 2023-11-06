import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { AdInfoWrap, StyledFrame, BannerWrap, BannerBg } from './StyledAdvertisementInfoPage';



const AdvertisementInfoPage = () => {
    return (
        <AdInfoWrap>
            <Header/>
                <StyledFrame>
                    <BannerWrap>
                        <BannerBg></BannerBg>
                        <div></div>
                    </BannerWrap>
                </StyledFrame>
            <Footer/>
        </AdInfoWrap>
    );
};

export default AdvertisementInfoPage;
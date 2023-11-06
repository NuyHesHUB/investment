import styled from "styled-components";

export const AdInfoWrap=styled.div`
    width: 100%;
`
export const StyledFrame=styled.div`
    /* width: 1440px; */
    width: 100%;
    max-width: 1440px;
    height: 1000px;
    padding-top: 80px;
    margin: 0 auto;
`

export const BannerWrap=styled.div`
    width: 100%;
    height: 250px;
    position: relative;
`
export const BannerBg=styled.div`
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    background-image: url('ad_bg.jpg');
    filter: brightness(50%);
`
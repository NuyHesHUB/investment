import styled from 'styled-components';

export const StyledFrame=styled.div`
    width: calc(100vw - (100vw - 100%));
    height: 2000px;
`

export const SlideWrap=styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    span{
        display: block;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
    }
    img{
        width: 100%;
    }
`

export const SildeBg1=styled.div`
    width: 100%;
    height: 500px;
    background: rgb(255,255,255);
    background: linear-gradient(331deg, rgba(255,255,255,1) 0%, rgba(69,74,252,1) 100%);
`

export const SildeBg2=styled.div`
    width: 100%;
    height: 500px;
    background: rgb(255,255,255);
    background: linear-gradient(331deg, rgba(255,255,255,1) 0%, rgba(45,0,235,1) 100%);
`

export const SlideContentsWrap=styled.div`
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

export const SwiperCustomWrap=styled.div`
    max-width: 1920px;
    position: relative;
    height: 160px;
    display: flex;
    align-items: center;
    margin: 0 auto;
    .swiper-button-prev{}
    .swiper-button-next{}
    /* .swiper-button-next::after,
    .swiper-button-prev::after {
    display: block;
    } */
    /* margin: 0 auto; */
    .swiper{max-width: 1280px !important}
    /* .swiper-wrapper{}
    .swiper-slide{width: 100px !important; margin: 0 120px !important; } */
`
import styled from 'styled-components';

export const StyledFrame=styled.div`
    width: calc(100vw - (100vw - 100%));
    overflow: hidden;
    /* height: 2000px; */
    height: 100%;
`

export const SlideWrap=styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* &:hover {
        img {
        transform: translateY(-10px); 
        box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2); 
        }
    } */
    span{
        display: block;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
    }
    a{
        text-decoration: none;
        color: #000;
    }
`
export const CategoryWrap=styled.div`
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
    /* box-shadow: 4px 4px 16px 0px #888; */
    /* &:hover{
        transform: translateY(-10px);
    } */
    /* span{
        display: block;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
    } */
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
    height: 1000px; /* 임시높이 */
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
    .swiper{max-width: 1280px !important; height: 100% !important;}
    .swiper-slide{
        cursor: pointer;
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
        &:hover{
            .hover-effect-img{
                transform: translateY(-10px);
                /* box-shadow: 4px 4px 16px 0px #999; */
            }
            span::after{
                width: 80%;
            }
        }
    }
    /* .swiper-wrapper{}
    .swiper-slide{width: 100px !important; margin: 0 120px !important; } */
`
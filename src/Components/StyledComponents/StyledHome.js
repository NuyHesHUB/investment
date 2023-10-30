import styled from 'styled-components';

export const StyledFrame=styled.div`
    width: calc(100vw - (100vw - 100%));
    /* height: 2000px; */
    /* overflow: hidden; */
    padding-top: 80px;
    position: relative;
`

export const CategorySection=styled.div`
    width: 100%;
    height: 500px;
    display: flex;
    align-items: center;
    position: absolute;
    top: 580px;
`
export const CategoryContainer=styled.div`
    width: 100%;
    /* height: 100%; */
    max-width: 1440px;
    margin: 0 auto;
`
export const CategoryContentsBox=styled.div`
    margin-bottom: 100px;
    h2{
        color: #242424;
        font-size: 45px;
        text-align: center;
        i{
            font-style: normal;
            color: #3FA9F5;
            font-weight: bold;
            font-size: 50px;
            margin: 0 5px;
        }
    }
`









export const ServiceSection=styled.section`
    width: 100%;
    height: 880px;
    background: #F9F9FE;
`
export const ServiceContainer=styled.div`
    width: 100%;
    height: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding-top: 100px;
    padding-bottom: 100px;
    box-sizing: border-box;
`
export const ServiceBox=styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-between;
`
export const ServiceLeftBox=styled.div`
    width: 100%;
    height: 100%;
`
export const LeftImgBox=styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`
export const ImgItem01=styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 800px;
    overflow: hidden;
    border-radius: 20px;
    z-index: 888;
    -webkit-box-shadow: 0px 0px 15px 10px rgba(0, 0, 0, 0.1);
    -ms-box-shadow: 0px 0px 15px 10px rgba(0, 0, 0, 0.1);
    -o-box-shadow: 0px 0px 15px 10px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0px 0px 15px 10px rgba(0, 0, 0, 0.1);
    box-shadow: 0px 0px 15px 10px rgba(0, 0, 0, 0.1);
    img{
        width: 100%;
    }
`
export const ImgItem02=styled.div`
    position: absolute;
    top: 215px;
    left: 65px;
    width: 800px;
    overflow: hidden;
    border-radius: 20px;
    z-index: 889;
    -webkit-box-shadow: 0px 0px 15px 10px rgba(0, 0, 0, 0.1);
    -ms-box-shadow: 0px 0px 15px 10px rgba(0, 0, 0, 0.1);
    -o-box-shadow: 0px 0px 15px 10px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0px 0px 15px 10px rgba(0, 0, 0, 0.1);
    box-shadow: 0px 0px 15px 10px rgba(0, 0, 0, 0.1);
    img{
        width: 100%;
    }
`
export const ServiceRightBox=styled.div`
    margin-left: 400px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
`
export const RightContentsBox=styled.div`
    /* display: flex; */
    padding-bottom: 100px;
    text-align: center;
`
export const RightTitle=styled.div`
    margin-bottom: 70px;
    h2{
        /* color: #242424; */
        color: #3FA9F5;
        font-size: 45px;
    }
`
export const RightTopContent=styled.div`
    /* padding-left: 20px; */
    p{
        font-size: 25px;
        font-weight: 600;
        color: #444;
        line-height: 1.2;
    }
    i{
        font-style: normal;
        font-size: 40px;
        font-weight: bold;
        color: #3FA9F5;
        margin: 0 5px;
    }
    span{
        font-weight: bold;
        color: #3FA9F5;
        font-size: 32px;
    }
`
export const RightBottomContent=styled.div`
    margin-top: 20px;
    p{
        color: #444;
        font-size: 25px;
        font-weight: bold;
    }
`
export const ServiceItemBox=styled.div`
    margin-top: 100px;
    display: flex;
    justify-content: center;
    >div:first-child{
        margin-right: 20px;
    }
`
export const ServiceItem=styled.div`
    svg{
        margin-right: 5px;
        color: navy;
    }
    display: flex;
    align-items: center;
    width: auto;
    height: 60px;
    background: rgb(235, 237, 240);
    box-sizing: border-box;
    padding: 0px 40px;
    border-radius: 15px;
    font-weight: bold;
    color: #333;
`















export const HomeImgBanner=styled.div`
    width: 100%;
    height: 200px;
    background: #3FA9F5;
    /* background: #1A9CF9; */
`
export const BannerContainer=styled.div`
    position: relative;
    max-width: 1440px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
`

export const LeftBannerBox=styled.div`
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`
export const TopContent=styled.div`
    font-size: 32px;
    font-weight: 300;
    letter-spacing: -1.5px;
    color: #fff;
    margin-bottom: 25px;
    p:first-child{
        margin-bottom: 5px;
    }
    em{
        font-style: normal;
        font-weight: bold;
        margin-right: 2px;
    }
    i{
        font-style: normal;
        font-weight: bold;
        margin: 0 5px;
        position: relative;
        &::before{
            content: "";
            position: absolute;
            bottom: 1px;
            left: -4px;
            width: calc(100% + 8px);
            height: 8px;
            background: navy;
        }
    }
    span{
        position: relative;
    }
`
export const BottomContent=styled.div`
    display: flex;
    justify-content: center;
    >div:nth-child(2){
        margin: 0 10px;
    }
`
export const ItemBox=styled.div`
    svg{
        margin-right: 5px;
        color: navy;
    }
    display: flex;
    align-items: center;
    width: auto;
    height: 40px;
    background: #fff;
    box-sizing: border-box;
    padding: 0px 20px;
    border-radius: 15px;
`
export const RightBannerBox=styled.div`
   
`
export const ImgBox=styled.div`
    width: 550px;
    position: absolute;
    right: 0;
    bottom: -130px;
    img{
        width: 100%;
    }
`


export const BannerAd = styled.div`
    background: pink;
    width: 150px;
    height: 500px;
    margin: 20px 0 0 20px;
    top: 100px;
    position: sticky;
    position: -webkit-sticky;
`
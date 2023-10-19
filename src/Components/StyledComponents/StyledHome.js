import styled from 'styled-components';

export const StyledFrame=styled.div`
    width: calc(100vw - (100vw - 100%));
    /* height: 2000px; */
    overflow: hidden;
    padding-top: 80px;
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

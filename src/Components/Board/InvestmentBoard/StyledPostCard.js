import styled from 'styled-components';

export const OngoingPostCardWrap=styled.div`
    /* width: 440px; */
    /* width: calc(33.33% - 34px); */
    /* margin-right: 50px; */
    position: relative;
    margin-bottom: 31px;
    /* height: 271px; */
    height: auto;
    min-height: 332px;
    background: #fff;
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    box-sizing: border-box;
    padding: 0 20px;
    padding-top: 25px;
    padding-bottom: 25px;
    /* &:nth-child(3n) {
        margin-right: 0;
    }
    &:nth-child(n+4) {
        width: calc(33.33% - 34px);
        margin-right: 0;
    } */
`
export const DeadlinePostCardWrap=styled.div`
    margin-bottom: 31px;
    /* height: auto; */
    width: 100%;
    height: 332px;
    background: rgba(0, 0, 0, .7);
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    h2{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
        z-index: 900;
        font-size: 30px;
    }
`
export const DeadlineContainer=styled.div`
    padding: 0 20px;
    padding-top: 25px;
    padding-bottom: 25px;
    box-sizing: border-box;
    filter: brightness(30%);
    -webkit-filter:brightness(30%);
    -moz-filter:brightness(30%);
    -o-filter:brightness(30%);
    -ms-filter:brightness(30%);
    >div{
        width: 100%;
        height: 100%;
        filter: blur(2px);
        -webkit-filter: blur(2px);
        -moz-filter: blur(2px);
        -o-filter: blur(2px);
        -ms-filter: blur(2px);
    }
`
 export const IconBox=styled.div`
    width: 60px;
    height: 60px;
    border-radius: 5px;
    /* background: #000; */
    /* border: 1px solid #000; */
    border: 2px solid #e5e6e9;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    overflow: hidden;
`
export const IconImg=styled.img`
    width: 100%;
    height: 100%;
`
export const CompanyName=styled.h4`
    color: #000;
    font-size: 16px;
    font-weight: 400;
    margin-top: 7px;
    text-align: center;
`
export const Title=styled.h3`
    color: #000;
    font-size: 20px;
    font-weight: 600;
    margin-top: 20px;
    text-align: center;
`
export const Content=styled.p`
    height: 50px;
    color: rgb(85, 85, 85);
    font-size: 16px;
    font-weight: 400;
    text-align: center;
    margin-top: 21px;
    padding: 0 20px;
`
export const BottomContentWrap=styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 47px;
    
`
export const Category=styled.div`
    width: auto;
    height: 25px;
    padding: 0 5px;
    box-sizing: border-box;
    border: 1px solid rgb(221, 221, 221);
    border-radius: 5px;
    color: rgb(187, 187, 187);
    font-size: 14px;
    font-weight: 400;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const DeadlineDt=styled.div`
    width: auto;
    height: 25px;
    padding: 0 5px;
    box-sizing: border-box;
    background: rgb(255, 255, 255);
    border: 1px solid rgb(0, 0, 0);
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
`
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
 export const OngoingIconBox=styled.div`
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
export const OngoingCompanyName=styled.h4`
    color: #000;
    font-size: 16px;
    font-weight: 400;
    margin-top: 7px;
    text-align: center;
`
export const OngoingTitle=styled.h3`
    color: #000;
    font-size: 20px;
    font-weight: 600;
    margin-top: 20px;
    text-align: center;
`
export const OngoingContent=styled.p`
    height: 50px;
    color: rgb(85, 85, 85);
    font-size: 16px;
    font-weight: 400;
    text-align: center;
    margin-top: 21px;
    padding: 0 20px;
`
export const OngoingBottomContentWrap=styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 47px;
    
`
export const OngoingCategory=styled.div`
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
export const OngoingDeadlineDt=styled.div`
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
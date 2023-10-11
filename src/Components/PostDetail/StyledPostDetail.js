import styled from 'styled-components';

export const PostDetailFrame=styled.div`
    width: 100%;
    max-width: 1920px;
    padding-top: 80px;
    margin: 0 auto;
`
export const PostDetailContainer=styled.div`
    width: 1420px;
    margin: 0 auto;
`
export const PostDetailTitleBox=styled.div`
    width: 100%;
    height: 297px;
    margin-top: 48px;
    display: flex;
    /* justify-content: center; */
    align-items: center;
`
export const PostDetailTitleWrap=styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
`
export const LeftTitleBox=styled.div`
    width: 180px;
    height: 180px;
    background: rgb(153, 153, 153);
    border-radius: 10px;
    font-size: 36px;
    font-weight: 300;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 50px;
`
export const RightTitleBox=styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 55px;
    flex-basis: 80%;
    height: 100%;
    padding-top: 74px;
    padding-bottom: 74px;
    box-sizing: border-box;
`
export const RightTitleTopBox=styled.div`
    .category{
        width: auto;
        padding: 5px 10px;
        display: inline-block;
        border: 1px solid rgb(221, 221, 221);
        border-radius: 5px;
        box-sizing: border-box;
        font-size: 14px;
        font-weight: 400;
        color: rgb(187, 187, 187);
    }
`
export const RightTitleCenterBox=styled.div`
    h2{
        color: rgb(0, 0, 0);
        font-size: 36px;
        font-weight: 600;
    }
`
export const RightTitleBottomBox=styled.div`
    display: flex;
    justify-content: space-between;
    padding-right: 50px;
`
export const RightTitleBottomLeftBox=styled.div`
    color: rgb(85, 85, 85);
    font-size: 18px;
    font-weight: 400;
`
export const RightTitleBottomRightBox=styled.div`
    display: flex;
    align-items: center;
    color : rgb(153, 153, 153);
    font-size: 14px;
    font-weight: 400;
`
export const PostMain=styled.div`
    width: 100%;
    table{
        margin: 0 auto;
        width: 100%;
    }
`
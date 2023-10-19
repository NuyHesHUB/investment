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
    border-bottom: 1px solid rgb(238, 238, 238);
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
    /* background: rgb(153, 153, 153); */
    border-radius: 10px;
    /* font-size: 36px;
    font-weight: 300;
    color: #fff;
    display: flex; */
    border: 2px solid #e5e6e9;
    justify-content: center;
    align-items: center;
    margin-left: 50px;
    overflow: hidden;
`
export const CompanyLogo=styled.img`
    width: 100%;
    height: 100%;
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
export const PostDetailInformationBox=styled.div`
    width: 100%;
    height: 297px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgb(238, 238, 238);
`
export const PostDetailInformationWrap=styled.div`
    padding-left: 50px;
    padding-right: 50px;
    display: flex;
    flex-direction: column;
    
    height: 100%;
    width: 100%;
`
export const PostDetailInformationTitleBox=styled.h2`
    margin-top: 26px;
`
export const PostDetailInformationFrame=styled.div`
    margin-top: 36px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
`
export const PostDetailLeftInformationBox=styled.div`
    height: 100%;
    margin-left: 10px;
`
export const InfoBox=styled.div`
    display: flex;
    margin-bottom: 40px;
    color: rgb(85, 85, 85);
    font-size: 18px;
    font-weight: 400;
    label{
        width: 100px;
    }
`


export const PostDetailContentsBox=styled.div`
    padding-left: 50px;
    padding-right: 50px;
`
export const TabMenu=styled.div`
    margin-top: 46px;
    margin-bottom: 45px;
    display: flex;
    .focused{
        color: rgb(34, 34, 34);
        font-size: 24px;
        font-weight: 600;
    }
`
export const TabMenuItem=styled.div`
    color: rgb(153, 153, 153);
    font-size: 24px;
    font-weight: 600;
    cursor: pointer;
    &:first-child{
        margin-right: 46px;
    }
`



export const CommentLikeBox=styled.div`
    display: flex;
    align-items: center;
    &:first-child{
        margin-right: 15px;
    }
    span{
        margin-left: 5px;
    }
    svg{
        font-size: 21px;
    }
    cursor: pointer;
    /* &:hover{
        color: red;
    } */
`

export const PostMain=styled.div`
    width: 100%;
    table{
        margin: 0 auto;
        width: 100%;
    }
`
export const ApproveButton = styled.div`
  text-align: center;
  margin: 100px 0 50px;
  button.approve-btn {
    cursor: pointer;
    background: #3fa9f5;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    color: #fff;
    font-size: 20px;
  }
`
export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`

export const PaginationButton = styled.button`
  margin: 0 5px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  outline: none;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`

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
    display: flex;
    align-items: center;
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






export const PostDetailRightInformationBox=styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 30%;
    height: 100%;
`
export const RightInfoTopBox=styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    >p{
        /* color: rgb(255, 0, 0); */
        color: rgb(153, 153, 153);
        font-size: 24px;
        font-weight: 600;
    }
`
export const RightInfoTopLeftBox=styled.div`
    display: flex;
    p:nth-child(2){
        color: rgb(85, 85, 85);
        font-size: 18px;
        font-weight: 400;
    }
    p:first-child{
        margin-right: 10px;
        /* color: rgb(34, 34, 34); */
        color: rgb(153, 153, 153);
        font-size: 18px;
        font-weight: 600;
    }
`
export const RightInfoBottomBox=styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: column;
`
export const LikeBox=styled.div`
    width: 100%;
    height: 52px;
    box-sizing: border-box;
    background: rgb(255, 255, 255);
    border: 1px solid rgb(204, 204, 204);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    >div{
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgb(153, 153, 153);
        font-size: 18px;
        font-weight: 400;
    }
`
export const InquiryBox=styled.div`
    width: 100%;
    height: 52px;
    background: rgb(63, 169, 245);
    border-radius: 10px;
    overflow: hidden;
    >a{
        color: rgb(255, 255, 255);
        font-size: 18px;
        font-weight: 600;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
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



export const CommentWrap=styled.div`
    width: 893px;
`
export const CommentFrame=styled.div`
    margin-top: 33px;
`
export const CommentBox=styled.div`
    position: relative;
    width: 100%;
    padding-top: 25px;
    padding-bottom: 25px;
    box-sizing: border-box;
    background: rgb(255, 255, 255);
    border-bottom: 1px solid rgb(221, 221, 221);
`
export const CommentTopBox=styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 13px;
`
export const CommentTopLeftBox=styled.div`
    display: flex;
    align-items: center;
    p:nth-child(1){
        color: rgb(85, 85, 85);
        font-family: Pretendard;
        font-size: 18px;
        font-weight: 600;
    }
    p:nth-child(2){
        margin-left: 15px;
        color: #aaa;
        font-size: 12px;
    }
`
export const CommentTopRightBox=styled.div`
    display: flex;
    color: rgb(170, 170, 170);
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

export const CommentCenterBox=styled.div`
    /* color: rgb(85, 85, 85); */
    color: #242424;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 300;
`
export const CommentBottomBox=styled.div`
    position: absolute;
    bottom: 10px;
    right: 10px;
    color: rgb(85, 85, 85);
    font-size: 14px;
    font-weight: 300;
    display: flex;
    cursor: pointer;
    >div:hover{
        text-decoration: underline;
    }
`
export const ReplyBox=styled.div`
    width: 100%;
    position: relative;
    background: rgb(246, 247, 247);
    border-bottom: 1px solid rgb(221, 221, 221);
    display: flex;
    padding-top: 25px;
    padding-bottom: 25px;
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
`
export const ReplyLeftWrap=styled.div`
    svg{
        rotate: 180deg;
        margin-right: 5px;
        font-size: 20px;
        color: rgb(63, 169, 245);
    }
`
export const ReplyRightWrap=styled.div`
    width: 100%;
`




export const PostMain=styled.div`
    width: 100%;
    table{
        margin: 0 auto;
        width: 100%;
    }
`

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

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
`;


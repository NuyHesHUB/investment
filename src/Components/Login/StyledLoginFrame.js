import styled from 'styled-components';

export const StyledFrame=styled.div`
    width: 100%;
    overflow: hidden;
    font-family: Pretendard;
    /* width: 100vw; */
    /* height: 100vh; */
    /* input{
        padding: 14px 12px;
        box-sizing: border-box;
        height: 48px;
        background-color: #FEFEFE;
        border: 1px solid #D1D1D1;
        border-radius: 5px;
        margin-bottom: 20px;
    }
    button{
        height: 48px;
        padding: 0 20px;
        border-radius: 5px;
        background-color: #FEFEFE;
        border: 1px solid #D1D1D1;
        cursor: pointer;
    } */
`
export const LoginWrap=styled.div`
    /* width: 384px;
    max-width: 384px;
    height: 100%;
    margin: 0 auto;
    margin-top: 50px;
    display: flex;
    flex-direction: column; */
    width: 1920px;
    /* height: 1087px; */
    height: 900px;
    overflow: hidden;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    justify-content: center;
`
export const LoginBox=styled.div`
    width: 400px;
    margin: 0 auto;
`
export const LoginTitle=styled.h1`
    text-align: center;
    margin-bottom: 74px;
    font-weight: 600;
    font-size: 36px;
    color: rgb(85, 85, 85);
`
export const LoginFormBox=styled.form`
    display: flex;
    flex-direction: column;
    input{
        width: 400px;
        height: 50px;
        border-radius: 10px;
        border: none;
        outline: none;
        background: rgb(243, 245, 248);
        /* border: 1px solid rgb(85, 85, 85); */
        padding-left: 20px;
        box-sizing: border-box;
        &::placeholder{
            /* padding: 16px 20px; */
            color: rgb(153, 153, 153);
            font-weight: 400;
        }
        &:first-child{
            margin-bottom: 20px;
        }
    }
    button{
        width: 400px;
        height: 50px;
        background: rgb(63,169,245);
        border-radius: 10px;
        border: none;
        margin-top: 40px;
        color: #fff;
        font-size: 20px;
        font-weight: 600;
        cursor: pointer;
    }
`
export const LoginContentsBox=styled.div`
    width: 400px;
    height: 16px;
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
    span{
        font-weight: 400;
        color: rgb(153, 153, 153);
        a{
            color: rgb(153, 153, 153);
            font-size: 14px;
        }
    }
`
export const ForgetDivideBox=styled.span`
    margin: 0 5px;
`
export const Divider=styled.div`
    width: 350px;
    height: 1px;
    background: rgb(204,204,204);
    margin: 0 auto;
    margin-top: 70px;
    /* border: 1px solid rgb(204,204,204); */
`
export const SocialLoginBox=styled.div`
    margin-top: 30px;
    span{
        display: block;
        font-size: 16px;
        font-weight: 400;
        color: rgb(85,85,85);
        text-align: center;
    }
`
export const SocialIconBox=styled.div`
    width: 260px;
    height: 60px;
    margin: 0 auto;
    margin-top: 23px;
    display: flex;
    justify-content: space-between;
`
export const SocialIcon=styled.div`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    cursor: pointer;
    &:first-child{
        border: 1px solid rgb(209,209,209);
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`
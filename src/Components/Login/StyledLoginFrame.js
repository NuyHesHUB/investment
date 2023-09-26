import styled from 'styled-components';

export const StyledFrame=styled.div`
    width: 100%;
    overflow: hidden;
    font-family: Pretendard;
`
export const LoginWrap=styled.div`
    width: 1920px;
    height: 700px;
    overflow: hidden;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    margin-top: 300px;
`
export const LoginBox=styled.div`
    width: 400px;
    margin: 0 auto;
`
export const LoginTitle=styled.h1`
    text-align: center;
    margin-bottom: 55px;
    font-weight: 600;
    font-size: 36px;
    color: rgb(85, 85, 85);
`
export const LoginFormBox=styled.form`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
`
export const LoginSignUpBox=styled.div`
    display: flex;
    justify-content: center;
    margin-top: 33px;
    font-weight: 400;
    font-size: 14px;
    p{
        
        color: rgb(85,85,85);
        margin-right: 13px;
    }
    a{
        text-decoration: underline;
        color: rgb(63,169,245);
    }
`



/*------------------------------------*\
      Social Login Components Styled
\*------------------------------------*/
export const SocialIcon=styled.div`
    cursor: pointer;
    overflow: hidden;
    width: 300px;
    height: 60px;
    border-radius: 10px;
    position: relative;
    margin: 0 auto;
    margin-bottom: 15px;
`
export const LogoWrap=styled.div`
    position: absolute;
    top: 0;
    left: 0;
`
export const TextWrap=styled.div`
    text-align: center;
    line-height: 60px;
    p{
        font-size: 18px;
        font-weight: 400;
    }
    
`
import styled from 'styled-components';

export const StyledFrame=styled.div`
    width: 100vw;
    overflow: hidden;
`
export const StyledSigninFrame=styled.div`
    width: 700px;
    min-height: 1000px;
    padding-top: 80px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: center;
    background: #fff;
    .submit-btn{
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 200px;
        height: 40px;
        background: #3fa9f5;
        box-sizing: border-box;
        padding: 0px 20px;
        border-radius: 4px;
        border: 2px solid #3fa9f5;
        color: #fff;
        font-weight: bold;
        font-size: 18px;
    }
    .form-input-wrap{
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
    }
    .form-input-box{
        position: relative;
        width: 400px;
    }
    .form-input-radio-box{
        position: relative;
        width: 400px;
    }
    .form-input-box input{
        width: 100%;
        height: 46px;
        padding: 0px 11px 1px 15px;
        border-radius: 4px;
        border: 1px solid rgb(221, 221, 221);
        font-weight: 400;
        font-size: 16px;
        line-height: 1.5;
        color: rgb(51, 51, 51);
        outline: none;
        box-sizing: border-box;
    }
`
export const StyledSigninWrap=styled.div`

`
export const LoginBox=styled.div`
    margin: 40px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    span{
        margin-right: 5px;
    }
    a{
        color: #3fa9f5;
        font-weight: bold;
        font-size: 18px;
        &:hover{
            text-decoration: underline;
        }
    }
`
export const Required=styled.span`
    color: tomato;
    font-weight: bold;
    font-size: 20px;
`
export const CheckBox=styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 46px;
    background: #fff;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid #3fa9f5;
    margin-left: 8px;
    a{
        text-decoration: none;
        color: #3fa9f5;
        font-size: 18px;
    }
`
export const SubmitBtnBox=styled.div`
    margin: 80px 0;
    display: flex;
    justify-content: center;
`
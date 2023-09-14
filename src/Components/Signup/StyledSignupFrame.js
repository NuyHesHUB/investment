import styled from 'styled-components';

export const StyledFrame=styled.div`
    width: 100vw;
    height: 100vh;
    /* background: rgba(0, 0, 0, .3); */
`
export const StyledSigninFrame=styled.div`
    /* width: 384px; */
    width: 700px;
    /* max-width: 384px; */
    /* height: 100vh; */
    margin: 0 auto;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    text-align: center;
    background: #fff;
    .submit-btn{
        display: block;
        padding: 0px 10px;
        text-align: center;
        overflow: hidden;
        width: 200px;
        margin: 0 auto;
        cursor: pointer;
        height: 46px;
        border-radius: 3px;
        color: rgb(95, 0, 128);
        background-color: rgb(255, 255, 255);
        border: 1px solid rgb(95, 0, 128);
        box-sizing: border-box;
    }
    .form-input-wrap{
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
        /* .error-box{
            position: absolute;
            left: 0;
        } */
    }
    .form-input-wrap .id-check-btn a{
        display: block;
        padding: 0px 10px;
        text-align: center;
        overflow: hidden;
        width: 100%;
        height: 46px;
        border-radius: 3px;
        color: rgb(95, 0, 128);
        background-color: rgb(255, 255, 255);
        border: 1px solid rgb(95, 0, 128);
        box-sizing: border-box;
    }
    .form-input-box{
        position: relative;
        width: 400px;
        /* height: 48px; */
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
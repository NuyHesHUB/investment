import styled from 'styled-components';

export const StyledFrame=styled.div`
    width: 100vw;
    height: 100vh;
    input{
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
    }
`
export const StyledLoginFrame=styled.div`
    width: 384px;
    max-width: 384px;
    height: 100%;
    margin: 0 auto;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
`
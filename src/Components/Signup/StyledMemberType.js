import styled from 'styled-components';

export const StyledFrame=styled.div`
    width: 100%;
    overflow: hidden;
    font-family: Pretendard;
`
export const MemberTypeWrap=styled.div`
    width: 1920px;
    height: 100vh;
    overflow: hidden;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
`
export const MemberTypeBox=styled.div`
    width: 540px;
    margin: 0 auto;
`
export const SignUpTitle=styled.h1`
    text-align: center;
    margin-bottom: 74px;
    font-weight: 600;
    font-size: 36px;
    color: rgb(85, 85, 85);
`
export const TabBox=styled.div`
    width: 541px;
    height: 300px;
    background: #fff;
    border: 1px solid rgb(238,238,238);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
`
export const TabMenu=styled.ul`
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;
    list-style: none;
    .submenu {
        transition: 0.3s;
        width: 100%;
    }
    .focused {
        color: rgb(63,169,245);
    }
    & div.desc {
        text-align: center;
    }
`
export const TabMenuItem=styled.li`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid rgb(238,238,238);
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
`
export const Desc=styled.div`
    width: 100%;
    height: 100%;
    border-top: 1px solid rgb(238,238,238);
    text-align: center;
`
export const Contents=styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .contents-wrap{
        h6{
            font-size: 18px;
            font-weight: 400;
            color: rgb(85,85,85);
        }
        button{
            width: 269px;
            bottom: 50px;
            background: rgb(63,169,245);
            border: none;
            border-radius: 10px;
            color: #fff;
            padding: 14px;
            cursor: pointer;
        }
    }
    .personal-contents{
        h6{
            margin-bottom: 59px;
        }
    }
    .buisness-contents{
        display: flex;
        flex-direction: column;
        align-items: center;
        h6{
            margin-bottom: 25px;
        }
        input{
            margin-bottom: 20px;
            width: 347px;
            height: 40px;
            background: #fff;
            border: 1px solid rgb(238,238,238);
        }
    }
`
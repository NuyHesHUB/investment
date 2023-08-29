import styled from 'styled-components';

export const StyledHeaderFrame=styled.div`
    position: relative;
    width: 100vw;
    height: 70px;
    display: flex;
    align-items: center;
    /* border-bottom: 1px solid #000; */
    background: #fff;
    z-index: 999;
    ul{
        list-style:none;
        display: flex;
    }
    a{text-decoration: none; color: #000;}
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, .3));
`
export const HeaderContainer=styled.div`
    width: 100%;
    height: 100%;
    max-width: 1920px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
export const HeaderLogo=styled.h1`
    font-family: 'Paytone One', sans-serif;
    color: rgba(69,74,252,1);
    /* color: #0D1282; */
    font-size: 38px;
`
export const MenuFrame=styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    >li{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .sub-menu{
        position: absolute;
        top: 101%;
        max-height: 0;
        background: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        opacity: 0; /* 추가 */
        transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
    }
    .sub-menu.on{
        max-height: 500px; /* 적절한 높이로 변경 */
        opacity: 1; /* 추가 */
        transform: scaleY(1); /* 추가 */
    }
`
export const MenuList=styled.ul`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    >li{
        width: 100px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`
export const HeaderBtn=styled.button`
    border: none;
    outline: none;
    padding: 10px 10px;
    background: rgba(69,74,252,1);
    /* background: #0D1282; */
    color: #fff;
    font-weight: bold;
    border-radius: 5px;
    transition: .3s;
    &:hover{
        background: #000;
    }
`
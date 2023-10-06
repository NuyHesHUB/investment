import styled from 'styled-components';

export const StyledFrame=styled.div`
    /* width: 1920px; */
    width: 100%;
    height: 80px;
    margin: 0 auto;
    position: relative;
    display: flex;
    align-items: center;
    background: #fff;
    /* background: rgba(255,255,255,0.1); */
    color: #000;
    position: fixed;
    z-index: 999;
    transition: background-color .1s;
    /* filter: drop-shadow(0 1px 2px rgba(0, 0, 0, .3)); */
    &.header-scrolled{
        background: #fff;
        color: #000;
        border-bottom: 1px solid #000;
    }
`


export const Container=styled.div`
    width: 100%;
    height: 100%;
    max-width: 1920px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
export const WrapBox=styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
`
export const HeaderLogo=styled.h1`
    /* font-family: 'Paytone One', sans-serif; */
    /* color: rgba(69,74,252,1); */
    /* font-size: 38px; */
    width: 170px;
    img{
        width: 100%;
    }
`
export const HeaderMenu=styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    margin-left: 180px;
    .sub-menu{
        position: absolute;
        top: 101%;
        max-height: 0;
        background: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        opacity: 0;
        transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
    }
    .sub-menu.on{
        max-height: 500px;
        opacity: 1;
        transform: scaleY(1);
    }
`
export const MenuList=styled.ul`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`
export const MenuItem=styled.li`
        width: 100px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
`
export const HeaderBtn=styled.button`
    border: none;
    outline: none;
    padding: 10px 10px;
    background: #3FA9F5;
    /* background: #0D1282; */
    cursor: pointer;
    color: #fff;
    font-weight: bold;
    border-radius: 5px;
    transition: .3s;
    &:hover{
        background: #1A9CF9;
    }
`
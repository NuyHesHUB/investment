import styled from 'styled-components';

export const StyledFrame=styled.div`
    width: 100%;
    height: 80px;
    margin: 0 auto;
    position: relative;
    display: flex;
    align-items: center;
    background: #fff;
    color: #000;
    position: fixed;
    z-index: 999;
    /* transition: background-color .1s; */
    -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    -ms-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    -o-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    /* filter: drop-shadow(0 1px 2px rgba(0, 0, 0, .3)); */
    &.header-scrolled{
        background: #fff;
        color: #000;
    }
`
export const Container=styled.div`
    width: 100%;
    height: 100%;
    max-width: 1440px;
    margin: 0 auto;
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
        position: relative;
        &::after{
            content: "";
            position: absolute;
            bottom: 22px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 3px;
            background: #3fa9f5;;
            transition: .2s ease-in-out;
        }
        &:hover::after{
            width: 70%;
        }
        a{
            display: block;
            height: 100%;
            line-height: 80px;
        }
        p {height: 100%; line-height: 80px;}
`
export const HeaderBtn=styled.button`
    border: none;
    outline: none;
    padding: 10px 10px;
    background: #3FA9F5;
    cursor: pointer;
    color: #fff;
    font-weight: bold;
    border-radius: 5px;
    transition: .2s ease-in-out;
    &:hover{
        background: #1A9CF9;
    }
`
export const RightHeaderMenu=styled.div`
    display: flex;
`
export const RightHeaderMenuWrap=styled.div`
    display: flex;
    margin-left: 50px;
`
export const RightHeaderMenuList=styled.ul`
    display: flex;
    align-items: center;
`
export const UserNameWrap=styled.div`
    margin-right: 10px;
    display: flex;
`
export const UserNameBox=styled.div`
    font-weight: bold;
    font-size: 16px;
`
export const HelloBox=styled.span`
    margin-left: 3px;
`
export const UserGroupBox=styled.div`
    display: flex;
`
export const UserGroupItem=styled.li`
    /* test ???*/
`
export const Divider=styled.div`
    color: #000;
    margin: 0 10px;
`
export const SignUpItem=styled.li`
    a{
        color: #3fa9f5;
        font-weight: bold;
    }
`
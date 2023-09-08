import styled from 'styled-components';

export const StyledAdminFrame=styled.div`
    position: absolute;
    a{
        text-decoration: none;
        color: #fff;
    }
    ul{
        list-style: none;
    }
    button{
        border: none;
        outline: none;
    }
`
export const StyledAdminHeader=styled.header`
    /* h1{
        position: absolute;
        font-size: 0;
        line-height: 0;
        overflow: hidden;
    } */
`
export const StyledAdminTop=styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    background: #3f51b5;
    z-index: 1000;
    display: flex;
    justify-content: space-between;
    .left-admin-top{
        display: flex;
        align-items: center;
        padding: 10px;
        button{
            outline: none;
            background: transparent;
            color: #fff;
            font-size: 40px;
            border: none;
        }   
    }
    .right-admin-top{
        display: flex;
        align-items: center;
        padding: 10px;
    }
`
export const StyledAdminNav=styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    max-width: 220px;
    height: 100%;
    padding-top: 70px;
    z-index: 999;
    button{
        border: 0;
        width: 50px;
        height: 50px;
        overflow: hidden;
        font-size: 30px;
        color: #666;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: ease-in-out .2s;
        &:hover{
            /* color: rgb(63, 81, 181); */
            color: #fff;
            background: rgb(63, 81, 181);
        }
    }
`
export const AdminNavUl=styled.ul`
    position: relative;
    height: 100%;
    background: #ebebeb;
    width: 50px;
    li{
        border-bottom: 1px solid #ddd;
    }
`
export const StyledNavGnb=styled.div`
    display: none;
    position: absolute;
    top: 0;
    left: 50px;
    background: #fff;
    height: 100%;
    width: 170px;
    padding: 20px;
    border-right: 1px solid #dbdbdb;
    -webkit-box-shadow: 2px 0 2px rgba(150,150,150,100.1);
    -moz-box-shadow: 2px 0 2px rgba(150,150,150,0.1);
    box-shadow: 2px 0 2px rgba(150,150,150,0.1);
    &.visible{
        display: block;
    }
    a{
        color: #000;
    }
`
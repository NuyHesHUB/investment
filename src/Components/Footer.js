import React from 'react';
import styled from 'styled-components';

import Logo from '../assets/image/logo.png';
import { Link } from 'react-router-dom';

const StyledFrame=styled.div`
    width: 100%;
    height: 459px;
    /* background: #8e45fc; */
    /* background: rgba(69,74,252,1); */
    /* background: #0D1282; */
    background: #EBEDF0;
`
const StyledFooterWrap=styled.div`
    /* background: pink; */
    /* width: 100%; */
    height: 100%;
    padding: 0 30px;
`
const StyledFooterContainer=styled.div`
    /* background: skyblue; */
    width: 100%;
    max-width: 1440px;
    height: 100%;
    margin: 0 auto;
    /* padding: 60px 0 20px 50px; */
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const FooterLogoBox=styled.div`
    /* background: yellow; */
`
const FooterTextBox=styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    &.color999 {
        color: #999;
    }
`
// const TextFlexBox=styled.div`
//     background: ivory;
//     width: 100%;
//     display: flex;
//     justify-content: space-between;
//     p{
//         font-size: clamp(12px, 2vw, 16px);
//         color: #fff;
//         color: #555555;
//         margin: 5px 0;
//     }
// `
const FooterMenuBox = styled.div`
    /* background: blue; */
    display: flex;
    justify-content: space-between;
    width: 600px;
`
// const FooterLogo=styled.h1`
//     background: green;
//     font-family: 'Paytone One', sans-serif;
//     font-size: 38px;
// `
const FooterMenu = styled.div`
    /* background: pink; */
    /* margin: 0 30px; */
    /* margin-left: 100px; */
    ul {
        /* background: red; */
    }
    li {
        color: #555;
        margin-top: 25px; 
        font-size: 20px;
    }
    li span {color: #555;}
    li:first-child {margin-top: 0;}
`

const Footer = () => {
    return (
        <StyledFrame id='footer'>
            <StyledFooterWrap className='footer-wrap'>
                <StyledFooterContainer className='footer-container'>
                    <FooterMenuBox>
                        <FooterLogoBox className='footer-logo-box'>
                            <Link to="/">
                                <img src={Logo} alt="logo"/>
                            </Link>
                        </FooterLogoBox>
                        <FooterMenu>
                            <ul>
                                <li>
                                    <Link to="/investment/ongoing"><span>진행중</span></Link>
                                </li>
                                <li>
                                    <Link to="/investment/deadline"><span>마감</span></Link>
                                </li>
                                {/* <li>커뮤니티</li> */}
                            </ul>
                        </FooterMenu>
                        <FooterMenu>
                            <ul>
                                <li>공지사항</li>
                                <li>자주하는질문</li>
                                <li>이용자가이드</li>
                                <li>결제신청</li>
                            </ul>
                        </FooterMenu>
                    </FooterMenuBox>
                    <FooterTextBox className='color999'>
                        화진로보틱스 주식회사 | 경기도 화성시 동탄영천로 150 현대실리콘앨리 A동 1511호 | 대표이사 : 강화진 | 사업자등록번호 : 323-87-01693
                    </FooterTextBox>
                </StyledFooterContainer>
            </StyledFooterWrap>
        </StyledFrame>
    );
};

export default Footer;
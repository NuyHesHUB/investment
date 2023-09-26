import React from 'react';
import styled from 'styled-components';

const StyledFrame=styled.div`
    width: 100%;
    height: 250px;
    /* background: #8e45fc; */
    background: rgba(69,74,252,1);
    /* background: #0D1282; */
`
const StyledFooterWrap=styled.div`
    width: 100%;
    height: 100%;
    padding: 0 30px;
`
const StyledFooterContainer=styled.div`
    max-width: 1920px;
    height: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
`
const FooterLogoBox=styled.div`
    margin-bottom: 10px;
    h1{color: #fff};
`
const FooterTextBox=styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`
const TextFlexBox=styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    p{
        font-size: clamp(12px, 2vw, 16px);
        color: #fff;
        margin: 5px 0;
    }
`
const FooterLogo=styled.h1`
    font-family: 'Paytone One', sans-serif;
    font-size: 38px;
`

const Footer = () => {
    return (
        <StyledFrame id='footer'>
            <StyledFooterWrap className='footer-wrap'>
                <StyledFooterContainer className='footer-container'>
                    <FooterLogoBox className='footer-logo-box'>
                        <FooterLogo>Hwajin</FooterLogo>
                    </FooterLogoBox>
                    <FooterTextBox className='footer-text-box'>
                        <TextFlexBox className='top-text-box text-flex'>
                            <div>
                                <p>
                                    화진로보틱스 주식회사 | 대표이사 : 강화진
                                </p>
                            </div>
                            <div style={{display:'none'}}>
                                <p>
                                    문의 help@robotos.kr
                                </p>
                            </div>
                        </TextFlexBox>
                        <TextFlexBox className='center-text-box text-flex'>
                            <p>
                                사업자등록번호 : 323-87-01693
                            </p>
                        </TextFlexBox>
                        <TextFlexBox className='bottom-text-box text-flex'>
                            <p>
                                경기도 화성시 동탄첨단산업1로 51-9 엠타워 16층 {/* (영천동, 엠타워 지식산업센터) */}
                            </p>
                            {/* <p>
                                All Rights Reserved Hwajinrobotics Inc.
                            </p> */}
                        </TextFlexBox>
                        <TextFlexBox className='bottom-text-box text-flex'>
                            <p>
                               {/*  All Rights Reserved Hwajinrobotics Inc. */}
                               Copyright&copy;Hwajinrobotics Inc.
                            </p>
                        </TextFlexBox>
                    </FooterTextBox>
                </StyledFooterContainer>
            </StyledFooterWrap>
        </StyledFrame>
    );
};

export default Footer;
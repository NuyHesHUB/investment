import React from 'react';
import styled from 'styled-components';
import Logo from '../assets/image/logo.png';
import { Link } from 'react-router-dom';

const StyledFrame=styled.div`
    width: 100%;
    background: #888;
    height: 300px;
`
const FooterWrap=styled.div`
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
`
const FooterContainer=styled.div`

`
const TopFooterBox=styled.div`

`
const FooterLogoBox=styled.div`
    width: 100px;
    img{
        width: 100%;
        filter: brightness(30%);
    }
`


const Footer = () => {
    return (
        <StyledFrame>
            <FooterWrap>
                <FooterContainer>
                    <TopFooterBox>

                    </TopFooterBox>
                </FooterContainer>
            </FooterWrap>
        </StyledFrame>
    );
};

export default Footer;
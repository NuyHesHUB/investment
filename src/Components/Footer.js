import React from 'react';
import styled from 'styled-components';
import { ReactComponent as LogoSvg } from '../assets/image/logo.svg';
import { Link } from 'react-router-dom';

const StyledFrame=styled.div`
    width: 100%;
    background: rgb(235, 237, 240);
`
const FooterWrap=styled.div`
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
`
const FooterContainer=styled.div`
    padding-top: 50px;
    padding-bottom: 50px;
`
const TopFooterBox=styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding-bottom: 40px;
    border-bottom: 1px solid #999;
`
const TopFooterLeft=styled.div`
    cursor: pointer;
    svg{
        width: 150px;
        margin-bottom: 10px;
        path{
            fill: #888;
            transition: .2s;
            &:hover{
                fill: #1A9CF9;
            }
        }
    }
`
const TopLeftContent=styled.div`
    width: 250px;
    font-size: 14px;
    color: #666;
`
const TopFooterRight=styled.div`
    display: flex;
`
const TopRightItemBox=styled.div`
    display: flex;
    flex-direction: column;
    width: 150px;
`
const TopRightItemTitle=styled.div`
    font-weight: bold;
    font-size: 16px;
    /* color: #242424; */
    color: #666;
    margin-bottom: 8px;
    pointer-events: none;
`
const TopRightItemContent=styled.div`
    margin-bottom: 5px;
    a{
        color: #777;
        cursor: pointer;
        transition: .2s ease;
        &:hover{
            color: #1A9CF9;
        }
    }
    
`
const BottomFooterBox=styled.div`
    padding-top: 40px;
    display: flex;
    justify-content: space-between;
`
const BottomLeft=styled.div`

`
const BottomLeftBox=styled.div`

`
const BottomLeftWrap=styled.div`
    display: flex;
`
const BottomLeftDL=styled.dl`
    display: flex;
    margin-bottom: 5px;
`
const BoldBottomLeftDT=styled.dt`
    font-size: 16px;
    color: #444;
`
const BoldBottomLeftDD=styled.dd`
    font-size: 16px;
    color: #444;
`
const Divider=styled.dd`
    margin: 0 10px;
    color: #444;
`
const BottomLeftDT=styled.dt`
    font-size: 16px;
    color: #777;
`
const BottomLeftDD=styled.dd`
    font-size: 16px;
    color: #777;
`


const BottomRight=styled.div`
    >div{
        visibility: hidden;
    }
    >p{
        font-size: 16px;
        color: #777;
    }
    display: flex;
    flex-direction: column;
`
const handlePreparingBtn = () => {
    alert('준비 중입니다.');
}

const Footer = () => {
    return (
        <StyledFrame>
            <FooterWrap>
                <FooterContainer>
                    <TopFooterBox>
                        <TopFooterLeft>
                            <LogoSvg/>
                            <TopLeftContent>후핀은 혁신적인 투자 플랫폼으로,<br/> 투자자들에게 새로운 투자 세계를 열어줍니다.</TopLeftContent>
                        </TopFooterLeft>
                        <TopFooterRight>
                            <TopRightItemBox>
                                <TopRightItemTitle>회사</TopRightItemTitle>
                                <TopRightItemContent>
                                    <Link to="http://hwajinrobotics.com/" target='_blank'>회사 소개</Link>
                                </TopRightItemContent>
                            </TopRightItemBox>
                            <TopRightItemBox>
                                <TopRightItemTitle>서비스</TopRightItemTitle>
                                <TopRightItemContent>
                                    <Link to="/investment/ongoing">진행 중인 투자</Link>
                                </TopRightItemContent>
                                <TopRightItemContent>
                                    <Link to="/investment/deadline">마감된 투자</Link>
                                </TopRightItemContent>
                            </TopRightItemBox>
                            <TopRightItemBox>
                                <TopRightItemTitle>안내</TopRightItemTitle>
                                <TopRightItemContent>
                                    <Link onClick={handlePreparingBtn}>공지사항</Link>
                                </TopRightItemContent>
                                <TopRightItemContent>
                                    <Link onClick={handlePreparingBtn}>자주하는질문</Link>
                                </TopRightItemContent>
                                <TopRightItemContent>
                                    <Link onClick={handlePreparingBtn}>이용자가이드</Link>
                                </TopRightItemContent>
                            </TopRightItemBox>
                            <TopRightItemBox>
                                <TopRightItemTitle>후핀 등록</TopRightItemTitle>
                                <TopRightItemContent>
                                    <Link to="/payment_info_page">결제안내</Link>
                                </TopRightItemContent>
                            </TopRightItemBox>
                            <TopRightItemBox>
                                <TopRightItemTitle>제휴 문의</TopRightItemTitle>
                                <TopRightItemContent>
                                    <Link to="https://docs.google.com/forms/d/e/1FAIpQLSf05_vX4gy_PY6OYXuyWbosedkNC_sWYiYM53JPgn7tpKLq9g/viewform?usp=sf_link" target='_blank'>제휴 문의</Link>
                                </TopRightItemContent>
                            </TopRightItemBox>
                        </TopFooterRight>
                    </TopFooterBox>
                    <BottomFooterBox>
                        <BottomLeft>
                            <BottomLeftBox>
                                <BottomLeftDL>
                                    <BoldBottomLeftDT>화진로보틱스 주식회사</BoldBottomLeftDT>
                                    <Divider>|</Divider>
                                    <BoldBottomLeftDD>경기도 화성시 동탄영천로 150 현대실리콘앨리 A동 15층</BoldBottomLeftDD>
                                </BottomLeftDL>
                                <BottomLeftWrap>
                                    <BottomLeftDL>
                                        <BottomLeftDT>대표이사</BottomLeftDT>
                                        <BottomLeftDD style={{marginLeft:'5px'}}>강화진</BottomLeftDD>
                                        <Divider>|</Divider>
                                    </BottomLeftDL>
                                    <BottomLeftDL>
                                        <BottomLeftDT>사업자등록번호</BottomLeftDT>
                                        <BottomLeftDD style={{marginLeft:'5px'}}>323-87-01693</BottomLeftDD>
                                    </BottomLeftDL>
                                </BottomLeftWrap>
                            </BottomLeftBox>
                        </BottomLeft>
                        <BottomRight>
                            <div>""</div>
                            <p>Copyright© Hwajinrobotics Inc.</p>
                        </BottomRight>
                    </BottomFooterBox>
                </FooterContainer>
            </FooterWrap>
        </StyledFrame>
    );
};

export default Footer;
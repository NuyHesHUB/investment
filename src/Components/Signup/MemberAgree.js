import React, { useState } from 'react';

/* Styled-Components */
import { MemberTypeBox, MemberTypeWrap, SignUpTitle, StyledFrame } from './StyledMemberType';
import { AgreeBox, AgreeItemWrap, AgreeItem, CheckBoxWrap } from './StyledMemberAgree';

/* Components */
import Header from '../Header';
import Footer from '../Footer';

/* SVG */
import { ReactComponent as Check } from '../../assets/image/agree_check.svg';


const MemberAgree = () => {
    const [ isModalOpen, setIsModalOpen ] = useState(true);

    const handleModalClick = () => {
        setIsModalOpen(!isModalOpen);
    }

    return (
        <StyledFrame>
            <Header/>
            <MemberTypeWrap>
                <MemberTypeBox>
                    <SignUpTitle>약관동의</SignUpTitle>
                    <AgreeBox>
                        <AgreeItemWrap>
                            <AgreeItem>
                                <div className='all-agree'>
                                    <label>
                                        <input type='checkbox'/>
                                        <CheckBoxWrap><Check/></CheckBoxWrap>
                                        <span>전체 동의</span>
                                    </label>
                                    <p>선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다.</p>
                                </div>
                            </AgreeItem>
                            <AgreeItem>
                                <div className='space-box'>
                                    <div>
                                        <label>
                                            <input type='checkbox'/>
                                            <CheckBoxWrap><Check/></CheckBoxWrap>
                                            <span>후핀회원 이용약관 동의</span><span>(필수)</span>
                                        </label>
                                    </div>
                                    <span>약관보기</span>
                                </div>
                            </AgreeItem>
                            <AgreeItem>
                                <div className='space-box'>
                                    <div>
                                        <label>
                                            <input type='checkbox'/>
                                            <CheckBoxWrap><Check/></CheckBoxWrap>
                                            <span>전자금융서비스 이용약관</span><span>(필수)</span>
                                        </label>
                                    </div>
                                    <span>약관보기</span>
                                </div>
                            </AgreeItem>
                            <AgreeItem>
                                <div className='space-box'>
                                    <div>
                                        <label>
                                            <input type='checkbox'/>
                                            <CheckBoxWrap><Check/></CheckBoxWrap>
                                            <span>개인정보 수집 및 이용</span><span>(필수)</span>
                                        </label>
                                    </div>
                                    <span>약관보기</span>
                                </div>
                            </AgreeItem>
                            <AgreeItem>
                                <div className='space-box'>
                                    <div>
                                        <label>
                                            <input type='checkbox'/>
                                            <CheckBoxWrap><Check/></CheckBoxWrap>
                                            <span>만 14세 이상입니다</span><span>(필수)</span>
                                        </label>
                                    </div>
                                    {/* <span>약관보기</span> */}
                                </div>
                            </AgreeItem>
                            <AgreeItem>
                                <div className='space-box'>
                                    <div>
                                        <label>
                                            <input type='checkbox'/>
                                            <CheckBoxWrap><Check/></CheckBoxWrap>
                                            <span>개인정보 제3자 제공동의</span><span>(선택)</span>
                                        </label>
                                    </div>
                                    <span>내용보기</span>
                                </div>
                            </AgreeItem>
                            <AgreeItem>
                                <div className='space-box'>
                                    <div>
                                        <label>
                                            <input type='checkbox'/>
                                            <CheckBoxWrap><Check/></CheckBoxWrap>
                                            <span>개인정보 수집 및 이용</span><span>(선택)</span>
                                        </label>
                                    </div>
                                    <span>내용보기</span>
                                </div>
                            </AgreeItem>
                        </AgreeItemWrap>
                    </AgreeBox>
                </MemberTypeBox>
            </MemberTypeWrap>
            <Footer/>
        </StyledFrame>
    );
};

export default MemberAgree;
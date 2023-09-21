import React, { useState } from 'react';
import { StyledFrame, MemberTypeWrap, MemberTypeBox, SignUpTitle, TabBox, TabMenu, TabMenuItem, Desc, Contents } from './StyledMemberType';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';



const MemberType = () => {
    
    const [currentTab, setCurrentTab] = useState(0);

    const menuArr = [
        { name: '개인 회원', content: (
            <Contents>
                <div className='contents-wrap personal-contents'>
                    <h6>후핀에 오신 것을 환영합니다.</h6>
                    <Link to="/sign_up"><button>가입하기</button></Link>
                </div>
            </Contents>
        ) },
        { name: '사업자 회원', content: (
            <Contents>
                <div className='contents-wrap buisness-contents'>
                    <h6>사업자 등록 번호를 입력해 주세요.</h6>
                    <input type='text'/>
                    <button>인증하기</button>
                </div>
            </Contents>
        ) },
    ];

    const selectMenuHandler = (index) => {
        setCurrentTab(index);
    }

    return (
        <StyledFrame>
            <Header/>
            <MemberTypeWrap>
                <MemberTypeBox>
                    <SignUpTitle>회원가입</SignUpTitle>
                    <TabBox>
                        <TabMenu>
                            {menuArr.map((el,index) => (
                                <TabMenuItem 
                                    key={index} 
                                    className={index === currentTab ? 
                                        "submenu focused" : "submenu" }
                                    onClick={() => selectMenuHandler(index)}>{el.name}
                                </TabMenuItem>
                                ))}
                        </TabMenu>
                        <Desc>
                            {menuArr[currentTab].content}
                        </Desc>
                    </TabBox>
                </MemberTypeBox>
            </MemberTypeWrap>
            <Footer/>
        </StyledFrame>
    );
};

export default MemberType;
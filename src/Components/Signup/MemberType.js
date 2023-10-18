import React, { useState } from 'react';

/* Axios */
import axios from 'axios';

/* React-Router-Dom */
import { Link, useNavigate } from 'react-router-dom';

/* StyledComponents */
import { StyledFrame, MemberTypeWrap, MemberTypeBox, SignUpTitle, TabBox, TabMenu, TabMenuItem, Desc, Contents } from './StyledMemberType';

/* Components */
import Header from '../Header';
import Footer from '../Footer';
import NaverLogin from '../Login/SocialNaverLogin';
import KakaoLogin from '../Login/SocialKakaoLogin';

const MemberType = () => {
    /* const navigate = useNavigate(); */
    /* const baseURL = process.env.REACT_APP_BASEURL; */
    const [currentTab, setCurrentTab] = useState(0);
    /* const [BusinessNumber, setBusinessNumber] = useState(''); */

    /* const [isVerified, setIsVerified] = useState(false); */

    /* const [BusinessFormData, setBusinessFormData] = useState({
        businessNum: '',
        businessName: '',
        representativeName:'',
    }) */

    /*------------------------------------------------*\
                        Input Change
    \*------------------------------------------------*/
    /* const handleBNChange = (e) => {
        const value = e.target.value;
        if (/^[0-9]*$/.test(value)) {
            setBusinessFormData({
                ...BusinessFormData,
                businessNum: value
            });
        }
    }; */
    /* const handleInputChange = (e, field) => {
        const value = e.target.value;
        setBusinessFormData({
            ...BusinessFormData,
            [field]: value
        });
    }; */

    /*------------------------------------------------*\
          사업자 가입 진행 버튼 / 사업자 번호 검증 API
    \*------------------------------------------------*/
    /* const handleBuisnessSignUp = async (e) => {
        e.preventDefault();
        try { 
            const response = await axios.post(`${baseURL}/v1/users/validate` , { b_no : BusinessFormData.businessNum} , { withCredentials : true });
            const validBusinessData = response.data.data.b_stt; 
            if (validBusinessData === '계속사업자') {
                sessionStorage.setItem('BusinessNumber', BusinessFormData.businessNum)
                setIsVerified(true)
            } else {
                alert('오류가 발생하였습니다.')
            } 
        } catch (error) {
            if (error.response && error.response.data && error.response.data.err === '입력하신 사업자 번호의 사업자 등록 상태 확인이 필요합니다.') {
                alert('입력하신 사업자 번호의 사업자 등록 상태 확인이 필요합니다.')
            } else {
                console.error('사업자 번호 전송 실패');
            }
        }
    }; */

    /* console.log('테스트', isVerified); */
    /* console.log('사업자 폼 테스트', BusinessFormData); */

    /*------------------------------------------------*\
                      Tab Menu Contents
    \*------------------------------------------------*/
    const menuArr = [
        { name: '소셜 간편가입', content: (
            <Contents>
                <div className='contents-wrap personal-contents'>
                    {/* <h6>후핀에 오신 것을 환영합니다.</h6> */}
                    {/* <Link to="/sign_up"><button>가입하기</button></Link> */}
                    <NaverLogin contents="네이버 회원가입"/>
                    <KakaoLogin contents="카카오 회원가입"/>
                </div>
            </Contents>
        ) },
        /* { name: '사업자 회원', content: (
            <Contents>
                {isVerified ? (
                    <div className='contents-wrap buisness-contents'>
                        <NaverLogin contents="네이버 회원가입"/>
                        <KakaoLogin contents="카카오 회원가입"/>
                    </div>
                ):(
                    <div className='contents-wrap buisness-contents'>
                        <div>
                            <form>
                                <div>
                                    <label>사업자 번호</label>
                                    <input 
                                        type='text' 
                                        maxLength='10'
                                        value={BusinessFormData.businessNum}
                                        onChange={handleBNChange}
                                    />
                                </div>
                                <div>
                                    <label>사업자명</label>
                                    <input 
                                        type='text'
                                        value={BusinessFormData.businessName}
                                        onChange={(e) => handleInputChange(e, 'businessName')}
                                    />
                                </div>
                                <div>
                                    <label>대표자명</label>
                                    <input 
                                        type='text'
                                        value={BusinessFormData.representativeName}
                                        onChange={(e) => handleInputChange(e, 'representativeName')}
                                    />
                                </div>
                            </form>
                        </div>
                        <button onClick={handleBuisnessSignUp}>인증하기</button>
                    </div>
                )}
            </Contents>
        ) }, */
    ];

    const selectMenuHandler = (index) => {
        setCurrentTab(index);
    }

    /*------------------------------------------------*\
                        console 테스트 
    \*------------------------------------------------*/
    /* console.log('BusinessNumber',BusinessNumber); */

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
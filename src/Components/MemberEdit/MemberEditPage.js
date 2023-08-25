import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyledFrame, StyledMemberFrame, MemberForm, MemberBody, MemberInfoBox, MemberInfoTitle, MemberTextBox, MemberBtn, EditWrapFrame, EditInputFrame, EditInput } from './StyledMemberEditPageFrame';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/actions/actions';
import Header from '../Header';
import Footer from '../Footer';

const MemberEditPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [nicknameError, setNicknameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [loginPasswordError, setLoginPasswordError] = useState('');

    const validateNickname = (nickname) => {
        if (nickname.length < 3) {
            setNicknameError('닉네임은 최소 3자 이상이어야 합니다.');
        } else {
            setNicknameError('');
        }
    };
    const validateEmail = (email) => {
        const regExp = /^[A-Za-z0-9]+(.[A-Za-z0-9-_])*@[A-Za-z]+(.[A-Za-z])+(.[A-Za-z]{2,3})$/;
        if (!regExp.test(email)) {
            setEmailError('유효한 이메일 형식이 아닙니다.');
        } else {
            setEmailError('');
        }
    };
    const validatePassword = (password) => {
        if (password.length < 8) {
            setLoginPasswordError('비밀번호는 8자 이상이어야 합니다.');
        } else {
            setLoginPasswordError('');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));

        // 각각의 유효성 검사 함수 호출
        if (name === 'nickname') {
            validateNickname(value);
        } else if (name === 'email') {
            validateEmail(value);
        }else if (name === 'loginPassword') {
            validatePassword(value);
        }
    };

    const [showPasswordChange, setShowPasswordChange] = useState(false);
    const [showNicknameChange, setShowNicknameChange] = useState(false);
    const [showEmailChange, setShowEmailChange] = useState(false);
    const [showPhoneChange, setShowPhoneChange] = useState(false);

    const handlePasswordBtnClick = (e) => {
        e.preventDefault();
        setShowPasswordChange(!showPasswordChange); // 상태 값 반전
      };
    const handleNicknameBtnClick = (e) => {
        e.preventDefault();
        setShowNicknameChange(!showNicknameChange); // 상태 값 반전
    };
    const handleEmailBtnClick = (e) => {
        e.preventDefault();
        setShowEmailChange(!showEmailChange); // 상태 값 반전
    };
    const handlePhoneBtnClick = (e) => {
        e.preventDefault();
        setShowPhoneChange(!showPhoneChange); // 상태 값 반전
    };
    /*------------------------------------------------------*\
                        회원정보 불러오기
    \*------------------------------------------------------*/
    const accessToken = sessionStorage.getItem('accessToken');
    const [userData, setUserData] = useState(''); 
    const userUid = sessionStorage.getItem('userUid');
    const key = 'Authorization'
    const headers = { Authorization: `${accessToken}` }

    useEffect(() => {
        if (accessToken) {
            const url = `http://211.198.44.123:3385/v1/users/${userUid}?${key}=${accessToken}`;
            axios.get(url, { headers })
            .then(response => {
            setUserData(response.data.query[0]);
            setFormData(response.data.query[0]);
            })
            .catch(error => {
            console.error('회원 정보 가져오기 실패', error);
            });
        } else{
            dispatch(logout());
        }
    },[dispatch])

    const [formData, setFormData] = useState({
        nickname: '',
        email: '',
        phone: '',
        img: '',
        receiveSms: 'Y',
        receiveEmail: 'Y',
    });
    
    console.log('formData',formData);

    const [isVerificationEmailSent, setIsVerificationEmailSent] = useState(false);
    const [remainingTime, setRemainingTime] = useState(0);

    const handleSendVerificationEmail = (e) => {
        e.preventDefault();
        if(formData.email === userData.email){
            alert('기존의 이메일과 같습니다. 변경할 이메일을 입력해 주세요.')
        }else{
            const url = 'http://211.198.44.123:3385/v1/users/email_send';
            // 이메일 전송 요청 보내기
            axios.post(url, { email: formData.email })
                .then(response => {
                    console.log('이메일 전송 성공:', response.data);
                    setIsVerificationEmailSent(true); 
                    setRemainingTime(5 * 60); 
        
                    const timerInterval = setInterval(() => {
                        setRemainingTime(prevTime => prevTime - 1);
        
                        if (remainingTime <= 0) {
                            clearInterval(timerInterval); // 0초에 도달하면 타이머 중지
                            setIsVerificationEmailSent(false); // 버튼 활성화
                        }
                    }, 1000);
                })
                .catch(error => {
                    console.error('이메일 전송 실패:', error);
                });
        }
        
    };


    const [emailToken, setEmailToken] = useState({
        token:''
    });
    const handleTokenInputChange = (e) => {
        const { value } = e.target;
        setEmailToken((prevEmailToken) => ({
            ...prevEmailToken,
            token: value
        }));
    };
    /* console.log('emailToken.token', emailToken); */

    const handleCheckVerificationCode = (e) => {
            e.preventDefault();
            const url = 'http://211.198.44.123:3385/v1/users/email_check';
            // 인증 번호 체크 요청 보내기
            axios.post(url, { email: formData.email, token: emailToken.token})
                .then(response => {
                    console.log('인증 번호 확인 성공:', response.data);
                    alert('인증이 완료되었습니다.')
                    setShowEmailChange(!showEmailChange);
                })
                .catch(error => {
                    console.error('인증 번호 확인 실패:', error);
                });
    };
    
    return (
        <StyledFrame>
            <Header/>
            <StyledMemberFrame>
                <header style={{textAlign:'center'}}>
                    <h1>기본 회원정보</h1>
                </header>
                    {/* {userData && userData.query && userData.query.length > 0 ?  */}
                    {/* {userData ? 
                    ( */}
                    <MemberForm>
                        <MemberBody>
                            <MemberInfoBox>
                                <MemberInfoTitle>아이디</MemberInfoTitle>
                                <MemberTextBox>{userData? (userData.loginId):(null)}</MemberTextBox>
                                <MemberTextBox></MemberTextBox>
                            </MemberInfoBox>
                            <MemberInfoBox>
                                <MemberInfoTitle>비밀번호</MemberInfoTitle>
                                <MemberTextBox>**********</MemberTextBox>
                                <MemberTextBox style={{textAlign:'right'}}>
                                    <MemberBtn onClick={handlePasswordBtnClick}>비밀번호 변경</MemberBtn>
                                </MemberTextBox>
                            </MemberInfoBox>
                            {showPasswordChange? (<>dd</>) : (null)}
                            <MemberInfoBox>
                                <MemberInfoTitle>이름 (닉네임)</MemberInfoTitle>
                                {/* <MemberTextBox>{userData.nickname}</MemberTextBox> */}
                                <MemberTextBox>{userData? (userData.nickname):(null)}</MemberTextBox>
                                <MemberTextBox style={{textAlign:'right'}}>
                                    <MemberBtn onClick={handleNicknameBtnClick}>이름 변경</MemberBtn>
                                </MemberTextBox>
                            </MemberInfoBox>
                            {showNicknameChange? 
                                (
                                    <>
                                        ddddddddddddddd
                                    </>
                                ) 
                            : (null)}
                            <MemberInfoBox>
                                <MemberInfoTitle>이메일</MemberInfoTitle>
                                {/* <MemberTextBox>{userData.email}</MemberTextBox> */}
                                <MemberTextBox>{userData? (userData.email):(null)}</MemberTextBox>
                                <MemberTextBox style={{textAlign:'right'}}>
                                    <MemberBtn onClick={handleEmailBtnClick}>이메일 변경</MemberBtn>
                                </MemberTextBox>
                            </MemberInfoBox>
                            {showEmailChange? 
                                (
                                    <EditWrapFrame>
                                        <EditInputFrame>
                                            <div style={{width:'140px',textAlign:'left'}}>
                                                <span>변경할 이메일</span>
                                            </div>
                                            <div style={{width:'200px'}}>
                                                <EditInput
                                                    name="email"
                                                    type="email"
                                                    placeholder="변경할 이메일을 입력해 주세요"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div style={{width:'140px',textAlign:'right'}}>
                                                <MemberBtn onClick=     {handleSendVerificationEmail}>인증 메일 전송</MemberBtn>
                                            </div>
                                        </EditInputFrame>
                                        <div>
                                                {emailError && 
                                                    <div style={{color:'rgb(240, 63, 64)', fontSize:'13px'}}>{emailError}</div>}
                                                {formData.email === userData.email ? (
                                                    <div style={{color:'rgb(240, 63, 64)', fontSize:'13px'}}>기존의 이메일과 같습니다.</div>
                                                ) : (null)}
                                        </div>
                                        <EditInputFrame>
                                            <div style={{width:'140px',textAlign:'left'}}>
                                                <span>인증 메일 코드</span>
                                            </div>
                                            <div style={{width:'200px'}}>
                                                <EditInput
                                                    /* name="email" */
                                                    type="text"
                                                    placeholder="인증번호를 입력해 주세요."
                                                    value={emailToken.token}
                                                    onChange={handleTokenInputChange}
                                                />
                                            </div>
                                            <div style={{width:'140px',textAlign:'right'}}>
                                                <MemberBtn onClick={handleCheckVerificationCode}>확 인</MemberBtn>
                                            </div>
                                        </EditInputFrame>
                                        {isVerificationEmailSent
                                            ? remainingTime > 0
                                                ? `인증 메일 전송 (${Math.floor(remainingTime / 60)}:${remainingTime % 60})`
                                                : '인증 메일 전송 완료'
                                            : '인증 메일 전송'}
                                    </EditWrapFrame>
                                ) 
                            : (null)}
                            <MemberInfoBox>
                                <MemberInfoTitle>연락처</MemberInfoTitle>
                                {/* <MemberTextBox>{userData.phone}</MemberTextBox> */}
                                <MemberTextBox>{userData? (userData.phone):(null)}</MemberTextBox>
                                <MemberTextBox style={{textAlign:'right'}}>
                                    <MemberBtn onClick={handlePhoneBtnClick}>연락처 변경</MemberBtn>
                                </MemberTextBox>
                            </MemberInfoBox>
                            {showPhoneChange? (<>dd</>) : (null)}
                        </MemberBody>
                        <div style={{marginTop:'50px', textAlign:'center'}}>
                            <MemberBtn>제출</MemberBtn>
                        </div>
                    </MemberForm>
                    {/* ) : ( <p>로딩</p>) } */}
            </StyledMemberFrame>
            
            <Footer/>
        </StyledFrame>
    );
};

export default MemberEditPage;
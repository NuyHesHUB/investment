import React, { useEffect, useState } from 'react';

/* Redux */
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actions/actions';

/* React-Router-Dom */
import { useNavigate } from 'react-router-dom';

/* Axios */
import axios from 'axios';
import axiosInstance from '../../axiosInstance';

/* Styled Components */
import { StyledFrame, StyledMemberFrame, MemberForm, MemberBody, MemberInfoBox, MemberInfoTitle, MemberTextBox, MemberBtn, EditWrapFrame, EditInputFrame, EditInput } from './StyledMemberEditPageFrame';

/* Components */
import Header from '../Header';
import Footer from '../Footer';

const MemberEditPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [nicknameError, setNicknameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [loginPasswordError, setLoginPasswordError] = useState('');
    const userUid = sessionStorage.getItem('userUid');
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
    const handlePWInputChange = (e) => {
        const { name, value } = e.target;
        setPassWordData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
        // 각각의 유효성 검사 함수 호출
        if (name === 'loginPassword') {
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

    const handlePasswordSaveClick = async (e) => {
        e.preventDefault();
        try {
            const url = `http://39.117.244.34:3385/v1/users/password`;
            const response = await axios.patch(url, passwordData, { headers });
            console.log('비밀번호 업데이트 성공:', response.data);
            // 여기서 필요한 추가 동작 수행 가능 (예: 사용자에게 알림 등)
            alert('비밀번호가 성공적으로 변경되었습니다.')
    
        } catch (error) {
            console.error('비밀번호 업데이트 실패:', error);
            // 에러 처리 (예: 사용자에게 알림 등)
        }
    };
    
    
    /*------------------------------------------------------*\
                        회원정보 불러오기
    \*------------------------------------------------------*/
    const accessToken = sessionStorage.getItem('accessToken');
    const [userData, setUserData] = useState(''); 
    
    const key = 'Authorization'
    const headers = { Authorization: `${accessToken}` }

    useEffect(() => {
        if (accessToken) {
            const url = `/users/${userUid}?${key}=${accessToken}`;
            axiosInstance.get(url, { headers })
            .then(response => {
            setUserData(response.data.query[0]);
            /* setFormData(response.data.query[0]); */
            setFormData({
                nickname: response.data.query[0].nickname,
                email: response.data.query[0].email,
                phone: response.data.query[0].phone,
                img: response.data.query[0].img,
                receiveSms: response.data.query[0].receiveSms,
                receiveEmail: response.data.query[0].receiveEmail,
                status : response.data.query[0].status,
                isAdmin: "N",
                group : "일반",
                userUid: userUid
            });
            })
            .catch(error => {
            console.error('회원 정보 가져오기 실패', error);
            });
        } else{
            dispatch(logout());
        }
    },[dispatch])
    
    console.log('userData' , userData.nickname);

    const [formData, setFormData] = useState({
        nickname: '',
        email: '',
        phone: '',
        img: '',
        receiveSms: 'Y',
        receiveEmail: 'Y',
        status : "Y",
        isAdmin: "N",
        group : "일반",
        userUid: userUid
    });

    const [passwordData, setPassWordData] = useState({
        userUid : userUid,    
        loginPassword : ''
    })
    
    console.log('formData',formData);

    const [isVerificationEmailSent, setIsVerificationEmailSent] = useState(false);
    /* const [remainingTime, setRemainingTime] = useState(0); */

    
    const handleSendVerificationEmail = (e) => {
        e.preventDefault();
        if(formData.email === userData.email){
            alert('기존의 이메일과 같습니다. 변경할 이메일을 입력해 주세요.')
        }else{
            const url = '/users/email_send';
            // 이메일 전송 요청 보내기
            axiosInstance.post(url, { email: formData.email })
                .then(response => {
                    console.log('이메일 전송 성공:', response.data);
                    setIsVerificationEmailSent(true); 
                    /* setRemainingTime(5 * 60);  */
        
                    /* const timerInterval = setInterval(() => {
                        setRemainingTime(prevTime => prevTime - 1);
        
                        if (remainingTime <= 0) {
                            clearInterval(timerInterval); 
                            setIsVerificationEmailSent(false);
                        }
                    }, 1000); */
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
            const url = '/users/email_check';
            // 인증 번호 체크 요청 보내기
            axiosInstance.post(url, { email: formData.email, token: emailToken.token})
                .then(response => {
                    console.log('인증 번호 확인 성공:', response.data);
                    alert('인증이 완료되었습니다.')
                    setShowEmailChange(!showEmailChange);
                })
                .catch(error => {
                    console.error('인증 번호 확인 실패:', error);
                });
    };
    const handleMemberEditSaveClick = async (e) => {
        e.preventDefault();
        try {
            const url = `http://39.117.244.34:3385/v1/users/modify`;
            /* const updatedFormData = { ...formData, userUid: userUid }; */
            const response = await axios.patch(url, formData, { headers });
            console.log('회원정보 업데이트 성공:', response.data);
            // 여기서 필요한 추가 동작 수행 가능 (예: 사용자에게 알림 등)
            alert('회원정보가 성공적으로 변경되었습니다.')
    
        } catch (error) {
            /* const updatedFormData = { ...formData, userUid: userUid };
            console.log('updatedFormData',updatedFormData); */
            console.error('회원정보 변경 업데이트 실패:', error);
            // 에러 처리 (예: 사용자에게 알림 등)
        }
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
                                <MemberTextBox>{passwordData.loginPassword}</MemberTextBox>
                                <MemberTextBox style={{textAlign:'right'}}>
                                    <MemberBtn onClick={handlePasswordBtnClick}>비밀번호 변경</MemberBtn>
                                </MemberTextBox>
                            </MemberInfoBox>
                            {showPasswordChange? (
                                <EditWrapFrame>
                                <EditInputFrame>
                                    <div style={{width:'140px',textAlign:'left'}}>
                                        <span>변경할 비밀번호</span>
                                    </div>
                                    <div style={{width:'200px'}}>
                                        <EditInput
                                            name="loginPassword"
                                            type="password"
                                            placeholder="변경할 비밀번호를 입력해 주세요"
                                            value={passwordData.loginPassword}
                                            onChange={handlePWInputChange}
                                        />
                                    </div>
                                    <div style={{width:'140px',textAlign:'right'}}>
                                        <MemberBtn onClick={handlePasswordSaveClick}>저 장</MemberBtn>
                                    </div>
                                </EditInputFrame>
                                {/* <div>
                                        {nicknameError && 
                                            <div style={{color:'rgb(240, 63, 64)', fontSize:'13px'}}>{nicknameError}</div>}
                                        {formData.nickname === userData.nickname ? (
                                            <div style={{color:'rgb(240, 63, 64)', fontSize:'13px'}}>기존의 닉네임과 같습니다.</div>
                                        ) : (null)}
                                </div> */}
                            </EditWrapFrame>
                            ) : (null)}
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
                                    <EditWrapFrame>
                                        <EditInputFrame>
                                            <div style={{width:'140px',textAlign:'left'}}>
                                                <span>변경할 닉네임</span>
                                            </div>
                                            <div style={{width:'200px'}}>
                                                <EditInput
                                                    name="nickname"
                                                    type="text"
                                                    placeholder="변경할 닉네임을 입력해 주세요"
                                                    value={formData.nickname}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div style={{width:'140px',textAlign:'right'}}>
                                                <MemberBtn onClick={handleNicknameBtnClick}>저 장</MemberBtn>
                                            </div>
                                        </EditInputFrame>
                                        <div>
                                                {nicknameError && 
                                                    <div style={{color:'rgb(240, 63, 64)', fontSize:'13px'}}>{nicknameError}</div>}
                                                {formData.nickname === userData.nickname ? (
                                                    <div style={{color:'rgb(240, 63, 64)', fontSize:'13px'}}>기존의 닉네임과 같습니다.</div>
                                                ) : (null)}
                                        </div>
                                    </EditWrapFrame>
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
                                                <MemberBtn onClick={handleSendVerificationEmail}>인증 메일 전송</MemberBtn>
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
                                       {/*  {isVerificationEmailSent
                                            ? remainingTime > 0
                                                ? `인증 메일 전송 (${Math.floor(remainingTime / 60)}:${remainingTime % 60})`
                                                : '인증 메일 전송 완료'
                                            : '인증 메일 전송'} */}
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
                            {showPhoneChange? (
                                <EditWrapFrame>
                                <EditInputFrame>
                                    <div style={{width:'140px',textAlign:'left'}}>
                                        <span>변경할 연락처</span>
                                    </div>
                                    <div style={{width:'200px'}}>
                                        <EditInput
                                            name="phone"
                                            type="text"
                                            placeholder="변경할 연락처를 입력해 주세요"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div style={{width:'140px',textAlign:'right'}}>
                                        <MemberBtn onClick={handlePhoneBtnClick}>저 장</MemberBtn>
                                    </div>
                                </EditInputFrame>
                                <div>
                                        {phoneError && 
                                            <div style={{color:'rgb(240, 63, 64)', fontSize:'13px'}}>{phoneError}</div>}
                                        {formData.phone === userData.phone ? (
                                            <div style={{color:'rgb(240, 63, 64)', fontSize:'13px'}}>기존의 연락처와 같습니다.</div>
                                        ) : (null)}
                                </div>
                            </EditWrapFrame>
                            ) : (null)}
                        </MemberBody>
                        <div style={{marginTop:'50px', textAlign:'center'}}>
                            <MemberBtn onClick={handleMemberEditSaveClick}>제출</MemberBtn>
                        </div>
                    </MemberForm>
                    {/* ) : ( <p>로딩</p>) } */}
            </StyledMemberFrame>
            
            <Footer/>
        </StyledFrame>
    );
};

export default MemberEditPage;
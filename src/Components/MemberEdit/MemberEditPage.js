import React, { useEffect, useState } from 'react';

/* Redux */
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actions/actions';

/* React-Router-Dom */
import { useNavigate } from 'react-router-dom';

/* Axios */
import axios from 'axios';

/* Styled Components */
import { StyledFrame, StyledMemberFrame, MemberForm, MemberBody, MemberInfoBox, MemberInfoTitle, MemberTextBox, MemberBtn, EditWrapFrame, EditInputFrame, EditInput } from './StyledMemberEditPageFrame';

/* Components */
import Header from '../Header';
import Footer from '../Footer';

const MemberEditPage = () => {
    //API
    const baseURL = process.env.REACT_APP_BASEURL;
    const accessToken = sessionStorage.getItem('accessToken');
    const userUid = sessionStorage.getItem('userUid');
    const headers = {
        Authorization: `${accessToken}`
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //에러 메세지
    const [nicknameError, setNicknameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [loginPasswordError, setLoginPasswordError] = useState('');

    //이메일 인증
    const [isVerificationEmailSent, setIsVerificationEmailSent] = useState(false);

    /*------------------------------------------------------*\
                        회원정보 불러오기
    \*------------------------------------------------------*/
    const [userData, setUserData] = useState(''); 
    const [formData, setFormData] = useState({
        nickname: '',
        email: '',
        phone: '',
        img: '',
        receiveSms: '',
        receiveEmail: '',
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

    useEffect(() => {
        if (accessToken) {
            axios.get(`${baseURL}/v1/users/${userUid}`, { headers })
                .then(response => {
                    const userdata = response.data?.query[0];
                    setUserData(userdata);
                    setFormData({
                        nickname: userdata.nickname,
                        email: userdata.email,
                        phone: userdata.phone,
                        img: userdata.img,
                        receiveSms: userdata.receiveSms,
                        receiveEmail: userdata.receiveEmail,
                        status : userdata.status,
                        isAdmin: "N",
                        group : "일반",
                        userUid: userUid
                    });
                }).catch(error => {
                    console.error('회원 정보 가져오기 실패', error);
                });
        } else{
            dispatch(logout());
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dispatch])
    
    /*------------------------------------------------*\
                        유효성 검사
    \*------------------------------------------------*/
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

    /*------------------------------------------------*\
                        input change
    \*------------------------------------------------*/
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
        if (name === 'nickname') {
            validateNickname(value);
        } else if (name === 'email') {
            validateEmail(value);
        }else if (name === 'loginPassword') {
            validatePassword(value);
        }
    };
    const handleRadioChange = (e, key) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    }
    const handlePWInputChange = (e) => {
        const { name, value } = e.target;
        setPassWordData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
        if (name === 'loginPassword') {
            validatePassword(value);
        }
    };

    /*------------------------------------------------*\
                      변경 아코디언 메뉴
    \*------------------------------------------------*/
    const [showPasswordChange, setShowPasswordChange] = useState(false);
    const [showNicknameChange, setShowNicknameChange] = useState(false);
    const [showEmailChange, setShowEmailChange] = useState(false);
    const [showPhoneChange, setShowPhoneChange] = useState(false);

    const handlePasswordBtnClick = (e) => {
        e.preventDefault();
        setShowPasswordChange(!showPasswordChange);
      };
    const handleNicknameBtnClick = (e) => {
        e.preventDefault();
        setShowNicknameChange(!showNicknameChange);
    };
    const handleEmailBtnClick = (e) => {
        e.preventDefault();
        setShowEmailChange(!showEmailChange);
    };
    const handlePhoneBtnClick = (e) => {
        e.preventDefault();
        setShowPhoneChange(!showPhoneChange);
    };

    /*------------------------------------------------*\
                      비밀번호 변경 저장
    \*------------------------------------------------*/
    const handlePasswordSaveClick = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(`${baseURL}/v1/users/password`, passwordData, { headers });
            console.log('비밀번호 업데이트 성공:', response.data);
            alert('비밀번호가 성공적으로 변경되었습니다.')
        } catch (error) {
            if (error.response && error.response.data === '[비밀번호]는 8~20자리의 영문,숫자,특수문자를 포함하여야 합니다.') {
                alert('비밀번호는 8~20자리의 영문,숫자,특수문자를 포함하여야 합니다.')
            } else{
                console.error('비밀번호 업데이트 실패:', error);
            }
        }
    };

    /*------------------------------------------------*\
                    이메일 변경 검사 및 인증
    \*------------------------------------------------*/
    const handleSendVerificationEmail = (e) => {
        e.preventDefault();
        if(formData.email === userData.email){
            alert('기존의 이메일과 같습니다. 변경할 이메일을 입력해 주세요.')
        } else{
            axios.post(`${baseURL}/v1/users/email_send`, { email: formData.email })
                .then(response => {
                    console.log('이메일 전송 성공:', response.data);
                    alert('인증 메일이 전송되었습니다.')
                    setIsVerificationEmailSent(true); 
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

    /*------------------------------------------------*\
                  이메일 변경 인증번호 검사
    \*------------------------------------------------*/
    const handleCheckVerificationCode = (e) => {
            e.preventDefault();
            axios.post(`${baseURL}/v1/users/email_check`, { email: formData.email, token: emailToken.token})
                .then(response => {
                    console.log('인증 번호 확인 성공:', response.data);
                    alert('인증이 완료되었습니다.')
                    setShowEmailChange(!showEmailChange);

                })
                .catch(error => {
                    if (error.response && error.response.data.result === '인증번호가 일치하지 않습니다.') {
                        alert('인증번호가 일치하지 않습니다.')
                    } else{
                        console.error('비밀번호 업데이트 실패:', error);
                    }
                    console.error('인증 번호 확인 실패:', error);
                });
    };

    /*------------------------------------------------*\
                  나머지 회원 정보 수정 저장
    \*------------------------------------------------*/
    const handleMemberEditSaveClick = async () => {
        /* e.preventDefault(); */
        try {
            const response = await axios.patch(`${baseURL}/v1/users/modify`, formData, { headers });
            console.log('회원정보 업데이트 성공:', response.data);
            alert('회원정보가 성공적으로 변경되었습니다.');
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
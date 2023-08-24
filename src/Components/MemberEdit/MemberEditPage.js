import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyledFrame, StyledMemberFrame, MemberForm, MemberBody, MemberInfoBox, MemberInfoTitle, MemberTextBox, MemberBtn, EditWrapFrame, EditInputFrame, EditInput } from './StyledMemberEditPageFrame';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/actions/actions';
import Header from '../Header';

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
    const [userData, setUserData] = useState(null); 
    const userUid = sessionStorage.getItem('userUid');
    const key = 'Authorization'
    const headers = { Authorization: `${accessToken}` }

    useEffect(() => {
        if (accessToken) {
            const url = `http://211.198.44.123:3385/v1/users/${userUid}?${key}=${accessToken}`;
            axios.get(url, { headers })
            .then(response => {
            setUserData(response.data);
            })
            .catch(error => {
            console.error('회원 정보 가져오기 실패', error);
            });
        } else{
            dispatch(logout());
        }
    },[dispatch])
    /* 회원정보 console.log */

    console.log('userData',userData);
    console.log('테스트', userData);

   /*  let NickName = userData.query[0].loginId */

    const [formData, setFormData] = useState({
        /* nickname: userData, */
        email: '',
        phone: '',
        img: '',
        receiveSms: 'Y',
        receiveEmail: 'Y',
    });

    console.log(formData);
    return (
        <StyledFrame>
            <Header/>
            <StyledMemberFrame>
                <header style={{textAlign:'center'}}>
                    <h1>기본 회원정보</h1>
                </header>
                    {userData && userData.query && userData.query.length > 0 ? 
                    (
                    <MemberForm>
                        <MemberBody>
                            <MemberInfoBox>
                                <MemberInfoTitle>아이디</MemberInfoTitle>
                                <MemberTextBox>{userData.query[0].loginId}</MemberTextBox>
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
                                <MemberTextBox>{userData.query[0].nickname}</MemberTextBox>
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
                                <MemberTextBox>{userData.query[0].email}</MemberTextBox>
                                <MemberTextBox style={{textAlign:'right'}}>
                                    <MemberBtn onClick={handleEmailBtnClick}>이메일 변경</MemberBtn>
                                </MemberTextBox>
                            </MemberInfoBox>
                            {showEmailChange? 
                                (
                                    <EditWrapFrame>
                                        <EditInputFrame>
                                            <EditInput
                                                name="email"
                                                type="email"
                                                placeholder="이메일을 입력해주세요."
                                                value={formData.email}
                                                onChange={handleInputChange}
                                            />
                                            <MemberBtn>수정</MemberBtn>
                                        </EditInputFrame>
                                        {emailError && <div style={{color:'rgb(240, 63, 64)', fontSize:'13px'}}>{emailError}</div>}
                                    </EditWrapFrame>
                                ) 
                            : (null)}
                            <MemberInfoBox>
                                <MemberInfoTitle>연락처</MemberInfoTitle>
                                <MemberTextBox>{userData.query[0].phone}</MemberTextBox>
                                <MemberTextBox style={{textAlign:'right'}}>
                                    <MemberBtn onClick={handlePhoneBtnClick}>연락처 변경</MemberBtn>
                                </MemberTextBox>
                            </MemberInfoBox>
                            {showPhoneChange? (<>dd</>) : (null)}
                        </MemberBody>
                        
                    </MemberForm>
                    ) : ( <p>로딩</p>) }
            </StyledMemberFrame>
            <div style={{marginTop:'50px', textAlign:'center'}}>
                <MemberBtn>제출</MemberBtn>
            </div>
        </StyledFrame>
    );
};

export default MemberEditPage;
import React, { useRef, useState } from 'react';

/* React-Router-Dom */
import { Link, useNavigate } from 'react-router-dom';
/* import { useForm } from 'react-hook-form'; */

/* Axios */
import axios from 'axios';
import axiosInstance from '../../axiosInstance';

/* Components */
import Header from '../Header';
import Footer from '../Footer';

/* StyledComponents */
import { StyledFrame, StyledSigninFrame } from './StyledSignupFrame';

const Signup = () => {
    /* React-Router-Dom */
    const navigate = useNavigate();

    /* FormData State */
    const [formData, setFormData] = useState({
        group: '',
        loginId: '',
        loginPassword: '',
        nickname: '',
        phone: '',
        email: '',
        img: '',
        receiveSms: 'Y',
        receiveEmail: 'Y',
        note: ''
    });

    /* Submit Error State */
    const [errorFromSubmit, setErrorFromSubmit] = useState("");

    /* Error State */
    const [groupError, setGroupError] = useState('');
    const [loginIdError, setLoginIdError] = useState('');
    const [nicknameError, setNicknameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [loginPasswordError, setLoginPasswordError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    /* LoginID Check State */
    const [loginIdCheck, setLoginIdCheck] = useState(false);

    /*------------------------------------------------*\
                    Login ID 유효성 검사
    \*------------------------------------------------*/
    const validateLoginId = (loginId) => {
        const regExp = /^[A-Za-z0-9_]{3,}$/;
        if (!regExp.test(loginId)) {
            setLoginIdError('영문자, 숫자, 밑줄만 사용하여 최소 3자 이상 입력해주세요.');
        } else {
            setLoginIdError('');
        }
    };

    /*------------------------------------------------*\
                    nickname 유효성 검사
    \*------------------------------------------------*/
    const validateNickname = (nickname) => {
        if (nickname.length < 3) {
            setNicknameError('닉네임은 최소 3자 이상이어야 합니다.');
        } else {
            setNicknameError('');
        }
    };

    /*------------------------------------------------*\
                      E-mail 유효성 검사
    \*------------------------------------------------*/
    const validateEmail = (email) => {
        const regExp = /^[A-Za-z0-9]+(.[A-Za-z0-9-_])*@[A-Za-z]+(.[A-Za-z])+(.[A-Za-z]{2,3})$/;
        if (!regExp.test(email)) {
            setEmailError('유효한 이메일 형식이 아닙니다.');
        } else {
            setEmailError('');
        }
    };

    /*------------------------------------------------*\
                    PassWord 유효성 검사
    \*------------------------------------------------*/
    const validatePassword = (password) => {
        if (password.length < 8) {
            setLoginPasswordError('비밀번호는 8자 이상이어야 합니다.');
        } else {
            setLoginPasswordError('');
        }
    };

    /*------------------------------------------------*\
                    Phone 유효성 검사
    \*------------------------------------------------*/
    const validatePhone = (phone) => {
        const phoneRegex = /^[0-9]{10,11}$/; // 10자 또는 11자 숫자만 허용하는 정규식
        if (!phoneRegex.test(phone)) {
            setPhoneError('유효한 휴대폰 번호가 아닙니다.');
        } else {
            setPhoneError('');
        }
    };
    
    /*------------------------------------------------*\
                    LoginID 중복체크 API
    \*------------------------------------------------*/
    const handleCheckId = async () => {
        try {
            const response = await axiosInstance.get(`/users/check_id/${formData.loginId}`);
            console.log("아이디 중복 확인 요청이 성공했습니다.", response);
            if (response.data.result === "사용 가능한 아이디 입니다.") {
                console.log(`아이디 "${formData.loginId}"는 사용 가능합니다.`);
                alert(`아이디 "${formData.loginId}"는 사용 가능합니다.`);
                setLoginIdCheck(true);
            }
        } catch (error) {
            if (error.response && error.response.data.error === '중복된 아이디 입니다.') {
                console.log(`아이디 "${formData.loginId}"는 이미 사용 중입니다. 다른 아이디를 선택해주세요.`);
                alert(`아이디 "${formData.loginId}"는 이미 사용 중입니다. 다른 아이디를 선택해주세요.`);
                setLoginIdCheck(false);
            } else {
                console.error('아이디 중복 확인 요청 중 오류가 발생했습니다.', error);
                setLoginIdCheck(false);
            }
        }
    };
    /*------------------------------------------------*\
                    회원가입 onSubmit Btn
    \*------------------------------------------------*/
    const onSubmit = async (e) => {
        e.preventDefault();
        // 각 입력값의 유효성 검사
        validateLoginId(formData.loginId);
        validateNickname(formData.nickname);
        validateEmail(formData.email);
        validatePassword(formData.loginPassword);
        validatePhone(formData.phone);

        if (loginIdCheck === false) {
            alert('아이디 중복을 확인해주세요.');
            return;
        }

        if (!formData.group) {
            setGroupError('일반 또는 기업을 선택해주세요.');
        } else {
            setGroupError('');
        }

        if (
            loginIdError ||
            nicknameError ||
            emailError ||
            loginPasswordError ||
            phoneError ||
            !formData.loginId ||
            !formData.nickname ||
            !formData.email ||
            !formData.loginPassword ||
            !formData.confirmPassword ||
            !formData.phone ||
            !formData.group
        ) {
            alert('입력값을 확인해주세요.');
            return;
        }

        try {
            const response = await axiosInstance.post('/users/sign_up', formData);
            console.log('회원가입 성공:', response);
            navigate("/login") 
        } catch (error) {
            console.error('회원가입 실패:', error);
            setErrorFromSubmit(error.message);
        }
    };

    /*------------------------------------------------*\
                    HandleInputChange
    \*------------------------------------------------*/
    const handleGroupChange = (e) => {
        const { value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            group: value
        }));
    };

    /*------------------------------------------------*\
                    HandleInputChange
    \*------------------------------------------------*/
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
        } else if (name === 'loginId') {
            validateLoginId(value);
        } else if (name === 'loginPassword') {
            validatePassword(value);
        } else if (name === 'phone') {
            validatePhone(value);
        }
    };
    console.log(formData);

    return (
        <StyledFrame>
            <Header/>
            <StyledSigninFrame>
                    <h1>회원가입</h1>
                    <div style={{marginTop:'20px', marginBottom:'20px', textAlign:'center'}}>
                        <span style={{marginBottom:'20px'}}>이미 계정이 있으신가요? </span>
                        <Link to="/login">
                            로그인 하기
                        </Link>
                    </div>
                    <form onSubmit={onSubmit}>
                        <div className='form-input-wrap'>
                            <div style={{width:'140px', textAlign:'left'}}>
                                <label>그룹</label>
                                <span>*</span>
                            </div>
                            <div className='form-input-radio-box'>
                                <div style={{display:'flex',justifyContent:'center'}}>
                                    <div style={{marginRight:'5px', display:'flex',alignItems:'center'}}>
                                        <label style={{marginRight:'5px'}}>일반</label>
                                        <input
                                            type="radio"
                                            name="group"
                                            value="일반"
                                            checked={formData.group === '일반'}
                                            onChange={handleGroupChange}
                                        />
                                    </div>
                                    <div style={{display:'flex',alignItems:'center'}}>
                                        <label style={{marginRight:'5px'}}>기업</label>
                                        <input
                                            type="radio"
                                            name="group"
                                            value="기업"
                                            checked={formData.group === '기업'}
                                            onChange={handleGroupChange}
                                        />
                                    </div>
                                </div>
                                {groupError && <div style={{color:'rgb(240, 63, 64)', fontSize:'13px'}}>{groupError}</div>}
                            </div>
                            <div style={{width:'120px', marginLeft:'8px'}}></div>
                        </div>
                        <div className='form-input-wrap'>
                            <div style={{width:'140px', textAlign:'left'}}>
                                <label>아이디</label>
                                <span>*</span>
                            </div>
                            <div className='form-input-box'>
                                <input
                                    name='loginId'
                                    type='text'
                                    placeholder="아이디를 입력해주세요."
                                    value={formData.loginId}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='id-check-btn' style={{width:'120px', marginLeft:'8px'}}>
                                <Link 
                                    style={{display:'flex',alignItems:'center',justifyContent:'center', textDecoration:'none'}} 
                                    onClick={handleCheckId}>
                                    <span style={{color:'rgb(95, 0, 128)'}}>중복검사</span>
                                </Link>
                            </div>
                        </div>
                        {loginIdError && <div style={{color:'rgb(240, 63, 64)', fontSize:'13px'}}>{loginIdError}</div>}
                        <div className='form-input-wrap'>
                            <div style={{width:'140px', textAlign:'left'}}>
                                <label>이메일</label>
                                <span>*</span>
                            </div>
                            <div className='form-input-box'>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="이메일을 입력해주세요."
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                                {emailError && <div style={{color:'rgb(240, 63, 64)', fontSize:'13px'}}>{emailError}</div>}
                            </div>
                            <div style={{width:'120px', marginLeft:'8px'}}></div>
                        </div>
                        <div className='form-input-wrap'>
                            <div style={{width:'140px', textAlign:'left'}}>
                                <label>닉네임</label>
                                <span>*</span>
                            </div>
                            <div className='form-input-box'>
                                <input
                                    name="nickname"
                                    type='text'
                                    placeholder='닉네임을 입력해주세요.'
                                    value={formData.nickname}
                                    onChange={handleInputChange}
                                />
                                {nicknameError && <div style={{color:'rgb(240, 63, 64)', fontSize:'13px'}}>{nicknameError}</div>}
                             </div>
                             <div style={{width:'120px', marginLeft:'8px'}}></div>
                        </div>
                        <div className='form-input-wrap'>
                            <div style={{width:'140px', textAlign:'left'}}>
                                <label>비밀번호</label>
                                <span>*</span>
                            </div>
                            <div className='form-input-box'>
                                <input
                                    name="loginPassword"
                                    type="password"
                                    placeholder='비밀번호를 입력해주세요. (8자 이상)'
                                    value={formData.loginPassword}
                                    onChange={handleInputChange}
                                />
                                {loginPasswordError && <div style={{color:'rgb(240, 63, 64)', fontSize:'13px'}}>{loginPasswordError}</div>}
                            </div>
                            <div style={{width:'120px', marginLeft:'8px'}}></div>
                        </div>
                        <div className='form-input-wrap'>
                            <div style={{width:'140px', textAlign:'left'}}>
                                <label>비밀번호 확인</label>
                                <span>*</span>
                            </div>
                            <div className='form-input-box'>
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    placeholder='비밀번호를 다시 입력해주세요.'
                                    /* value={formData.confirmPassword} */
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div style={{width:'120px', marginLeft:'8px'}}></div>
                        </div>
                        {formData.loginPassword && formData.confirmPassword && formData.loginPassword !== formData.confirmPassword && (
                            <div className='error-box' style={{color:'rgb(240, 63, 64)', fontSize:'13px'}}>비밀번호가 일치하지 않습니다.</div>
                        )}
                        <div className='form-input-wrap'>
                            <div style={{width:'140px', textAlign:'left'}}>
                                <label>전화번호</label>
                                <span>*</span>
                            </div>
                            <div className='form-input-box'>
                                <input
                                    name="phone"
                                    type='text'
                                    placeholder='전화번호를 입력해주세요.'
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                                {phoneError && <div className='error-box' style={{color:'rgb(240, 63, 64)', fontSize:'13px'}}>{phoneError}</div>}
                             </div>
                             <div style={{width:'120px', marginLeft:'8px'}}></div>
                        </div>
                        <button className='submit-btn' type='submit'>제출</button>
                    </form>
            </StyledSigninFrame>
            <Footer/>
        </StyledFrame>
    );
};

export default Signup;
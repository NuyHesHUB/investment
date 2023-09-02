import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
/* import { useForm } from 'react-hook-form'; */
import axios from 'axios';
import axiosInstance from '../../axiosInstance';
import Header from '../Header';
import { StyledFrame, StyledSigninFrame } from './StyledSignupFrame';
import Footer from '../Footer';

const Signup = () => {
    const [errorFromSubmit, setErrorFromSubmit] = useState("");

    const [loginIdError, setLoginIdError] = useState('');
    const [nicknameError, setNicknameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [loginPasswordError, setLoginPasswordError] = useState('');

    const validateLoginId = (loginId) => {
        const regExp = /^[A-Za-z0-9_]{3,}$/;
        if (!regExp.test(loginId)) {
            setLoginIdError('영문자, 숫자, 밑줄만 사용하여 최소 3자 이상 입력해주세요.');
        } else {
            setLoginIdError('');
        }
    };

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
        }else if (name === 'loginId') {
            validateLoginId(value);
        }else if (name === 'loginPassword') {
            validatePassword(value);
        }
    };
    const onSubmit = async (e) => {
        e.preventDefault(); // 기본 동작인 새로고침 막기
        // 회원가입 로직 구현
        try {
            const response = await axiosInstance.post('/users/sign_up', formData);
            console.log('회원가입 성공:', response);
            // 성공 처리 로직 추가
        } catch (error) {
            console.error('회원가입 실패:', error);
            setErrorFromSubmit(error.message)
            // 실패 처리 로직 추가
        }
    };


    const [formData, setFormData] = useState({
        group: '',
        loginId: '',
        loginPassword: '',
        nickname: '',
        phone: '01095768881',
        email: '',
        img: '',
        receiveSms: 'Y',
        receiveEmail: 'Y',
        note: '테스트'
    });

    const handleCheckId = async () => {
        try {
            const response = await axiosInstance.get(`/users/check_id/${formData.loginId}`);
            console.log("아이디 중복 검사 응답:", response);
            alert('사용가능한 아이디입니다.')
        } catch (error) {
            console.error('아이디 중복 검사 실패', error);
            alert('중복된 아이디입니다.')
        }
    };


    const handleGroupChange = (e) => {
        const { value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            group: value
        }));
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
                        <div className='form-container'>
                            <label>
                                <input
                                    type="radio"
                                    name="group"
                                    value="일반"
                                    checked={formData.group === '일반'}
                                    onChange={handleGroupChange}
                                />
                                일반
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="group"
                                    value="기업"
                                    checked={formData.group === '기업'}
                                    onChange={handleGroupChange}
                                />
                                기업
                            </label>
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
                                <Link style={{display:'flex',alignItems:'center',justifyContent:'center', textDecoration:'none'}} onClick={handleCheckId}>
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
                                <label>이름</label>
                                <span>*</span>
                            </div>
                            <div className='form-input-box'>
                                <input
                                    name="nickname"
                                    type='text'
                                    placeholder='이름을 입력해주세요.'
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
                                {formData.loginPassword !== formData.confirmPassword && (
                                    <div>비밀번호가 일치하지 않습니다.</div>
                                )}
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
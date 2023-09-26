/* import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { useDispatch } from 'react-redux';
import { login, logout, setUserUid } from '../../store/actions/actions';

import { Link, useNavigate } from 'react-router-dom';

import Header from '../Header';
import Footer from '../Footer';
import KakaoLogin from './SocialKakaoLogin';
import NaverLogin from './SocialNaverLogin';

import { StyledFrame, LoginWrap, LoginBox, LoginTitle, LoginFormBox, LoginContentsBox, ForgetDivideBox, Divider, SocialLoginBox, SocialIconBox, SocialIcon } from './StyledLoginFrame';

const Login = () => {
    const baseURL = process.env.REACT_APP_BASEURL;
    const navigate = useNavigate();
    const [loginId, setLoginId] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        const accessToken = sessionStorage.getItem('accessToken');
        if (accessToken) {
            dispatch(login());
        }else{
            dispatch(logout());
        }
        
    }, [dispatch]);
    
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${baseURL}/v1/authorize/sign_in`, {
                loginId,
                loginPassword
        });
            console.log("로그인 성공");
        
            const userData = response.data.userData;
            const accessToken = response.data.accessToken;
            const refreshToken = response.data.refreshToken;

            const userUid = response.data.userData.id;

            sessionStorage.setItem('accessToken', accessToken);
            sessionStorage.setItem('refreshToken', refreshToken);
        
            console.log('로그인 유저 정보',userUid);
        
            dispatch(login(userUid));
            dispatch(setUserUid(userUid));

            console.log('Updated userUid:', userUid);
            sessionStorage.setItem('userUid', userUid);

        if (userData.group === '관리자' && userData.isAdmin === 'Y') {
            navigate("/admin") 
        } else {
            navigate("/")
        }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error === '가입되지 않은 [아이디]이거나 [비밀번호]가 올바르지 않습니다.') {
                alert('가입되지 않은 아이디이거나 비밀번호가 올바르지 않습니다.');
            } else {
                console.error('로그인 실패', error);
            }
        }
    };

    return (
        <StyledFrame>
            <Header/>
            <LoginWrap>
                <LoginBox>
                    <LoginTitle>로그인</LoginTitle>
                    <LoginFormBox onSubmit={handleLogin}>
                        <input
                            type="text"
                            placeholder="아이디를 입력해주세요"
                            value={loginId}
                            onChange={(e) => setLoginId(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="비밀번호를 입력해주세요"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            autoComplete="off"
                        />
                        <button type='submit'>로그인</button>
                        <LoginContentsBox>
                            <div style={{marginLeft:'7px'}}>
                                <span>
                                    <Link>아이디</Link>
                                </span>
                                <ForgetDivideBox>/</ForgetDivideBox>
                                <span>
                                    <Link>비밀번호 찾기</Link>
                                </span>
                            </div>
                            <div style={{marginRight:'7px'}}>
                                <span><Link to="/member_type">회원가입</Link></span>
                            </div>
                        </LoginContentsBox>
                        <Divider></Divider>
                        <SocialLoginBox>
                            <span>다른 계정으로 로그인</span>
                            <SocialIconBox>
                                <KakaoLogin/>
                                <NaverLogin/>
                            </SocialIconBox>
                        </SocialLoginBox>
                    </LoginFormBox>
                </LoginBox>
            </LoginWrap>
            <Footer/>
        </StyledFrame>
        
    );
};

export default Login; */
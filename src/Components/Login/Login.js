import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import axios from 'axios';
import { StyledFrame, StyledLoginFrame } from './StyledLoginFrame';
import { useDispatch } from 'react-redux';
import { login } from '../../store/actions/actions';

const Login = () => {
    const [loginId, setLoginId] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        // 컴포넌트가 마운트될 때 세션 스토리지에서 로그인 상태를 체크하고 업데이트합니다.
        const accessToken = sessionStorage.getItem('accessToken');
        if (accessToken) {
            dispatch(login());
        }
    }, [dispatch]);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
        /* const response = await axios.post('http://192.168.0.14:3300/v1/authorize/sign_in', { */
        const response = await axios.post('http://211.198.44.123:3385/v1/authorize/sign_in', {
            loginId,/* otz4193 */
            loginPassword/* 동탄test1234! */
            
        });
        dispatch(login());
        console.log("로그인 성공");

        /* const userData = response.data.userData; */
        const accessToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;

        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('refreshToken', refreshToken);

        window.location.href = '/';
        /* if (userData.group === '관리자' && userData.isAdmin === 'Y') {
            window.location.href = '/admin'; 
        } else {
            window.location.href = '/';
        } */

        } catch (error) {
        console.error('로그인 실패', error);
        }
    };

    return (
        <StyledFrame>
            <Header/>
            <StyledLoginFrame>
                <div style={{textAlign:'center'}}>
                    <h1>로그인</h1>
                    <form onSubmit={handleLogin} style={{display:'flex', flexDirection:'column', marginTop:'30px'}}>
                        <input
                            type="text"
                            placeholder="아이디를 입력해주세요."
                            value={loginId}
                            onChange={(e) => setLoginId(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="비밀번호를 입력해주세요."
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                        />
                        <button type='submit'>로그인</button>
                    </form>
                </div>
                <div style={{marginTop:'50px', textAlign:'center'}}>
                    <p style={{marginBottom:'20px'}}>아직 화진 회원이 아니신가요?</p>
                    <Link to="/sign_up">
                        <button>화진 회원가입 하기</button>
                    </Link>
                </div>
            </StyledLoginFrame>
        </StyledFrame>
    );
};

export default Login;
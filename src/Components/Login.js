import React, { useState } from 'react';
import axios from 'axios';


const Login = () => {
    const [loginId, setLoginId] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const handleLogin = async () => {
        try {
        const response = await axios.post('http://192.168.0.14:3300/v1/authorize/sign_in', {
            loginId,
            loginPassword
        });

        const userData = response.data.userData;
        const accessToken = response.data.accessToken;
        sessionStorage.setItem('accessToken', accessToken);

        if (userData.group === '관리자' && userData.isAdmin === 'Y') {
            // 관리자 페이지로 이동
            window.location.href = '/admin';
        } else {
            // 일반 사용자 페이지로 이동
            window.location.href = '/user';
        }
        } catch (error) {
        console.error('로그인 실패', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="아이디"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
            />
            <input
                type="password"
                placeholder="비밀번호"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
            />
            <button onClick={handleLogin}>로그인</button>
        </div>
    );
};

export default Login;
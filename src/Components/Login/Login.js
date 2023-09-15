import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header';
import axios, { Axios } from 'axios';
import axiosInstance from '../../axiosInstance';
import { StyledFrame, StyledLoginFrame } from './StyledLoginFrame';
import { useDispatch } from 'react-redux';
import { login, logout, setUserUid } from '../../store/actions/actions';
import Footer from '../Footer';

const Login = () => {
    const baseURL = process.env.REACT_APP_URL;
    const navigate = useNavigate();
    const [loginId, setLoginId] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const dispatch = useDispatch();
    /* header key value 값 보내서 회원정보 가져오기를 로그인하면 으로 옮김 */
    /* const [userData, setUserData] = useState(null); 
    const userUid = sessionStorage.getItem('userUid');
    const accessToken = sessionStorage.getItem('accessToken');
    const key = 'Authorization'
    const headers = { Authorization: `${accessToken}` } */

    /* accessToken이 있으면 로그인 상태관리 유지 */
    useEffect(() => {
        const accessToken = sessionStorage.getItem('accessToken');
        if (accessToken) {
            dispatch(login());
            /* const url = `http://211.198.44.123:3385/v1/users/${userUid}?${key}=${accessToken}`;
            axios.get(url, { headers })
            .then(response => {
            setUserData(response.data);
            })
            .catch(error => {
            console.error('회원 정보 가져오기 실패', error);
            }); */
            
        }else{
            dispatch(logout());
        }
        
    }, [dispatch]);

    /* console.log(userData); */


    /* const [userData, setUserData] = useState(null); 
    const userUid = sessionStorage.getItem('userUid');
    const accessToken = sessionStorage.getItem('accessToken');
    const key = 'Authorization'
    const headers = {
            Authorization: `${accessToken}`
        }

    useEffect(() => {
        const url = `http://211.198.44.123:3385/v1/users/${userUid}?${key}=${accessToken}`;
        axios.get(url, { headers })
        .then(response => {
          setUserData(response.data);
        })
        .catch(error => {
          console.error('회원 정보 가져오기 실패', error);
        });
        
      }, []);
      console.log(userData); */
    
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
        const response = await axios.post(`${baseURL}/v1/authorize/sign_in`, {
        /* const response = await axios.post('/authorize/sign_in', { */
            loginId,/* otz4193 */
            loginPassword/* 동탄test1234! */
        });
        
        
        console.log("로그인 성공");
        const userData = response.data.userData;
        const accessToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;

        /* userUid */
        const userUid = response.data.userData.id;

        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('refreshToken', refreshToken);
        
        console.log('로그인 유저 정보',userUid);
        
        dispatch(login(userUid));
        dispatch(setUserUid(userUid));
        /* 관리자 권한으로 로그인을 하게되면 "/admin" 페이지로 이동 */
        console.log('Updated userUid:', userUid);
        sessionStorage.setItem('userUid', userUid);

        if (userData.group === '관리자' && userData.isAdmin === 'Y') {
            navigate("/admin") 
        } else {
            navigate("/")
        }
        

        } catch (error) {
        console.error('로그인 실패', error);
        }
    };
    
    /* useEffect(() => {
    const refreshAccessToken = async () => {
        try {
            const refreshToken = sessionStorage.getItem('refreshToken');

            const refreshResponse = await axios.post('/v1/authorize/token', {
                refreshToken
            });

            const newAccessToken = refreshResponse.data.accessToken;
            sessionStorage.setItem('accessToken', newAccessToken);
        } catch (error) {
            console.error('Access Token 갱신 실패', error);
        }
    };

    const interval = setInterval(refreshAccessToken, 3000);
    return () => {
        clearInterval(interval); 
    };
},[]) */

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
            <Footer/>
        </StyledFrame>
        
    );
};

export default Login;
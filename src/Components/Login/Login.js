import React, { useEffect, useState } from 'react';

/* Axios */
import axios from 'axios';

/* Redux */
import { useDispatch } from 'react-redux';
import { login, logout, setUserUid } from '../../store/actions/actions';

/* React-Router-Dom */
import { Link, useNavigate } from 'react-router-dom';

/* Components */
import Header from '../Header';
import Footer from '../Footer';
import KakaoLogin from './SocialKakaoLogin';
import NaverLogin from './SocialNaverLogin';
import GoogleLogin from './SocialGoogleLogin';

/* StyledComponents */
import { StyledFrame, LoginWrap, LoginBox, LoginTitle, LoginSignUpBox,LoginFormBox, LoginContentsBox, ForgetDivideBox, Divider, SocialLoginBox, SocialIconBox, SocialIcon } from './StyledLoginFrame';

/* Imgage */
import NaverBtn from '../../assets/Login-Image/naver_bar.png';
import KakaoBtn from '../../assets/Login-Image/kakao_bar.png';

const Login = () => {
    const baseURL = process.env.REACT_APP_BASEURL;
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
            /* dispatch(login()); */
            /* const url = `http://211.198.44.123:3385/v1/users/${userUid}?${key}=${accessToken}`;
            axios.get(url, { headers })
            .then(response => {
            setUserData(response.data);
            })
            .catch(error => {
            console.error('회원 정보 가져오기 실패', error);
            }); */
            
        }/* else{
            dispatch(logout());
        } */
        
    }, []);

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

            /* 관리자 권한으로 로그인을 하게되면 "/admin" 페이지로 이동 */
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
            <LoginWrap>
                <LoginBox>
                    <LoginTitle>로그인</LoginTitle>
                        <NaverLogin contents="네이버 로그인"/>
                        <KakaoLogin contents="카카오 로그인"/>
                    <LoginSignUpBox>
                        <p>아직 계정이 없으신가요?</p><Link>가입하기</Link>
                    </LoginSignUpBox>
                </LoginBox>
            </LoginWrap>
            <Footer/>
        </StyledFrame>
        
    );
};

export default Login;
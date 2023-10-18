import React from 'react';
/* StyledComponents */
import { SocialIcon, LogoWrap, TextWrap } from './StyledLoginFrame';

/* Image */
import KakaoIcon from '../../assets/Login-Image/kakao.png';

const SocialKakaoLogin = ({ contents }) => {
    
    /* const redirect_uri = 'http://localhost:3000/auth/kakao/callback' */
    /* const Rest_api_key = "b8441dff52370984a58af5e6b5b1527e"; */

    const Rest_api_key = process.env.REACT_APP_KAKAOKEY;
    const redirect_uri = process.env.REACT_APP_KAKAOURI;
    

    console.log('REACT_APP_KAKAOKEY',Rest_api_key);
    console.log('REACT_APP_KAKAOURI',redirect_uri);
    // oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
    const handleLogin = ()=>{
        window.location.href = kakaoURL;
    }

    return(
        <SocialIcon style={{background:'rgb(253, 220, 63)'}} onClick={handleLogin}>
            <LogoWrap>
                <img src={KakaoIcon} alt="kakao아이콘"/>
            </LogoWrap>
            <TextWrap>
                <p style={{color:'rgb(58, 41, 41)'}}>{contents}</p>
            </TextWrap>
        </SocialIcon>
    );
};

export default SocialKakaoLogin
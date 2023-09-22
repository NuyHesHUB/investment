import React from 'react';
/* StyledComponents */
import { SocialIcon } from './StyledLoginFrame';

/* Image */
import KakaoIcon from '../../assets/Login-Image/kakao.png';

const SocialKakaoLogin = () => {
    
    /* const Rest_api_key='66000f2f2a2d8b9680ad9166fcdb83dc' */
    /* const redirect_uri = 'http://localhost:3000/login/kakao_login' */ 
    
    //영석씨
    const Rest_api_key='6ad3d28fae0d23467d899c0adf771844'
    const redirect_uri = 'http://localhost:3000/auth/kakao/callback'

    //REACT_APP_KAKAO_KEY
    //REACT_APP_KAKAO_URI
    //const Rest_api_key=process.env.REACT_APP_KAKAO_KEY
    //const redirect_uri =process.env.REACT_APP_KAKAO_URI

    console.log('Rest_api_key',Rest_api_key);
    console.log('redirect_uri',redirect_uri);
    // oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
    const handleLogin = ()=>{
        /* window.open(kakaoURL, '_blank'); */
        window.location.href = kakaoURL
    }

    return(
        <SocialIcon onClick={handleLogin}>
            <img src={KakaoIcon} alt="kakao아이콘"/>
        </SocialIcon>
    );
};

export default SocialKakaoLogin
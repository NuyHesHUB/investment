import React from 'react';
/* StyledComponents */
import { SocialIcon } from './StyledLoginFrame';

/* Image */
import NaverIcon from '../../assets/Login-Image/naver.png';

const SocialNaverLogin = () => {

    /* const Rest_api_key='JGN2AeHmBKGnaZE0teQw';
    const redirect_uri = 'http://localhost:3000/login/naver_login';
    const state = "false";
    const naverURL=`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${Rest_api_key}&state=${state}&redirect_uri=${redirect_uri}`; */

    //영석씨
    //const Rest_api_key='AZP_wlwaxUxgLB76A1FT';
    //const redirect_uri = 'http://localhost:3000/auth/naver/callback';
    
    const Rest_api_key=process.env.REACT_APP_NAVERKEY;
    const redirect_uri =process.env.REACT_APP_NAVERURI;
    const state = "RAMDOM_STATE";
    const naverURL=`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${Rest_api_key}&state=${state}&redirect_uri=${redirect_uri}`;

    const handleLogin = () => {
        window.location.href = naverURL
    }
    return (
        <SocialIcon onClick={handleLogin}>
            <img src={NaverIcon} alt="kakao아이콘"/>
        </SocialIcon>
    );
};

export default SocialNaverLogin;
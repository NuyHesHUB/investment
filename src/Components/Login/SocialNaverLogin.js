import React from 'react';
/* StyledComponents */
import { SocialIcon, LogoWrap, TextWrap } from './StyledLoginFrame';

/* Image */
import NaverIcon from '../../assets/Login-Image/naver.png';

const SocialNaverLogin = ({ contents }) => {

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
        <SocialIcon style={{background:'#00C73C'}} onClick={handleLogin}>
            <LogoWrap>
                <img src={NaverIcon} alt="naver아이콘"/>
            </LogoWrap>
            <TextWrap>
                <p style={{color:'#fff'}}>{contents}</p>
            </TextWrap>
        </SocialIcon>
    );
};

export default SocialNaverLogin;
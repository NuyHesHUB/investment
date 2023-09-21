import axios from 'axios';
import React, { useEffect } from 'react';

const KakaoRedirection = () => {
    const baseURL = process.env.REACT_APP_BASEURL;
    const code = new URL(document.location.toString()).searchParams.get('code');
    console.log('code',code);
    useEffect(() => {
        
        /* axios.post(`${process.env.REACT_APP_URL}kakaoLogin${code}`) */
        
    }, []);

    return (
        <div>
            카카오 Redirection 페이지
        </div>
    );
};

export default KakaoRedirection;
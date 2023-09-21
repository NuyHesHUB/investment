import axios from 'axios';
import React, { useEffect } from 'react';

const NaverRedirection = () => {
    const baseURL = process.env.REACT_APP_BASEURL;
    const code = new URL(document.location.toString()).searchParams.get('code');
    console.log('code',code);
    useEffect(() => {
        
        /* axios.post(`${process.env.REACT_APP_URL}kakaoLogin${code}`) */
        
    }, []);

    return (
        <div>
            네이버 Redirection 페이지
        </div>
    );
};

export default NaverRedirection;
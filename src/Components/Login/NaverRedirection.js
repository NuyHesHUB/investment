import axios from 'axios';
import React, { useEffect } from 'react';

const NaverRedirection = () => {
    const baseURL = process.env.REACT_APP_BASEURL;
    const code = new URL(document.location.toString()).searchParams.get('code');
    console.log('code',code);

    /* useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.post(`${baseURL}/v1/authorize/naver_login`, { code: code, socialType: "naver"} , { withCredentials : true})
                console.log('response', response);
            } catch(error) {
                console.error('실패');
            }
        }
        fetchData();
    }, []); */

    return (
        <div>
            네이버 Redirection 페이지
        </div>
    );
};

export default NaverRedirection;
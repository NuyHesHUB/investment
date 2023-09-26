import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NaverRedirection = () => {
    const navigate = useNavigate();
    const baseURL = process.env.REACT_APP_BASEURL;
    const code = new URL(document.location.toString()).searchParams.get('code');
    console.log('code',code);

    useEffect(() => {
        const fetchData = async () => {
            try{/* /v1/authorize/social_login */
                const response = await axios.post(`${baseURL}/v1/authorize/social_login`, { code: code, socialType: "naver"} , { withCredentials : true})
                console.log('response', response);
                const userUid = response.data.userData.id;
                const accessToken = response.data.accessToken;
                const refreshToken = response.data.refreshToken;
                sessionStorage.setItem('accessToken', accessToken);
                sessionStorage.setItem('refreshToken', refreshToken);
                sessionStorage.setItem('userUid', userUid);
                navigate("/");
            } catch(error) {
                console.error('실패');
            }
        }
        fetchData();
    }, []);

    return null;

    
    /* return (
        <div>
            네이버 Redirection 페이지
        </div>
    ); */
};

export default NaverRedirection;
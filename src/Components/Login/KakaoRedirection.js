import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KakaoRedirection = () => {
    const navigate = useNavigate();
    const baseURL = process.env.REACT_APP_BASEURL;
    const code = new URL(document.location.toString()).searchParams.get('code');
    console.log('code',code);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.post(`${baseURL}/v1/authorize/social_login`, { code: code, socialType: "kakao"/* , group: "일반" */} , { withCredentials : true})
                const userData = response.data.userData;
                const userUid = response.data.userData.id;
                const accessToken = response.data.accessToken;
                const refreshToken = response.data.refreshToken;

                sessionStorage.setItem('userUid', userUid);
                sessionStorage.setItem('accessToken', accessToken);
                sessionStorage.setItem('refreshToken', refreshToken);
                
                console.log('response', response);
                if (userData.group === '관리자' && userData.isAdmin === 'Y') {
                    navigate("/admin");
                } else {
                    navigate("/");
                }

            } catch(error) {
                console.error('실패');
            }
        }
        fetchData();
        
    }, []);

    return null;

    /* return (
        <div>
            카카오 Redirection 페이지
        </div>
    ); */
};

export default KakaoRedirection;
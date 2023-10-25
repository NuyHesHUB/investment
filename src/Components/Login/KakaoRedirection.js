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
                const response = await axios.post(`${baseURL}/v1/authorize/social_login`, { code: code, socialType: "kakao"} , { withCredentials : true})
                const userData = response.data.userData;
                const userUid = response.data.userData.id;
                const userGroup = response.data.userData.group;
                const userIsAdmin = response.data.userData.isAdmin;
                const accessToken = response.data.accessToken;
                const refreshToken = response.data.refreshToken;
                const b_no = response.data.userData.b_no;
                console.log(b_no,'b_no')

                sessionStorage.setItem('userUid', userUid);
                sessionStorage.setItem('accessToken', accessToken);
                sessionStorage.setItem('refreshToken', refreshToken);
                sessionStorage.setItem('userGroup', userGroup);
                sessionStorage.setItem('userIsAdmin', userIsAdmin);
                if(b_no){
                    sessionStorage.setItem('b_no', b_no);
                }
                
                if (response.data.type === "first") {
                    navigate('/success_sign_up')
                } else {

                    console.log('response', response);
                    if (userData.group === '관리자' && userData.isAdmin === 'Y') {
                        navigate("/admin");
                    } else {
                        navigate("/");
                    }
                }


            } catch(error) {
                console.error('실패');
                if (error.response.data.err === "해당 계정은 가입이 불가능합니다.") {
                    alert("가입이 불가능한 카카오 계정입니다.")
                    navigate('/login')
                }
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
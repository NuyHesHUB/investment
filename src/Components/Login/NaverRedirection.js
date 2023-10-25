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
            try{
                const response = await axios.post(`${baseURL}/v1/authorize/social_login`, { code: code, socialType: "naver" } , { withCredentials : true})
                const userData = response.data.userData;
                const userUid = response.data.userData.id;
                const userGroup = response.data.userData.group; 
                const userIsAdmin = response.data.userData.isAdmin;
                const accessToken = response.data.accessToken;
                const refreshToken = response.data.refreshToken;
                const b_no = response.data.userData.b_no;
                const uid = userUid === null ? '' : userUid

              

                sessionStorage.setItem('userUid', userUid);
                sessionStorage.setItem('accessToken', accessToken);
                sessionStorage.setItem('refreshToken', refreshToken);
                sessionStorage.setItem('userGroup', userGroup);
                sessionStorage.setItem('userIsAdmin', userIsAdmin);
                if(b_no){
                    sessionStorage.setItem('b_no', b_no);
                }
                if (response.data.type === "first") {
                    alert("회원가입이 완료되었습니다.")
                    navigate('/success_sign_up')
                } else {
                    if (userData.group === '관리자' && userData.isAdmin === 'Y') {
                        navigate("/admin");
                    } else {
                        navigate("/");
                    }
                }
               
                ///// 접속 로그 /////
                if (userUid) {
                    await axios.post(`${baseURL}/v1/log/access/form`, { userUid: uid }).then((res) => {
                        console.log(res,"logloglog테스트임")
                    }).catch((error) => {
                        console.log("접속로그에러에러에러",error)
                    })
                } else {
                    console.log("Djqd업음업음", uid,'asdasd')
                }
            } catch(error) {
                console.error('실패');
            }
        }
        fetchData();
    }, []);

    // useEffect(() => {
    //     const accessLog = async () => {
    //         if (userUid) {
    //             await axios.post(`${baseURL}/v1/log/access/form`, { userUid: uid }).then((res) => {
    //                 console.log(res,"logloglog")
    //             })
    //             console.log("테스트임테스트임테스트임")
    //         } else {
    //             console.log("Djqd업음업음", uid,'asdasd')
    //         }
    //     }
    //     accessLog();
    // }, [])


    return null;

    
    /* return (
        <div>
            네이버 Redirection 페이지
        </div>
    ); */
};

export default NaverRedirection;
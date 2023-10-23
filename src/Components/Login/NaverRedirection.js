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
                /* 접속(login) 로그 */
             
                
                // axios.get(`${baseURL}/v1/users/?query=&pageRows&page`, { accessToken }).then((res) => {
                //     console.log(res.data,"resresres")
                //     if (res.data.totalRows === 0) {
                //     // alert("회원가입 테스트")
                //     }
                // }).catch(() => {
                //     console.error("error");
                // })
                 
                // const idid = "4566d49af8449d941dcb2d702d535e12f1b1234a5b9a45e4b5f4c588049faf33"
                // if (idid === userUid) {
                //     alert("같아요")
                // }

                sessionStorage.setItem('userUid', userUid);
                sessionStorage.setItem('accessToken', accessToken);
                sessionStorage.setItem('refreshToken', refreshToken);
                sessionStorage.setItem('userGroup', userGroup);
                sessionStorage.setItem('userIsAdmin', userIsAdmin);
                if(b_no){
                    sessionStorage.setItem('b_no', b_no);
                }
                
                if (userData.group === '관리자' && userData.isAdmin === 'Y') {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
               
    //FIXME:FIXME:TODO:TODO:TODO: 500 internal server error 해결FIXME:FIXME:TODO:TODO:TODO:
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
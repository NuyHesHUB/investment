import React, { useEffect, useState } from 'react';

/* Axios */
import axios from 'axios';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { setAdminUserData, setAdminBoardData, setAdminPostData, logout } from '../../store/actions/actions';

/* StyledComponents */
import { StyledAdminFrame, StyledAdminHeader, StyledAdminTop, StyledAdminNav, AdminNavUl, StyledNavGnb } from './AdminStyledComponents/StyledAdmin';
import { HeaderLogo } from '../StyledComponents/StyledHeader';

/* React-Router-Dom */
import { Link, useNavigate } from 'react-router-dom';

/* React-Icons */
import { AiFillSetting } from "react-icons/ai";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { BsPersonCircle, BsFillBuildingFill } from "react-icons/bs";

const Admin = () => {
    const baseURL = process.env.REACT_APP_BASEURL;
    const accessToken = sessionStorage.getItem('accessToken');
    const headers = {
        Authorization: `${accessToken}`
    }


    /* const testData = useSelector((state) => state.reducer) */
    /* console.log('testData',testData); */

    /* const adminUserData = useSelector((state) => state.reducer.adminUserData);
    const adminPostData = useSelector((state) => state.reducer.adminPostData); */

    const dispatch = useDispatch();
    const navigate = useNavigate();
    /* dispatch(setBoardData(titles)); */
    
    
    

    /*------------------------------------------------*\
                   Admin User / Post Data API
    \*------------------------------------------------*/
    
    /* const [adminUserData, setAdminUserData] = useState(null);
    const [adminBoardData, setAdminBoardData] = useState(null);
    const [adminPostData, setAdminPostData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const adminUserResponse = await axios.get(`${baseURL}/v1/users`, { headers });
                dispatch(setAdminUserData(adminUserResponse.data?.query));
                const userdata = adminUserResponse.data?.query;
                setAdminUserData(userdata);

                const adminBoardResponse = await axios.get(`${baseURL}/v1/board?query=&pageRows=&page=`, { headers });
                dispatch(setAdminBoardData(adminBoardResponse.data?.query));
                const boarddata = adminBoardResponse.data?.query;
                setAdminBoardData(boarddata);

                const adminPostResponse = await axios.get(`${baseURL}/v1/board/investment/post`, { headers });
                dispatch(setAdminPostData(adminPostResponse.data?.query))
                const postdata = adminPostResponse.data?.query;
                setAdminPostData(postdata);
                
            } catch (error) {
                console.error('Admin User/Board/Post 데이터 가져오기 실패', error);
            }
        }
        fetchData();
    }, []); */
    
    /*------------------------------------------------*\
                        console 테스트 
    \*------------------------------------------------*/
    /* console.log('admin log 테스트'); */
    /* console.log('adminUserData',adminUserData); */
    /* console.log('adminPostData',adminPostData); */

    /*------------------------------------------------*\
                        Admin Layout 
    \*------------------------------------------------*/
    /* const [visibleDiv, setVisibleDiv] = useState(null); */
    
    /* const [visibleDiv, setVisibleDiv] = useState(2); */ 

    const [visibleDiv, setVisibleDiv] = useState(parseInt(localStorage.getItem('selectedMenu')) || 2);

    useEffect(() => {
      localStorage.setItem('selectedMenu', visibleDiv.toString());
    }, [visibleDiv]);

    /* const handleButtonClick = (divNumber) => {
        if (visibleDiv === divNumber) {
        setVisibleDiv(null);
        } else {
        setVisibleDiv(divNumber);
        }
    }; */

    /*------------------------------------------------*\
                        Admin Logout 
    \*------------------------------------------------*/
    const handleLogout = (e) => {
        e.preventDefault();
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        sessionStorage.removeItem('userUid');
        dispatch(logout());
        navigate("/login");
    };

    return (
        <StyledAdminFrame>
            <StyledAdminHeader>
                <h1>Hwajin</h1>
                <StyledAdminTop>
                    <div className='left-admin-top'>
                        <div style={{display:'flex',alignItems:'center'}}>
                            <Link to="/">
                                <HeaderLogo style={{color:'#fff'}}>Hwajin</HeaderLogo>
                            </Link>
                            <Link to="/admin">
                                <h3 style={{marginTop:'10px', marginLeft:'10px',color:'#fff'}}>관리자 페이지</h3>
                            </Link>
                        </div>
                    </div>
                    <div className='right-admin-top'>
                        <ul>
                            <li>
                                <Link onClick={handleLogout}>로그아웃</Link>
                            </li>
                        </ul>
                    </div>
                </StyledAdminTop>
                <StyledAdminNav>
                    <AdminNavUl>
                        <li>
                            <button onClick={() => setVisibleDiv(2)}>
                                <BsPersonCircle/>
                            </button>
                            <div>
                                <StyledNavGnb className={`div ${visibleDiv === 2 ? 'visible' : ''}`}>
                                    <h3>회원관리</h3>
                                    <ul style={{marginTop:'20px'}}>
                                        <li style={{marginBottom:'10px', paddingBottom:'6px'}}><Link to="/admin/member_list">회원관리</Link></li>
                                        {/* <li style={{marginBottom:'10px', paddingBottom:'6px'}}><Link>접속자집계</Link></li> */}
                                        {/* <li style={{marginBottom:'10px', paddingBottom:'6px'}}><Link>접속자검색</Link></li> */}
                                    </ul>
                                </StyledNavGnb>
                            </div>
                        </li>
                        <li>
                            <button onClick={() => setVisibleDiv(3)}>
                                <AiOutlineUnorderedList/>
                            </button>
                            <div>
                                <StyledNavGnb className={`div ${visibleDiv === 3 ? 'visible' : ''}`}>
                                    <h3>게시판관리</h3>
                                    <ul style={{marginTop:'20px'}}>
                                        <li style={{marginBottom:'10px', paddingBottom:'6px'}}><Link to="/admin/board_list">게시판관리</Link></li>
                                        <li style={{marginBottom:'10px', paddingBottom:'6px'}}><Link to="/admin/post_approve">승인목록</Link></li>
                                        <li style={{marginBottom:'10px', paddingBottom:'6px'}}><Link to="/admin/post_list">게시물관리</Link></li>
                                        <li style={{marginBottom:'10px', paddingBottom:'6px'}}><Link to="/admin/post_list">댓글관리</Link></li>
                                    </ul>
                                </StyledNavGnb>
                            </div>
                        </li>
                        <li>
                            <button onClick={() => setVisibleDiv(4)}>
                                <BsFillBuildingFill/>
                            </button>
                            <div>
                                <StyledNavGnb className={`div ${visibleDiv === 4 ? 'visible' : ''}`}>
                                    <h3>업체관리</h3>
                                    <ul style={{marginTop:'20px'}}>
                                        <li style={{marginBottom:'10px', paddingBottom:'6px'}}><Link to="/admin/company_list">업체관리</Link></li>
                                    </ul>
                                </StyledNavGnb>
                            </div>
                        </li>
                        {/* <li>
                            <button onClick={() => setVisibleDiv(1)}>
                                <AiFillSetting/>
                            </button>
                            <div>
                                <StyledNavGnb className={`div ${visibleDiv === 1 ? 'visible' : ''}`}>
                                    <h3>환경설정</h3>
                                    <ul style={{marginTop:'20px'}}>
                                        <li style={{marginBottom:'10px', paddingBottom:'6px'}}>11111</li>
                                        <li style={{marginBottom:'10px', paddingBottom:'6px'}}>22222</li>
                                        <li style={{marginBottom:'10px', paddingBottom:'6px'}}>33333</li>
                                        <li style={{marginBottom:'10px', paddingBottom:'6px'}}>44444</li>
                                    </ul>
                                </StyledNavGnb>
                            </div>
                        </li> */}
                    </AdminNavUl>
                </StyledAdminNav>
            </StyledAdminHeader>
        </StyledAdminFrame>
    );
};

export default Admin;
import React, { useEffect, useState } from 'react';

/* Axios */
import axios from 'axios';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { setAdminUserData, setAdminPostData, logout } from '../../store/actions/actions';

/* StyledComponents */
import { StyledAdminFrame, StyledAdminHeader, StyledAdminTop, StyledAdminNav, AdminNavUl, StyledNavGnb } from './StyledAdmin';
import { HeaderLogo } from '../StyledComponents/StyledHeader';

/* React-Router-Dom */
import { Link, useNavigate } from 'react-router-dom';

/* React-Icons */
import { AiFillSetting } from "react-icons/ai";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";

const Admin = () => {
    const adminUserData = useSelector((state) => state.reducer.adminUserData);
    const adminPostData = useSelector((state) => state.reducer.adminPostData);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    /* dispatch(setBoardData(titles)); */
    
    const accessToken = sessionStorage.getItem('accessToken');
    const headers = {
        Authorization: `${accessToken}`
    }

    /*------------------------------------------------*\
                   Admin User / Post Data API
    \*------------------------------------------------*/
    useEffect(() => {
        const fetchData = async () => {
            try {
                const adminUserResponse = await axios.get('http://39.117.244.34:3385/v1/users/', { headers });
                dispatch(setAdminUserData(adminUserResponse.data.query));
                /* const modifiedUserData = adminUserResponse.data.query.map(user => ({
                    ...user,
                    selected: false
                }));
                dispatch(setAdminUserData(modifiedUserData)); */

                const adminPostResponse = await axios.get('http://39.117.244.34:3385/v1/board?query=&pageRows=&page=', { headers });
                dispatch(setAdminPostData(adminPostResponse.data.query));
            } catch (error) {
                console.error('Admin User/Post 데이터 가져오기 실패', error);
            }
        }
        fetchData();
    }, []);
    
    /*------------------------------------------------*\
                        console 테스트 
    \*------------------------------------------------*/
    /* console.log('admin log 테스트'); */
    /* console.log('adminUserData',adminUserData); */
    console.log('adminPostData',adminPostData);

    /*------------------------------------------------*\
                        Admin Layout 
    \*------------------------------------------------*/
    /* const [visibleDiv, setVisibleDiv] = useState(null); */
    
    const [visibleDiv, setVisibleDiv] = useState(2); // 항상 2단계 메뉴를 표시하도록 변경

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
                            <h3 style={{marginTop:'10px', marginLeft:'10px',color:'#fff'}}>관리자 페이지</h3>
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
                                        <li style={{marginBottom:'10px', paddingBottom:'6px'}}><Link>접속자집계</Link></li>
                                        <li style={{marginBottom:'10px', paddingBottom:'6px'}}><Link>접속자검색</Link></li>
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
                                        <li style={{marginBottom:'10px', paddingBottom:'6px'}}><Link to="/admin/post_list">게시판관리</Link></li>
                                        <li style={{marginBottom:'10px', paddingBottom:'6px'}}><Link to="/admin/post_group">게시판그룹관리</Link></li>
                                        <li style={{marginBottom:'10px', paddingBottom:'6px'}}>내용관리</li>
                                    </ul>
                                </StyledNavGnb>
                            </div>
                        </li>
                        <li>
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
                        </li>
                    </AdminNavUl>
                </StyledAdminNav>
            </StyledAdminHeader>
        </StyledAdminFrame>
    );
};

export default Admin;
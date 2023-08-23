import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/actions/actions';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const StyledHeaderFrame=styled.div`
    position: relative;
    width: 100vw;
    height: 70px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #000;
    background: #fff;
    ul{
        list-style:none;
        display: flex;
    }
    a{text-decoration: none; color: #000;}
`
const HeaderContainer=styled.div`
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const MenuFrame=styled.ul`
    >li{
        margin-right: 20px;
    }
`

const Header = () => {
    /* const authenticated = useSelector(state => state.authenticated); */ 
    const accessToken = sessionStorage.getItem('accessToken');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    /* const [boardData, setBoardData] = useState([]); */

    /* useEffect(() => {
        axios.get('http://211.198.44.123:3385/v1/board/')
            .then(response => {
                const test = response.data.query
                const titles = response.data.query.map(item => item.key);
                setBoardData(titles);
                console.log(response.data);
                console.log('test', test);
            })
            .catch(error => {
                console.error('게시판 데이터를 가져올 수 없습니다.', error);
            });
    }, []);

    console.log('boardData',boardData); */

    useEffect(() => {
        const accessToken = sessionStorage.getItem('accessToken');
        if (!accessToken) {
            dispatch(logout());
        }
    }, [dispatch]);

    const handleLogout = (e) => {
        e.preventDefault();
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        dispatch(logout()); // 로그아웃 시 logOutAction을 디스패치하여 상태 업데이트
        navigate("/login");

    };
    /* console.log('authenticated',authenticated); */
    
    return (
        <StyledHeaderFrame>
            <HeaderContainer>
                <div>
                    <Link to="/">
                        <h1>Hwajin</h1>
                    </Link>
                </div>
                <div style={{display:'flex'}}>
                    <MenuFrame>
                        {/* {boardData.map((title, index) => (
                            <li className='category-submenu' key={index}>
                                <Link to={`${title}`}>{title}</Link>
                            </li>
                        ))} */}
                    </MenuFrame>
                    <div style={{display:'flex', marginLeft:'50px'}}>
                        <ul>
                            {accessToken ? 
                                (<li><button onClick={handleLogout}>로그아웃</button></li>) : 
                                (
                                    <>
                                        <li><Link to="/login">로그인</Link></li>
                                        <li><Link to="/sign_up">회원가입</Link></li>
                                    </>
                                ) }
                            
                        </ul>
                    </div>
                </div>
            </HeaderContainer>
        </StyledHeaderFrame>
    );
};

export default Header;
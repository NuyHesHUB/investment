import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/actions/actions';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeaderFrame=styled.div`
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
    li{
        margin-right: 20px;
    }
    li:last-child{
        margin-right: 0;
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

const Header = () => {
    const authenticated = useSelector(state => state.authenticated); // 리덕스 상태에서 authenticated 가져오기
    const dispatch = useDispatch();

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
    };
    console.log('authenticated',authenticated);
    
    return (
        <StyledHeaderFrame>
            <HeaderContainer>
                <div>
                    <Link to="/">
                        <h1>Hwajin</h1>
                    </Link>
                </div>
                <div style={{display:'flex'}}>
                    <ul>
                        <li>투자받기</li>
                        <li>투자하기</li>
                        <li>파트너쉽</li>
                        <li>정보마당</li>
                    </ul>
                    <div style={{display:'flex', marginLeft:'50px'}}>
                        <ul>
                            {authenticated ? 
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
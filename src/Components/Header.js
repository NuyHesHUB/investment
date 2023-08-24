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
    max-width: 1920px;
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
    /* const accessToken = sessionStorage.getItem('accessToken'); */
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /* 유저 정보 가져오기 */
    
    const accessToken = sessionStorage.getItem('accessToken');
    
    const [userData, setUserData] = useState(null); 
    const userUid = sessionStorage.getItem('userUid');
    const key = 'Authorization'
    const headers = {
            Authorization: `${accessToken}`
        }
    
    /* useEffect(() => {
        const url = `http://211.198.44.123:3385/v1/users/${userUid}?${key}=${accessToken}`;
        axios.get(url, { headers })
        .then(response => {
          setUserData(response.data);
        })
        .catch(error => {
          console.error('회원 정보 가져오기 실패', error);
        });
        
      }, []); */
      /* console.log(userData.query[0].nickname); */
      /* console.log(userData); */


      
      /* if (userUid) {
          axios.get(url, { headers })
            .then(response => {
              setUserData(response.data);
              console.log('userData',userData);
            })
            .catch(error => {
              console.error('회원 정보 가져오기 실패', error);
            });
        } */


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
        if (accessToken) {
            const url = `http://211.198.44.123:3385/v1/users/${userUid}?${key}=${accessToken}`;
            axios.get(url, { headers })
            .then(response => {
            setUserData(response.data);
            })
            .catch(error => {
            console.error('회원 정보 가져오기 실패', error);
            });
        } else{
            dispatch(logout());
        }
    },[dispatch])

    console.log(userData);


    
    /* accessToken 이 없다면 로그아웃 */
    /* useEffect(() => {
        const accessToken = sessionStorage.getItem('accessToken');
        if (!accessToken) {
            dispatch(logout());
        }
    }, [dispatch]); */

    /* 로그아웃 하면 상태관리 로그아웃 & 토큰 삭제 */
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
                    {/* <MenuFrame>
                        {boardData.map((title, index) => (
                            <li className='category-submenu' key={index}>
                                <Link to={`${title}`}>{title}</Link>
                            </li>
                        ))}
                    </MenuFrame> */}
                    <div style={{display:'flex', marginLeft:'50px'}}>
                        <ul>
                        {userData && userData.query && userData.query.length > 0 ? (
                                <><pre style={{fontWeight:'bold'}}>{userData.query[0].nickname} </pre>  <span>님 반갑습니다.</span></>
                            ) : (
                                <p>Loading...</p>
                            )}
                            {/* <li>{userData.query[0].nickname} 님 반갑습니다.</li> */}
                            {accessToken ? 
                                (
                                <>  
                                    <li><Link to="/myinfo"><button>회원정보수정</button></Link></li>
                                    <li><button onClick={handleLogout}>로그아웃</button></li>
                                </>
                                ) : 
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
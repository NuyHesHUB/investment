import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/actions/actions';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../axiosInstance';
import { StyledHeaderFrame, HeaderContainer, HeaderLogo, MenuFrame, HeaderBtn, MenuList } from './StyledComponents/StyledHeader';
const Header = () => {
    /* 메뉴 카테고리에 뿌려보기 home.js 전역관리 */
    const boardData = useSelector((state) => state.reducer.boardData);


    const [isSubMenuOpen, setSubMenuOpen] = useState(false);
    
    const handleMouseEnter = () => {
        setSubMenuOpen(true);
    };

    const handleMouseLeave = () => {
        setSubMenuOpen(false);
    };
    /* console.log('header',boardData); */
    /* const authenticated = useSelector(state => state.authenticated); */ 
    /* const accessToken = sessionStorage.getItem('accessToken'); */
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /* const boardData = useSelector(state => state.board); */

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
            const url = `/users/${userUid}?${key}=${accessToken}`;
            axiosInstance.get(url, { headers })
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

    /* console.log(userData); */


    
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
                <div style={{display:'flex'/* , width:'70%' */, justifyContent:'space-between',alignItems:'center',height:'100%'}}>
                    <Link to="/">
                        <HeaderLogo>Hwajin</HeaderLogo>
                    </Link>
                </div>
                <MenuFrame>
                    <MenuList>
                        <li 
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <span style={{color:'#000',fontWeight:'bold'}}>카테고리</span>
                            <ul className={isSubMenuOpen ? 'sub-menu on' : 'sub-menu'}>
                                {boardData.map((item, index) => (
                                    <li key={index}><Link to={`/${item.key}`}>{item.title}</Link></li>
                                ))}
                            </ul>
                        </li>
                        <li style={{width:'100px'}}>
                            <Link style={{color:'#000',fontWeight:'bold'}}>투자받기</Link>
                        </li>
                        <li style={{width:'100px'}}>
                            <Link style={{color:'#000',fontWeight:'bold'}}>투자하기</Link>
                        </li>
                    </MenuList>
                </MenuFrame>
                <div style={{display:'flex'}}>
                    <div style={{display:'flex', marginLeft:'50px'}}>
                        <ul style={{display:'flex', alignItems:'center'}}>
                            {userData && userData.query && userData.query.length > 0 ? (
                                    <><div style={{fontWeight:'bold',fontSize:'16px'}}>{userData.query[0].nickname}</div><span>님 반갑습니다 😊</span></>
                                ) : (
                                    <><div style={{fontWeight:'bold',fontSize:'16px'}}>Loading...</div></>
                                )}
                            {accessToken ? 
                                (
                                <>  
                                    <li style={{margin:'0 10px'}}>
                                        <Link to="/myinfo">
                                            <HeaderBtn>회원정보수정</HeaderBtn>
                                        </Link>
                                    </li>
                                    <li>
                                        <HeaderBtn onClick={handleLogout}>로그아웃</HeaderBtn>
                                    </li>
                                </>
                                ) : 
                                (
                                    <ul style={{display:'flex',alignItems:'center'}}>
                                        <li><Link to="/login">로그인</Link></li>
                                        <li style={{margin:'0 5px'}}>|</li>
                                        <li><Link to="/sign_up" style={{color:'#454afc',fontWeight:'bold'}}>회원가입</Link></li>
                                    </ul>
                                ) }
                            
                        </ul>
                    </div>
                </div>
            </HeaderContainer>
        </StyledHeaderFrame>
    );
};

export default Header;
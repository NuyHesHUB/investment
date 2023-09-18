import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { logout, setGalleryCategoryData } from '../store/actions/actions';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../axiosInstance';
import { StyledHeaderFrame, HeaderContainer, HeaderLogo, MenuFrame, HeaderBtn, MenuList } from './StyledComponents/StyledHeader';
const Header = () => {
    /* const { key } = useParams(); */
    
    /* const storeData = useSelector((state) => state.reducer.galleryListData);
    console.log('storeData',storeData); */

    const dispatch = useDispatch();
    /* 메뉴 카테고리에 뿌려보기 home.js 전역관리 */
    const boardData = useSelector((state) => state.reducer?.adminBoardData
    );

    /* console.log('boardData',boardData[6]?.categoryList); */
    /* console.log('boardData-test',boardData[6]?.key); */

    const categoryData = boardData[6]?.categoryList || [];

    let parsedCategoryData = [];

    if (typeof categoryData === 'string' && categoryData.length > 0) {
    try {
        parsedCategoryData = JSON.parse(categoryData);
    } catch (error) {
        console.error('JSON 파싱 오류:', error);
    }
    }
    /* console.log('categoryData',parsedCategoryData); */

    /* const sessionCategoryData = JSON.parse(sessionStorage.getItem('CategoryData'));  */

    const filteredItems = boardData.filter(item => {
        const key = item.key;
        return ['economic', 'free', 'humor', 'investment', 'marketing'].includes(key);
      });

    /* console.log('filteredItems',filteredItems); */
      
    /* console.log('categoryData',categoryData); */

    const [subMenuOpen, setSubMenuOpen] = useState({
        investment: false,
        board: false,
      });
    
    const handleMouseEnter = (menu) => {
        setSubMenuOpen({
            investment: menu === 'investment',
            board: menu === 'board',
        });
    };
      
    const handleMouseLeave = (menu) => {
    setSubMenuOpen({
        ...subMenuOpen,
        [menu]: false,
    });
    };

    const navigate = useNavigate();

    /* 유저 정보 가져오기 */
    
    const accessToken = sessionStorage.getItem('accessToken');
    
    const [userData, setUserData] = useState(null); 
    const userUid = sessionStorage.getItem('userUid');
    const key1 = 'Authorization'
    const headers = {
            Authorization: `${accessToken}`
        };
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        if (accessToken) {
            const url = `/users/${userUid}?${key1}=${accessToken}`;
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

    /* 로그아웃 하면 상태관리 로그아웃 & 토큰 삭제 */
    const handleLogout = (e) => {
        e.preventDefault();
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        sessionStorage.removeItem('userUid');
        dispatch(logout());
        navigate("/login");
    };

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
                            onMouseEnter={() => handleMouseEnter('investment')}
                            onMouseLeave={() => handleMouseLeave('investment')}
                        >
                            투자게시판
                            <ul id='SubMenu' className={subMenuOpen.investment ? 'sub-menu on' : 'sub-menu'}>
                                {parsedCategoryData && parsedCategoryData.map((item,index) => (
                                    <li key={index}>
                                        <Link to={`/${boardData[6]?.key}/${index}`}>{item}</Link>
                                    </li>
                                ))}         
                            </ul>
                        </li>
                        <li 
                            onMouseEnter={() => handleMouseEnter('board')}
                            onMouseLeave={() => handleMouseLeave('board')}
                        >
                            게시판
                            <ul id='SubMenu' className={subMenuOpen.board ? 'sub-menu on' : 'sub-menu'}>
                                {filteredItems.map((item, index)=>(
                                    <Link key={index} to={`/board/${item.key}`}>
                                        <li>{item.title}</li>
                                    </Link>
                                ))}
                            </ul>
                        </li>
                        <li>
                            <Link to={`${boardData[8]?.key}`}>{boardData[8]?.title}</Link>
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
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
    const boardData = useSelector((state) => state.reducer.boardData);
    const categoryData = useSelector((state) => state.reducer.galleryListData);

    /* console.log('header-key-test',key); */
    const [isSubMenuOpen, setSubMenuOpen] = useState(false);
    
    const handleMouseEnter = () => {
        setSubMenuOpen(true);
    };

    const handleMouseLeave = () => {
        setSubMenuOpen(false);
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
    /* console.log('authenticated',authenticated); */
    /* console.log('boardData',boardData); */
    useEffect(() => {
        if (boardData.length > 0) {
            const categoryMapping = {
                dining: "외식",
                manufacturing: "제조",
                sales: "판매",
                service: "서비스",
                rental: "렌탈",
                car: "자동차",
                other: "기타",
                // 다른 영어 단어들에 대한 매핑 추가
            };
            const cleanString = boardData[0].categoryList.replace(/\[|\]|"|/g, "");
            const categoryArray = cleanString.split(",");
            const translatedCategories = categoryArray.map(category => categoryMapping[category] || category);

            dispatch(setGalleryCategoryData(categoryArray));

            const items = translatedCategories.map((item,index) => (
                <li key={index}>
                  <Link to={`/${boardData[0].key}/${categoryArray[index]}`}>{translatedCategories[index]}</Link>
                </li>
              ));
            console.log('categoryArray',categoryArray);
            /* console.log('translatedCategories', translatedCategories); */
            /* console.log('categoryMapping', categoryMapping[0]); */
            setMenuItems(items);
        }
    }, [boardData]);
    
    /* console.log('menuItems',menuItems); */

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
                            <ul id='SubMenu' className={isSubMenuOpen ? 'sub-menu on' : 'sub-menu'}>
                                {/* {categoryArray.length > 0 ? (<li>{categoryArray}</li>) : (null)} */}
                                {/* {menuItems} */}
                                {menuItems}
                            </ul>
                        </li>
                        <li style={{width:'100px'}}>
                            <Link style={{color:'#000',fontWeight:'bold'}}>투자받기</Link>
                        </li>
                        <li style={{width:'100px'}}>
                            <Link style={{color:'#000',fontWeight:'bold'}}>투자하기</Link>
                        </li>
                        {/* {categoryData.map((item, index)=> (
                            <div>{item}</div>
                        ))} */}
                        
                        {/* {boardData && categoryData && boardData.map((item, index) => (
                            <div>
                                <div>{item.key}</div> 
                                <div>{categoryData[index]}</div>
                            </div>
                        ))} */}
                        {/* {boardData.length > 0 && boardData[0].categoryList} */}
                        {/* {menuItems.length > 0 ? <>{menuItems}</> : 'null'} */}
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
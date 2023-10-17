import React, { useEffect, useState } from 'react';

/* Redux */
import { useSelector, useDispatch } from 'react-redux';
import { logout, setGalleryCategoryData } from '../store/actions/actions';

/* React-Router-Dom */
import { Link, useNavigate, useParams } from 'react-router-dom';

/* Axios */
import axios from 'axios';

/* StyledComponents */
import { StyledFrame, Container, WrapBox, HeaderLogo, HeaderMenu, HeaderBtn, MenuList, MenuItem } from './StyledComponents/StyledHeader';

/* Image */
import Logo from '../assets/image/logo.png';

const Header = ({parsedCommunityCategoryData}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const baseURL = process.env.REACT_APP_BASEURL;
    const accessToken = sessionStorage.getItem('accessToken');
    const userUid = sessionStorage.getItem('userUid');
    const headers = {
        Authorization: `${accessToken}`
    }

    const [userName, setUserName] = useState(null);
    const [menuItems, setMenuItems] = useState([]);


    const testData = useSelector((state) => state.reducer)

    /* console.log('testData',testData); */
    /* console.log('parsedCommunityCategoryData', parsedCommunityCategoryData); */

     /* 유저 정보 가져오기 */
     useEffect(() => {
         if (accessToken) { 
             axios.get(`${baseURL}/v1/users/${userUid}`, { headers })
                .then(response => {
                    const data = response.data?.query[0].nickname;
                    setUserName(data);
                }).catch(error => {
                    console.error('회원 이름 가져오기 실패', error);
                });
         } 
     },[accessToken])
 
     /* 로그아웃 하면 상태관리 로그아웃 & 토큰 삭제 */
     const handleLogout = (e) => {
         e.preventDefault();
         sessionStorage.removeItem('accessToken');
         sessionStorage.removeItem('refreshToken');
         sessionStorage.removeItem('userUid');
         sessionStorage.removeItem('b_no');
         sessionStorage.removeItem('userGroup');
         sessionStorage.removeItem('userIsAdmin');
         /* dispatch(logout()); */
         navigate("/login");
     };


    
    /* const storeData = useSelector((state) => state.reducer.galleryListData);
    console.log('storeData',storeData); */

    
    /* 메뉴 카테고리에 뿌려보기 home.js 전역관리 */
    const boardData = useSelector((state) => state.reducer?.adminBoardData);

    /* console.log('boardData',boardData[6]?.categoryList); */
    /* console.log('boardData-test',boardData[6]?.key); */

    /* const categoryData = boardData[6]?.categoryList || [];

    let parsedCategoryData = [];

    if (typeof categoryData === 'string' && categoryData.length > 0) {
        try {
            parsedCategoryData = JSON.parse(categoryData);
        } catch (error) {
            console.error('JSON 파싱 오류:', error);
        }
    } */

    /* console.log('categoryData',parsedCategoryData); */

    /* const sessionCategoryData = JSON.parse(sessionStorage.getItem('CategoryData'));  */

    /* const filteredItems = boardData.filter(item => {
        const key = item.key;
        return ['economic', 'free', 'humor', 'investment', 'marketing'].includes(key);
      }); */

    /* console.log('filteredItems',filteredItems); */
      
    /* console.log('categoryData',categoryData); */



    

    /*-----------------------------------------------------*\
                    자유 게시판 카테고리 변환
    \*-----------------------------------------------------*/
    const convertToUrlFormat = (category) => {
        const conversionMap = {
            '일상': 'daily',
            '유머': 'humor',
            '경제': 'economy',
            '토론': 'debate',
            '정보': 'information'
        };
    
        const formattedCategory = conversionMap[category];
    
        if (formattedCategory) {
            return formattedCategory.toLowerCase();
        }

        return category.toLowerCase();
    }

    /*-----------------------------------------------------*\
                        헤더 2DEPTH 메뉴 기능
    \*-----------------------------------------------------*/
    const [subMenuOpen, setSubMenuOpen] = useState({
        ongoing: false,
        deadline: false,
        community: false
    });
    const handleMouseEnter = (menu) => {
        setSubMenuOpen({
            ongoing: menu === 'ongoing',
            deadline: menu === 'deadline',
            community: menu === 'community',
        });
    };
    const handleMouseLeave = (menu) => {
        setSubMenuOpen({
            ...subMenuOpen,
            [menu]: false,
        });
    };
    
    /*-----------------------------------------------------*\
                      Scroll Event function
    \*-----------------------------------------------------*/
    const [scrolled, setScrolled] = useState(false);
    const handleScroll = () => {
        const isScrolled = window.scrollY > 0;
        setScrolled(isScrolled);
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    
    
    
    /*-----------------------------------------------------*\
                    글쓰기 업체등록확인 팝업창
    \*-----------------------------------------------------*/

    // 관리자, 일반, 업체 확인하기
    const userGroup = sessionStorage.getItem('userGroup');
    /* console.log(userUid, "userUid") */
    
    const navigateLogin = () => {
        if (window.confirm("로그인이 되어 있지 않습니다. 로그인하시겠습니까?")) {
            navigate('/login')
        }
    }
    const checkCompanyRegistration = () => {
        // console.log(["업체", "관리자"].includes(userGroup))
        if (!["업체", "관리자"].includes(userGroup)) { /* 나중에 false일때로 바꾸기!!! */ 
            window.confirm("업체가 등록되어있지 않습니다. 등록하시겠습니까?") 
            ? navigate('/business_number_check') 
            : navigate('#')
        } else {
            //userGroup이 업체 or 관리자일 경우, 글쓰기 페이지 이동
            navigate('/company_write')
        }
    }
    // const checkCompanyRegistration = () => {
    //     // console.log(["업체", "관리자"].includes(userGroup))
    //     if (!["업체", "관리자"].includes(userGroup))/* 나중에 false일때로 바꾸기!!! */ {
    //         if(window.confirm("업체가 등록되어있지 않습니다. 등록하시겠습니까?")) {
    //             // navigate('/company_upload') // 진위여부 확인하는 곳으로 바꾸기
    //             navigate('/business_number_check') 
    //         }
    //     } else {
    //         //userGroup이 업체 or 관리자일 경우, 글쓰기 페이지 이동
    //         navigate('/company_introduction_write')
    //     }
    // }
    
    return (
        <StyledFrame  className={`${scrolled ? 'header-scrolled' : ''}`}>
            
            <Container>
                <WrapBox>
                    <HeaderLogo>
                        <Link to="/">
                            <img src={Logo} alt="logo"/>
                        </Link>
                    </HeaderLogo>
                    <HeaderMenu>
                        <MenuList>
                            <MenuItem 
                                onMouseEnter={() => handleMouseEnter('ongoing')}
                                onMouseLeave={() => handleMouseLeave('ongoing')}
                            >
                                <Link to="/investment/ongoing">진행중</Link>
                                {/* <ul className={subMenuOpen.processing ? 'sub-menu on' : 'sub-menu'}>
                                    {parsedCategoryData && parsedCategoryData.map((item,index) => (
                                        <li key={index}>
                                            <Link to={`/${boardData[6]?.key}/${index}`}>{item}</Link>
                                        </li>
                                    ))}         
                                </ul> */}
                            </MenuItem>
                            <MenuItem 
                                onMouseEnter={() => handleMouseEnter('deadline')}
                                onMouseLeave={() => handleMouseLeave('deadline')}
                            >
                                <Link to="/investment/deadline">마감</Link>
                                {/* <ul className={subMenuOpen.deadline ? 'sub-menu on' : 'sub-menu'}>
                                    {filteredItems.map((item, index)=>(
                                        <Link key={index} to={`/board/${item.key}`}>
                                            <li>{item.title}</li>
                                        </Link>
                                    ))}
                                </ul> */}
                            </MenuItem>
                            {/* <MenuItem 
                                onMouseEnter={() => handleMouseEnter('community')}
                                onMouseLeave={() => handleMouseLeave('community')}
                            >
                                <Link to="/community">커뮤니티</Link>
                                <ul className={subMenuOpen.community ? 'sub-menu on' : 'sub-menu'}>
                                    {parsedCommunityCategoryData && parsedCommunityCategoryData.map((item,index) => (
                                        <li key={index}>
                                            <Link to={`/community/${convertToUrlFormat(item)}`}>{item}</Link>
                                        </li>
                                    ))}         
                                </ul>
                            </MenuItem> */}
                            <MenuItem>
                                <p to="#" onClick={userUid ? checkCompanyRegistration : navigateLogin}>글쓰기</p>
                            </MenuItem>
                        </MenuList>
                    </HeaderMenu>
                </WrapBox>
                <div style={{display:'flex'}}>
                    <div style={{display:'flex', marginLeft:'50px'}}>
                        <ul style={{display:'flex', alignItems:'center'}}>
                            {userName &&  userName.length > 0 ? (
                                    <><div style={{fontWeight:'bold',fontSize:'16px'}}>{userName}</div><span>님 반갑습니다</span></>
                                ) : (
                                    <><div style={{fontWeight:'bold',fontSize:'16px'}}>Loading...</div></>
                                )}
                            {accessToken ? (
                                userGroup === '관리자' ? (
                                    <>
                                        <li style={{ margin: '0 10px' }}>
                                            <Link to="/admin">
                                                <HeaderBtn>관리자 페이지</HeaderBtn>
                                            </Link>
                                        </li>
                                        <li>
                                            <HeaderBtn onClick={handleLogout}>로그아웃</HeaderBtn>
                                        </li>
                                    </>
                                ) : userGroup === '업체' ? (
                                    <>
                                        <li style={{ margin: '0 10px' }}>
                                            <Link to="/company_modify">
                                                <HeaderBtn>업체정보수정</HeaderBtn>
                                            </Link>
                                        </li>
                                        <li>
                                            <HeaderBtn onClick={handleLogout}>로그아웃</HeaderBtn>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        {/* <li style={{ margin: '0 10px' }}>
                                            <Link to="/myinfo">
                                                <HeaderBtn>회원정보수정</HeaderBtn>
                                            </Link>
                                        </li> */}
                                        <li>
                                            <HeaderBtn onClick={handleLogout}>로그아웃</HeaderBtn>
                                        </li>
                                    </>
                                )
                            ) : (
                                <ul style={{display:'flex',alignItems:'center'}}>
                                    <li>
                                        <Link to="/login">로그인</Link>
                                    </li>
                                    <li style={{ margin:'0 5px'}}>|</li>
                                    <li>
                                        <Link to="/member_type" style={{color:'#454afc',fontWeight:'bold'}}>
                                            회원가입
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </ul>
                    </div>
                </div>
            </Container>
        </StyledFrame>
    );
};

export default Header;
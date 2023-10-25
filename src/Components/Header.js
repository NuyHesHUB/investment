import React, { useEffect, useState } from 'react';

/* React-Router-Dom */
import { Link, useNavigate } from 'react-router-dom';

/* Axios */
import axios from 'axios';

/* StyledComponents */
import { 
    StyledFrame, 
    Container, 
    WrapBox, 
    HeaderLogo, 
    HeaderMenu, 
    HeaderBtn, 
    MenuList, 
    MenuItem,
    RightHeaderMenu,
    RightHeaderMenuWrap,
    RightHeaderMenuList,
    UserNameWrap,
    UserNameBox,
    HelloBox,
    UserGroupBox,
    UserGroupItem,
    Divider,
    SignUpItem,
} from './StyledComponents/StyledHeader';

/* Image */
import { ReactComponent as LogoSvg } from '../assets/image/logo.svg';

const Header = (/* {parsedCommunityCategoryData} */) => {

    const navigate = useNavigate();

    /* Basic */
    const baseURL = process.env.REACT_APP_BASEURL;
    const accessToken = sessionStorage.getItem('accessToken');
    const refreshToken = sessionStorage.getItem('refreshToken');
    const userUid = sessionStorage.getItem('userUid');

    const headers = {
        Authorization: `${accessToken}`
    }

    const [userName, setUserName] = useState(null);

     /* 유저 정보 가져오기 */
     useEffect(() => {
         if (accessToken) { 
             axios.get(`${baseURL}/v1/users/${userUid}`, { headers })
                .then(response => {
                    const data = response.data?.query[0].nickname;
                    setUserName(data);
                }).catch(error => {
                    if (error.response && error.response.data && error.response.data.error === '사용자 로그인 정보가 만료되었습니다.') {
                        console.log('로그인이 만료되었습니다.');
                        const fetchData = async () => {
                            try {
                                const newHeaders  = {
                                    refreshToken : `${refreshToken}`
                                };
                                const authResponse = await axios.post(
                                    `${baseURL}/v1/authorize/token`, null , { headers: newHeaders }
                                );

                                /* console.log('authResponse', authResponse); */

                                sessionStorage.removeItem('accessToken');

                                const newAccessToken = authResponse.data.accessToken;

                                sessionStorage.setItem('accessToken', newAccessToken);

                            } catch (error) {
                                console.error('auth 권한확인 실패', error);
                                handleLogout();
                            } /* 리프레시토큰은 7일 액세스토큰은 15분 */
                        }
                        fetchData();
                            
                    } else {
                        console.error('회원 이름 가져오기 실패', error);
                    }
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
            navigate('/company_write', {replace: true})
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
                            <LogoSvg />
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

                            {/* 추후 커뮤니티 구축해야함 23.10.18 */}

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
                            <MenuItem>
                                <Link to="/payment_info_page">결제안내</Link>
                            </MenuItem>
                        </MenuList>
                    </HeaderMenu>
                </WrapBox>
                <RightHeaderMenu>
                    <RightHeaderMenuWrap>
                        <RightHeaderMenuList>
                            {userName &&  userName.length > 0 ? (
                                    <UserNameWrap>
                                        <UserNameBox>{userName}</UserNameBox>
                                        <HelloBox>님 반갑습니다</HelloBox>
                                    </UserNameWrap>
                                ) : (null)
                            }
                            {accessToken ? (
                                userGroup === '관리자' ? (
                                    <UserGroupBox>
                                        <UserGroupItem style={{marginRight:'10px'}}>
                                            <Link to="/admin">
                                                <HeaderBtn>관리자 페이지</HeaderBtn>
                                            </Link>
                                        </UserGroupItem>
                                        <UserGroupItem>
                                            <HeaderBtn onClick={handleLogout}>로그아웃</HeaderBtn>
                                        </UserGroupItem>
                                    </UserGroupBox>
                                ) : userGroup === '업체' ? (
                                    <UserGroupBox>
                                        <UserGroupItem style={{marginRight:'10px'}}>
                                            <Link to="/company_modify">
                                                <HeaderBtn>업체정보수정</HeaderBtn>
                                            </Link>
                                        </UserGroupItem>
                                        <UserGroupItem>
                                            <HeaderBtn onClick={handleLogout}>로그아웃</HeaderBtn>
                                        </UserGroupItem>
                                    </UserGroupBox>
                                ) : (
                                    <UserGroupBox>
                                        {/* <UserGroupItem style={{marginRight:'10px'}}>
                                            <Link to="member_edit">
                                                <HeaderBtn onClick={handleLogout}>로그아웃</HeaderBtn>
                                            </Link>
                                        </UserGroupItem> */}
                                        <UserGroupItem>
                                            <HeaderBtn onClick={handleLogout}>로그아웃</HeaderBtn>
                                        </UserGroupItem>
                                    </UserGroupBox>
                                )
                            ) : (
                                <RightHeaderMenuList>
                                    <RightHeaderMenuList>
                                        <UserGroupBox>
                                            <UserGroupItem>
                                                <Link to="/login">로그인</Link>
                                            </UserGroupItem>
                                            <Divider>|</Divider>
                                            <SignUpItem>
                                                {/* <Link to="/member_type" > */}
                                                <Link to="/signup" >
                                                    회원가입
                                                </Link>
                                            </SignUpItem>
                                        </UserGroupBox>
                                    </RightHeaderMenuList>
                                </RightHeaderMenuList>
                            )}
                        </RightHeaderMenuList>
                    </RightHeaderMenuWrap>
                </RightHeaderMenu>
            </Container>
        </StyledFrame>
    );
};

export default Header;
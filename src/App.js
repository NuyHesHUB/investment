import React, { useEffect } from 'react';

/* React-Router-Dom */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* Axios */
import axios from 'axios';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { setAdminBoardData } from './store/actions/actions';

/* Basic Component */
import Home from './Components/Home';
import Login from './Components/Login/Login';
import MemberType from './Components/Signup/MemberType';
/* import Signup from './Components/Signup/Signup'; */

/* Member Edit */
import MemberEditPage from './Components/MemberEdit/MemberEditPage';

/* Post Components */
import PostDetail from './Components/PostDetail/PostDetail';
import PendingPostDetail from './Components/PostDetail/PendingPostDetail';
import PostRegist from './Components/PostRegist/PostRegist';

/* Admin Components */
import Admin from './Components/Admin/Admin';
import AdminBoardList from './Components/Admin/AdminBoardList';
import AdminPostApprove from './Components/Admin/AdminPostApprove';
import AdminMemberList from './Components/Admin/AdminMemberList';
import AdminCompanyList from './Components/Admin/AdminCompanyList';
import AdminPostList from './Components/Admin/AdminPostList';

/* Social Login Redirection */
import KakaoRedirection from './Components/Login/KakaoRedirection';
import NaverRedirection from './Components/Login/NaverRedirection';

/* Community Board */
import CommunityViewAll from './Components/Board/CommunityBoard/CommunityViewAll';
import DetailCommunity from './Components/Board/CommunityBoard/DetailCommunity';

import OngoingBoard from './Components/Board/InvestmentBoard/OngoingBoard';
import DeadlineBoard from './Components/Board/InvestmentBoard/DaedlineBoard';


/* 업체등록, 글쓰기 페이지 */
import CompanyUpload from './Components/CompanyUpload/CompanyUpload';
import CompanyModify from './Components/CompanyUpload/CompanyModify';
import CompanyWrite from './Components/CompanyUpload/CompanyWrite';
import BusinessNumberCheck from './Components/CompanyUpload/BusinessNumberCheck';

/* 결제안내 페이지 */
import PaymentInfoPage from './Components/Page/PaymentInfoPage';

import ScrollToTop from './Hook/ScrollToTop';

const App = () => {

    

    /* Basic */
    const baseURL = process.env.REACT_APP_BASEURL;
    const accessToken = sessionStorage.getItem('accessToken');
    const headers = {
        Authorization: `${accessToken}`
    }

    /* Redux State */
    const boardData = useSelector((state) => state.reducer.adminBoardData);
    const testData = useSelector((state) => state.reducer);
    const dispatch = useDispatch();


    console.log('testData',testData);


    /*-----------------------------------------------------*\
                          투자 카테고리 
    \*-----------------------------------------------------*/
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

    /* sessionStorage.setItem('CategoryData', JSON.stringify(parsedCategoryData));
    const sessionCategoryData = JSON.parse(sessionStorage.getItem('CategoryData'));
    console.log('sessionCategoryData',sessionCategoryData); */

    /*-----------------------------------------------------*\
                    커뮤니티(일반 게시판) 카테고리 
    \*-----------------------------------------------------*/
    const communityCategoryData = boardData[2]?.categoryList || [];

    let parsedCommunityCategoryData = [];

    if (typeof communityCategoryData === 'string' && communityCategoryData.length > 0) {
        try {
            parsedCommunityCategoryData = JSON.parse(communityCategoryData);
            /* console.log('성공'); */
        } catch (error) {
            console.error('커뮤니티 게시판 JSON 파싱 오류', error);
        }
    }

    const communityEnglishCategories = parsedCommunityCategoryData.map((koreanName) => {
        const mapping = {
          '일상': 'daily',
          '유머': 'humor',
          '경제': 'economy',
          '토론': 'debate',
          '정보': 'information'
        };
        
        return mapping[koreanName] || koreanName;

    });

    /*-----------------------------------------------------*\
            투자 게시판 카테고리 (추후 카테고리 분류를 위해)
    \*-----------------------------------------------------*/
    const investmentCategoryData = boardData[3]?.categoryList || [];

    let parsedInvestmentCategoryData = [];

    if (typeof investmentCategoryData === 'string' && investmentCategoryData.length > 0) {
        try {
            parsedInvestmentCategoryData = JSON.parse(investmentCategoryData);
        } catch (error) {
            console.error('투자 게시판 JSON 파싱 오류', error);
        }
    }

    /* const investmentEnglishCategories = parsedInvestmentCategoryData.map((koreanName) => {
        const mapping = {
            '제조' : 'manufacturing',
            'IT' : 'it',
            '외식' : 'foodservice',
            '서비스' : 'sevice',
            '의료' : 'medical ',
            '유통/물류' : 'distribution',
            '운송' : 'express',
            '대여' : 'rental',
            '기타' : 'etc',
            '엔터테이먼트' : 'entertainment',
            '교육' : 'education',
            '부동산' : 'realestate'
    };
        
        return mapping[koreanName] || koreanName;

    }); */


    /*-----------------------------------------------------*\
                        console.log 테스트
    \*-----------------------------------------------------*/
    /* console.log('communityCategoryData',communityCategoryData); */
    /* console.log('parsedCommunityCategoryData',parsedCommunityCategoryData); */
    /* console.log('englishCategories',englishCategories); */
    /* console.log('boardData',boardData); */
    /* console.log('investmentEnglishCategories',investmentEnglishCategories); */

    useEffect(() => {
        const fetchData = async () => {
            try {
                const adminBoardResponse = await axios.get(`${baseURL}/v1/board?query=&pageRows=&page=`, { headers });
                dispatch(setAdminBoardData(adminBoardResponse.data?.query));
            } catch (error) {
                console.error('Admin User/Post 데이터 가져오기 실패', error);
            }
        }
        fetchData();
    }, []);

    /*-----------------------------------------------------*\
                    페이지 이동 로그 테스트
    \*-----------------------------------------------------*/
    /* const sendPageLog = (userUid, page) => {
        axios.post('/add-log', {
          userUid: userUid,
          page: page,
        })
        .then(response => {
          console.log('로그가 추가되었습니다:', response.data);
        })
        .catch(error => {
          console.error('로그 추가 중 오류 발생:', error);
        });
      }; */
      
      /* const trackPageChange = () => {
        const userUid = sessionStorage.getItem('userUid'); // 유저의 UID
        const currentPage = window.location.pathname;
        sendPageLog(userUid, currentPage);
        console.log(`페이지 이동 감지: ${currentPage}`);
      }; */
      
      // 페이지 이동이 감지될 때마다 trackPageChange 함수를 호출
      /* window.addEventListener('popstate', trackPageChange); */
      
      // 초기 페이지 로딩 시에도 호출
      /* trackPageChange(); */
    

    return (
        <Router>
            <ScrollToTop/>
            <Routes>
                
                {/* Home, Login, Signup */}
                <Route exact path="/" element={<Home parsedCommunityCategoryData={parsedCommunityCategoryData}/>}></Route>
                <Route exact path="/login" element={<Login />}></Route>
                <Route exact path="/member_type" element={<MemberType />}></Route>
                {/* <Route exact path="/sign_up" element={<Signup/>}></Route> */} {/* [보류] 소셜로그인 */}
                <Route exact path="/myinfo" element={<MemberEditPage />}></Route>

                {/* Social Login Redirection */}
                <Route exact path='/auth/kakao/callback' element={<KakaoRedirection />} />
                <Route exact path='/auth/naver/callback' element={<NaverRedirection />} />

                {/* Community */}
                <Route exact path="/community" element={<CommunityViewAll parsedCommunityCategoryData={parsedCommunityCategoryData}/>}></Route>

                {communityEnglishCategories.length > 0  && communityEnglishCategories.map((item, index) => {
                    const path = `/community/${item}`
                    /* console.log('테스트', path); */
                    return(
                        <Route
                            key={index}
                            exact
                            path={path}
                            element={<DetailCommunity num={index} koreanCategory={parsedCommunityCategoryData[index]}/>}
                        />
                    )
                })}

                {/* Investment 게시판 */}
                <Route exact path="/investment/ongoing" element={<OngoingBoard koreanCategory={parsedInvestmentCategoryData}/>}></Route>
                <Route exact path="/investment/deadline" element={<DeadlineBoard koreanCategory={parsedInvestmentCategoryData}/>}></Route>

                {/* Investment Post 보류 */}
                <Route exact path="/investment/:condition/:id" element={<PostDetail/>} />
                <Route exact path="/approve/:key/pending/:id" element={<PendingPostDetail/>} />
                <Route exact path="/post_regist" element={<PostRegist/>} />

                {/* 글쓰기 & 업체등록 */}
                <Route exact path="/company_upload" element={<CompanyUpload />}></Route>
                <Route exact path="/company_write" element={<CompanyWrite />}></Route>
                <Route exact path="/company_modify" element={<CompanyModify />}></Route>
                <Route exact path="/business_number_check" element={<BusinessNumberCheck />}></Route>
                <Route exact path="/payment_info_page" element={<PaymentInfoPage />}></Route>

                {/* Admin */}
                <Route exact path="/admin" element={<Admin />}></Route>
                <Route exact path="/admin/board_list" element={<AdminBoardList />}></Route>
                <Route exact path="/admin/post_approve" element={<AdminPostApprove/>}></Route>
                <Route exact path="/admin/member_list" element={<AdminMemberList/>}></Route>
                <Route exact path="/admin/company_list" element={<AdminCompanyList/>}></Route>
                <Route exact path="/admin/post_list" element={<AdminPostList/>}></Route>
                
            </Routes>
        </Router>
    );
};

export default App;

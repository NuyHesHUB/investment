import React, { useEffect } from 'react';

/* React-Router-Dom */
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
/* Axios */
import axios from 'axios';
import Axios from 'axios'
import axiosInstance from './axiosInstance';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { setBoardData } from './store/actions/actions';

/* Basic Component */
import Home from './Components/Home';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';

/* Member Edit */
import MemberEditPage from './Components/MemberEdit/MemberEditPage';

/* Post Components */
import PostDetail from './Components/PostDetail/PostDetail';
import PostRegist from './Components/PostRegist/PostRegist';

/* Gallery */
import CategoryPage from './Components/CategoryPage/CategoryPage';
import Gallery01 from './Components/CategoryPage/Gallery01';


/* Admin Components */
import Admin from './Components/Admin/Admin';
import AdminMemberList from './Components/Admin/AdminMemberList';
import AdminBoardList from './Components/Admin/AdminBoardList';
import AdminPostList from './Components/Admin/AdminPostList';
import AdminEditUser from './Components/Admin/AdminEditUser';
import AdminEditPost from './Components/Admin/AdminEditPost';



const App = () => {

    /* Axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL + "/v1";
    Axios.defaults.withCredentials = true; */

    console.log('process.env.NODE_ENV :',process.env.NODE_ENV);
    console.log('process.env.REACT_APP_BASEURL :',process.env.REACT_APP_BASEURL);

    const fetcher = async (url) => {
        try {
          const res = await axios.get(url);
          return res.data;
        } catch (error) {
          throw error.response.data
        }
      }

    const userUid = sessionStorage.getItem('userUid');
    const dispatch = useDispatch();
    const rdxTest = useSelector((state) => state.reducer)
    const boardData = useSelector((state) => state.reducer.boardData || []);
    const categoryData = useSelector((state) => state.reducer.galleryListData || []);

    /* const keyData = boardData?.[0]?.key; */
    /* const storeData = useSelector((state) => state.reducer); */
    /* console.log('rdxTest',rdxTest); */
    /* console.log('app.js', categoryData); */

    /* console.log('app.js', keyData); */
    
    /* console.log('app.js',storeData); */

    useEffect(() => {
        axios.get('/board/')
            .then(response => {
                const titles = response.data?.query;
                dispatch(setBoardData(titles));
                /* console.log('home.js',response.data.query); */
            })
            .catch(error => {
                console.error('게시판 데이터를 가져올 수 없습니다.', error);
            });
    }, []);

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
            <Routes>

                {/* Home, Login, Signup */}
                <Route exact path="/" element={<Home/>}></Route>
                <Route exact path="/login" element={<Login />}></Route>
                <Route exact path="/sign_up" element={<Signup/>}></Route>
                <Route exact path="/myinfo" element={<MemberEditPage />}></Route>

                {/* Gallery */}
                <Route exact path='/gallery/dining' element={<CategoryPage categoryList="dining"/>}></Route>
                <Route exact path='/gallery/manufacturing' element={<CategoryPage categoryList="manufacturing"/>}></Route>
                <Route exact path='/gallery/sales' element={<CategoryPage categoryList="sales"/>}></Route>
                <Route exact path='/gallery/rental' element={<CategoryPage categoryList="rental"/>}></Route>
                <Route exact path='/gallery/car' element={<CategoryPage categoryList="car"/>}></Route>
                <Route exact path='/gallery/other' element={<CategoryPage categoryList="other"/>}></Route>


                {/* {boardData.legnth > 0 && categoryData.legnth > 0 && boardData.map((item, index) => (
                    <Route key={index} exact path={`/${item.key}/${categoryData[index]}`} element={<CategoryPage index={index} categoryList={categoryData[index]}/>}
                    />
                ))} */}
                {boardData.length > 0 && categoryData.length > 0 && boardData.map((item, index) => {
                    const path = `/${boardData?.[0]?.key}/${categoryData[index]}`;
                    console.log(`Route path: ${path}`);
                    return (
                        <Route
                            key={index}
                            exact
                            path={path}
                            element={<CategoryPage index={index} categoryList={categoryData[index]} />}
                        />
                    );
                })}
                

                {/* <Route exact path='/:categoryList' element={<CategoryPage categoryList="dining"/>}></Route>
                <Route exact path='/:key' element={<CategoryPage categoryList="manufacturing"/>}></Route>
                <Route exact path='/sales' element={<CategoryPage categoryList="sales"/>}></Route>
                <Route exact path='/rental' element={<CategoryPage categoryList="rental"/>}></Route>
                <Route exact path='/car' element={<CategoryPage categoryList="car"/>}></Route>
                <Route exact path='/other' element={<CategoryPage categoryList="other"/>}></Route> */}

                {/* Post */}
                <Route exact path="/gallery/dining/:id" element={<PostDetail/>} />
                <Route exact path="/post_regist" element={<PostRegist/>} />

                {/* Admin */}
                <Route exact path="/admin" element={<Admin />}></Route>
                <Route exact path="/admin/member_list" element={<AdminMemberList/>}></Route>
                <Route exact path="/admin/board_list" element={<AdminBoardList/>}></Route>
                <Route exact path="/admin/post_list" element={<AdminPostList/>}></Route>

                <Route exact path="/admin/member_edit/:index" element={<AdminEditUser/>}></Route>
                <Route exact path="/admin/post_edit/:index" element={<AdminEditPost/>}></Route>
                {/* <Route exact path="/admin/post_edit/:key/:index" element={<AdminEditPost/>}></Route> */}
                
                

            </Routes>
        </Router>
    );
};

export default App;

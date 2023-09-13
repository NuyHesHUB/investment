import React, { useEffect } from 'react';

/* React-Router-Dom */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* Axios */
import axios from 'axios';
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
    const dispatch = useDispatch();
    const rdxTest = useSelector((state) => state.reducer)
    const boardData = useSelector((state) => state.reducer.boardData || []);
    const categoryData = useSelector((state) => state.reducer.galleryListData || []);
    const keyData = boardData?.[0]?.key;
    /* const storeData = useSelector((state) => state.reducer); */
    console.log('rdxTest',rdxTest);
    console.log('app.js', categoryData);

    console.log('app.js', keyData);
    
    /* console.log('app.js',storeData); */

    useEffect(() => {
        axiosInstance.get('/board/')
            .then(response => {
                const titles = response.data.query;
                dispatch(setBoardData(titles));
                /* console.log('home.js',response.data.query); */
            })
            .catch(error => {
                console.error('게시판 데이터를 가져올 수 없습니다.', error);
            });
    }, []);

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

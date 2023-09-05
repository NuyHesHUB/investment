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
import AdminPostList from './Components/Admin/AdminPostList';
import AdminEditUser from './Components/Admin/AdminEditUser';
import AdminEditPost from './Components/Admin/AdminEditPost';
import AdminPostGroup from './Components/Admin/AdminPostGroup';











const App = () => {
    const dispatch = useDispatch();
    const boardData = useSelector((state) => state.reducer.boardData);
    const storeData = useSelector((state) => state.reducer);
    console.log('app.js',boardData);
    console.log('app.js',storeData);

    useEffect(() => {
        axiosInstance.get('/board/')
            .then(response => {
                const titles = response.data.query;
                dispatch(setBoardData(titles));
                /* console.log('home.js',response.data); */
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
                {/* {boardData.map((item, index) => (
                    <Route
                    key={index}
                    path={`/${item.key}`}
                    element={<CategoryPage1 categoryKey={item.key} />}
                    />
                ))} */}

                {/* Gallery */}
                <Route exact path='/gallery' element={<CategoryPage categoryKey="gallery"/>}></Route>
                <Route exact path='/gallery1' element={<CategoryPage categoryKey="gallery1"/>}></Route>
                <Route exact path='/gallery2' element={<CategoryPage categoryKey="gallery2"/>}></Route>
                <Route exact path='/gallery4' element={<CategoryPage categoryKey="gallery4"/>}></Route>
                <Route exact path='/gallery5' element={<CategoryPage categoryKey="gallery5"/>}></Route>

                {/* Post */}
                <Route exact path="/:categoryKey/:id" element={<PostDetail/>} />
                <Route exact path="/post_regist" element={<PostRegist/>} />

                {/* Admin */}
                <Route exact path="/admin" element={<Admin />}></Route>
                <Route exact path="/admin/member_list" element={<AdminMemberList/>}></Route>
                <Route exact path="/admin/post_list" element={<AdminPostList/>}></Route>
                <Route exact path="/admin/member_edit/:index" element={<AdminEditUser/>}></Route>
                <Route exact path="/admin/post_edit/:key" element={<AdminEditPost/>}></Route>
                <Route exact path='/admin/post_group' element={<AdminPostGroup/>}></Route>
                

            </Routes>
        </Router>
    );
};

export default App;

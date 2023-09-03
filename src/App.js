import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axiosInstance from './axiosInstance';
import Login from './Components/Login/Login';
import Home from './Components/Home';
import Admin from './Components/Admin/Admin';
import Signup from './Components/Signup/Signup';
import CategoryPage from './Components/CategoryPage/CategoryPage';
import Gallery01 from './Components/CategoryPage/Gallery01';
import MemberEditPage from './Components/MemberEdit/MemberEditPage';
import MemberList from './Components/Admin/MemberList';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setBoardData } from './store/actions/actions';
import PostDetail from './Components/PostDetail/PostDetail';
import PostRegist from './Components/PostRegist/PostRegist';

const App = () => {
    const dispatch = useDispatch();
    const boardData = useSelector((state) => state.reducer.boardData);
    console.log('app.js',boardData);
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
                <Route exact path="/" element={<Home/>}></Route>
                <Route exact path="/login" element={<Login />}></Route>
                <Route exact path="/sign_up" element={<Signup/>}></Route>
                {/* {boardData.map((item, index) => (
                    <Route
                    key={index}
                    path={`/${item.key}`}
                    element={<CategoryPage1 categoryKey={item.key} />}
                    />
                ))} */}
                <Route exact path='/gallery' element={<CategoryPage categoryKey="gallery"/>}></Route>
                <Route exact path='/gallery1' element={<CategoryPage categoryKey="gallery1"/>}></Route>
                <Route exact path='/gallery2' element={<CategoryPage categoryKey="gallery2"/>}></Route>
                <Route exact path='/gallery4' element={<CategoryPage categoryKey="gallery4"/>}></Route>
                <Route exact path='/gallery5' element={<CategoryPage categoryKey="gallery5"/>}></Route>
                <Route exact path="/:categoryKey/:id" element={<PostDetail/>} />
                <Route exact path="/post_regist" element={<PostRegist/>} />
                <Route exact path="/admin" element={<Admin />}></Route>
                <Route exact path="/admin/member_list" element={<MemberList/>}></Route>
                <Route exact path="/myinfo" element={<MemberEditPage />}></Route>
            </Routes>
        </Router>
    );
};

export default App;

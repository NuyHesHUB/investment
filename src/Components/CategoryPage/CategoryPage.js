import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Gallery01 from './Gallery01';
import Gallery02 from './Gallery02';
import axios from 'axios';
import axiosInstance from '../../axiosInstance';
import styled from 'styled-components';
import { setPostData } from '../../store/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CategoryPageFrame = styled.div`
    width: 100%;
    max-width: 1920px;
    margin: 0 auto;
    text-align: center;
`
const CategoryPage = ({ categoryList }) => {
    const dispatch = useDispatch();
    const boardData = useSelector((state) => state.reducer.boardData);
    console.log(boardData[0]);
    const [postData, setPostData] = useState([]);
    /* const url = `/board/${categoryKey}/post/`; */
    const url = `/board/gallery/post/`;
    const accessToken = sessionStorage.getItem('accessToken');
    const headers = {
        Authorization: `${accessToken}`
    }
    const query = "";       
    const pageRows = "";    
    const page = "";        
    const category = "";
    const params = {
        query: query,
        pageRows: pageRows,
        page: page,
        category: category
    };

    useEffect(() => {
        axiosInstance.get(url, { params, headers })
        .then(response => {
            const posttest = response.data.query;
            /* setPostData(posttest); */
            /* dispatch(setPostData(posttest)); */
            setPostData(posttest);
            console.log('posttest',posttest);
        })
        .catch(error => {
            console.error('게시글 목록을 가져올 수 없습니다.', error)
        })
    },[categoryList])

    /* const postData = useSelector((state) => state.reducer.postData); 

    console.log('postData',postData); */

    /* const postData = useSelector((state) => state.reducer.postData);

    useEffect(() => {
        console.log('postData', postData);
    }, [postData]); */

    let content = null;
    
    if (categoryList === 'dining') {
        content = <Gallery01 postData={postData}></Gallery01>;
    } else if (categoryList === 'manufacturing') {
        content = <Gallery02 postData={postData}></Gallery02>;
    } else if (categoryList === 'sales') {
        content = <div>sales 내용을 보여줍니다.</div>;
    } else if (categoryList === 'rental') {
        content = <div>rental 내용을 보여줍니다.</div>;
    } else if (categoryList === 'car') {
        content = <div>car 내용을 보여줍니다.</div>;
    } else if (categoryList === 'other') {
        content = <div>other 내용을 보여줍니다.</div>;
    } else if (categoryList === 'notice1') {
        content = <div>notice1 내용을 보여줍니다.</div>;
    } else if (categoryList === 'notice2') {
        content = <div>notice2 내용을 보여줍니다.</div>;
    } else {
        content = <div>기본 내용을 보여줍니다.</div>;
    }
    /* http://211.198.44.123:3385/v1/board/:key/post?query&pageRows=&page=&category= */

    return (
        <div>
            <Header/>
                <CategoryPageFrame>
                    <h2>{categoryList}</h2>
                    <Link to="/post_regist">
                        게시글작성
                    </Link>
                    {content}
                </CategoryPageFrame>
            <Footer/>
        </div>
    );
};

export default CategoryPage;
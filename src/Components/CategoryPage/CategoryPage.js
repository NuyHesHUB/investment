import React, { useEffect, useState } from 'react';

/* React-Router-Dom */
import { Link } from 'react-router-dom';

/* Axios */
import axios from 'axios';
import axiosInstance from '../../axiosInstance';

/* Redux */
/* import { setPostData } from '../../store/actions/actions'; */
import { useSelector } from 'react-redux';

/* Components */
import Header from '../Header';
import Footer from '../Footer';
import Gallery01 from './Gallery01';
import Gallery02 from './Gallery02';

/* StyledComponents */
import styled from 'styled-components';

const CategoryPageFrame = styled.div`
    width: 100%;
    max-width: 1920px;
    margin: 0 auto;
    text-align: center;
`
const CategoryPage = ({ index, categoryList }) => {
    /* AccessToken */
    const accessToken = sessionStorage.getItem('accessToken');

    /* Redux */
    const boardData = useSelector((state) => state.reducer.boardData);
    const urlKey = boardData?.[0]?.key;

    /* UseState */
    const [postData, setPostData] = useState([]);

    /*------------------------------------------------*\
                     API 게시글 목록 GET
    \*------------------------------------------------*/
    const url = `/board/${urlKey}/post/`;
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
            /* console.log('posttest',posttest); */
        })
        .catch(error => {
            console.error('게시글 목록을 가져올 수 없습니다.', error)
        })
    },[categoryList, boardData])
    console.log('postData',postData);
    /*------------------------------------------------*\
                     Contents Return
    \*------------------------------------------------*/
    let content = null;
    
    if (categoryList === 'dining') {
        content = <Gallery01 postData={postData}></Gallery01>;
    } else if (categoryList === 'manufacturing') {
        content = <div>manufacturing 내용을 보여줍니다.</div>;
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
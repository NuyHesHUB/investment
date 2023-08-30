import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Gallery01 from './Gallery01';
import Gallery02 from './Gallery02';
import axios from 'axios';
import { setPostData } from '../../store/actions/actions';
import { useDispatch, useSelector } from 'react-redux';

const CategoryPage = ({ categoryKey }) => {
    const dispatch = useDispatch();
    const boardData = useSelector((state) => state.reducer);
    console.log(boardData);
    const [postData, setPostData] = useState([]);
    const url = `http://211.198.44.123:3385/v1/board/${categoryKey}/post/`;
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
        axios.get(url, { params, headers })
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
    },[categoryKey])

    /* const postData = useSelector((state) => state.reducer.postData); 

    console.log('postData',postData); */

    /* const postData = useSelector((state) => state.reducer.postData);

    useEffect(() => {
        console.log('postData', postData);
    }, [postData]); */

    let content = null;
    
    if (categoryKey === 'gallery') {
        content = <Gallery01 postData={postData}></Gallery01>;
    } else if (categoryKey === 'gallery1') {
        content = <Gallery02 postData={postData}></Gallery02>;
    } else if (categoryKey === 'gallery2') {
        content = <div>gallery2 내용을 보여줍니다.</div>;
    } else if (categoryKey === 'gallery4') {
        content = <div>gallery4 내용을 보여줍니다.</div>;
    } else if (categoryKey === 'gallery5') {
        content = <div>gallery5 내용을 보여줍니다.</div>;
    } else if (categoryKey === 'notice') {
        content = <div>notice 내용을 보여줍니다.</div>;
    } else if (categoryKey === 'notice1') {
        content = <div>notice1 내용을 보여줍니다.</div>;
    } else if (categoryKey === 'notice2') {
        content = <div>notice2 내용을 보여줍니다.</div>;
    } else {
        content = <div>기본 내용을 보여줍니다.</div>;
    }
    /* http://211.198.44.123:3385/v1/board/:key/post?query&pageRows=&page=&category= */

    return (
        <div>
            <Header/>
            <h2 style={{textAlign:'center'}}>{categoryKey}</h2>
            {content}
            <Footer/>
        </div>
    );
};

export default CategoryPage;
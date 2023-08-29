import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

const PostDetail = () => {
    const { categoryKey, num } = useParams();

    
    return (
        <div>
            <Header/>
            <h2>{categoryKey} 카테고리의 게시물 {num}의 상세 페이지</h2>
            <Footer/>
        </div>
    );
};

export default PostDetail;
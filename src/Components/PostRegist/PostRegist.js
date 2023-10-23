import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';

import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const PostRegist = () => {
    const boardData = useSelector((state) => state.reducer?.adminBoardData);
    const userUid = sessionStorage.getItem('userUid');
    const categoryData = boardData[6]?.categoryList || [];
    let parsedCategoryData = [];

    if (typeof categoryData === 'string' && categoryData.length > 0) {
        try {
            // eslint-disable-next-line no-unused-vars
            parsedCategoryData = JSON.parse(categoryData);
        } catch (error) {
            console.error('JSON 파싱 오류:', error);
        }
    }
    /* console.log('parsedCategoryData',parsedCategoryData); */

    /* const KeyData = useSelector((state) => state.reducer.boardData[0].key); */

    /* console.log('KeyData',KeyData); */

    /* const [selectedValue, setSelectedValue] = useState('');

    const handleSelectChange = (event) => {
        const selectedOptionValue = event.target.value;
        setSelectedValue(selectedOptionValue);
        console.log('선택한 옵션의 value:', selectedOptionValue);
    }; */

   /*  const boardDataString = localStorage.getItem('adminBoardData');
    const boardData = JSON.parse(boardDataString);
    const categoryData = JSON.parse(boardData[6]?.categoryList); */

    const [postData, setPostData] = useState({
        status: '',
        category: '',
        isNotice: '',
        title: '',
        content: '',
        isSecret: '',
        extraField: '',
        userUid: userUid
      });
    
    const dispatch = useDispatch();

    /* const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPostData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }; */
    /* const mapKoreanToEnglishCategory = (koreanCategory) => {
        const categoryMappings = {
            '자유 갤러리': 'gallery',
            '자유 갤러리1': 'gallery1',
            '자유 갤러리2': 'gallery2',
        };

        return categoryMappings[koreanCategory] || '';
    }; */

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setPostData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    /* useEffect(() => {
        if (postData.category) {
            const englishCategory = mapKoreanToEnglishCategory(postData.category);
            setKeyData({key:englishCategory });
        }
    }, [postData.category]);
    const accessToken = sessionStorage.getItem('accessToken');
    const headers = {
        Authorization: `${accessToken}`
    }
    const handlePostSubmit = async (e) => {
        e.preventDefault();
        
        try{
            const response = await axiosInstance.post(`/board/${keyData.key}/post`, postData, {
                headers: headers
            });
            console.log('게시물 작성 성공',response);
        } catch(error) {
            console.error('게시물 작성 실패:', error);
        }
        
    }; */
    const baseURL = process.env.REACT_APP_BASEURL;
    const accessToken = sessionStorage.getItem('accessToken');
    const headers = {
        Authorization: `${accessToken}`
    }
    const handlePostSubmit = async (e) => {
        e.preventDefault();
        
        try{
            const response = await axios.post(`${baseURL}/v1/board/investment/post`, postData, { headers });
            console.log('게시물 작성 성공',response);
        } catch(error) {
            console.error('게시물 작성 실패:', error);
        }
        
    };
    console.log('postData',postData);
    
    return (
        <div>
            <Header/>
                <div>
                    <h1>게시물 작성</h1>
                    <form onSubmit={handlePostSubmit}>
                        <div>
                            <span>Status : </span>
                            <select
                                name="status"
                                value={postData.status}
                                onChange={handleInputChange}
                            >
                                <option value="">선택</option>
                                <option value="Y">YES</option>
                                <option value="N">NO</option>
                            </select>
                        </div>
                        <div>
                            <span>공지글 : </span>
                            <select
                                name="isNotice"
                                value={postData.isNotice}
                                onChange={handleInputChange}
                            >
                                <option value="">선택</option>
                                <option value="Y">공지글</option>
                                <option value="N">비공지글</option>
                            </select>
                        </div>
                        <div>
                            <span>공개/비공개 : </span>
                            <select
                                name="isSecret"
                                value={postData.isSecret}
                                onChange={handleInputChange}
                            >
                                <option value="">선택</option>
                                <option value="Y">비공개</option>
                                <option value="N">공개</option>
                            </select>
                        </div>
                        <div>
                            <span>카테고리 : </span>
                            <select
                                name='category'
                                value={postData.category}
                                onChange={handleInputChange}
                            >
                                <option value="">선택</option>
                                {parsedCategoryData.map((item, index)=> 
                                    (   
                                        <option 
                                            value={item} 
                                            key={index}
                                            onClick={() => console.log('선택한 옵션의 value:', item)}
                                        >
                                                {item}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="title">제목 : </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={postData.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="content">내용 : </label>
                            <textarea
                                id="content"
                                name="content"
                                value={postData.content}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button type="submit">게시물 작성</button>
                    </form>
                </div>
            <Footer/>
        </div>
    );
};

export default PostRegist;
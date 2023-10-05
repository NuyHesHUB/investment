import axios from 'axios';
import React, { useEffect, useState } from 'react';

const DetailCommunity = () => {
    const baseURL = process.env.REACT_APP_BASEURL;
    const userUid = sessionStorage.getItem('userUid');
    const accessToken = sessionStorage.getItem('accessToken');
    const headers = {
        Authorization: `${accessToken}`
    }

    const [communityPostData, setCommunityPostData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const PostResponse = await axios.get(`${baseURL}/v1/board/free/post`, { headers });
                const data = PostResponse.data?.query;
                setCommunityPostData(data);
                console.log('freePostResponse', data);
            } catch (error) {
                console.error('communityBoardData 데이터 가져오기 실패', error);
            }
        }
        fetchData();
    },[])
    return (
        <div>
            디테일 커뮤니티 페이지
        </div>
    );
};

export default DetailCommunity;
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const DetailCommunity = ({num, koreanCategory}) => {
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
                /* console.log('freePostResponse', data); */
            } catch (error) {
                console.error('communityBoardData 데이터 가져오기 실패', error);
            }
        }
        fetchData();
    },[])

    console.log('communityPostData',communityPostData);
    return (
        <div>
            {num}, {koreanCategory} 디테일 커뮤니티 페이지
            <div>
                {/* {communityPostData} */}
                {
                    Array.isArray(communityPostData) && communityPostData.length > 0 &&
                    communityPostData
                    .filter(item => item && item.category === koreanCategory)
                    .map((item, index) => (
                        <tr key={index}>
                            <td>{item.num}</td>
                            <td>{item.isSecret}</td>
                            <td>{item.category}</td>
                            <td>{item.nickname}</td>
                            <td>{item.title}</td>
                            <td>{item.like}</td>
                            <td>{item.brdKey}</td>
                            <td>{item.post_view_count}</td>
                        </tr>
                    ))
                }
            </div>
        </div>
    );
};

export default DetailCommunity;
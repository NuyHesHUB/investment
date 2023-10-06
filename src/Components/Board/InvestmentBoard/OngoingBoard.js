import React, { useEffect, useState } from 'react';
import Header from '../../Header';
import Footer from '../../Footer';
import { StyledFrame } from '../../StyledComponents/StyledHome';
import axios from 'axios';

const InvestOngoingBoard = ({koreanCategory}) => {
    const baseURL = process.env.REACT_APP_BASEURL;
    const userUid = sessionStorage.getItem('userUid');
    const accessToken = sessionStorage.getItem('accessToken');
    const headers = {
        Authorization: `${accessToken}`
    };

    const [investOngoingPostData, setInvestOngoingPostData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const PostResponse = await axios.get(`${baseURL}/v1/board/investment/post`, { headers });
                const data = PostResponse.data?.query;
                setInvestOngoingPostData(data);
                /* console.log('investPostResponse',data); */
            } catch (error) {
                console.error('investOngoingBoardData 데이터 가져오기 실패', error);
            }
        }
        fetchData();
    },[])

    console.log('investOngoingPostData',investOngoingPostData);
    /* console.log('koreanCategory',koreanCategory); */
    return (
        <StyledFrame>
            <Header/>
                <div style={{height:'1000px', paddingTop:'80px'}}>
                    {
                        Array.isArray(investOngoingPostData) && investOngoingPostData.length > 0 &&
                        investOngoingPostData
                        .filter(item => item && item.condition === 'ongoing' /* && item.category === '제조' */)
                        .map((item, index) => (
                            <tr key={index}>
                                <td>{item.brdKey}</td>
                                <td>{item.category}</td>
                                <td>{item.comment_count}</td>
                                <td>{item.condition}</td>
                                <td>{item.content}</td>
                            </tr>
                        ))
                    }
                </div>
            <Footer/>
        </StyledFrame>
    );
};

export default InvestOngoingBoard;
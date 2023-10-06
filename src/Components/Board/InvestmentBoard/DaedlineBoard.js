import React, { useEffect, useState } from 'react';
import Header from '../../Header';
import Footer from '../../Footer';
import { StyledFrame } from '../../StyledComponents/StyledHome';
import axios from 'axios';

const InvestDeadlineBoard = () => {
    const baseURL = process.env.REACT_APP_BASEURL;
    const userUid = sessionStorage.getItem('userUid');
    const accessToken = sessionStorage.getItem('accessToken');
    const headers = {
        Authorization: `${accessToken}`
    };

    const [investDeadlinePostData, setInvestDeadlinePostData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try { 
                const PostResponse = await axios.get(`${baseURL}/v1/board/investment/post`, { headers });
                const data = PostResponse.data?.query;
                setInvestDeadlinePostData(data);
            } catch (error) {
                console.error('investDeadlineBoardData 데이터 가져오기 실패', error);
            }
        }
        fetchData();
    },[])

    console.log('investDeadlinePostData',investDeadlinePostData);

    return (
        <StyledFrame>
            <Header/>
                <div style={{height:'1000px', paddingTop:'80px'}}>
                    {
                        Array.isArray(investDeadlinePostData) && investDeadlinePostData.length > 0 &&
                        investDeadlinePostData
                        .filter(item => item && item.condition === 'deadline' /* && item.category === '제조' */)
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

export default InvestDeadlineBoard;
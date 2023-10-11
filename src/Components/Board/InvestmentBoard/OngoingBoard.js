import React, { useEffect, useState } from 'react';
import Header from '../../Header';
import Footer from '../../Footer';
import { StyledFrame } from '../../StyledComponents/StyledHome';
import axios from 'axios';

import OngoingPostCard from './OngoingPostCard';
import { BoardWrap, DummyBanner, PostCardTitleWrap, PostCardWrap } from './StyledOngoingBoard';
import { Link } from 'react-router-dom';

const InvestOngoingBoard = () => {
    const baseURL = process.env.REACT_APP_BASEURL;
    const userUid = sessionStorage.getItem('userUid');
    const accessToken = sessionStorage.getItem('accessToken');
    const headers = {
        Authorization: `${accessToken}`
    };
    const [investOngoingPostData, setInvestOngoingPostData] = useState(null);

    /*-----------------------------------------------*\
                  investment post 데이터 API
    \*-----------------------------------------------*/
    useEffect(() => {
        const fetchData = async () => {
            try {
                const PostResponse = await axios.get(`${baseURL}/v1/board/investment/post`, { headers });
                const data = PostResponse.data?.query;
                setInvestOngoingPostData(data);
                console.log('investPostResponse',data);
            } catch (error) {
                console.error('investOngoingBoardData 데이터 가져오기 실패', error);
            }
        }
        fetchData();
    },[])

    

    /*-----------------------------------------------*\
                        End Date
    \*-----------------------------------------------*/
    const formattedDates = Array.isArray(investOngoingPostData) && investOngoingPostData.length > 0 &&
    investOngoingPostData
    .filter(item => item && item.condition === 'ongoing')
    .map((item, index) => {
        const endDt = new Date(item.endDt);
        /* const startDt = new Date(item.startDt); */
        const currentDt = new Date();

        const timeDiff = endDt - currentDt;
        const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        return `D-${daysDiff}`
    })

    /*-----------------------------------------------*\
                    Console.log 테스트
    \*-----------------------------------------------*/
    /* console.log('formattedDates',formattedDates); */
    /* console.log('investOngoingPostData',investOngoingPostData); */
    /* console.log('koreanCategory',koreanCategory); */

    return (
        <StyledFrame>
            <Header/>
                <BoardWrap>
                    <DummyBanner>visual</DummyBanner>
                    {/* {
                        Array.isArray(investOngoingPostData) && investOngoingPostData.length > 0 &&
                        investOngoingPostData
                        .filter(item => item && item.condition === 'ongoing')
                        .map((item, index) => (
                            <tr key={index}>
                                <td>{item.brdKey}</td>
                                <td>{item.category}</td>
                                <td>{item.comment_count}</td>
                                <td>{item.condition}</td>
                                <td>{item.content}</td>
                            </tr>
                        ))
                    } */}
                    <PostCardTitleWrap>
                        <h3>진행 중인 투자</h3>
                    </PostCardTitleWrap>
                    <PostCardWrap>
                        {/* <OngoingPostCard/> */}
                        {
                            Array.isArray(investOngoingPostData) && investOngoingPostData.length > 0 &&
                            investOngoingPostData
                            .filter(item => item && item.condition === 'ongoing')
                            .map((item, index) => (
                                <Link key={index} to={`/investment/ongoing/${item.id}`}>
                                    <OngoingPostCard key={index} name={item.title} content={item.content} category={item.category} date={formattedDates[index]}/>
                                </Link>
                            ))
                        }
                    </PostCardWrap>
                </BoardWrap>
            <Footer/>
        </StyledFrame>
    );
};

export default InvestOngoingBoard;
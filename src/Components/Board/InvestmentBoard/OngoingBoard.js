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

    // logoUrls 상태와 그 상태를 업데이트하는 setLogoUrls 함수
    const [logoUrls, setLogoUrls] = useState([]);

/* const [investOngoingPostData, setInvestOngoingPostData] = useState([]); */
    /*-----------------------------------------------*\
                  investment post 데이터 API
    \*-----------------------------------------------*/
    useEffect(() => {
        const fetchData = async () => {
            try {
                const PostResponse = await axios.get(`${baseURL}/v1/board/investment/post`, { headers });
                const data = PostResponse.data?.query;
                /* setInvestOngoingPostData(data); */
                console.log('investPostResponse',data);
                /* const BusinessResponse = await axios.get(`${baseURL}/v1/company/{businessNum}?userUid=`, { headers }); */

                const businessNums = data
                .filter(item => item.condition === 'ongoing')
                .map(item => item.businessNum);

                console.log('businessNums',businessNums);

                /* 여기까지ok */





                const logoUrls = await Promise.all(businessNums.map(async businessNum => {
                    try {
                        const BusinessResponse = await axios.get(`${baseURL}/v1/company/${businessNum}?userUid=`, { headers });
                        console.log('성공');
                        return BusinessResponse.data?.query?.logoImg;

                    } catch (error) {
                        console.error('BusinessNumber 오류', error);
                        return null;
                    }
                }));
                
                const logoUrlMap = businessNums.reduce((acc, businessNum, index) => {
                    acc[businessNum] = logoUrls[index];
                    return acc;
                }, {})
                
                setLogoUrls(logoUrlMap);

                setInvestOngoingPostData(data.filter(item => item.condition === 'ongoing'));
            } catch (error) {
                console.error('investOngoingBoardData 데이터 가져오기 실패', error);
            }
        }
        fetchData();

    },[])

    
    /* const businessNums = investOngoingPostData?.map(item => item.businessNum);

    console.log('businessNums',businessNums); */


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
    /* console.log('logoUrls',logoUrls); */
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
                        {/* {
                            Array.isArray(investOngoingPostData) && investOngoingPostData.length > 0 &&
                            investOngoingPostData
                            .filter(item => item && item.condition === 'ongoing')
                            .map((item, index) => (
                                <Link key={index} to={`/investment/ongoing/${item.id}`}>
                                    <OngoingPostCard 
                                        key={index} 
                                        name={item.title} 
                                        content={item.content} 
                                        category={item.category} 
                                        date={formattedDates[index]}

                                    />
                                </Link>
                            ))
                        } */}
                        {
                            investOngoingPostData && investOngoingPostData.length > 0 &&
                            investOngoingPostData
                            .map((item, index) => (
                                <Link key={index} to={`/investment/ongoing/${item.id}`}>
                                    <OngoingPostCard 
                                        key={index} 
                                        name={item.title} 
                                        content={item.content} 
                                        category={item.category} 
                                        date={formattedDates[index]}

                                    />
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
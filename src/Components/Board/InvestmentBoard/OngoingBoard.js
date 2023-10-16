import React, { useEffect, useState } from 'react';
import Header from '../../Header';
import Footer from '../../Footer';
import { StyledFrame } from '../../StyledComponents/StyledHome';
import axios from 'axios';

import OngoingPostCard from './OngoingPostCard';
import { BoardWrap, DummyBanner, PostCardTitleWrap, PostCardWrap, MoreWrap, MoreBtn } from './StyledOngoingBoard';
import { Link, useNavigate } from 'react-router-dom';

const InvestOngoingBoard = () => {
    const baseURL = process.env.REACT_APP_BASEURL;
    const userUid = sessionStorage.getItem('userUid');
    const accessToken = sessionStorage.getItem('accessToken');
    const headers = {
        Authorization: `${accessToken}`
    };
    const [investOngoingPostData, setInvestOngoingPostData] = useState(null);

    const navigate = useNavigate();

    /* const [numPostsToShow, setNumPostsToShow] = useState(6); */
    const [numPostsToShow, setNumPostsToShow] = useState(Number(sessionStorage.getItem('numPostsToShow')) || 6);


    console.log('numPostsToShow',numPostsToShow);
    /* const handleLoadMore = () => {
        setNumPostsToShow(prev => prev + 6);
      }; */
      useEffect(() => {
        const handlePopState = () => {
            const state = window.history.state;
            if (state) {
                const updatedNumPostsToShow = state.numPostsToShow || numPostsToShow;
                setNumPostsToShow(updatedNumPostsToShow);
                sessionStorage.setItem('numPostsToShow', updatedNumPostsToShow.toString());
            }
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [numPostsToShow]);


    const handleLoadMore = () => {
        const updatedNumPostsToShow = numPostsToShow + 6;
        setNumPostsToShow(updatedNumPostsToShow);
        sessionStorage.setItem('numPostsToShow', updatedNumPostsToShow.toString());
    };
    /*-----------------------------------------------*\
                  investment post 데이터 API
    \*-----------------------------------------------*/
    useEffect(() => {
        const fetchData = async () => {
            try {
                const PostResponse = await axios.get(`${baseURL}/v1/board/investment/post?query&pageRows=&page=&category=&status=&condition=ongoing`, { headers });
                const data = PostResponse.data?.query;
                console.log('investPostResponse',data);
                /* setInvestOngoingPostData(data.filter(item => item.condition === 'ongoing')); */
                setInvestOngoingPostData(data);
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
    /* .filter(item => item && item.condition === 'ongoing') */
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
                    <PostCardTitleWrap>
                        <h3>진행 중인 투자</h3>
                    </PostCardTitleWrap>
                    <PostCardWrap>
                    {investOngoingPostData &&
                        investOngoingPostData?.length > 0 &&
                        investOngoingPostData?.slice(0, numPostsToShow).map((item, index) => (
                        <Link key={index} to={`/investment/ongoing/${item.id}`}>
                            <OngoingPostCard
                                key={index}
                                logoimg={item.logoImg}
                                name={item.companyName}
                                title={item.title}
                                content={item.content}
                                category={item.category}
                                date={formattedDates[index]}
                            />
                        </Link>
                    ))}
                    </PostCardWrap>
                    <MoreWrap>
                        {investOngoingPostData?.length > numPostsToShow && (
                            <div style={{marginTop:'80px'}}>
                                <MoreBtn onClick={handleLoadMore}>
                                    <span>더보기</span>
                                </MoreBtn>
                            </div>
                        )}
                    </MoreWrap>
                </BoardWrap>
            <Footer/>
        </StyledFrame>
    );
};

export default InvestOngoingBoard;
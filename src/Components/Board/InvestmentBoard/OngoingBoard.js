import React, { useEffect, useState } from 'react';

/* React-Router-Dom */
import { Link, useLocation } from 'react-router-dom';

/* Axios */
import axios from 'axios';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { setOngoingPostCardCount, setOngoingPostData } from '../../../store/actions/actions';

/* Components */
import Header from '../../Header';
import Footer from '../../Footer';
import OngoingPostCard from './OngoingPostCard';

/* Styled-Components */
import { StyledFrame } from '../../StyledComponents/StyledHome';
import { BoardWrap, DummyBanner, PostCardTitleWrap, PostCardWrap, MoreWrap, MoreBtn } from './StyledOngoingBoard';

/* img */
import { ReactComponent as VisualImg } from './VisualImg.svg';

import useScrollFadeIn from '../../../Hook/useScrollFadeIn';
import Loading from '../../../Effect/Loading';

/* Log */
import PageLog from '../../../Hook/PageLog'


const InvestOngoingBoard = () => {

    /* const fadeIn1 = useScrollFadeIn('up', 1, 500); */

    /* Basic */
    const baseURL = process.env.REACT_APP_BASEURL;
    const accessToken = sessionStorage.getItem('accessToken');
    const userUid = sessionStorage.getItem('userUid');
    const uid = userUid === null ? '' : userUid
    const headers = {
        Authorization: `${accessToken}`
    };
    const params = {
        pageRows : '',
        page : '',
        category : '',
        status : '',
        condition :'ongoing',
    };
    const dispatch = useDispatch();
    const PostCardCount = useSelector((state) => state.reducer.ongoingPostcardCount
    );

    const [investOngoingPostData, setInvestOngoingPostData] = useState(null);

    const { pathname } = useLocation();

    const [isLoading, setIsLoading] = useState(true);

    const postSaveData = useSelector((state) => state.reducer.ongoingPostData);
    
    
    if (postSaveData.length > 0) {
        console.log('리덕스 테스트 데이터 있음');
    } else{
        console.log('리덕스 테스트 데이터 없음');
    }

    console.log('테스트', postSaveData);

    /*-----------------------------------------------*\
                  PostCard 더보기 전역상태관리
    \*-----------------------------------------------*/
    useEffect(() => {
        const handlePopState = () => {
            const state = window.history.state;
            if (state) {
                const updatedNumPostsToShow = state.PostCardCount || PostCardCount;
                dispatch(setOngoingPostCardCount(updatedNumPostsToShow));
            }
    };
        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };

    }, [PostCardCount]);

    const handleLoadMore = () => {
        const updatedNumPostsToShow = PostCardCount + 6;
        dispatch(setOngoingPostCardCount(updatedNumPostsToShow));
    };


    /*-----------------------------------------------*\
                        page log
    \*-----------------------------------------------*/
    // PageLog("진행중");
  
    
    /*-----------------------------------------------*\
                  investment post 데이터 API
    \*-----------------------------------------------*/
    useEffect(() => {
        if (postSaveData.length > 0) {
            setIsLoading(false);
        } else {
            const fetchData = async () => {
                try {
                    const PostResponse = await axios.get(`${baseURL}/v1/board/investment/post`, { headers, params });
                    const data = PostResponse.data?.query;
                    console.log('investPostResponse',data);
                    /* setInvestOngoingPostData(data); */
                    dispatch(setOngoingPostData(data));
                    /* setIsLoading(false); */
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 1000); 
                } catch (error) {
                    console.error('investOngoingBoardData 데이터 가져오기 실패', error);
                    setIsLoading(false);
                }
            }
            fetchData();
        }
        
    },[])

    
    /* const businessNums = investOngoingPostData?.map(item => item.businessNum); */

    /* console.log('businessNums',businessNums); */

    /*-----------------------------------------------*\
                        End Date
    \*-----------------------------------------------*/
    const formattedDates = Array.isArray(postSaveData) && postSaveData.length > 0 &&
    postSaveData
    /* .filter(item => item && item.condition === 'ongoing') */
    .map((item, index) => {
        if (postSaveData?.[index].endDt?.length > 0 ) {
            const endDt = new Date(item.endDt);
            const currentDt = new Date();
            const timeDiff = endDt - currentDt;
            const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

            if ( daysDiff < 0 ) {
                return `😨마감일 초과`
            } else {
                return `D-${daysDiff}`
            }
        } else {
            return `empty`
        }
        
    });

    const removeTags = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const decodedString = doc.body.textContent || "";
        return decodedString
    };
    
    /*-----------------------------------------------*\
                    Console.log 테스트
    \*-----------------------------------------------*/
    /* console.log('formattedDates',formattedDates); */
    /* console.log('investOngoingPostData',investOngoingPostData); */
    /* console.log('koreanCategory',koreanCategory); */
    return (
        <React.Fragment>
            <Header/>
            <StyledFrame>
                    <BoardWrap>
                        <DummyBanner>
                            <div>
                                당신의 돈, 당신의 선택.<br />
                                WhoFin에서는 혁신적인 투자 경험을 제공합니다.<br />
                                풍부한 지식과 투자 경험을 통해 우리는 함께 성장하고, 더 나은 미래를 향해 나아갑니다. <br />
                                지금 당신의 투자 여정을 시작하세요.
                            </div>
                            <div className='leftBox'>
                                <VisualImg />
                            </div>
                        </DummyBanner>
                        {isLoading && <Loading/>}
                        {!isLoading && (
                            <>
                                {postSaveData !== null && postSaveData !== "" && postSaveData.length ? 
                                <div>
                                    <PostCardTitleWrap>
                                    <h3>진행 중인 투자</h3>
                                    </PostCardTitleWrap>
                                    <PostCardWrap>
                                    {postSaveData &&
                                        postSaveData?.length > 0 &&
                                        postSaveData?.slice(0, PostCardCount).map((item, index) => (
                                        <Link key={index} to={
                                            `/investment/ongoing/${item.id}`
                                        }>
                                            <OngoingPostCard
                                                key={index}
                                                logoimg={item.logoImg}
                                                name={item.companyName}
                                                title={item.title}
                                                content={removeTags(item.content)}
                                                category={item.category}
                                                date={formattedDates[index]}
                                            />
                                        </Link>
                                    ))}
                                    </PostCardWrap>
                                    <MoreWrap>
                                        {postSaveData?.length > PostCardCount && (
                                            <div style={{marginTop:'80px'}}>
                                                <MoreBtn onClick={handleLoadMore}>
                                                    <span>더보기</span>
                                                </MoreBtn>
                                            </div>
                                        )}
                                    </MoreWrap>
                                </div> : <div style={{color:'rgb(85,85,85)',height:'200px',display:'flex',justifyContent:'center',alignItems:'center'}}>진행 중인 투자가 없습니다.</div>}
                            </>
                        )}
                    </BoardWrap>
            </StyledFrame>
            <Footer/>
        </React.Fragment>
    );
};

export default InvestOngoingBoard;
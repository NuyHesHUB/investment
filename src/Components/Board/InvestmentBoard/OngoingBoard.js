import React, { useEffect, useState } from 'react';

/* React-Router-Dom */
import { Link } from 'react-router-dom';

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

/* Effect */
import Loading from '../../../Effect/Loading';

const InvestOngoingBoard = () => {

    /* Basic */
    const baseURL = process.env.REACT_APP_BASEURL;
    const accessToken = sessionStorage.getItem('accessToken');
    const userUid = sessionStorage.getItem('userUid');
    const uid = userUid === null ? '' : userUid
    const headers = {
        Authorization: `${accessToken}`
    };
    
    const dispatch = useDispatch();
    const PostCardCount = useSelector((state) => state.reducer.ongoingPostcardCount
    );

    /* const [investOngoingPostData, setInvestOngoingPostData] = useState(null); */

    const [isLoading, setIsLoading] = useState(true);
    const [pageRows, setPageRows] = useState(3);
    const params = {
        pageRows,
        page : 1,
        category : '',
        status : '',
        condition :'ongoing',
    };
    /* const [totalLength, setTotalLength] = useState(null); */

    const postSaveData = useSelector((state) => state.reducer.ongoingPostData);
    console.log('postSaveData',postSaveData);

    /*-----------------------------------------------*\
                  PostCard 더보기 전역상태관리
    \*-----------------------------------------------*/
    /* useEffect(() => {
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

    }, [PostCardCount]); */

    /* const handleLoadMore = () => {
        const updatedNumPostsToShow = PostCardCount + 3;
        dispatch(setOngoingPostCardCount(updatedNumPostsToShow));
    }; */

    const handleLoadMore = () => {
        const updatedRows = pageRows + 3;
        setPageRows(updatedRows);
    
        const updatedParams = {
            ...params,
            pageRows: updatedRows,
        };
    
        dispatch(setOngoingPostCardCount(updatedRows * 3)); // Update the total count
    
        const fetchData = async () => {
            try {
                const PostResponse = await axios.get(`${baseURL}/v1/board/investment/post`, { headers, params: updatedParams });
                const data = PostResponse.data?.query;
                
                /* console.log('investPostResponse',data); */
                dispatch(setOngoingPostData(data));
                setIsLoading(false);
            } catch (error) {
                console.error('investOngoingBoardData 데이터 가져오기 실패', error);
                setIsLoading(false);
            }
        };
    
        fetchData();
    };

    /*-----------------------------------------------*\
                        page log
    \*-----------------------------------------------*/
    // useEffect(() => {
    //     axios.post(`${baseURL}/v1/log/movement/form`, {  userUid: uid, "page":"진행중" }).then((res) => {
    // }).catch((error) => {
    //     console.error(error)
    // })
    // }, []);

    // console.log(uid, "userUid")
  
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
                    const lenthData = PostResponse.data?.totalRows;
                    console.log('lenthData',lenthData);
                    console.log('investPostResponse',data);
                    /* setTotalLength(lenthData); */
                    dispatch(setOngoingPostCardCount(lenthData));
                    dispatch(setOngoingPostData(data));
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 800); 
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
    console.log('totalLength',PostCardCount);
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
                                    {postSaveData.length < PostCardCount && (
                                        <MoreWrap>
                                            <div style={{ marginTop: '80px' }}>
                                                <MoreBtn onClick={handleLoadMore}>
                                                    <span>더보기</span>
                                                </MoreBtn>
                                            </div>
                                        </MoreWrap>
                                    )}

                                    {/* <MoreWrap>
                                        <div style={{marginTop:'80px'}}>
                                            <MoreBtn onClick={handleLoadMore}>
                                                <span>더보기</span>
                                            </MoreBtn>
                                        </div>
                                    </MoreWrap> */}

                                    {/* <MoreWrap>
                                        {postSaveData?.length > PostCardCount && (
                                            <div style={{marginTop:'80px'}}>
                                                <MoreBtn onClick={handleLoadMore}>
                                                    <span>더보기</span>
                                                </MoreBtn>
                                            </div>
                                        )}
                                    </MoreWrap> */}
                                    
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
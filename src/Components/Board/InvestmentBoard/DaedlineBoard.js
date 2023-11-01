import React, { useEffect, useState } from 'react';

/* React-Router-Dom */
/* import { Link } from 'react-router-dom'; */

/* Axios */
import axios from 'axios';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { setDeadlinePostCardCount, setDeadlinePostData, setDeadlineTotalRows, setDeadlineViewRows } from '../../../store/actions/actions';

/* Components */
import Header from '../../Header';
import Footer from '../../Footer';
import DeadlinePostCard from './DeadlinePostCard';

/* Styled-Components */
import { StyledFrame } from '../../StyledComponents/StyledHome';
import { BoardWrap, DummyBanner, PostCardTitleWrap, PostCardWrap, MoreWrap, MoreBtn } from './StyledOngoingBoard';

/* img */
import { ReactComponent as VisualImg } from './VisualImg.svg';
/* Log */
import PageLog from '../../../Hook/PageLog'

/* Effect */
import Loading from '../../../Effect/Loading';

const InvestDeadlineBoard = () => {

    /* Basic */
    const baseURL = process.env.REACT_APP_BASEURL;
    const accessToken = sessionStorage.getItem('accessToken');
    const userUid = sessionStorage.getItem('userUid');
    const uid = userUid === null ? '' : userUid
    const headers = {
        Authorization: `${accessToken}`
    };
    
    const dispatch = useDispatch();

    /* const [investDeadlinePostData, setInvestDeadlinePostData] = useState(null); */
    
    const [isLoading, setIsLoading] = useState(true);

    const postData = useSelector((state) => state.reducer.deadlinePostData);
    const totalRows = useSelector((state) => state.reducer.deadlineTotalRows);
    const viewRows = useSelector((state) => state.reducer.deadlineViewRows);

    const params = {
        pageRows : viewRows,
        page : 1,
        category : '',
        status : '',
        condition :'deadline',
    };

    /*-----------------------------------------------*\
                        page log
    \*-----------------------------------------------*/
    // PageLog("마감");

    /*-----------------------------------------------*\
                  investment post 데이터 API
    \*-----------------------------------------------*/
    useEffect(() => {
        if (postData.length > 0) {
            setIsLoading(false);
        } else {
            const fetchData = async () => {
                try { 
                    const PostResponse = await axios.get(`${baseURL}/v1/board/investment/post`, { headers, params });
                    const data = PostResponse.data?.query;
                    const totalRowsData = PostResponse.data?.totalRows;
                    dispatch(setDeadlineTotalRows(totalRowsData));
                    dispatch(setDeadlinePostData(data));
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 800);
                } catch (error) {
                    console.error('investDeadlineBoardData 데이터 가져오기 실패', error);
                    setIsLoading(false);
                }
            }
            fetchData();
        }

    },[])

    /*-----------------------------------------------*\
                        More Btn
    \*-----------------------------------------------*/
    /* const handleLoadMore = async (e) => {
        e.preventDefault();
        const moreRows = viewRows + 3;
        if (moreRows <= totalRows) {
            dispatch(setDeadlineViewRows(moreRows));
            const updatedParams = {
                ...params,
                pageRows: moreRows,
            };
            const fetchData = async () => {
                try {
                    const PostResponse = await axios.get(`${baseURL}/v1/board/investment/post`, { headers, params: updatedParams });
                    const data = PostResponse.data?.query;
                    dispatch(setDeadlinePostData(data));
                    setIsLoading(false);
                } catch (error) {
                    console.error('investDeadlineBoardData 데이터 가져오기 실패', error);
                    setIsLoading(false);
                }
            };
            fetchData();
        } else {
            console.log('더 이상 데이터가 없습니다.');
        }
    } */
    const handleLoadMore = async (e) => {
        e.preventDefault();
        const moreRows = viewRows + 3;
        const updatedParams = {
            ...params,
            pageRows: moreRows,
        }
        try {
            const PostResponse = await axios.get(`${baseURL}/v1/board/investment/post`, { headers, params: updatedParams });
            const data = PostResponse.data?.query;
            if ( data.length > 0 ) {
                dispatch(setDeadlineViewRows(moreRows));
                dispatch(setDeadlinePostData(data));
            } else {
                console.log('더 이상 데이터가 없습니다.');
            }
            setIsLoading(false);
        } catch (error) {
            console.error('investDeadlineBoardData 데이터 가져오기 실패', error);
            setIsLoading(false);
        }
    };

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
                                {postData !== null && postData !== "" && postData.length ?
                                <div>
                                    <PostCardTitleWrap>
                                    <h3>마감된 투자</h3>
                                    </PostCardTitleWrap>
                                    <PostCardWrap>
                                    {postData && 
                                        postData?.length > 0 &&
                                        postData?.map((item, index) => (
                                        <div key={index}>
                                            <DeadlinePostCard
                                                    key={index}
                                                    logoimg={item.logoImg}
                                                    name={item.companyName}
                                                    title={item.title}
                                                    /* content={removeTags(item.content)} */
                                                    category={item.category}
                                                    /* date={formattedDates[index]} */
                                            />
                                        </div>
                                    ))}
                                    </PostCardWrap>
                                    {!(viewRows >= totalRows) && (
                                        <MoreWrap>
                                            <div style={{ marginTop: '80px' }}>
                                                <MoreBtn onClick={handleLoadMore}>
                                                    <span>더보기</span>
                                                </MoreBtn>
                                            </div>
                                        </MoreWrap>
                                    )}
                                </div> : <div style={{color:'rgb(85,85,85)',height:'200px',display:'flex',justifyContent:'center',alignItems:'center'}}>마감된 투자가 없습니다.</div>}
                            </>
                        )}
                    </BoardWrap>
            </StyledFrame>
            <Footer/>
        </React.Fragment>
    );
};

export default InvestDeadlineBoard;
import React, { useEffect, useState } from 'react';
import Header from '../../Header';
import Footer from '../../Footer';
import { StyledFrame } from '../../StyledComponents/StyledHome';
import { BoardWrap, DummyBanner, PostCardTitleWrap, PostCardWrap, MoreWrap, MoreBtn } from './StyledOngoingBoard';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setDeadlinePostCardCount } from '../../../store/actions/actions';
import { Link } from 'react-router-dom';
import OngoingPostCard from './OngoingPostCard';
/* img */
import { ReactComponent as VisualImg } from './VisualImg.svg';

const InvestDeadlineBoard = () => {
    /* Basic */
    const baseURL = process.env.REACT_APP_BASEURL;
    const accessToken = sessionStorage.getItem('accessToken');
    const userUid = sessionStorage.getItem('userUid');
    const headers = {
        Authorization: `${accessToken}`
    };
    const params = {
        pageRows : '',
        page : '',
        category : '',
        status : '',
        condition :'deadline',
    };
    const dispatch = useDispatch();

    const [investDeadlinePostData, setInvestDeadlinePostData] = useState(null);
    const PostCardCount = useSelector((state) => state.reducer.deadlinePostcardCount);

    useEffect(() => {
        const handlePopState = () => {
            const state = window.history.state;
            if (state) {
                const updatedNumPostsToShow = state.PostCardCount || PostCardCount;
                dispatch(setDeadlinePostCardCount(updatedNumPostsToShow));
            }
    };
        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };

    }, [PostCardCount]);

    const handleLoadMore = () => {
        const updatedNumPostsToShow = PostCardCount + 6;
        dispatch(setDeadlinePostCardCount(updatedNumPostsToShow));
    };

    /*-----------------------------------------------*\
                        page log
    \*-----------------------------------------------*/
    useEffect(() => {
        axios.post(`${baseURL}/v1/log/movement/form`, { userUid:userUid, "page":"마감" }).then((res) => {
    }).catch((error) => {
        console.error(error)
    })
    }, []);

    /*-----------------------------------------------*\
                  investment post 데이터 API
    \*-----------------------------------------------*/
    useEffect(() => {
        const fetchData = async () => {
            try { 
                const PostResponse = await axios.get(`${baseURL}/v1/board/investment/post`, { headers, params });
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
                    {investDeadlinePostData !== null && investDeadlinePostData !== "" ?
                    <div>
                        <PostCardTitleWrap>
                        <h3>마감된 투자</h3>
                        </PostCardTitleWrap>
                        <PostCardWrap>
                        {investDeadlinePostData && 
                            investDeadlinePostData?.length > 0 &&
                            investDeadlinePostData?.slice(0, PostCardCount).map((item, index) => (
                            <Link key={index} to={
                                `/investment/deadline/${item.id}`
                            }>
                                <OngoingPostCard
                                        key={index}
                                        logoimg={item.logoImg}
                                        name={item.companyName}
                                        title={item.title}
                                        /* content={removeTags(item.content)} */
                                        category={item.category}
                                        /* date={formattedDates[index]} */
                                />
                            </Link>
                        ))}
                        </PostCardWrap>
                        <MoreWrap>
                            {investDeadlinePostData?.length > PostCardCount && (
                                <div style={{marginTop:'80px'}}>
                                    <MoreBtn onClick={handleLoadMore}>
                                        <span>더보기</span>
                                    </MoreBtn>
                                </div>
                            )}
                        </MoreWrap>
                    </div> : <div style={{color:'rgb(85,85,85)',height:'200px',display:'flex',justifyContent:'center',alignItems:'center'}}>오류가 발생했습니다.</div>}
                </BoardWrap>
            <Footer/>
        </StyledFrame>
    );
};

export default InvestDeadlineBoard;
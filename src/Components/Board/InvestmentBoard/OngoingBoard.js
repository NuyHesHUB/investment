import React, { useEffect, useState } from 'react';

/* React-Router-Dom */
import { Link, useNavigate } from 'react-router-dom';

/* Axios */
import axios from 'axios';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { setOngoingPostCardCount } from '../../../store/actions/actions';

/* Components */
import Header from '../../Header';
import Footer from '../../Footer';
import OngoingPostCard from './OngoingPostCard';

/* Styled-Components */
import { StyledFrame } from '../../StyledComponents/StyledHome';
import { BoardWrap, DummyBanner, PostCardTitleWrap, PostCardWrap, MoreWrap, MoreBtn } from './StyledOngoingBoard';

/* img */
import { ReactComponent as VisualImg } from './VisualImg.svg';

const InvestOngoingBoard = () => {
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
    useEffect(() => {
        axios.post(`${baseURL}/v1/log/movement/form`, {  userUid: uid, "page":"진행중" }).then((res) => {
    }).catch((error) => {
        console.error(error)
    })
    }, []);

    console.log(uid, "userUid")
  
    /*-----------------------------------------------*\
                  investment post 데이터 API
    \*-----------------------------------------------*/
    useEffect(() => {
        const fetchData = async () => {
            try {
                /* const PostResponse = await axios.get(`${baseURL}/v1/board/investment/post?query&pageRows=&page=&category=&status=&condition=`, { headers }); */
                const PostResponse = await axios.get(`${baseURL}/v1/board/investment/post`, { headers, params });
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

    
    /* const businessNums = investOngoingPostData?.map(item => item.businessNum); */

    /* console.log('businessNums',businessNums); */


    /*-----------------------------------------------*\
                        End Date
    \*-----------------------------------------------*/
    const formattedDates = Array.isArray(investOngoingPostData) && investOngoingPostData.length > 0 &&
    investOngoingPostData
    /* .filter(item => item && item.condition === 'ongoing') */
    .map((item, index) => {
        if (investOngoingPostData?.[index].endDt?.length > 0 ) {
            const endDt = new Date(item.endDt);
            const currentDt = new Date();
            const timeDiff = endDt - currentDt;
            const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

            return `D-${daysDiff}`
        } else {
            return `empty`
        }
        
    });

    /* const removeTags = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    }; */

    const removeTags = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const decodedString = doc.body.textContent || "";
        return decodedString
      };
    
    /* const removeTags = (html) => {
        return html.replace(/<\/?[^>]+(>|$)/g, "");
      }; */
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
                        {investOngoingPostData !== null && investOngoingPostData !== "" ? 
                        <div>
                            <PostCardTitleWrap>
                            <h3>진행 중인 투자</h3>
                            </PostCardTitleWrap>
                            <PostCardWrap>
                            {investOngoingPostData &&
                                investOngoingPostData?.length > 0 &&
                                investOngoingPostData?.slice(0, PostCardCount).map((item, index) => (
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
                                {investOngoingPostData?.length > PostCardCount && (
                                    <div style={{marginTop:'80px'}}>
                                        <MoreBtn onClick={handleLoadMore}>
                                            <span>더보기</span>
                                        </MoreBtn>
                                    </div>
                                )}
                            </MoreWrap>
                        </div> : <div style={{color:'rgb(85,85,85)',height:'200px',display:'flex',justifyContent:'center',alignItems:'center'}}>오류가 발생했습니다.</div>}
                    </BoardWrap>
            </StyledFrame>
            <Footer/>
        </React.Fragment>
    );
};

export default InvestOngoingBoard;
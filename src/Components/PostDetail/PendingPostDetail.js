/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

/* React-Router-Dom */
import { useNavigate, useParams } from 'react-router-dom';

/* Redux */
import { useSelector } from 'react-redux';

/* Axios */
import axios from 'axios';

/* React-Icons */
import { AiOutlineHeart } from 'react-icons/ai';
import { VscThumbsup, VscThumbsdown } from 'react-icons/vsc';
import { LuReply } from 'react-icons/lu';

/* Js-cookie */
import Cookies from 'js-cookie';

/* Components */
import Header from '../Header';
import Footer from '../Footer';
import CommentInput from '../InputGroup/CommentInput';


/* Styled-Components */
import {  
    PostMain, 

    PostDetailFrame, 
    PostDetailContainer, 
    PostDetailTitleBox, 
    PostDetailTitleWrap, 
    LeftTitleBox, 
    CompanyLogo,
    RightTitleBox, 
    RightTitleTopBox, 
    RightTitleCenterBox, 
    RightTitleBottomBox, 
    RightTitleBottomLeftBox, 
    RightTitleBottomRightBox, 
    PostDetailInformationBox, 
    PostDetailInformationWrap,
    PostDetailInformationTitleBox, 
    PostDetailInformationFrame, 
    PostDetailLeftInformationBox, 
    InfoBox, 
    
    PostDetailContentsBox,
    TabMenu,
    TabMenuItem,
    
    ApproveButton,

    Pagination,
    PaginationButton,

} from './StyledPendingPostDetail';

/* React-Scroll */
import { Link, scroller } from 'react-scroll';

/* image */
import defaultLogo from '../../assets/default-image/company-default-img.png';

const PostDetail = () => {
    
    /* useNavigate */
    const navigate = useNavigate();

    /* React-Scroll 헤더높이값 */
    const headerHeight = 120;

    /* Basic */
    const baseURL = process.env.REACT_APP_BASEURL;
    const userUid = sessionStorage.getItem('userUid');
    const uid = userUid === null ? '' : userUid
    const accessToken = sessionStorage.getItem('accessToken');
    const headers = {
        Authorization: `${accessToken}`
    };

    /* useParams */
    const { id } = useParams();
    const { key } = useParams();

    /*-----------------------------------------------*\
                        page log
    \*-----------------------------------------------*/
    useEffect(() => {
        axios.post(`${baseURL}/v1/log/movement/form`, { userUid: uid, "page":`pending상세페이지 boardPostId:${id}` }).then((res) => {
    }).catch((error) => {
        console.error(error)
    })
    }, []);
    

    /* 게시글 데이터 */
    const [postData, setPostData] = useState([]);

    const postList = postData?.[0];

    const postEndDt = postList?.endDt;

    const postLikeType = postList?.boardLikeType;

    const likeList = postData?.[0]?.like;

    /* 보류 */
    const viewsList = postData?.[0]?.extraField;
    
    const [likeData, setLikeData] = useState(likeList);

    /* 댓글 데이터 */
    const [comments, setComments] = useState([]);
    /* const [updatedComments, setUpdatedComments] = useState([]); */

    /* 답글 데이터 */
    const [replyData, setReplyData] = useState(null);

    /* 댓글 위치 ID추적 Index */
    const [activeCommentIndex, setActiveCommentIndex] = useState(null);
    const [activeReplyIndex, setActiveReplyIndex] = useState(null);

    /* TabMenu */
    const [currentTab, setCurrentTab] = useState(0);
    const [showCommentTab, setShowCommentTab] = useState(false);

    /* 댓글 수정 TabMenu */
    const [showCommentEditTab, setShowCommentEditTab] = useState(false);



    /*-----------------------------------------------------*\
                            게시물 좋아요
    \*-----------------------------------------------------*/
    const handleLike = async (liketype) => {
        console.log('liketype',liketype);
        try {
            const response =await axios.post(`${baseURL}/v1/board/like`, {
                boardPostId: id,
                type: liketype === postLikeType  ? "D" : liketype,
                userUid: userUid
            }, { headers });
            const updatedLikeCount = response?.data.query[0].like;
            setLikeData(updatedLikeCount);

            await fetchPost();

        } catch (error) {
            if (error.response && error.response.data && error.response.data.error === '사용자 로그인 정보가 유효하지 않습니다.') {
                    alert('로그인이 필요합니다.');
                    navigate('/login');
            } else {
                console.error(`게시물 좋아요 실패`, error);
            }
        }
    };

    useEffect(() => {
        setLikeData(likeList);
      }, [likeList]);


    

    const fetchPost = () => {
        axios.get(`${baseURL}/v1/board/approval/${key}/post/${id}`,{
                headers, withCredentials: true })
                .then(response => {
                    const loginPostResdata = response?.data?.query;
                    setPostData(loginPostResdata);
                })
                .catch(error => {
                    console.error('포스트 정보 가져오기 실패', error);
                });
    };


    /*-----------------------------------------------------*\
            로그인 & 비로그인에 따라 게시글 정보 GET API
    \*-----------------------------------------------------*/
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userUid) {
                    const postDataResponse = await axios.get(`${baseURL}/v1/board/investment/post/${id}`, { headers, withCredentials: true });
                    const loginPostResdata = postDataResponse.data?.query;
                    setPostData(loginPostResdata);

                } else {
                    const postDataResponse = await axios.get(`${baseURL}/v1/board/investment/post/${id}/unlogin`, { withCredentials: true });
                    const unLoginPostResdata = postDataResponse.data?.query;
                    setPostData(unLoginPostResdata);
                }
    
                const commentDataResponse = await axios.get(`${baseURL}/v1/board/investment/post/${id}/comments?status=Y&query&pageRows=&page=1&userUid=${userUid}`, { headers });
                const commentData = commentDataResponse.data.query;
                setComments(commentData);

            } catch (error) {
                console.error('데이터 가져오기 실패', error);
            }
        };

        fetchData();

    }, []);
    
    console.log('기본 comment', comments);
    console.log('기본 post', postData);
 
    /*-----------------------------------------------------*\
                      D-Day 시간데이터 변환
    \*-----------------------------------------------------*/
    const calculateEndDate = (postEndDt) => {
        if (postEndDt?.length > 0) {
            const endDt = new Date(postEndDt);
            const currentDt = new Date();
    
            const timeDiff = endDt - currentDt;
            const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
            return <p>D-{daysDiff}</p>

        } else {
            return <p style={{color:'rgb(85,85,85)', fontSize:'14px'}}>empty</p>;
        }
    }
    console.log('postEndDt',postEndDt);

    const PostformatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}년 ${month}월 ${day}일`;
    }
    const formattedDate = PostformatDate(postEndDt);

    /* console.log('calculateEndDate',calculateEndDate); */

    /* const handleResponse = (response) => {
        const setCookieHeader = response.headers['Set-Cookie'];
        console.log('setCookieHeader',setCookieHeader);
        if (setCookieHeader) {
          const cookieValue = setCookieHeader[0].split(';')[0];
          document.cookie = cookieValue;
          console.log('쿠키가 저장되었습니다:', cookieValue);
    
          localStorage.setItem('myCookie', cookieValue);
          console.log('쿠키가 로컬 스토리지에 저장되었습니다.');
        }
      } */

      /* const setCookieFromResponse = (cookieHeader) => {
        const cookiesArray = cookieHeader.split(';'); 
        cookiesArray.forEach(cookieString => {
          const cookieParts = cookieString.split('=');
          const cookieName = cookieParts[0].trim();
          const cookieValue = cookieParts[1];
      
          document.cookie = `${cookieName}=${cookieValue}; path=/`;
        });
      }; */

    

    /*-----------------------------------------------------*\
                      상새 내용 & 문의 TabMenu
    \*-----------------------------------------------------*/
    const selectMenuHandler = (index) => {
        setCurrentTab(index);
        /* console.log('currentTab',currentTab); */
    };

    const menuArr = [
        { name: '상세 내용', content: (
            <div>
                {postData.map((item, index) => (
                        <div key={index}>
                            <p>id : {item.id}</p>
                            <p>num : {item.num}</p>
                            <p>status : {item.status}</p>
                            <p>type : {item.type}</p>
                            <p>brdKey : {item.brdKey}</p>
                            <p>category : {item.category}</p>
                            <p>title : {item.title}</p>
                            <p>content : {item.content}</p>
                            <p>post_view_count : {item.post_view_count}</p>
                            <p>comment_count : {item.comment_count}</p>
                            <p>like : {item.like}</p>
                            <p>dislike : {item.dislike}</p>
                            <p>isSecret : {item.isSecret}</p>
                            <p>thumbnail : {item.thumbnail}</p>
                            <p>nickname : {item.nickname}</p>
                            <div dangerouslySetInnerHTML={{ __html: item.content }} />
                            
                        </div>
                ))}
                
            </div>
        ) },
        
    ];
    
   /*  const cookieValue = 'j%3A%5B%2210%22%5D; Path=/';
    document.cookie = `board_post=${cookieValue}`; */

    /*-----------------------------------------------------*\
                          React-Scroll 기능
    \*-----------------------------------------------------*/
    const scrollToSection = (e) => {
        e.preventDefault();
        selectMenuHandler(1); 
        scroller.scrollTo('inquiry', {
            smooth: true,
            duration: 500,
            offset: -headerHeight
        }); 
    };
    
    /*-----------------------------------------------*\
                        승인 버튼
    \*-----------------------------------------------*/
    const approveBtnClick = async () => {
        if (window.confirm("승인하시겠습니까?")) {
            await axios.post(`${baseURL}/v1/board/approval`, {
                "boardPostId": id,
                "condition": "ongoing",
                "status" : "Y"
            }, { headers }).then((res) => {
                alert("승인되었습니다.")
                navigate(`/admin/post_approve`)
            }).catch((error) => {
                console.error(error)
                alert("error")
            })
        }
    }

    /*-----------------------------------------------*\
                    Console.log 테스트
    \*-----------------------------------------------*/
    /* console.log('condition',condition); */
    /* console.log('id',id); */
    /* console.log('postData',postData); */
    /* console.log('likeList',postList); */
    return (
        <div>
            <Header/>
                <PostDetailFrame>
                    <PostDetailContainer>
                        <PostDetailTitleBox>
                            <PostDetailTitleWrap>
                                <LeftTitleBox>
                                    {
                                        postList?.logoImg !== null && postList?.logoImg !== "" ?
                                            <CompanyLogo src={postList?.logoImg} alt={`${postList?.companyName}로고 이미지`}/> :
                                            <CompanyLogo src={defaultLogo} alt="Default Company Image"/>
                                    }
                                </LeftTitleBox>
                                <RightTitleBox>
                                    <RightTitleTopBox>
                                        <div className='category'>{postList?.category}</div>
                                    </RightTitleTopBox>
                                    <RightTitleCenterBox>
                                            {
                                                postList?.companyName !== null && postList?.companyName !== "" ?
                                                    <h2>{postList?.companyName}</h2> : 
                                                    <h2>...</h2>
                                            }
                                    </RightTitleCenterBox>
                                    <RightTitleBottomBox>
                                        <RightTitleBottomLeftBox>
                                            {
                                                postList?.introduction !== null && postList?.introduction !== ""?
                                                <>{postList?.introduction}</> :
                                                <>회사소개가 없습니다.</>
                                            }
                                        </RightTitleBottomLeftBox>
                                        <RightTitleBottomRightBox>
                                            <AiOutlineHeart
                                                style={{
                                                    color: postLikeType === "like" ? "red" : ""
                                                }}
                                            />
                                            {/* 좋아요 {postList?.like}명 */}
                                            좋아요 {likeData}명
                                        </RightTitleBottomRightBox>
                                    </RightTitleBottomBox>
                                </RightTitleBox>
                            </PostDetailTitleWrap>
                        </PostDetailTitleBox>

                        <PostDetailInformationBox>
                            <PostDetailInformationWrap>
                                <PostDetailInformationTitleBox>정보</PostDetailInformationTitleBox>
                                <PostDetailInformationFrame>

                                    <PostDetailLeftInformationBox>
                                        <div style={{display:'flex'}}>
                                            <InfoBox style={{marginRight:'50px'}}>
                                                <label>정보</label>
                                                <div>정보정보정보정보정보정보정보정보정보정보정보정보</div>
                                            </InfoBox>
                                            <InfoBox>
                                                <label style={{width:'120px'}}>투자 희망 금액</label>
                                                <div>100,000,000 원</div>
                                            </InfoBox>
                                        </div>
                                        <div>
                                            <InfoBox>
                                                <label>연락처</label>
                                                <div>
                                                    010-1234-1234
                                                </div>
                                            </InfoBox>
                                            <InfoBox style={{marginBottom:'0'}}>
                                                <label>이메일</label>
                                                <div>
                                                    otz4193@naver.com
                                                </div>
                                            </InfoBox>
                                        </div>
                                    </PostDetailLeftInformationBox>

                                </PostDetailInformationFrame>
                            </PostDetailInformationWrap>
                        </PostDetailInformationBox>

                        <PostDetailContentsBox>
                            <TabMenu id='inquiry'>
                                {menuArr.map((el,index) => (
                                    <TabMenuItem 
                                        key={index} 
                                        className={index === currentTab ? 
                                            "submenu focused" : "submenu" }
                                        onClick={() => selectMenuHandler(index)}>{el.name}
                                    </TabMenuItem>
                                    ))}
                            </TabMenu>
                            {menuArr[currentTab].content}
                        </PostDetailContentsBox>
                    </PostDetailContainer>
                </PostDetailFrame>
                    <ApproveButton>
                        <button
                            className='approve-btn'
                            onClick={() => approveBtnClick()}
                        >
                            승인하기
                        </button>
                    </ApproveButton>
            <Footer/>
        </div>
    );
};

export default PostDetail;
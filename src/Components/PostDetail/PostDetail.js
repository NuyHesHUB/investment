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
    PostDetailRightInformationBox, 
    RightInfoTopBox, 
    RightInfoTopLeftBox, 
    RightInfoBottomBox, 
    LikeBox, 
    InquiryBox,
    PostDetailContentsBox,
    TabMenu,
    TabMenuItem,

    CommentWrap,
    CommentFrame,
    CommentBox,
    CommentTopBox,
    CommentTopLeftBox,
    CommentTopRightBox,

    CommentLikeBox,

    CommentCenterBox,

    CommentBottomBox,

    ReplyBox,

    ReplyLeftWrap,

    ReplyRightWrap,

    Pagination,
    PaginationButton,

} from './StyledPostDetail';

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

    /*-----------------------------------------------*\
                        page log
    \*-----------------------------------------------*/
    useEffect(() => {
        axios.post(`${baseURL}/v1/log/movement/form`, { userUid: uid, "page":`진행중상세페이지 boardPostId:${id}` }).then((res) => {
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


    /*-----------------------------------------------------*\
                  일반 댓글의 답글입력 아코디언기능
    \*-----------------------------------------------------*/
    const handleCommentBtnClick = (index, commentId) => {
        setActiveCommentIndex(index);
        setShowCommentTab(!showCommentTab)
        setReplyData(commentId);
        setShowCommentEditTab(false); 
        console.log('showCommentTab',showCommentTab);
        /* console.log(`댓글 ID: ${commentId}가 클릭되었습니다. 해당 댓글의 index는 ${index}입니다.`); */
    };

    const handleCommentEditBtnClick = (index) => {
        setActiveCommentIndex(index);
        setShowCommentEditTab(!showCommentEditTab)
        setShowCommentTab(false);
        console.log('showCommentEditTab',showCommentEditTab);
        /* console.log(`댓글 ID: ${commentId}가 클릭되었습니다. 해당 댓글의 index는 ${index}입니다.`); */
    }

    const handlePostEditComment = (editedComment, commentId, commentIndex) => {
        console.log('editedComment',editedComment);
        console.log('commentId',commentId);
        console.log('commentIndex',commentIndex);
        axios.patch(`${baseURL}/v1/board/investment/post/${id}/comments/${commentId}`, {
            status: "Y",
            content: editedComment,
            isSecret : "N"
        }, { headers })
        .then(response => {
            console.log('댓글 업데이트 성공', response);
            fetchComments();
            setShowCommentEditTab(!showCommentEditTab)
        })
        .catch (error => {
            console.error('댓글 업데이트 실패', error);
        })
    };

    const handleDeleteComment = (commentIndex, commentId) => {
        const confirmDelete = window.confirm(`${commentId} 이 댓글을 삭제하시겠습니까?`);
        /* console.log('commentId',commentId); */
        /* console.log('commentIndex',commentIndex); */
        if (confirmDelete) {
            axios.delete(`${baseURL}/v1/board/investment/post/${id}/comments/${commentId}`, { headers })
            .then(response => {
                console.log('댓글 삭제 성공', response);
                fetchComments();
            })
            .catch (error => {
                console.error('댓글 삭제 실패', error);
            })
        };
    };
    /*-----------------------------------------------------*\
                      댓글 좋아요 & 싫어요 기능
    \*-----------------------------------------------------*/
    const handleCommentLikeBtnClick = async (index, commentId, type) => {
        setActiveCommentIndex(index);
        console.log(`댓글 ID: ${commentId}가 클릭되었습니다. 해당 댓글의 index는 ${index}입니다. 타입은 ${type}`);
    
        try {
            const response = await axios.post(`${baseURL}/v1/board/like`, {
                boardPostId: commentId,
                type: type === comments[index].type ? "D" : type,
                userUid: userUid
            }, { headers });
    
            setComments(prevComments => {
                const updatedComments = [...prevComments];
                updatedComments[index].like = response?.data.query[0].like;
                updatedComments[index].dislike = response?.data.query[0].dislike;
                return updatedComments;
            });
    
            await fetchComments();

        } catch (error) {
            console.error('좋아요 기능 실패', error);
        }
    };
    
    const fetchComments = () => {
        axios.get(`${baseURL}/v1/board/investment/post/${id}/comments?status=Y&query&pageRows=&page=1&userUid=${userUid}`, { headers })
          .then(response => {
            const commentData = response.data.query;
            setComments(commentData);
          })
          .catch(error => {
            console.error('댓글 목록 가져오기 실패', error);
          });
    };

    const fetchPost = () => {
        axios.get(`${baseURL}/v1/board/investment/post/${id}`,{
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
                  댓글의 답글 좋아요 & 싫어요 기능
    \*-----------------------------------------------------*/
    const handleReplyLikeBtnClick = async (replyIndex, replyId, index, type) => {
        setActiveReplyIndex(replyIndex);
        console.log(`댓글 ID: ${replyId}가 클릭되었습니다. 해당 댓글의 index는 ${index}입니다. 타입은 ${type}`);
        try {
            const response = await axios.post(`${baseURL}/v1/board/like`, {
                boardPostId: replyId,
                type: type === comments[replyIndex].type ? "D" : type,
                userUid: userUid
            },{ headers });

            setComments(prevComments => {
                const updatedComments = [...prevComments];
                const parentCommentIndex = updatedComments.findIndex(comment => comment.id === replyId);
                if (parentCommentIndex !== -1) {
                    updatedComments[parentCommentIndex].like = response?.data.query[0].like;
                    updatedComments[parentCommentIndex].dislike = response?.data.query[0].like;
                }
                return updatedComments;
            });

            await fetchComments();

        } catch (error) {
            console.error('좋아요 기능 실패', error);
        }
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
                        댓글 시간데이터 변환
    \*-----------------------------------------------------*/
    const formatDate = (isoDateString) => {
        const date = new Date(isoDateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
      
        return `${year}.${month}.${day} ${hours}:${minutes}`;
    };

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
                            댓글 작성
    \*-----------------------------------------------------*/
    const handlePostComment = (comment) => {
        axios.post(`${baseURL}/v1/board/investment/post/${id}/comments`,{
            status: 'Y',
            parentId: 0,
            content: comment,
            isSecret: 'N',
            userUid: userUid, 
        }, { headers })
        .then(response => {
            const newComment = response.data;
            console.log('댓글 게시 성공:', response.data);
            setComments(prevComments => [...prevComments, newComment]);

            axios.get(`${baseURL}/v1/board/investment/post/${id}/comments`, { headers })
            .then(response => {
                const commentData = response.data.query; 
                setComments(commentData);
                console.log('댓글 목록:', commentData);
            })
            .catch(error => {
                console.error('댓글 목록 가져오기 실패', error);
            });
        })
        .catch(error => {
            if (error.response && error.response.data && error.response.data.error === '사용자 로그인 정보가 유효하지 않습니다.') {
                alert('로그인 후 이용가능합니다.')
            } else {
                console.error('댓글게시 실패', error);
            }
        })
    };

    /*-----------------------------------------------------*\
                        댓글의 답글 작성
    \*-----------------------------------------------------*/
    const handlePostReply = (comment) => {
        axios.post(`${baseURL}/v1/board/investment/post/${id}/comments`, {
            status: 'Y',
            parentId: replyData,
            content: comment,
            isSecret: 'N',
            userUid: userUid
        }, { headers })
        .then(response => {
            const replyComment = response.data;
            console.log('답글 게시 성공', replyComment);
            setComments(prevComments => [...prevComments, replyComment]);

            axios.get(`${baseURL}/v1/board/investment/post/${id}/comments`, { headers })
            .then(response => {
                const commentData = response.data.query;
                setComments(commentData);
                console.log('댓글 목록:', commentData);
            })
            .catch(error => {
                console.error('댓글 목록 가져오기 실패', error);
            });
        })
        .catch(error => {
            if (error.response && error.response.data && error.response.data.error === '사용자 로그인 정보가 유효하지 않습니다.') {
                alert('로그인 후 이용가능합니다.')
            } else {
                console.error('댓글게시 실패', error);
            }
        })
    };

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
                    
                    {/* {postData.map((item, index) => (
                        <PostMain key={index.id}>
                            <table>
                                <tbody>
                                    <tr style={{display:'flex',alignItems:'center'}}>
                                        <td>{item.title}</td>
                                        <td>
                                            <MdOutlineComment style={{marginLeft:'5px'}}/>{item.comment_count}
                                        </td>
                                        <td>
                                            <AiOutlineLike style={{marginLeft:'5px'}}/>
                                        </td>
                                        <td>{item.like}</td>
                                        <td>
                                            <FiEye style={{marginLeft:'5px'}}/>
                                        </td>
                                        <td>{item.post_view_count}</td>
                                    </tr>
                                    <tr style={{display:'flex',alignItems:'center',marginTop:'20px'}}>
                                        <td style={{color:'rgba(69,74,252,1)',fontSize:'20px'}}><HiUser/></td>
                                        <td style={{fontSize:'14px'}}>{item.nickname}</td>
                                    </tr>
                                    <tr style={{display:'flex',marginTop:'20px', height:'200px',border:'1px solid #999',padding:'20px'}}>
                                        <td>
                                            {item.content}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{display:'flex',alignItems:'center'}}>
                                            <AiOutlineLike style={{margin:'0 5px'}}/> {item.like}
                                            <AiOutlineDislike style={{margin:'0 5px'}}/> {item.dislike}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </PostMain>
                        ))} */}
            </div>
        ) },
        { name: `문의 (${postData?.[0]?.comment_count})`, content: (
            <CommentWrap>
                <div>
                    <CommentInput
                        onPostComment={handlePostComment} 
                        frameHeight="143px"
                        holder="문의 내용을 입력해 주세요."
                        btnText="문의 등록"
                    />
                </div>
                <CommentFrame>
                    { comments?.length <= 0 ? <div style={{textAlign:'center',color:'rgb(85,85,85)',marginBottom:'80px'}}>아직 댓글이 없습니다.</div> 
                    : 
                        <div style={{marginBottom:'124px'}}>
                            {
                                comments.map((item, index) => {
                                
                                    if(item.parentId === 0) {
                                        return (
                                            <div key={index}>
                                                <CommentBox>
                                                    <CommentTopBox>
                                                        <CommentTopLeftBox>
                                                            <p>{item.nickname}</p>
                                                            <p>{formatDate(item.regDt)}</p>
                                                        </CommentTopLeftBox>
                                                        <CommentTopRightBox>
                                                            <CommentLikeBox
                                                                type="like"
                                                                onClick={() => handleCommentLikeBtnClick(index, item.id, 'like')}
                                                                style={{ color: item.type === "like" ? "blue" : "rgb(85, 85, 85)" }}
                                                            >
                                                                <VscThumbsup/>
                                                                {item.like}
                                                            </CommentLikeBox>
                                                            <CommentLikeBox
                                                                type="dislike"
                                                                onClick={() => handleCommentLikeBtnClick(index, item.id, 'dislike')}
                                                                style={{ color: item.type === "dislike" ? "red" : "rgb(85, 85, 85)" }}
                                                            >
                                                                <VscThumbsdown/>
                                                                {item.dislike}
                                                            </CommentLikeBox>
                                                        </CommentTopRightBox>
                                                    </CommentTopBox>
                                                    <CommentCenterBox>
                                                        <p>{item.content}</p>
                                                    </CommentCenterBox>
                                                    <CommentBottomBox>
                                                        <div
                                                            onClick={() => handleCommentEditBtnClick(index, item.id)}
                                                            style={{marginRight:'10px'}}
                                                        >
                                                            수정
                                                        </div>
                                                        <div
                                                            onClick={() => handleDeleteComment(index, item.id)}
                                                            style={{marginRight:'10px'}}
                                                        >
                                                            삭제
                                                        </div>
                                                        <div
                                                            onClick={() => handleCommentBtnClick(index, item.id)}
                                                        >
                                                            답글달기
                                                        </div>
                                                    </CommentBottomBox>
                                                </CommentBox>

                                                {showCommentTab && activeCommentIndex === index ? (
                                                        <div style={{marginTop:'10px', marginBottom:'10px'}}>
                                                            <CommentInput 
                                                                onPostComment={handlePostReply} 
                                                                frameHeight="100px"
                                                                holder="답글을 입력해 주세요."
                                                                btnText="답글 등록"
                                                            />
                                                        </div>
                                                ) : (null)}

                                                {showCommentEditTab && activeCommentIndex === index ? (
                                                    <div style={{marginTop:'10px', marginBottom:'10px'}}>
                                                        <CommentInput 
                                                            onPostComment={(newComment) => handlePostEditComment(newComment, item.id, index)} 
                                                            initialValue={comments[index].content} 
                                                            frameHeight="100px"
                                                            btnText="답글 수정"
                                                        />
                                                    </div>
                                                ) : (null)}

                                                {
                                                    comments.map((reply, replyIndex) => {
                                                        if ( reply.parentId === item.id) {
                                                            return (
                                                                <div key={replyIndex}>
                                                                    <ReplyBox>
                                                                        <ReplyLeftWrap>
                                                                            <LuReply/>
                                                                        </ReplyLeftWrap>
                                                                        <ReplyRightWrap>
                                                                            <CommentTopBox>
                                                                                <CommentTopLeftBox>
                                                                                    <p>{reply.nickname}</p>
                                                                                    <p>{formatDate(reply.regDt)}</p>
                                                                                </CommentTopLeftBox>
                                                                                <CommentTopRightBox>
                                                                                    <CommentLikeBox
                                                                                        type="like"
                                                                                        onClick={() => handleReplyLikeBtnClick( replyIndex, reply.id , index, "like")}
                                                                                        style={{ color: reply.type === "like" ? "blue" : "rgb(85, 85, 85)" }}
                                                                                    >
                                                                                        <VscThumbsup/>
                                                                                        {reply.like}
                                                                                    </CommentLikeBox>
                                                                                    <CommentLikeBox
                                                                                        type="dislike"
                                                                                        onClick={() => handleReplyLikeBtnClick( replyIndex, reply.id , index, "dislike")}
                                                                                        style={{ color: reply.type === "dislike" ? "red" : "rgb(85, 85, 85)" }}
                                                                                    >
                                                                                        <VscThumbsdown/>
                                                                                        {reply.dislike}
                                                                                    </CommentLikeBox>
                                                                                </CommentTopRightBox>
                                                                            </CommentTopBox>
                                                                            <CommentCenterBox>
                                                                                <p>{reply.content}</p>
                                                                            </CommentCenterBox>
                                                                        </ReplyRightWrap>
                                                                        <CommentBottomBox>
                                                                            <div
                                                                                onClick={() => handleCommentEditBtnClick(replyIndex, reply.id)}
                                                                                style={{marginRight:'10px'}}
                                                                            >
                                                                                수정
                                                                            </div>
                                                                            <div
                                                                                onClick={() => handleDeleteComment(replyIndex, reply.id)}
                                                                                style={{marginRight:'10px'}}
                                                                            >
                                                                                삭제
                                                                            </div>
                                                                        </CommentBottomBox>
                                                                    </ReplyBox>

                                                                    {showCommentEditTab && activeCommentIndex === replyIndex ? (
                                                                        <div style={{marginTop:'10px', marginBottom:'10px'}}>
                                                                            <CommentInput 
                                                                                onPostComment={(newComment) => handlePostEditComment(newComment, reply.id, index)} 
                                                                                initialValue={comments[replyIndex].content} 
                                                                                frameHeight="100px"
                                                                                btnText="답글 수정"
                                                                            />
                                                                        </div>
                                                                    ) : (null)}

                                                                </div>
                                                            );
                                                        }
                                                        return null;
                                                    })
                                                }
                                            </div>
                                        )
                                    }
                                    
                                })
                            }
                        </div>
                }
                
                </CommentFrame>
            </CommentWrap>
        )},
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

                                    <PostDetailRightInformationBox>
                                        <RightInfoTopBox>
                                            <RightInfoTopLeftBox>
                                                <p>투자 마감일</p>
                                                <p>{formattedDate}</p>
                                            </RightInfoTopLeftBox>
                                            {calculateEndDate(postEndDt)}
                                        </RightInfoTopBox>
                                        <RightInfoBottomBox>
                                            <LikeBox
                                                type="like"
                                                onClick={() => handleLike("like")}
                                                style={{
                                                    border: postLikeType === "like" ? "1px solid red" : "",
                                                    background: postLikeType === "like" ? "red" : ""
                                                }}
                                            >
                                                <div
                                                    style={{ 
                                                        color: postLikeType === "like" ? "white" : "rgb(85, 85, 85)",
                                                    }}
                                                >
                                                    <AiOutlineHeart/> 
                                                    <span>좋아요</span>
                                                </div>
                                            </LikeBox>
                                            <InquiryBox>
                                                <Link 
                                                    to="inquiry" 
                                                    onClick={scrollToSection}
                                                >
                                                    문의하기
                                                </Link>
                                            </InquiryBox>

                                        </RightInfoBottomBox>
                                    </PostDetailRightInformationBox>
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
            <Footer/>
        </div>
    );
};

export default PostDetail;
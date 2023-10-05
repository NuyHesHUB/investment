import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
/* import axiosInstance from 'axios'; */
import Header from '../Header';
import Footer from '../Footer';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { HiUser } from 'react-icons/hi';
import { MdOutlineComment } from 'react-icons/md';
import { BsList } from 'react-icons/bs';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { FiEye } from 'react-icons/fi';
import CommentInput from '../InputGroup/CommentInput';
import Cookies from 'js-cookie';

import { PostDetailFrame, PostMain } from './StyledPostDetail';


const PostDetail = ({postData, /* parsedCategoryData */}) => {
    const baseURL = process.env.REACT_APP_BASEURL;
    const { number, id } = useParams();

    console.log('number',number);
    console.log('id',id);
    
    /* console.log('parsedCategoryData',parsedCategoryData); */
    console.log('postData',postData);

    const [ testData, setTestData ] = useState([]);
    const [comments, setComments] = useState([]);
    const [post, setPost] = useState(null);

    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);


    const accessToken = sessionStorage.getItem('accessToken');
    const userUid = sessionStorage.getItem('userUid');
    const headers = {
        Authorization: `${accessToken}`
    }

    useEffect(() => {
        axios.get(`${baseURL}/v1/board/investment/post/${id}` , { headers })
            .then(response => {
                const test = response.data.query;
                setTestData(test);
                console.log('res 테스트', test);
                console.log('res 테스트', response);
                /* handleResponse(response); */

            })
            .catch(error => {
                console.error('res 테스트 실패', error);
            });
        axios.get(`${baseURL}/v1/board/investment/post/${id}/comments`, { headers })
        .then(response => {
            const commentData = response.data.query; 
            setComments(commentData);
            console.log('댓글 목록:', commentData);
        })
        .catch(error => {
            console.error('댓글 목록 가져오기 실패', error);
        });

    }, []);

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

    const handlePostComment = (comment) => {
        axios.post(`${baseURL}/v1/board/investment/post/${id}/comments`,{
            status: 'Y',
            parentId: id,
            content: comment,
            isSecret: 'N',
            userUid: userUid, 
        }, { headers })
        .then(response => {
            const newComment = response.data;
            console.log('댓글 게시 성공:', response.data);
            setComments(prevComments => [...prevComments, newComment]);
            window.location.reload();
        })
        .catch(error => {
            console.error('댓글 게시 실패', error);
        })
    };
    

    

    const handleLike = () => {
            axios.post(`http://39.117.244.34:3385/v1/board/like`, {
                boardPostId: id,
                type: 'like',
                userUid: userUid
            }, { headers })
                .then(response => {
                    console.log('좋아요 추가 성공:', response.data);
                    /* setIsLiked(true);
                    setPost({
                        ...post,
                        like: post.like + 1,
                    }); */
                })
                .catch(error => {
                    console.error('좋아요 추가 실패', error);
                });
    };

    const handleDislike = () => {
        if (!isLiked && !isDisliked) {
            // 싫어요 추가 요청 보내기
            axios.post(`http://39.117.244.34:3385/v1/board/like`, {
                boardPostId: id,
                type: 'dislike',
                userUid: userUid,
            },{
                headers
            })
                .then(response => {
                    console.log('싫어요 추가 성공:', response.data);
                    /* setIsDisliked(true);
                    setPost({
                        ...post,
                        dislike: post.dislike + 1,
                    }); */
                })
                .catch(error => {
                    console.error('싫어요 추가 실패', error);
                });
        }
    };

    console.log('post',post);
    return (
        <div>
            <Header/>
                게시물 페이지dd
                <PostDetailFrame>
                    <h4 style={{fontWeight:'normal', textAlign:'center'}}><span style={{fontWeight:'bold'}}>{/* {categoryKey} */}</span> 카테고리의 게시물 ID <span style={{fontWeight:'bold'}}>{id}</span> 의 상세 페이지</h4>
                    <div>
                        <button onClick={handleLike} disabled={isLiked || isDisliked}>좋아요</button>
                        <button onClick={handleDislike} disabled={isLiked || isDisliked}>싫어요</button>
                    </div>
                    {testData.map((item, index) => (
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
                        </div>
                    ))}
                    {testData.map((item, index) => (
                        <PostMain key={index}>
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
                        ))}
                    <br/>
                    <div style={{display:'flex',alignItems:'center'}}>
                        <div style={{display:'flex',alignItems:'center'}}>
                            <MdOutlineComment style={{marginLeft:'5px'}}/>
                            <span>댓글 작성</span>
                        </div>
                        <CommentInput onPostComment={handlePostComment} />
                    </div>
                    <br/>
                    <div style={{borderTop:'1px solid #000'}}></div>
                    <br/>
                    <div style={{marginBottom:'20px',display:'flex',alignItems:'center'}}>
                        <BsList/>
                        <span>댓글 목록</span>
                    </div>
                    <div>
                        {
                            comments.map((item, index) => (
                                <div key={index} style={{border:'1px solid #000',marginTop:'15px',padding:'5px'}}>
                                    <p>{item.nickname}</p>
                                    <p>{item.content}</p>
                                </div>
                            ))
                        }
                    </div>
                </PostDetailFrame>
            <Footer/>
        </div>
    );
};

export default PostDetail;
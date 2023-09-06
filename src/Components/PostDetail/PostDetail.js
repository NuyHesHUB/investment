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

import { PostDetailFrame, PostMain } from './StyledPostDetail';


const PostDetail = () => {
    const { categoryKey, id } = useParams();

    const boardData = useSelector((state) => state.reducer);
    console.log('boardData',boardData);
    const [ testData, setTestData ] = useState([]);
    const [comments, setComments] = useState([]);

    const [post, setPost] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);

    /* console.log('postdetail',boardData); */
    const url = `http://39.117.244.34:3385/v1/board/${categoryKey}/post/${id}`
    const accessToken = sessionStorage.getItem('accessToken');
    const userUid = sessionStorage.getItem('userUid');
    const headers = {
        Authorization: `${accessToken}`
    }
    /* console.log('카테고리키', categoryKey); */
    /* console.log('카테고리키', num); */
    /* console.log('아아디',id); */
    
    const handlePostComment = (comment) => {
        axios.post(`http://39.117.244.34:3385/v1/board/${categoryKey}/post/${id}/comments`,{
            status: 'Y',
            parentId: id,
            content: comment,
            isSecret: 'N',
            userUid: userUid, 
        }, {
            headers
        })
        .then(response => {
            /* setComments([...comments, response.data]); */
            const newComment = response.data;
            console.log('댓글 게시 성공:', response.data);
            setComments(prevComments => [...prevComments, newComment]);
        })
        .catch(error => {
            console.error('댓글 게시 실패', error);
            alert('로그인해주세요')
        })
    };
    
    useEffect(() => {
        axios.get(url, { headers })
            .then(response => {
                const test = response.data.query;
                setTestData(test);
                console.log('res 테스트', test);
            })
            .catch(error => {
                console.error('res 테스트 실패', error);
            });

        const commentsUrl = `http://39.117.244.34:3385/v1/board/${categoryKey}/post/${id}/comments`;
        axios.get(commentsUrl, { headers })
        .then(response => {
            const commentData = response.data.query; // 서버에서 반환되는 댓글 목록 데이터
            setComments(commentData);
            console.log('댓글 목록:', commentData);
        })
        .catch(error => {
            console.error('댓글 목록 가져오기 실패', error);
        });

    }, [url, categoryKey, id]);

    const handleLike = () => {
            axios.post(`http://39.117.244.34:3385/v1/board/like`, {
                boardPostId: id,
                type: 'like',
                userUid: userUid,
            },{
                headers
            })
                .then(response => {
                    console.log('좋아요 추가 성공:', response.data);
                    setIsLiked(true);
                    setPost({
                        ...post,
                        like: post.like + 1,
                    });
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
                    setIsDisliked(true);
                    setPost({
                        ...post,
                        dislike: post.dislike + 1,
                    });
                })
                .catch(error => {
                    console.error('싫어요 추가 실패', error);
                });
        }
    };
    return (
        <div>
            <Header/>
                <PostDetailFrame>
                    <h4 style={{fontWeight:'normal', textAlign:'center'}}><span style={{fontWeight:'bold'}}>{categoryKey}</span> 카테고리의 게시물 ID <span style={{fontWeight:'bold'}}>{id}</span> 의 상세 페이지</h4>
                    {/* <div>
                        <button onClick={handleLike} disabled={isLiked || isDisliked}>좋아요</button>
                        <button onClick={handleDislike} disabled={isLiked || isDisliked}>싫어요</button>
                    </div> */}
                    {/* {testData.map((item, index) => (
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
                    ))} */}
                    {testData.map((item, index) => (
                        <PostMain key={index}>
                            <table>
                                {/* <thead>
                                    <th>
                                        <td>1</td>
                                    </th>
                                    <th>
                                        <td>2</td>
                                    </th>
                                    <th>
                                        <td>3</td>
                                    </th>
                                </thead> */}
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
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
/* Import Component */
import Header from "../../Header"
import Footer from "../../Footer"
/* Log */
import PageLog from '../../../Hook/PageLog'
/* Styled-Components */
import { StyledFrame } from '../../StyledComponents/StyledHome';
import { PostWrap, Container, Comments } from './StyledBusinessStoryPost';



const BusinessStoryPost = () => {
  const baseURL = process.env.REACT_APP_BASEURL;
  const navigate = useNavigate();
  ///// JWT /////
  const accessToken = sessionStorage.getItem('accessToken'); 
  const headers = {
    Authorization: `${accessToken}`
  }
  const userUid = sessionStorage.getItem('userUid');
  const userGroup = sessionStorage.getItem('userGroup');
  const { id } = useParams();
  const [postData, setPostData] = useState([]);
  const [commentsListData, setCommentsListData] = useState([]);
  const [commentsData, setCommentsData] = useState({
    "parentId": 0,
    "content": "",
    "isSecret": "N"
});

  useEffect(() => {
    if (userUid) {
      axios.get(`${baseURL}/v1/board/announcement/post/${id}`, { headers }).then((res) => {
        const data = res.data?.query[0]
        setPostData(data);
      }).catch((error) => {
        console.log(error,"공지사항ERROR")
      })
    } else {
      axios.get(`${baseURL}/v1/board/announcement/post/${id}/unlogin`, { headers }).then((res) => {
        const data = res.data?.query[0]
        setPostData(data);
      }).catch((error) => {
        console.log(error,"공지사항ERROR")
      })
    }
  }, []);

  /* 게시물 삭제 */
  const deleteBtnClick = (id) => {
    if (window.confirm("삭제하시겠습니까?")) {
      axios.delete(`${baseURL}/v1/board/free/post/${id}`,  {
        data: {
          "userUid": userUid
        },
        headers}).then((res) => {
        alert("삭제되었습니다.");
        navigate('/announcement')
      }).catch((error) => {
        console.error(error)
        alert("권한이 없습니다.")
      })
    }
  }

  /* 댓글 불러오기 */
  useEffect(() => {
    axios.get(`${baseURL}/v1/board/free/post/${id}/comments?status=Y&query&pageRows=30&page=1&userUid=${userUid}`, { headers }).then((res) => {
      const data = res.data?.query
      console.log(res.data,"댓글테스트");
      setCommentsListData(data);
    }).catch((error) => {
      console.log(error,"댓글ERROR")
    })
  }, []);

  const commentContentWrite = (e) => {
    const value = e.target.value
    console.log(value, "댓글값 테스트")
    setCommentsData({
      ...commentsData,
      content: value
    })
  }

  /* 댓글 작성 */
  const commentWriteBtn = () => {
    if (window.confirm("댓글을 작성하시겠습니까?")) {
      axios.post(`${baseURL}/v1/board/free/post/${id}/comments`, commentsData, { headers }).then((res) => {
        console.log(res, "댓글 작성 성공")
        setCommentsData("")
        // setCommentsListData(prevCommentsListData => [...prevCommentsListData, commentsData]);
        axios.get(`${baseURL}/v1/board/free/post/${id}/comments?status=Y&query&pageRows=30&page=1&userUid=${userUid}`, { headers }).then((res) => {
          const data = res.data?.query
          setCommentsListData(data);
        }).catch((error) => {
          console.log(error)
        })
      }).catch((error) => {
        console.log(error,"댓글작성ERROR")
      })
    }
  }
  /* 댓글 삭제 */
  const commentDeleteBtn = (commentId) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      axios.delete(`${baseURL}/v1/board/free/post/${id}/comments/${commentId}`, { headers }).then((res) => {
        console.log(res, "댓글 삭제 성공")
        alert("삭제되었습니다")
        axios.get(`${baseURL}/v1/board/free/post/${id}/comments?status=Y&query&pageRows=30&page=1&userUid=${userUid}`, { headers }).then((res) => {
          const data = res.data?.query
          console.log(res.data,"댓글테스트");
          setCommentsListData(data);
        }).catch((error) => {
          console.log(error,"댓글ERROR")
        })
      }).catch((error) => {
        console.log(error,"댓글삭제ERROR")
      })
    }
  }


  return (
    <>
      <Header />
      <StyledFrame>
        <PostWrap>
          {postData && postData.regDt &&
            <Container>
              <div className='post-container'>
                <p className='cate'>사업자story</p>
                <h2>{postData.title}</h2>
                <p className='date'>{postData.regDt.split("T")[0]} | {postData.regDt.split("T")[1].slice(0,8)}</p>
                <div className='content'>
                  <p dangerouslySetInnerHTML={{ __html: postData.content }} />
                </div>
              </div>
              <div className='btn-container'>
                <button className='back' onClick={() => navigate(-1)}>목록</button>
                {userGroup === "관리자" ? 
                  <div>
                    <button 
                      className='modify-btn'
                      onClick={() => navigate(`/business_story/${id}/modify`)}
                    >수정</button>
                    <button 
                      className='delete-btn'
                      onClick={() => deleteBtnClick(postData.id)}
                    >삭제</button>
                  </div>
                : null}
              </div>
              {/* 댓글 */}
              <div className='comment-container'>
                <textarea 
                  name="" 
                  className='comment-textarea'
                  id="" 
                  cols="30" 
                  rows="10" 
                  value={commentsData.content || ""}
                  onChange={(e) => commentContentWrite(e)}
                ></textarea>
                <button
                  className='comment-write-btn'
                  onClick={commentWriteBtn}
                >댓글작성</button>
              </div>

              <ul className='comments-list'>
                {commentsListData && commentsListData.map((item, idx) => {
                  return(
                    <Comments key={idx}>
                      <div className='comment-top'>
                        <p className='nickname'>
                          {item.nickname}
                        </p>
                        <p className='comment-date'>
                          {item.regDt.split("T")[0] || ""} {item.regDt.split("T")[1].slice(0,8) || ""}
                        </p>
                      </div>

                      <div className="comment-bottom">
                        <p className='comment-content'>
                          {item.content}
                        </p>

                        {item.regUser === userUid ? 
                          <p className='comment-btnBox'>
                            <button 
                              className='comment-modify'
                            >수정</button>
                            <button 
                              className='delete-btn'
                              onClick={() => commentDeleteBtn(item.id)}
                            >삭제</button>                          
                          </p>
                        : null}
                      </div>
                    </Comments>
                  )
                })}
              </ul>
            </Container>
          }

        </PostWrap>
      </StyledFrame>
      <Footer />
    </>
  )
}
export default BusinessStoryPost;
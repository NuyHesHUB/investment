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
import { PostWrap, Container } from './StyledBusinessStoryPost';



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
  const [commentsData, setCommentsData] = useState([]);

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
  /* 댓글 불러오기 */
  useEffect(() => {
    axios.get(`${baseURL}/v1/board/free/post/${id}/comments?status=Y&query&pageRows=30&page=1&userUid=${userUid}`, { headers }).then((res) => {
      const data = res.data?.query
      console.log(res.data,"댓글테스트");
      setCommentsData(data);
    }).catch((error) => {
      console.log(error,"댓글ERROR")
    })
  }, []);

  const commentWriteBtn = () => {
    axios.post(`${baseURL}/v1/board/free/post/${id}/comments`, { headers }).then((res) => {

    }).catch((error) => {
      console.log(error,"댓글ERROR")
    })
  }
  


  const deleteBtnClick = (id) => {
    if (window.confirm("삭제하시겠습니까?")) {
      axios.delete(`${baseURL}/v1/board/announcement/post/${id}`,  {
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
                  id="" 
                  cols="30" 
                  rows="10" 
                  className='comment-textarea'
                ></textarea>
                <button>댓글작성</button>
              </div>
              <ul className='comments-list'>
                {commentsData && commentsData.map((item,idx) => {
                  return(
                    <li>
                      {item.content}
                    </li>
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
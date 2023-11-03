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
import { PostWrap, Container } from './StyledAnnouncementPost';



const AnnouncementPost = () => {
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
  const [noticeData, setNoticeData] = useState([]);

  useEffect(() => {
    if (userUid) {
      axios.get(`${baseURL}/v1/board/announcement/post/${id}`, { headers }).then((res) => {
        const data = res.data?.query[0]
        setNoticeData(data);
        console.log(data,"공지사항게시글테스트");
      }).catch((error) => {
        console.log(error,"공지사항ERROR")
      })
    } else {
      axios.get(`${baseURL}/v1/board/announcement/post/${id}/unlogin`, { headers }).then((res) => {
        const data = res.data?.query[0]
        setNoticeData(data);
        console.log(data,"공지사항게시글테스트");
      }).catch((error) => {
        console.log(error,"공지사항ERROR")
      })
    }
  }, []);


  const removeTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const decodedString = doc.body.textContent || "";
    return decodedString
  };

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
          {noticeData && noticeData.regDt &&
            <Container>
              <div className='post-container'>
                <h2>{noticeData.title}</h2>
                <p className='date'>{noticeData.regDt.split("T")[0]} | {noticeData.regDt.split("T")[1].slice(0,8)}</p>
                <p className='content'>
                  {removeTags(noticeData.content)}
                </p>
              </div>
              <div className='btn-container'>
                <button className='back' onClick={() => navigate(-1)}>목록</button>
                {userGroup === "관리자" ? 
                  <div>
                    <button 
                      className='modify-btn'
                      onClick={() => navigate(`/announcement/${id}/modify`)}
                    >수정</button>
                    <button 
                      className='delete-btn'
                      onClick={() => deleteBtnClick(noticeData.id)}
                    >삭제</button>
                  </div>
                : null}
              </div>
            </Container>
          }
        </PostWrap>
      </StyledFrame>
      <Footer />
    </>
  )
}
export default AnnouncementPost;
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
/* Import Component */
import Header from "../../Header"
import Footer from "../../Footer"
import Pagenation from "./Pagenation"
/* Log */
import PageLog from '../../../Hook/PageLog'
/* Styled-Components */
import { StyledFrame } from '../../StyledComponents/StyledHome';
import { BoardWrap, Container } from './StyledAnnouncementBoard';

const Announcement = () => {
  const baseURL = process.env.REACT_APP_BASEURL;
  ///// JWT /////
  const accessToken = sessionStorage.getItem('accessToken'); 
  const headers = {
    Authorization: `${accessToken}`
  }
  const userGroup = sessionStorage.getItem('userGroup');

  const navigate = useNavigate();

  const [noticeData, setNoticeData] = useState([]);
  //페이지네이션데이터
  const [page, setPage] = useState(1); // 현재 페이지
  const [pageRows, setPageRows] = useState(10); // 한 페이지에 보여질 데이터 개수
  const [totalRows, setTotalRows] = useState(0); //데이터 정보 개수
  const [endPage, setEndPage] = useState(window.innerWidth < 768 ? 5 : 10); // 페이지네이션 단위
  const [count, setCount] = useState(0); 

  /* page log */
  // PageLog("공지사항");

  useEffect(() => {
    axios.get(`${baseURL}/v1/board/announcement/post?query&pageRows=${pageRows}&page=${page}&category=&status=&condition=`, { headers }).then((res) => {
      console.log(res.data.query,"공지사항게시글테스트");
      const data = res.data.query
      setNoticeData(data);
      setTotalRows(res.data.totalRows);
    }).catch((error) => {
      console.log(error,"공지사항ERROR")
    })
  }, [page, pageRows]);



  return(
    <>
      <Header />
      <StyledFrame>
        <BoardWrap>
          <Container>
            <div className='top'>
              <h2>공지사항</h2>
              {userGroup === "관리자" ? 
                <button className='write-btn' onClick={() => navigate('/announcement/write')}>공지쓰기</button>
              : null}
            </div>
            <ul>
              {noticeData && noticeData/* .reverse() */.map((item, idx) => {
                return (
                  <li key={idx}>
                    <Link to={`/announcement/${item.id}`}>
                      <p>
                        <span className='post-title'>{item.title}</span>
                      </p>
                      <p className='post-date'>{item.regDt.split("T")[0]}</p>
                    </Link>
                  </li>
                )
              })
              }
            </ul>
          </Container>
          <Pagenation page={page} setPage={setPage} pageRows={pageRows} setPageRows={setPageRows} totalRows={totalRows} setTotalRows={setTotalRows} endPage={endPage} count={count} setCount={setCount} setEndPage={setEndPage} />
        </BoardWrap>
      </StyledFrame>
      <Footer />
    </>
  )


}
export default Announcement;
import React, { useEffect, useState } from 'react';
import { useNavigate  } from "react-router-dom";
import axios from 'axios';
///// style /////
import { CommonStyleFrame, TableFrame, Modify } from "./AdminStyledComponents/StyledCommon"
import { Wrap, PopUpWrap } from "./AdminStyledComponents/StyledAdminPostList"
///// import component /////
import Admin from "./Admin"
import Pagenation from "./Pagenation"
import SearchForm from "./SearchForm"

const AdminPostList = () => {
  const baseURL = process.env.REACT_APP_BASEURL;
  const navigate = useNavigate();
  ///// JWT /////
  const accessToken = sessionStorage.getItem('accessToken'); 
  const userUid = sessionStorage.getItem('userUid');
  const headers = {
    Authorization: `${accessToken}`
  }

  const [postList, setPostList] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  //페이지네이션데이터
  const [page, setPage] = useState(1); // 현재 페이지
  const [pageRows, setPageRows] = useState(2); // 한 페이지에 보여질 데이터 개수
  const [totalRows, setTotalRows] = useState(0); //데이터 정보 개수
  const [endPage, setEndPage] = useState(window.innerWidth < 768 ? 5 : 10); // 페이지네이션 단위
  const [count, setCount] = useState(0); 
  
  const [key, setKey] = useState("investment");
  const [status, setStatus] = useState([]); //status filter

  const statusChange = (statusValue) => {
    setStatus(statusValue)
  }
  
  ///// key값 change /////
  const keyChange = (keyValue) => {
    setKey(keyValue)
  }

  ///// 데이터 불러오기 /////
  useEffect(() => {
    axios.get(`${baseURL}/v1/board/${key}/post?query&pageRows=${pageRows}&page=${page}&category=&status=&condition=`, { headers }).then((res) => {
      setPostList(res.data.query);
      setTotalRows(res.data.totalRows);
    }).catch(() => {
      console.error("error");
    })
  }, [page, pageRows, key]);

  ///// resize /////
  const handleResize = () => {
    setWindowWidth(window.innerWidth)
    if (windowWidth <= 768) {
      setEndPage(5)
    } else {
      setEndPage(10)
    }
  }
  useEffect(() => {
      window.addEventListener("resize", handleResize);
    return() => { //clean up
      window.removeEventListener("resize", handleResize);
    }
  }, [window.innerWidth < 768]);

  ///// PageSize change /////
  const changePageSize = (e) => {
    setPageRows(e.target.value)
    setPage(1)
    setCount(0)
  }


  ///// 상세보기 btn /////
  const postToShow = (id) => {
    navigate(`/${key}/ongoing/${id}`)
  }

  return (
    <>
      <Admin /> {/* 헤더랑 메뉴 */}
      <CommonStyleFrame>
        <Wrap>
          <p className='title'>게시물관리</p>
          <ul className="top">
            <SearchForm 
              statusValue={statusChange} 
              keyValue={keyChange} 
              groupNone={true}
            />
            <li className="right-box">
              <select
                className='page-size'
                onChange={(e) => changePageSize(e)}
              >
                <option value={2}>2개씩</option>
                <option value={4}>4개씩</option>
                <option value={6}>6개씩</option>
                <option value={10}>10개씩</option>
              </select>
            </li>
          </ul>
          <TableFrame>
            <table>
              <thead>
                <tr>
                  <th>status</th>
                  <th>id</th>
                  <th>brdKey</th>
                  <th>category</th>
                  <th>title</th>
                  <th>content</th>
                  <th>상세보기</th>
                </tr>
              </thead>
              <tbody>
              {postList.map((item,i) => {
                return(
                    <tr key={i}>
                      <td>
                        {item.status}
                      </td>
                      <td>
                        {item.id}
                      </td>
                      <td>
                        {item.brdKey}
                      </td>
                      <td>
                        {item.category}
                      </td>
                      <td>
                        {item.title}
                      </td>
                      <td>
                        {item.content}
                      </td>
                      <td>
                        <button 
                          className="detailBtn"
                          onClick={() => postToShow(item.id)}
                        >상세보기</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </TableFrame>
          <Pagenation page={page} setPage={setPage} pageRows={pageRows} setPageRows={setPageRows} totalRows={totalRows} setTotalRows={setTotalRows} endPage={endPage} count={count} setCount={setCount} setEndPage={setEndPage} />
         
        </Wrap>
      </CommonStyleFrame>
    </>
  )
}
export default AdminPostList
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
  const [key, setKey] = useState("investment");
  //페이지네이션데이터
  const [page, setPage] = useState(1); // 현재 페이지
  const [pageRows, setPageRows] = useState(2); // 한 페이지에 보여질 데이터 개수
  const [totalRows, setTotalRows] = useState(0); //데이터 정보 개수
  const [endPage, setEndPage] = useState(10); // 페이지네이션 단위
  const [count, setCount] = useState(0); 

  const [status, setStatus] = useState([]); //status filter
  const statusChange = (statusValue) => {
    setStatus(statusValue)
  }
  
  ///// 데이터 불러오기 /////
  useEffect(() => {
    axios.get(`${baseURL}/v1/board/${key}/post?query&pageRows=${pageRows}&page=${page}&category=&status=&condition=`, { headers }).then((res) => {
      setPostList(res.data.query);
      setTotalRows(res.data.totalRows);
      // console.log(res.data.query,"res.data.queryres.data.query")
    }).catch(() => {
      console.error("error");
    })
  }, [page, pageRows, key]);

  const changePageSize = (e) => {
    setPageRows(e.target.value)
    setPage(1)
    setCount(0)
  }
  ///// status change /////
  // const statusChange = (e) => {
  //   const value = e.target.value
  //   if (status.includes(value)) {
  //     setStatus(
  //       status.filter(i => i !== value)
  //     )
  //   } else {
  //     setStatus(
  //       status => [...status, e.target.value]
  //     )
  //   }
  // }

  ///// key값 change /////
  const keyChange = (e) => {
    setKey(e.target.value)
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
                          className='view' 
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
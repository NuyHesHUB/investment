import React, { useEffect, useState } from 'react';
import { useNavigate  } from "react-router-dom";
import axios from 'axios';
///// style /////
import { Wrap, PageNation } from "./AdminStyledComponents/StyledAdminMemberList"

import Admin from "./Admin"
import Pagenation from "./Pagenation"


const AdminMemberList = () => {
  const baseURL = process.env.REACT_APP_BASEURL;
  const navigate = useNavigate();
  ///// JWT /////
  const accessToken = sessionStorage.getItem('accessToken'); 
  const userUid = sessionStorage.getItem('userUid');
  const headers = {
    Authorization: `${accessToken}`
  }

  ///////////////////////////
  ///// 데이터 가져오기 /////
  ///////////////////////////
  const [memberData, setMemberData] = useState([]);
  //페이지네이션데이터
  const [page, setPage] = useState(1); // 현재 페이지
  const [pageRows, setPageRows] = useState(2); // 한 페이지에 보여질 데이터 개수
  const [totalRows, setTotalRows] = useState(0); //데이터 정보 개수 (현재 3개)
  const [endPage, setEndPage] = useState(10); // 페이지네이션 단위
  const [count, setCount] = useState(0); 

  useEffect(() => {
    axios.get(`${baseURL}/v1/users/?query=&pageRows=${pageRows}&page=${page}`, { headers }).then((res) => {
      // console.log("GET START", res.data.query, res.data.totalRows);
      setMemberData(res.data.query);
      setTotalRows(res.data.totalRows);
    }).catch(() => {
      console.error("error");
    })
  }, [page,pageRows]);
  
  // const pageLimitUrl = `${baseURL}/v1/users/?query=&pageRows=${pageRows}&page=${endPage}`//페이지 위치에 따른 총 데이터 갯수 알아내는 용
  // useEffect(() => {
  //   axios.get(pageLimitUrl, { headers }).then((res) => {
  //     console.log("total", res.data.totalRows)
  //     setTotalData(res.data.totalRows);
  //   }).catch(() => {
  //     console.log("error");
  //   });
  // }, [endPage])


  const changePageSize = (e) => {
    setPageRows(e.target.value)
    setPage(1)
    setCount(0)
  }

  return (
    <>
    <Admin /> {/* 헤더랑 메뉴 */}

    <Wrap>
      <p>회원목록</p>
      <div className="top">
        <select
          className='page-size'
          onChange={(e) => changePageSize(e)}
        >
          <option value={2}>2개씩</option>
          <option value={4}>4개씩</option>
          <option value={6}>6개씩</option>
          <option value={10}>10개씩</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>group</th>
            <th>isAdmin</th>
            <th>local</th>
            <th>kakao</th>
            <th>naver</th>
            <th>id</th>
            <th>email</th>
            <th>nickname</th>
            <th>phone</th>
            <th>regDt</th>
            <th>수정</th>
          </tr>
        </thead>
        {memberData.map((v,i) => {
          return(
            <tbody key={v.brdKey}>
              <tr>
                <td>
                  {v.group}
                </td>
                <td>
                  {v.isAdmin}
                </td>
                <td>
                  {v.local}
                </td>
                <td>
                  {v.kakao}
                </td>
                <td>
                  {v.naver}
                </td>
                <td>
                  {v.loginId}
                </td>
                <td>
                  {v.email}
                </td>
                <td>
                  {v.nickname}
                </td>
                <td>
                  {v.phone}
                </td>
                <td>
                  {v.regDt}
                </td>
                <td>
                  <button 
                    className='modifyBtn' 
                    // onClick={() => navigate(`/v1/board/${v.brdKey}/post/${v.id}`)}
                  >수정</button>
                </td>
              </tr>
            </tbody>
            )
          })}
        </table>

        {/* <PageNation>
          <div className='box'>
            <button 
              onClick = {() => {
                // setPageLimit(pageLimit - 10)
                setCount(count - 1)
                setPage((endPage*(count-1))+1)
              }}
              disabled = {page <= endPage}
            >&lt;&lt;</button>

            <button 
              onClick = {() => {
                setPage(page - 1)
                if (page % endPage === 1) {
                  // setPageLimit(pageLimit - 10)
                  setCount(count - 1)
                }
                }} 
              disabled = {page === 1}
            >prev</button>
          

          {Array(
            endPage < Math.ceil((totalRows/pageRows))-(endPage*count) ?
            endPage :
            (Math.ceil((totalRows/pageRows))-(endPage*count))
            ).fill().map((v,i) => {
            return(
              <button 
                onClick = {() => setPage((endPage*count)+i+1)} 
                className={page === (endPage*count)+i+1 ? "current-page" : ""}
                // id='num'
                key={i}
              >{(endPage*count)+i+1}</button>
            )
          })}

          <button 
            onClick = {() => {
              setPage(page + 1)
              console.log("next")
              if (page % endPage === 0) {
                // setPageLimit(pageLimit + 10)
                setCount(count + 1)
              }
            }}
            // disabled = {totalRows - (page * endPage) < 0}
            disabled = {page === Math.ceil((totalRows/pageRows))}
            >next</button>

            <button 
              onClick = {() => { 
                // setPageLimit(pageLimit + 10)
                setCount(count + 1)
                setPage((endPage*(count+1))+1)
              }}
              // disabled = {pageRows * page >= totalRows || page <= endPage}
              disabled = {!(endPage < Math.ceil((totalRows/pageRows))-(endPage*count))}
            >&gt;&gt;</button>
          </div>
        </PageNation> */}

        <Pagenation page={page} setPage={setPage} pageRows={pageRows} setPageRows={setPageRows} totalRows={totalRows} setTotalRows={setTotalRows} endPage={endPage} count={count} setCount={setCount} setEndPage={setEndPage} />
      </Wrap>
    </>
  )
};
export default AdminMemberList;
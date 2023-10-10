import React, { useEffect, useState } from 'react';
import { useNavigate  } from "react-router-dom";
import axios from 'axios';
///// style /////
import {Wrap, PageNation} from "./AdminStyledComponents/StyledAdminPostApprove"
///// import component /////
import Admin from "./Admin"


const AdminPostApprove = () => {
  const baseURL = process.env.REACT_APP_BASEURL;
  const navigate = useNavigate();

  ///// JWT /////
  const accessToken = sessionStorage.getItem('accessToken'); 
  const userUid = sessionStorage.getItem('userUid');
  const headers = {
    Authorization: `${accessToken}`
  }

  /////////////////////////////////////
  ///// PostList 데이터 가져오기 /////
  /////////////////////////////////////
  const [postData, setPostData] = useState([]);
  // const [postKey, setPostKey] = useState('');

  //페이지네이션데이터
  const [page, setPage] = useState(1); // 현재 페이지
  const [pageRows, setPageRows] = useState(2); // 한 페이지에 보여질 데이터 개수
  const [totalRows, setTotalRows] = useState(0); //데이터 정보 개수 (현재 3개)
  const [endPage, setEndPage] = useState(10); // 페이지네이션 단위
  const [count, setCount] = useState(0); 

  useEffect(() => {
    axios.get(`${baseURL}/v1/board/${'investment'}/post?query&pageRows=&page=&category=&status=&condition=pending`, { headers }).then((res) => {
      console.log("GET START", res.data, res.data.totalRows);
      setPostData(res.data.query);
      setTotalRows(res.data.totalRows);
    }).catch(() => {
      console.error("error");
    })
  }, []);

  // condition 수정 //
  // const conditionChange = (e, i) => {
  //   const { value, name } = e.target
  //   setPostData(prevData => {
  //     const newData = [...prevData]
  //     newData[i][name] = value
  //     return newData
  //   })
  //   console.log("conditionChange", value, name)
  // }


  // ///// key값 데이터 가져오기 /////
  // const [boardData, setBoardData] = useState([]);

  // useEffect(() => {
  //   axios.get(`${baseURL}/v1/board?query=&pageRows=&page=`, { headers }).then((res) => {
  //     console.log("GET START",res.data.query);
  //     setBoardData(res.data.query);
  //   }).catch(() => {
  //     console.error("error");
  //   })
  // }, []);

  // const keyChange = (e) => {
  //   setPostKey(e.target.value)
  //   console.log(postKey, e.target.value, "postKey")
  // }
  const changePageSize = (e) => {
    setPageRows(e.target.value)
  }
  
  return (
    <>
      <Admin /> {/* 헤더랑 메뉴 */}
      <Wrap>
        <p>승인목록</p>
        {/* <ul className="top">
          <li className="search-box">
            <input 
              type="search" 
              placeholder='검색' 
              className='search-input' 
            />
            <input 
              type="submit" 
              value='검색' 
              className='search-btn' 
            />
          </li>
        </ul> */}
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
              {/* <th>
                key:
                <select onChange={(e) => keyChange(e)}>
                {boardData.map((item) => {
                  return(
                    <>
                    <option value={item.key} onChange={(e) => keyChange(e)}>{item.key}</option>
                    </>
                  )
                })}
                </select>
              </th> */}
              <th>num</th>
              <th>status</th>
              <th>condition</th>
              <th>category</th>
              <th>title</th>
              <th>content</th>
              <th>상세보기</th>
            </tr>
          </thead>
          {postData.map((v,i) => {
            return(
              <tbody key={v.brdKey}>
                <tr>
                  {/* <td>
                    {v.brdKey}
                  </td> */}
                  <td>
                    {v.num}
                  </td>
                  <td>
                    {v.status}
                  </td>
                  <td>
                    {v.condition}
                    {/* <select 
                      name="condition" 
                      onChange={(e) => conditionChange(e, i)}
                    >
                    </select> */}
                  </td>
                  <td>
                    {v.category}
                  </td>
                  <td>
                    {v.title}
                  </td>
                  <td>
                    {v.content}
                  </td>
                  <td>
                    <button 
                      className='modifyBtn' 
                      onClick={() => navigate(`/v1/board/${v.brdKey}/post/${v.id}`)}
                    ></button>
                  </td>
                </tr>
              </tbody>
            )
          })}
        </table>

        <PageNation>
          {/* 페이지네이션 */}
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
          {/* 페이지네이션 끝 */}
        </PageNation>


      </Wrap>
    </>


  )


}
export default AdminPostApprove;
import React, { useEffect, useState } from 'react';
import { useNavigate  } from "react-router-dom";
import axios from 'axios';
///// style /////
import {Wrap, PageNation} from "./AdminStyledComponents/StyledAdminPostApprove"
import { CommonStyleFrame, TableFrame } from "./AdminStyledComponents/StyledCommon"
///// import component /////
import Admin from "./Admin"
import Pagenation from "./Pagenation"

const AdminPostApprove = () => {
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
  const [postData, setPostData] = useState([]);
  const [key, setKey] = useState("investment");
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
  }, [page,pageRows]);

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
    setPage(1)
    setCount(0)
  }
  ///// 상세보기 btn /////
  const postToShow = (id) => {
    navigate(`/approve/${key}/pending/${id}`)
  }
 
  return (
    <>
      <Admin /> {/* 헤더랑 메뉴 */}
      <CommonStyleFrame>
        <Wrap>
          <p className='title'>승인목록</p>
          <ul className="top">
            <li className="left-box">
              <div>
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
              </div>
            </li>
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
                  <th>regDt</th>
                  <th>상세보기</th>
                </tr>
              </thead>
              <tbody>
              {postData.map((item,i) => {
                return(
                    <tr key={item.brdKey}>
                      {/* <td>
                        {v.brdKey}
                      </td> */}
                      <td>
                        {item.num}
                      </td>
                      <td>
                        {item.status}
                      </td>
                      <td>
                        {item.condition}
                        {/* <select 
                          name="condition" 
                          onChange={(e) => conditionChange(e, i)}
                        >
                        </select> */}
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
                        {item.regDt}
                      </td>
                      <td>
                        <button
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
export default AdminPostApprove;
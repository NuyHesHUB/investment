import React, { useEffect, useState } from 'react';
import axios from 'axios';
///// style /////
import { CommonStyleFrame, TableFrame, } from "./AdminStyledComponents/StyledCommon"
import { Wrap } from "./AdminStyledComponents/StyledAdminCommentList"
///// import component /////
import Admin from "./Admin"
import Pagenation from "./Pagenation"

const CommentList = () => {
  const baseURL = process.env.REACT_APP_BASEURL;

  const [commentData, setCommentData] = useState([]);
  const [status, setStatus] = useState([]); //status filter

  useEffect(() => {
    axios.get(`${baseURL}/v1/board/${'investment'}/post/${'55'}/comments?status=Y&query&pageRows=30&page=1&userUid=`).then((res) => {
      console.log(res.data, "댓글~~~")
      setCommentData(res.data.query)
    }).catch((error) => {
      console.error(error)
    })
  }, [])

  ///// status change /////
  const statusChange = (e) => {
    const value = e.target.value
    if (status.includes(value)) {
      setStatus(
        status.filter(i => i !== value)
      )
    } else {
      setStatus(
        status => [...status, e.target.value]
      )
    }
  }

  return(
    <>
    <Admin />
    <CommonStyleFrame>
    <Wrap>
        <p className='title'>댓글관리<br />(미완성)</p>
        <ul className="top">
          <li className="left-box">
            <form action="">
              <div className='search-status-box'>
                  상태값
                <label htmlFor="statusY">
                  <input 
                    id='statusY' 
                    type="checkbox" 
                    value={"N"} 
                    onChange={(e) => statusChange(e)} 
                  />
                  N
                </label>
                <label htmlFor="statusN">
                  <input 
                    id='statusN' 
                    type="checkbox" 
                    value={"Y"} 
                    onChange={(e) => statusChange(e)} 
                  />
                  Y
                </label>
              </div>
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
            </form>
          </li>
          <li className="right-box">
            {/* <select
              className='page-size'
              onChange={(e) => changePageSize(e)}
            >
              <option value={2}>2개씩</option>
              <option value={4}>4개씩</option>
              <option value={6}>6개씩</option>
              <option value={10}>10개씩</option>
            </select> */}
          </li>
        </ul>
        <TableFrame>
          <table>
            <thead>
              <tr>
                <th>status</th>
                <th>id</th>
                <th>condition</th>
                <th>brdKey</th>
                <th>category</th>
                <th>title</th>
                <th>content</th>
                <th>삭제하기</th>
              </tr>
            </thead>
            <tbody>
            {commentData.map((item,i) => {
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
                      {item.condition}
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
                        // onClick={() => postToShow(item.id)}
                      >삭제하기</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </TableFrame>
        {/* <Pagenation page={page} setPage={setPage} pageRows={pageRows} setPageRows={setPageRows} totalRows={totalRows} setTotalRows={setTotalRows} endPage={endPage} count={count} setCount={setCount} setEndPage={setEndPage} /> */}
        
      </Wrap>
    </CommonStyleFrame>
    </>
  )

}
export default CommentList;
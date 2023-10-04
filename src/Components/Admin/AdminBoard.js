import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import {TableWrap} from "./StyledAdminBoard"
import Admin from "./Admin"
const baseURL = process.env.REACT_APP_BASEURL;

const AdminBoard = () => {

  const [boardData, setBoardData] = useState([]);
  
  useEffect(() => {
    axios.get(`${baseURL}/v1/board?query=&pageRows=&page=`,).then((res) => {
      console.log("testtest", res.data.query)
      setBoardData(res.data.query)
    }).catch(() => {
      console.error("error")
    })
  }, [])

  //수정삭제하는거 안 함


  return(
    <>
      <Admin /> {/* 헤더랑 메뉴 */}
      
      <TableWrap>
        <input type="search" placeholder='검색' className='search' /> <input type="submit" value='검색' />
        <table>
          <thead>
            <tr>
              <th>status</th>
              <th>title</th>
              <th>categoryList</th>
              <th>수정/삭제</th>
            </tr>
          </thead>
          {boardData.map((v) => {
            return(
              <tbody key={v.key}>
                <tr>
                  <td>
                    <select>
                      <option value="Y">{v.status === "Y" ? "Y" : "N"}</option>
                      <option value="N">{v.status === "Y" ? "N" : "Y"}</option>
                    </select>
                    {/* {v.status} */}
                  </td>
                  <td>
                    {v.title}
                  </td>
                  <td>
                    {v.categoryList}
                  </td>
                  <td>
                    <button>수정</button>
                    <button>삭제</button>
                  </td>
                </tr>
              </tbody>
            )
          })}
        </table>
      </TableWrap>
    </>
  )
}

export default AdminBoard;
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

//style
import {Wrap} from "./StyledAdminBoard"

import Admin from "./Admin"



const AdminBoard = () => {
  const baseURL = process.env.REACT_APP_BASEURL;

  //jwt
  const accessToken = sessionStorage.getItem('accessToken'); 
  const headers = {
    Authorization: `${accessToken}`
  }

  //데이터 가져오기
  const [boardData, setBoardData] = useState([]);

  useEffect(() => {
    axios.get(`${baseURL}/v1/board?query=&pageRows=&page=`, { headers }).then((res) => {
      console.log("testtest", res.data.query)
      setBoardData(res.data.query)
    }).catch(() => {
      console.error("error")
    })
  }, [])


  // 수정 버튼 눌렀을 때
  const [modify, setModify] = useState('');

  const modifying = (key) => {
    if (modify.length === 0) {
      setModify(key)
    } else if (modify === key) {
      setModify('')
    }
  }

  console.log("modify", modify)


  //수정삭제하는거 안 함

  return(
    <>
      <Admin /> {/* 헤더랑 메뉴 */}
      
      <Wrap>
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
          {boardData.map((v,i) => {
            return(
              <tbody key={v.key}>
                <tr className={`${modify === v.key ? 'active' : ''}`} >
                  <td>
                    <select disabled = { modify !== v.key }>
                      <option value="Y">{v.status === "Y" ? "Y" : "N"}</option>
                      <option value="N">{v.status === "Y" ? "N" : "Y"}</option>
                    </select>
                  </td>
                  <td>
                    <input 
                      type="text"
                      value={v.title}
                      disabled = { modify !== v.key }
                    ></input>
                  </td>
                  <td>
                    <input 
                      type="text"
                      value={v.categoryList}
                      disabled = { modify !== v.key }
                    ></input>
                  </td>
                  <td>
                    <button className='modify' onClick={() => {modifying(v.key)}}>수정</button>
                    <button className='delete'>삭제</button>
                  </td>
                </tr>
              </tbody>
            )
          })}
        </table>
      </Wrap>
    </>
  )
}

export default AdminBoard;
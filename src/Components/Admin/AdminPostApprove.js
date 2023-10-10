import React, { useEffect, useState } from 'react';
import { useNavigate  } from "react-router-dom";
import axios from 'axios';
///// style /////
import {Wrap, PopUpWrap} from "./AdminStyledComponents/StyledAdminPostApprove"
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

  useEffect(() => {
    axios.get(`${baseURL}/v1/board/${'investment'}/post?query&pageRows=&page=&category=&status=&condition=pending`, { headers }).then((res) => {
      console.log("GET START", res.data);
      setPostData(res.data.query);
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
      </Wrap>
    </>


  )


}
export default AdminPostApprove;
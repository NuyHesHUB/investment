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
  const [postKey, setPostKey] = useState('');

  useEffect(() => {
    axios.get(`${baseURL}/v1/board/${postKey}/post?query&pageRows=&page=&category=&status=&condition=pending`, { headers }).then((res) => {
      console.log("GET START", res.data);
      setPostData(res.data.query);
    }).catch(() => {
      console.error("error");
    })
  }, [postKey]);

  // input 수정 //
  const conditionChange = (e, i) => {
    const { value, name } = e.target
    setPostData(prevData => {
      const newData = [...prevData]
      newData[i][name] = value
      return newData
    })
    console.log("conditionChange", value, name)
  }

  // 수정 버튼 눌렀을 때 
  // const modifyBtnClick = (i,id) => {
  //   console.log("수정", postData[i])
  //   if (window.confirm("수정하시겠습니까?")) {
  //     axios.patch(`${baseURL}/v1/board/${postKey}/post/${id}`, postData[i], { headers }).then((res)=> {
  //       navigate(`/admin/post_list`);
  //     }).catch((error)=> {
  //       console.log(error)
  //     })
  //   }
  // }

  ///// key값 데이터 가져오기 /////
  const [boardData, setBoardData] = useState([]);

  useEffect(() => {
    axios.get(`${baseURL}/v1/board?query=&pageRows=&page=`, { headers }).then((res) => {
      console.log("GET START",res.data.query);
      setBoardData(res.data.query);
    }).catch(() => {
      console.error("error");
    })
  }, []);

  const keyChange = (e) => {
    setPostKey(e.target.value)
    console.log(postKey, e.target.value, "postKey")
  }

  return (
    <>
      <Admin /> {/* 헤더랑 메뉴 */}
      <Wrap>
        <p>게시물 관리</p>
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
          <li className="btn-box">
            <button 
              className="createBtn"
              // onClick={createBtnClick}
            >추가</button>
          </li>
        </ul> */}
        <table>
          <thead>
            <tr>
              <th>
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
              </th>
              <th>id</th>
              <th>status</th>
              <th>condition</th>
              <th>category</th>
              <th>num</th>
              <th>title</th>
              <th>수정</th>
              <th>상세보기</th>
            </tr>
          </thead>
          {postData.map((v,i) => {
            return(
              <tbody key={v.brdKey}>
                <tr>
                  <td>
                    {v.brdKey}
                  </td>
                  <td>
                    {v.id}
                  </td>
                  <td>
                    {v.status}
                  </td>
                  <td>
                    <select 
                      name="condition" 
                      onChange={(e) => conditionChange(e, i)}
                    >
                      <option value="pending" /* 펜딩만 나오게 할 것 */>
                        pending
                      </option>
                      <option value="ongoing">
                        ongoing
                      </option>
                    </select>
                  </td>
                  <td>
                    {v.category}
                  </td>
                  <td>
                    {v.num}
                  </td>
                  <td>
                    {v.title}
                  </td>
                  <td>
                    <button 
                      className='modifyBtn' 
                      // onClick={() => modifyBtnClick(i, v.id)}
                    >승인</button>
                  </td>
                  <td>
                    <button 
                      className='modifyBtn' 
                      onClick={() => navigate(`/v1/board/${v.brdKey}/post/${v.id}`)}
                    >상세보기</button>
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
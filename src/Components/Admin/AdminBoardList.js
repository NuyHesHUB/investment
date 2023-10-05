import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate  } from "react-router-dom";
import axios from 'axios';

/////style/////
import {Wrap} from "./StyledAdminBoard"

import Admin from "./Admin"



const AdminBoardList = () => {
  const baseURL = process.env.REACT_APP_BASEURL;
  const navigate = useNavigate();

  /////JWT/////
  const accessToken = sessionStorage.getItem('accessToken'); 
  const userUid = sessionStorage.getItem('userUid');
  const headers = {
    Authorization: `${accessToken}`
  }

  //데이터 가져오기
  const [boardData, setBoardData] = useState([]);
  
  useEffect(() => {
    axios.get(`${baseURL}/v1/board?query=&pageRows=&page=`, { headers }).then((res) => {
      console.log("testtest", res.data.query);
      setBoardData(res.data.query);
    }).catch(() => {
      console.error("error");
    })
  }, []);


  //////////////////////////
  ////////// 수정 //////////
  //////////////////////////
  const [boardDataModi, setBoardDataModi] = useState([]);

  
  const [modify, setModify] = useState([]); // 수정 버튼 활성화 여부

  const { status, title, categoryList } = boardDataModi;
  
  // 수정버튼 onClick 했을 때
  const modifying = (key) => {
    if (modify.length === 0) {
      setModify(key)
    } else if (modify === key && window.confirm("수정testtest")) {
      setModify('')
      axios.patch(`${baseURL}/v1/board/modify`, boardDataModi, { headers }).then((res)=> {
        navigate(`/admin/board_list`);
      }).catch((error)=> {
        console.log(error)
      })
      window.location.reload()
    }
  }

  // 수정할 부분 데이터 불러오기
  useEffect(() => {
    axios.get(`${baseURL}/v1/board/${modify}`, { headers }).then((res) => {
      console.log("수정수정수정", res.data.query);
      setBoardDataModi(res.data.query[0]);
    }).catch(() => {
      console.error("error");
    })
  }, [modify]);

  const onChange = (e) => {
    const { value, name } = e.target;
    setBoardDataModi({
      ...boardDataModi,
      [name]: value,
    })
  }

  ///// 삭제 /////
  const deleteBoardList = async () => {
    if (window.confirm("삭제하시겠습니까?")) {
      await axios.delete(`${baseURL}/v1/board/delete`, { headers }, {
        data: {
          key: modify,
          userUid: userUid
        }
      }).then((res) => {
        alert("삭제되었습니디");
      }).catch((error) => {
        console.error(error)
      })
    }
  }

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
          {boardData.map((v) => {
            return(
              <tbody key={v.key}>
                <tr className={`${modify === v.key ? 'active' : ''}`} >
                  <td>
                    <select 
                      name="status"
                      onChange={onChange}
                      disabled = { modify !== v.key }
                    >
                      <option value="Y">
                        Y
                      </option>
                      <option value="N">
                        N
                      </option>
                    </select>
                  </td>
                  <td>
                    <input 
                      type="text"
                      name = "title"
                      value={modify !== v.key ? v.title : title}
                      onChange={onChange}
                      disabled = { modify !== v.key }
                    ></input>
                  </td>
                  <td>
                    <input 
                      type="text"
                      name = "categoryList"
                      value={modify !== v.key ? v.categoryList : categoryList}
                      onChange={onChange}
                      disabled = { modify !== v.key }
                    ></input>
                  </td>
                  <td>
                    <button 
                      className='modify' 
                      onClick={() => {modifying(v.key)}}
                    >수정</button>
                    <button 
                      className='delete' 
                      onClick={() => {deleteBoardList()}}
                    >삭제</button>
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

export default AdminBoardList;
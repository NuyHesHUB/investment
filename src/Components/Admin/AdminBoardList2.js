import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate  } from "react-router-dom";
import axios from 'axios';
///// style /////
import {Wrap} from "./StyledAdminBoard2"
import Admin from "./Admin"

const AdminBoardList2 = () => {
  const baseURL = process.env.REACT_APP_BASEURL;
  const navigate = useNavigate();

  ///// JWT /////
  const accessToken = sessionStorage.getItem('accessToken'); 
  const userUid = sessionStorage.getItem('userUid');
  const headers = {
    Authorization: `${accessToken}`
  }

  ///// 데이터 가져오기 /////
  const [boardDataModi, setBoardDataModi] = useState([]); // 수정할 게시판 데이터 값
  const [modify, setModify] = useState([]); // 수정 버튼 활성화 여부(key값 저장)
  const [boardData, setBoardData] = useState([]);

  useEffect(() => {
    axios.get(`${baseURL}/v1/board?query=&pageRows=&page=`, { headers }).then((res) => {
      console.log("GET START");
      setBoardData(res.data.query);
    }).catch(() => {
      console.error("error");
    })
  }, []);


  //////////////////////////
  ////////// 수정 //////////
  //////////////////////////
  const { status, title, categoryList } = boardDataModi;
  
  ///// 수정버튼 onClick 했을 때 /////
  const modifying = (key) => {
    if (modify.length === 0) {
      setModify(key)
    } else if (modify === key/*  && window.confirm("수정testtest") */) {
      setModify('')
      axios.patch(`${baseURL}/v1/board/modify`, boardDataModi, { headers }).then((res)=> {
        navigate(`/admin/board_list`);
      }).catch((error)=> {
        console.log(error)
      })
      window.location.reload()
    } else if (modify.length) {
      setModify(key)
    }
  }
  // const modifying = (key) => {
  //   if (modify.length === 0) {
  //     setModify(key)
  //   } else if (modify === key && window.confirm("수정testtest")) {
  //     setModify('')
  //     axios.patch(`${baseURL}/v1/board/modify`, boardDataModi, { headers }).then((res)=> {
  //       navigate(`/admin/board_list`);
  //     }).catch((error)=> {
  //       console.log(error)
  //     })
  //     window.location.reload()
  //   }
  // }
  
  ///// 수정할 부분 데이터 불러오기 /////
  // useEffect(() => {
  //   axios.get(`${baseURL}/v1/board?query=&pageRows=&page=`, { headers }).then((res) => {
  //     console.log("수정수정수정", res.data.query);
  //     setBoardDataModi(res.data.query[0]);
  //   }).catch(() => {
  //     console.error("error");
  //   })
  // }, [modify]);
  
  useEffect(() => {
    axios.get(`${baseURL}/v1/board/${modify}`, { headers }).then((res) => {
      // console.log("수정수정수정", res.data.query);
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

  ///// console 테스트 /////
  // console.log("key값확인", boardData[0])
  // console.log("boardDataModi값확인", boardDataModi)
  // console.log("modify값확인", modify)
  
  ///// 삭제 /////
  const deleteBoardList = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      axios.delete(`${baseURL}/v1/board/delete`, { headers }, {
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

  // const deleteBoardList = (e, key) => {
  //   setModify(key)
  //   // const { /* value, */ name } = e.target;
  //   setBoardDataModi({
  //     ...boardDataModi,
  //     status: "N",
  //   })
  //   // if (window.confirm("삭제하시겠습니까?")) {
  //     console.log(e.target,"타겟타겟")
  //     axios.patch(`${baseURL}/v1/board/modify`, boardDataModi, { headers }).then((res)=> {
  //       // navigate(`/admin/board_list`);
  //     }).catch((error) => {
  //       console.error(error)
  //     })
  //   // }
  // }
  
  return(
    <>
      <Admin /> {/* 헤더랑 메뉴 */}
      <Wrap>
        <input type="search" placeholder='검색' className='search' /> <input type="submit" value='검색' />
        <table>
          <thead>
            <tr>
              <th>key</th>
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
                    {v.key}
                  </td>
                  <td>
                    <select 
                      // name="status"
                      // onChange={onChange}
                      // onClick={() => {modifying(v.key)}}
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
                      onChange={ onChange }
                      // onClick={() => {console.log("테스트")}}
                      onClick={() => {modifying(v.key)}}
                      // disabled = { modify !== v.key }
                    ></input>
                  </td>
                  <td>
                    <input 
                      type="text"
                      name = "categoryList"
                      value={modify !== v.key ? v.categoryList : categoryList}
                      onChange={onChange}
                      onClick={() => {modifying(v.key)}}
                      // disabled = { modify !== v.key }
                    ></input>
                  </td>
                  <td>
                    <button 
                      className='modify' 
                      onClick={() => {modifying(v.key)}}
                    >수정</button>
                    <button 
                      name="status"
                      className='delete'
                      onClick={(e) => {deleteBoardList(e, v.key)}}
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

export default AdminBoardList2;
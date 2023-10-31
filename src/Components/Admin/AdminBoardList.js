import React, { useEffect, useState } from 'react';
import { useNavigate  } from "react-router-dom";
import axios from 'axios';
///// style /////
import { CommonStyleFrame, TableFrame } from "./AdminStyledComponents/StyledCommon"
import { Wrap, PopUpWrap } from "./AdminStyledComponents/StyledAdminBoard"
///// import component /////
import Admin from "./Admin"
import SearchForm from "./SearchForm"
///// icon /////
import { HiMiniPlusCircle } from 'react-icons/hi2'

const AdminBoardList = () => {
  const baseURL = process.env.REACT_APP_BASEURL;
  const navigate = useNavigate();
  ///// JWT /////
  const accessToken = sessionStorage.getItem('accessToken'); 
  const userUid = sessionStorage.getItem('userUid');
  const headers = {
    Authorization: `${accessToken}`
  }
  /////////////////////////////////////
  //    boardList 데이터 가져오기    //
  /////////////////////////////////////
  const [boardData, setBoardData] = useState([]);
  ///// search box /////
  const [status, setStatus] = useState([]);
  const statusChange = (statusValue) => {
    setStatus(statusValue)
  }

  useEffect(() => {
    axios.get(`${baseURL}/v1/board?query=&pageRows=&page=`, { headers }).then((res) => {
      setBoardData(res.data.query);
    }).catch(() => {
      console.error("error");
    })
  }, []);

  //////////////////////////
  //         수정         //
  //////////////////////////

  // input 수정 //
  const inputChange = (e, i) => {
    const { value, name } = e.target
    setBoardData(prevData => {
      const newData = [...prevData]
      newData[i][name] = value
      return newData
    })
  }

  // 수정 버튼 click //
  const modifyBtnClick = (i) => {
    if (window.confirm("수정하시겠습니까?")) {
      axios.patch(`${baseURL}/v1/board/modify`, boardData[i], { headers }).then((res)=> {
        alert("수정하였습니다.")
        navigate(`/admin/board_list`);
      }).catch((error)=> {
        console.log(error)
      })
    }
  }

  //////////////////////////
  //         삭제         //
  //////////////////////////
  const deleteBoardList = (key) => {
    console.log("삭제 테스트", key, userUid, headers)
    if (window.confirm("삭제하시겠습니까?")) {
      axios.delete(`${baseURL}/v1/board/delete`,  {
        data: {
          "key": key
        },
        headers}).then((res) => {
        alert("삭제되었습니디");
        window.location.reload()
      }).catch((error) => {
        console.error(error)
        alert("권한이 없습니다.")
      })
    }
  }

  /////////////////////////
  //    추가버튼 클릭    //
  /////////////////////////
  const [open, setOpen] = useState(false);
  const createBtnClick = () => {
    setOpen(!open)
  }

  const [newBoardList, setNewBoardList] = useState({
    status: "Y",
    key: "",
    title: "",
    authorize : "",
    options: "",
    extraFields: "",
    categoryList: [],
    skins: "",
    userUid: userUid
  });

  const newBoardListCreate = async () => {
    if(window.confirm("추가하시겠습니까?")) {
      if(
        newBoardList.key.length < 4 
        || newBoardList.key.length !== newBoardList.key.replace(/[^A-Za-z]/ig, '').length
      ) {
        alert("게시판 고유키는 4~20자리의 영어소문자, 숫자, 언더바(_)만 사용가능합니다.")  
      } else {
        await axios.post(`${baseURL}/v1/board/form`, newBoardList, { headers }).then((res) => {
        }).catch((error) => {
          console.error(error)
        })
        alert("추가하였습니다")
        setOpen(!open)
      }
    }
  }
  /////////////////////////////
  //    팝업(게시판 추가)    //
  /////////////////////////////
  const onChange = (e, name) => {
    const value = e.target.value
    setNewBoardList({
      ...newBoardList,
      [name]: value
    })
  }

  const cancel = () => {
    setOpen(!open)
  }

  return(
    <>
      <Admin /> {/* 헤더랑 메뉴 */}
      <CommonStyleFrame>
        <Wrap>
          <p className='title'>게시판관리</p>
          <ul className="top">
            <SearchForm 
              statusValue={statusChange} 
              brdKeyNone={true}
              groupNone={true}
            />
            <li className="right-box">
              <button 
                className="createBtn"
                onClick={createBtnClick}
              >
                <HiMiniPlusCircle size={35} color='#96aee2' />
              </button>
            </li>
          </ul>
          <TableFrame>
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
                    <tr>
                      <td>
                        {v.key}
                      </td>
                      <td>
                        <select 
                          name="status"
                          onChange={(e) => inputChange(e, i)}
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
                          name="title"
                          value={v.title}
                          onChange={(e) => inputChange(e, i)}
                        />
                      </td>
                      <td>
                        <input 
                          type="text"
                          name="categoryList"
                          value={v.categoryList}
                          onChange={(e) => inputChange(e, i)}
                        />
                      </td>
                      <td>
                        <button 
                          className='modifyBtn' 
                          onClick={() => modifyBtnClick(i)}
                        >수정</button>

                        <button 
                          name="status"
                          className='deleteBtn'
                          onClick={() => {deleteBoardList(v.key)}}
                        >삭제</button>
                      </td>
                    </tr>
                  </tbody>
                )
              })}
            </table>
          </TableFrame>
      

          {/* 게시판 리스트 추가 팝업창 */}
          <PopUpWrap className={open ? "active" : ''}>
            <div 
              className="background"
              onClick={cancel}
            ></div>
            <div className="popup">
              <div className="popup-top">
                <button
                  className="create-btn"
                  onClick={newBoardListCreate}
                >추가</button>
                <button
                  className="cancel-btn"
                  onClick={cancel}
                >X</button> {/* 취소버튼 */}
              </div>
              <table>
                <tbody>
                  <tr>
                    <th>key</th>
                    <td>
                      <input 
                        type="text"
                        name="key"
                        maxLength='20'
                        onChange={(e) => onChange(e, "key")}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>status</th>
                    <td>
                      <select 
                        name="status"
                        onChange={(e) => onChange(e, "status")}
                      >
                        <option value="Y">
                          Y
                        </option>
                        <option value="N">
                          N
                        </option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <th>title</th>
                    <td>
                      <input 
                        type="text"
                        name="title"
                        onChange={(e) => onChange(e, "title")}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>authorize</th>
                    <td>
                      <input 
                        type="text"
                        name="" 
                        disabled={true}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>options</th>
                    <td>
                      <input 
                        type="text"
                        name="options" 
                        disabled={true}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>extraField</th>
                    <td>
                      <input 
                        type="text"
                        name="extraField" 
                        disabled={true}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>categoryList</th>
                    <td>
                      <input 
                        type="text"
                        name="categoryList" 
                        onChange={(e) => onChange(e, "categoryList")}
                        disabled={true}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>skins</th>
                    <td>
                      <input 
                        type="text"
                        name="skins" 
                        disabled={true}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </PopUpWrap>
        </Wrap>
      </CommonStyleFrame>
    </>
  )
}
export default AdminBoardList;
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate  } from "react-router-dom";
import axios from 'axios';

import { Wrap } from "./StyledAdminCreateBoardList"

const CreateBoardList = ({open, setOpen, test}) => {
  
  const baseURL = process.env.REACT_APP_BASEURL;
  const navigate = useNavigate();

  console.log(open,"open")
  ///// JWT /////
  const accessToken = sessionStorage.getItem('accessToken'); 
  const userUid = sessionStorage.getItem('userUid');
  const headers = {
    Authorization: `${accessToken}`
  }

  const [newBoardList, setNewBoardList] = useState({
    status: "",
    key: "",
    title: "",
    authorize : "",
    options: "",
    extraFields: "",
    categoryList: [],
    skins: "",
    userUid: userUid
});

  const createBtnClick = async () => {
    console.log("updateBtnClick 테스트")
    if(window.confirm("추가하시겠습니까?")) {
      await axios.post(`${baseURL}/v1/board/form`, newBoardList,{ headers }).then((res) => {
        console.log("추가test")
      }).catch((error) => {
        console.error(error)
      })
    }
  }

  const onChange = (e, name) => {
    const value = e.target.value
    setNewBoardList({
      ...newBoardList,
      [name]: value
    })
    console.log("onchange test", e.target.value, newBoardList)
  }


  
  ////////////////////
  ///// 취소하기 /////
  ////////////////////
  const [cancelBtn, setCancelBtn] = useState(false);

  // open = false
  const cancel = () => {
    open = !open
    console.log('props확인', open, test)
  }

  //********나중에 할 거********//
  // const categoryList = (e, name) => {
  //   const value = e.target.value
  //   setNewBoardList({
  //     ...newBoardList,
  //     [name]: value
  //   })
  //   console.log("onchange test", e.target.value, newBoardList)
  // }
  //카테고리 리스트 배열로 추가

  // console.log('props name 확인', open, test)

  return (
    <>
    {open ? ( 
    <Wrap 
      
      // className={"active"}
    >
      <div 
        className="background"
        // onClick={maskClosable ? onMaskClick : null}
        // tabIndex="-1"
        // visible={visible}
        // onClick={cancel}
      ></div>
      
      <div className="popup">
        <div className="btn-box">
          <button
            className="createBtn"
            onClick={createBtnClick}
          >추가</button>
          <button
            className="cancelBtn"
            onClick={cancel}
          >X</button> {/* 삭제버튼 */}
        </div>
        <table>
          <tbody>
            <tr>
              <th>key</th>
              <td>
                <input 
                  type="text"
                  name="key"
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

    </Wrap>) : null}
    </>
  )
}

export default CreateBoardList;
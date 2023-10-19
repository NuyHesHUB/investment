import React, { useEffect, useState } from 'react';
import { useNavigate  } from "react-router-dom";
import axios from 'axios';
///// style /////
import { CommonStyleFrame, TableFrame, Modify } from "./AdminStyledComponents/StyledCommon"
import { Wrap, PageNation,  } from "./AdminStyledComponents/StyledAdminMemberList"
///// import component /////
import Admin from "./Admin"
import Pagenation from "./Pagenation"


const AdminMemberList = () => {
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
  const [memberData, setMemberData] = useState([]);
  //페이지네이션데이터
  const [page, setPage] = useState(1); // 현재 페이지
  const [pageRows, setPageRows] = useState(2); // 한 페이지에 보여질 데이터 개수
  const [totalRows, setTotalRows] = useState(0); //데이터 정보 개수
  const [endPage, setEndPage] = useState(10); // 페이지네이션 단위
  const [count, setCount] = useState(0); 

  useEffect(() => {
    axios.get(`${baseURL}/v1/users/?query=&pageRows=${pageRows}&page=${page}`, { headers }).then((res) => {
      setMemberData(res.data.query);
      setTotalRows(res.data.totalRows);
    }).catch(() => {
      console.error("error");
    })
  }, [page, pageRows]);
  
  const changePageSize = (e) => {
    setPageRows(e.target.value)
    setPage(1)
    setCount(0)
  }
  ///////////////////////
  ///// 수정 팝업창 /////
  ///////////////////////
  //// 업체 수정
  const [idx, setIdx] = useState(0);
  const [open, setOpen] = useState(false);
  // 수정 팝업창 열기
  const modifyOpen = (i) => {
    setOpen(true)
    setIdx(i)
  }
  // 수정 btn Click
  const modifyBtnClick = () => {
    if (window.confirm("수정하시겠습니까?")) {
      axios.patch(`${baseURL}/v1/users/modify/${userUid}`, memberData[idx], { headers }).then((res)=> {
        navigate(`/admin/member_list`);
        setOpen(false)
      }).catch((error)=> {
        console.log(error)
      })
    }
  }
  //수정 팝업창 닫기 버튼
  const cancel = () => {
    setOpen(!open)
  }
  const inputChange = (e, i) => {
    const { value, name } = e.target
    setMemberData(prevData => {
      const newData = [...prevData]
      newData[i][name] = value
      return newData
    })
    console.log("inputChange", value, name)
  }

  return (
    <>
      <Admin /> {/* 헤더랑 메뉴 */}
      <CommonStyleFrame>
        <Wrap>
          <p>회원목록</p>
          <ul className="top">
            <li className="left-box">
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
                  <th>group</th>
                  <th>isAdmin</th>
                  <th>local</th>
                  <th>kakao</th>
                  <th>naver</th>
                  <th>id</th>
                  <th>email</th>
                  <th>nickname</th>
                  <th>phone</th>
                  <th>regDt</th>
                  <th>수정</th>
                </tr>
              </thead>
              {memberData.map((v,i) => {
                return(
                  <tbody key={v.brdKey}>
                    <tr>
                      <td>
                        {v.group}
                      </td>
                      <td>
                        {v.isAdmin}
                      </td>
                      <td>
                        {v.local}
                      </td>
                      <td>
                        {v.kakao}
                      </td>
                      <td>
                        {v.naver}
                      </td>
                      <td>
                        {v.loginId}
                      </td>
                      <td>
                        {v.email}
                      </td>
                      <td>
                        {v.nickname}
                      </td>
                      <td>
                        {v.phone}
                      </td>
                      <td>
                        {v.regDt}
                      </td>
                      <td>
                        <button 
                          className='modifyBtn' 
                          onClick={() => modifyOpen(i)}
                        >수정</button>
                      </td>
                    </tr>
                  </tbody>
                )
              })}
            </table>
          </TableFrame>
          <Pagenation page={page} setPage={setPage} pageRows={pageRows} setPageRows={setPageRows} totalRows={totalRows} setTotalRows={setTotalRows} endPage={endPage} count={count} setCount={setCount} setEndPage={setEndPage} />

           {/***** 수정 팝업 창  *****/}
           {memberData.length&& 
            <Modify className={open ? 'active' : ''}>
              <div 
                className="background"
                onClick={cancel}
              ></div>
              <div className="popup">
                <div className="popup-top">
                  <button
                    className="modify-btn"
                    onClick={() => modifyBtnClick(memberData[idx].businessNum)}
                  >수정</button>
                  <button
                    className="cancel-btn"
                    onClick={cancel}
                  >X</button>
                </div>
                <TableFrame>
                  <table>
                    <tbody>
                      <tr>
                        <th>id</th>
                        <td>{memberData[idx].group}</td>
                      </tr>
                      <tr>
                        <th>isAdmin</th>
                        <td>
                          {memberData[idx].isAdmin}
                        </td>
                      </tr>
                      <tr>
                        <th>kakao</th>
                        <td>
                          {memberData[idx].kakao}
                        </td>
                      </tr>
                      <tr>
                        <th>naver</th>
                        <td>
                          {memberData[idx].naver}
                        </td>
                      </tr>
                      <tr>
                        <th>loginId</th>
                        <td>
                          {memberData[idx].loginId}
                        </td>
                      </tr>
                      <tr>
                        <th>email</th>
                        <td>
                          <input 
                              type="text" 
                              name="email"
                              value={memberData[idx].email}
                              onChange={(e) => inputChange(e, idx)}
                            />
                        </td>
                      </tr>
                      <tr>
                        <th>nickname</th>
                        <td>
                          <input 
                              type="text" 
                              name="nickname"
                              value={memberData[idx].nickname}
                              onChange={(e) => inputChange(e, idx)}
                            />
                        </td>
                      </tr>
                      <tr>
                        <th>phone</th>
                        <td>
                          {memberData[idx].phone}
                        </td>
                      </tr>
                      <tr>
                        <th>regDt</th>
                        <td>
                          {memberData[idx].regDt}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </TableFrame>
              </div>
            </Modify>
            }
        </Wrap>
      </CommonStyleFrame>
    </>
  )
};
export default AdminMemberList;
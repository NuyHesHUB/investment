import React, { useEffect, useState } from 'react';
import { useNavigate  } from "react-router-dom";
import axios from 'axios';
///// style /////
import { CommonStyleFrame, TableFrame, Modify } from "./AdminStyledComponents/StyledCommon"
import { Wrap, PageNation,  } from "./AdminStyledComponents/StyledAdminMemberList"
///// import component /////
import Admin from "./Admin"
import Pagenation from "./Pagenation"
import SearchForm from "./SearchForm"

const AdminMemberList = () => {
  const baseURL = process.env.REACT_APP_BASEURL;
  const navigate = useNavigate();
  ///// JWT /////
  const accessToken = sessionStorage.getItem('accessToken'); 
  const userUid = sessionStorage.getItem('userUid');
  // const uid = userUid === null ? '' : userUid
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

  ///// search box /////
  const [status, setStatus] = useState([]); //status filter
  const [group, setGroup] = useState([]); //group filter
  const statusChange = (statusValue) => {
    setStatus(statusValue)
  }
  const groupChange = (groupValue) => {
    setGroup(groupValue)
  }

  ///// 데이터 불러오기 /////
  useEffect(() => {
    axios.get(`${baseURL}/v1/users/?query=&pageRows=${pageRows}&page=${page}`, { headers }).then((res) => {
      setMemberData(res.data.query);
      setTotalRows(res.data.totalRows);
    }).catch(() => {
      console.error("error");
    })
  }, [page, pageRows]);

  useEffect(() => {
    axios.get(`${baseURL}/v1/users/123456`, { headers }).then((res) => {
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
  const modifyOpen = (index) => {
    setOpen(true)
    setIdx(index)
  }
  // console.log( memberData[1],"인덱스테스ㅡ트",idx)
  // 수정 btn Click
  const modifyBtnClick = (uid) => {
    console.log("인덱스테스ㅡ트",idx,memberData[idx])
    if (window.confirm("수정하시겠습니까?")) {
      axios.patch(`${baseURL}/v1/users/modify/${userUid}`, memberData[idx], { headers }).then((res)=> {
        alert("수정하였습니다.")
        navigate(`/admin/member_list`);
        setOpen(false)
      }).catch((error)=> {
        console.log(error)
        alert("에러에러")
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
          <p className='title'>회원관리</p>
          <ul className='top'>
            <SearchForm 
              statusValue={statusChange} 
              groupValue={groupChange}
              brdKeyNone={true}
            />
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
              <tbody>
              {memberData.map((item,index) => {
                return(
                    <tr key={index}>
                      <td>
                        {item.group}
                      </td>
                      <td>
                        {item.isAdmin}
                      </td>
                      <td>
                        {item.local}
                      </td>
                      <td>
                        {item.kakao}
                      </td>
                      <td>
                        {item.naver}
                      </td>
                      <td>
                        {item.loginId}
                      </td>
                      <td>
                        {item.email}
                      </td>
                      <td>
                        {item.nickname}
                      </td>
                      <td>
                        {item.phone}
                      </td>
                      <td>
                        {item.regDt.split("T")[0]} {item.regDt.split("T")[1].slice(0,8)}
                      </td>
                      <td>
                        <button 
                          className='modifyBtn' 
                          onClick={() => modifyOpen(index)}
                        >수정</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
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
                    onClick={() => modifyBtnClick()}
                    // onClick={() => modifyBtnClick(memberData[idx].uid)}
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
                        <th>group</th>
                        <td>
                          <select 
                              name="group"
                              value={memberData[idx].group}
                              onChange={(e) => inputChange(e, idx)}
                            >
                              <option value="일반">일반</option>
                              <option value="업체">업체</option>
                              <option value="관리자">관리자</option>
                            </select>
                          </td>
                      </tr>
                      <tr>
                        <th>isAdmin</th>
                        <td>
                          {/* <input 
                              type="text" 
                              name="isAdmin"
                              value={memberData[idx].isAdmin}
                              onChange={(e) => inputChange(e, idx)}
                            /> */}
                            <select 
                              name="isAdmin"
                              value={memberData[idx].isAdmin}
                              onChange={(e) => inputChange(e, idx)}
                            >
                              <option value="Y">Y</option>
                              <option value="N">N</option>
                            </select>
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
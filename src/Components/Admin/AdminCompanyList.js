import React, { useEffect, useState } from 'react';
import { useNavigate  } from "react-router-dom";
import axios from 'axios';
///// style /////
import { Wrap, Modify } from "./AdminStyledComponents/StyledAdminCompanyList";
import { CommonStyleFrame, TableFrame } from "./AdminStyledComponents/StyledCommon"
///// import component /////
import Admin from "./Admin"
import Pagenation from "./Pagenation"

const AdminCompanyList = () => {
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
  const [companyData, setCompanyData] = useState([]);
  //페이지네이션데이터
  const [page, setPage] = useState(1); // 현재 페이지
  const [pageRows, setPageRows] = useState(2); // 한 페이지에 보여질 데이터 개수
  const [totalRows, setTotalRows] = useState(0); //데이터 정보 개수
  const [endPage, setEndPage] = useState(10); // 페이지네이션 단위
  const [count, setCount] = useState(0); 

  useEffect(() => {
    axios.get(`${baseURL}/v1/company?query&pageRows=${pageRows}&page=${page}&status`, { headers }).then((res) => {
      console.log("GET START", res.data.totalRows);
      setCompanyData(res.data.query);
      setTotalRows(res.data.totalRows);
    }).catch(() => {
      console.error("error");
    })
  }, [page, pageRows]); //FIXME: pageRow랑 Page 안 먹히는 거 고치기

  const changePageSize = (e) => {
    setPageRows(e.target.value)
    setPage(1)
    setCount(0)
  }
  
  //// 업체 수정
  const [idx, setIdx] = useState(0);
  const modifyBtnClick = (businessNum) => {
    if (window.confirm("수정하시겠습니까?")) {
      axios.patch(`${baseURL}/v1/company/modify/${businessNum}`, companyData[idx], { headers }).then((res)=> {
        navigate(`/admin/company_list`);
        setOpen(false)
      }).catch((error)=> {
        console.log(error)
      })
    }
  }

  ///////////////////////
  ///// 수정 팝업창 /////
  ///////////////////////
  const [open, setOpen] = useState(false);
  // 수정 팝업창 열기
  const modifyOpen = (i) => {
    setOpen(true)
    setIdx(i)
  }
  //수정 팝업창 닫기 버튼
  const cancel = () => {
    setOpen(!open)
  }
  const inputChange = (e, i) => {
    const { value, name } = e.target
    setCompanyData(prevData => {
      const newData = [...prevData]
      newData[i][name] = value
      return newData
    })
    console.log("inputChange", value, name)
  }
  
  return(
    <>
      <Admin /> {/* 헤더랑 메뉴 */}
      <CommonStyleFrame>
        <Wrap>
          <p>업체관리</p>
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
                  <th>id</th>
                  <th>status</th>
                  <th>loginId</th>
                  <th>nickname</th>
                  <th>companyName</th>
                  <th>businessNum</th>
                  <th>representativeName</th>
                  <th>regDt</th>
                  <th>수정/삭제</th>
                </tr>
              </thead>
              <tbody>
              {companyData.map((item, i) => {
                return(
                  <tr key={item.id}>
                    <td>
                      {item.id}
                    </td>
                    <td>
                      {item.status}
                    </td>
                    <td>
                      {item.loginId}
                    </td>
                    <td>
                      {item.nickname}
                    </td>
                    <td>
                      {item.companyName}
                    </td>
                    <td>
                      {item.businessNum}
                    </td>
                    <td>
                      {item.representativeName}
                    </td>
                    <td>
                      {item.regDt}
                    </td>
                    <td>
                      <button
                        onClick={() => modifyOpen(i)}
                      >수정</button>
                      <button>삭제</button>
                    </td>
                  </tr>
                )
              })}
              </tbody>
            </table>
          </TableFrame>
          <Pagenation page={page} setPage={setPage} pageRows={pageRows} setPageRows={setPageRows} totalRows={totalRows} setTotalRows={setTotalRows} endPage={endPage} count={count} setCount={setCount} setEndPage={setEndPage} />

          {/***** 수정 팝업 창  *****/}
          {companyData.length&& 
            <Modify className={open ? 'active' : ''}>
              <div 
                className="background"
                onClick={cancel}
              ></div>
              <div className="popup">
                <div className="popup-top">
                  <button
                    className="modify-btn"
                    onClick={() => modifyBtnClick(companyData[idx].businessNum)}
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
                        <td>{companyData[idx].id}</td>
                      </tr>
                      <tr>
                        <th>status</th>
                        <td>
                          <select 
                            name="status" 
                            defaultValue={companyData[idx].status}
                            onChange={(e) => inputChange(e, idx)}
                          >
                            <option value="Y">Y</option>
                            <option value="N">N</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <th>loginId</th>
                        <td>
                          {companyData[idx].loginId}
                        </td>
                      </tr>
                      <tr>
                        <th>nickname</th>
                        <td>
                          {companyData[idx].nickname}
                        </td>
                      </tr>
                      <tr>
                        <th>companyName</th>
                        <td>
                          <input 
                            type="text" 
                            name="companyName"
                            value={companyData[idx].companyName}
                            onChange={(e) => inputChange(e, idx)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>businessNum</th>
                        <td>
                          <input 
                            type="text" 
                            name="businessNum"
                            value={companyData[idx].businessNum}
                            // onChange={(e) => inputChange(e, idx)}
                            disabled
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>representativeName</th>
                        <td>
                          <input 
                            type="text" 
                            name="representativeName"
                            value={companyData[idx].representativeName}
                            onChange={(e) => inputChange(e, idx)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>regDt</th>
                        <td>
                          {companyData[idx].regDt.split("T")[0]}
                          &nbsp;
                          {companyData[idx].regDt.split("T")[1].slice(0,8)}
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
}
export default AdminCompanyList;
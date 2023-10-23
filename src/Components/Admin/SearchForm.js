import React, { useState } from 'react';

import styled from 'styled-components';
export const SearchFormWrap = styled.div`
  .none {display: none;}
  select {margin-left: 7px; height: 20px;}
 ///// 검색 박스 /////
 .left-box {
    color: #555;
    display: flex;
    justify-content: space-between;
    align-items: end;
  }
  //상태값 검색
  .left-box .search-status-box,
  .left-box .search-group-box {
    display: flex;
    align-items: center;
    input {margin: 0 3px 0 8px;}
  }
  .search-btn {
    border: none;
    height: 23px; 
    padding: 2px 5px; 
    border-radius: 3px; 
    cursor: pointer;
    background: #cbcdd4; //임시색
    color: #fff;
  }
  .search-input {
    margin-right: 5px;
    border-radius: 3px;
    border: 1px solid #ccc;
    padding: 3px 5px;
  }
`


const SearchForm = (props) => {
  const [status, setStatus] = useState([]); //status filter
  const [group, setGroup] = useState([]); //group filter
  const [key, setKey] = useState([]); //key filter
  ///// status change /////
  const statusChange = (e) => {
    const value = e.target.value
    if (status.includes(value)) {
      setStatus(
        status.filter(i => i !== value)
      )
      props.statusValue(status)
    } else {
      setStatus(
        status => [...status, e.target.value]
      )
      props.statusValue(status)
    }
  }
  const groupChange = (e) => {
    const value = e.target.value
    if (status.includes(value)) {
      setGroup(
        group.filter(i => i !== value)
      )
      props.groupValue(group)
    } else {
      setGroup(
        group => [...group, e.target.value]
      )
      props.groupValue(group)
    }
  }
   ///// key값 change /////
   const keyChange = (e) => {
    setKey(e.target.value)
    props.keyValue(group)
  }

  return (
    <SearchFormWrap>
      <li className="left-box">
        <form action="">
          <div className={props.statusNone ? "none" : 'search-status-box'}>
              상태값
            <label htmlFor="statusY">
              <input 
                id='statusY' 
                type="checkbox" 
                value={"N"} 
                onChange={(e) => statusChange(e)} 
              />
              N
            </label>
            <label htmlFor="statusN">
              <input 
                id='statusN' 
                type="checkbox" 
                value={"Y"} 
                onChange={(e) => statusChange(e)} 
              />
              Y
            </label>
          </div>
          
          <div className={props.groupNone ? "none" : 'search-group-box'}>
            그룹값
            <label htmlFor="regular">
              <input 
                id='regular' 
                type="checkbox" 
                value={"일반"} 
                onChange={(e) => groupChange(e)} 
              />
              일반
            </label>
            <label htmlFor="company">
              <input
                id='company'
                type="checkbox"
                value={"업체"}
                onChange={(e) => groupChange(e)}
              />
              업체
            </label>
            <label htmlFor="Admin">
              <input
                id='Admin'
                type="checkbox"
                value={"관리자"}
                onChange={(e) => groupChange(e)}
              />
              관리자
            </label>
          </div>
          <div>
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
          </div>
        </form>
        {/* brdKey 선택 */}
        <select 
          name="brdKey" 
          id=""
          className={props.brdKeyNone ? "none" : ''}
          onChange={(e) => keyChange(e)}
        >
          <option value="investment">investment</option>
          <option value="free">free</option>
        </select>
      </li>
      <li className="right-box">
        {/* <select
          className='page-size'
          onChange={(e) => changePageSize(e)}
        >
          <option value={2}>2개씩</option>
          <option value={4}>4개씩</option>
          <option value={6}>6개씩</option>
          <option value={10}>10개씩</option>
        </select> */}
      </li>
    </SearchFormWrap>
  )
}
export default SearchForm;
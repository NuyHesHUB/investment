import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi'

import styled from 'styled-components';
export const SearchFormWrap = styled.div`
  .none {display: none;}
  select {
    margin-left: 7px; 
    height: 20px;
    border: none;
    background: #eee;
    height: 23px;
  }
 .left-box {
    color: #555;
    display: flex;
    justify-content: space-between;
    align-items: end;
    font-size: 14px;
  }
  //상태값 검색
  .left-box .search-status-box,
  .left-box .search-group-box {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    font-weight: 300;
    input {margin: 0 3px 0 8px;}
  }
  .search-box {display: flex;}
  span {font-weight: 500;}
  label.search-btn-label {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .search-btn {
    display: none;
  }
  .search-input {
    margin-right: 5px;
    border-radius: 3px;
    border: none;
    border-bottom: 1px solid #ccc;
    margin-top: 5px;
    padding: 3px 5px;
  }
  .search-input::placeholder {color: #ccc;}

  @media (max-width: 768px) {
  }

  @media (max-width: 480px) {
    .left-box {
      flex-direction: column;
      align-items: start;
    }
    select {
      margin: 5px 0 0;
    }
  }
  
`


const SearchForm = (props) => {
  const [status, setStatus] = useState([]); //status filter
  const [group, setGroup] = useState([]); //group filter
  const [key, setKey] = useState(''); //key filter
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
    const value = e.target.value
    setKey(value)
    props.keyValue(key)
  }

 

  return (
    <SearchFormWrap>
      <li className="left-box">
        <form action="">

          {/* 상태값 */}
          <div className={props.statusNone ? "none" : 'search-status-box'}>
              <span>상태값 |</span>
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
          
          {/* 그룹값 */}
          <div className={props.groupNone ? "none" : 'search-group-box'}>
            <span>그룹값 |</span>
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

          {/* 검색창  */}
          <div className='search-box'>
            <input 
              type="search" 
              placeholder='검색어 입력' 
              className='search-input' 
            />
            <label htmlFor="search-btn" className='search-btn-label'>
              <BiSearch size={25} color='#999' />
            </label>
            <input 
              id='search-btn'
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

    </SearchFormWrap>
  )
}
export default SearchForm;
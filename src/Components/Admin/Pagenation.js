import React, { useEffect, useState } from 'react';
import { useNavigate  } from "react-router-dom";
import axios from 'axios';

import styled from 'styled-components';
export const PageNation = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  button {
    background: none;
    color: #555;
    font-family: 'Pretendard-Regular';
    font-size: 16px; 
    padding: 10px 10px; 

  }
  button:disabled {color: #ccc; cursor: default;}
  button.current-page {color: blue ;}
  button#num {
    background: none; 
    padding: 10px 10px; 
  }
  div.box {
    /* background: pink; */
  }
`

const Pagenation = ({ page, headers, pageRows, totalRows, endPage, count }) => {
  // const baseURL = process.env.REACT_APP_BASEURL;

  // const [page, setPage] = useState(1); // 현재 페이지
  // const [pageRows, setPageRows] = useState(2); // 한 페이지에 보여질 데이터 개수
  // const [totalRows, setTotalRows] = useState(2); //데이터 정보 개수
  // const [endPage, setEndPage] = useState(10); // 페이지네이션 단위
  // const [count, setCount] = useState(0); 

  const totalPages = Math.ceil((totalRows/pageRows))-(endPage*count)
  return (
    <Pagenation>
      <div className='box'>
        <button 
          onClick = {() => {
            // setPageLimit(pageLimit - 10)
            setCount(count - 1)
            setPage((endPage*(count-1))+1)
          }}
          disabled = {page <= endPage}
        >&lt;&lt;</button>

        <button 
          onClick = {() => {
            setPage(page - 1)
            if (page % endPage === 1) {
              // setPageLimit(pageLimit - 10)
              setCount(count - 1)
            }
            }} 
          disabled = {page === 1}
        >prev</button>
      

        {Array(
          endPage < totalPages ?
          endPage :
          totalPages
          ).fill().map((v,i) => {
          return(
            <button 
              onClick = {() => setPage((endPage*count)+i+1)} 
              className={page === (endPage*count)+i+1 ? "current-page" : ""}
              // id='num'
              key={i}
            >{(endPage*count)+i+1}</button>
          )
        })}

        <button 
          onClick = {() => {
            setPage(page + 1)
            console.log("next")
            if (page % endPage === 0) {
              // setPageLimit(pageLimit + 10)
              setCount(count + 1)
            }
          }}
          // disabled = {totalRows - (page * endPage) < 0}
          disabled = {page === Math.ceil((totalRows/pageRows))}
        >next</button>

        <button 
          onClick = {() => { 
            // setPageLimit(pageLimit + 10)
            setCount(count + 1)
            setPage((endPage*(count+1))+1)
          }}
          // disabled = {pageRows * page >= totalRows || page <= endPage}
          disabled = {!(endPage < totalPages)}
        >&gt;&gt;</button>
      </div>
      {/* 페이지네이션 끝 */}
    </Pagenation>
  )
};
export default Pagenation;
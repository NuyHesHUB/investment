import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import styled from 'styled-components';
export const PagenationWrap = styled.div`
/* background: palegreen; */
  width: 1000px;
  margin: 30px 0;
  display: flex;
  justify-content: center;
  button {
    background: none;
    color: #555;
    font-family: 'Pretendard-Regular';
    font-size: 16px; 
    padding: 10px 10px; 
    border: none;
  }
  button:disabled {color: #ccc; cursor: default;}
  button.current-page {color: #568fe6; font-weight: bold;}
  button#num {
    background: none; 
    padding: 10px 10px; 
  }
  div.box {
    /* background: pink; */
  }
`
const Pagenation = ({ page, setPage, pageRows, setPageRows, totalRows, setTotalRows, endPage, setEndPage, count, setCount }) => {

  const totalPages = Math.ceil((totalRows/pageRows))-(endPage*count)
  return (
    <PagenationWrap>
      <div className='box'>
        <button 
          onClick = {() => {
            setCount(count - 1)
            setPage((endPage*(count-1))+1)
          }}
          disabled = {page <= endPage}
        >&lt;&lt;</button>

        <button 
          onClick = {() => {
            setPage(page - 1)
            if (page % endPage === 1) {
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
              key={i}
            >{(endPage*count)+i+1}</button>
          )
        })}

        <button 
          onClick = {() => {
            setPage(page + 1)
            console.log("next")
            if (page % endPage === 0) {
              setCount(count + 1)
            }
          }}
          disabled = {page === Math.ceil((totalRows/pageRows))}
        >next</button>

        <button 
          onClick = {() => { 
            setCount(count + 1)
            setPage((endPage*(count+1))+1)
          }}
          disabled = {!(endPage < totalPages)}
        >&gt;&gt;</button>
      </div>
    </PagenationWrap>
  )
};
export default Pagenation;
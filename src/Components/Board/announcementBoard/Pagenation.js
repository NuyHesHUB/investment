import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import { 
  HiOutlineChevronDoubleLeft, 
  HiOutlineChevronLeft, 
  HiOutlineChevronDoubleRight, 
  HiOutlineChevronRight, 
} from 'react-icons/hi'

import styled from 'styled-components';
export const PagenationWrap = styled.div`
  width: 1000px;
  margin: 30px auto;
  display: flex;
  justify-content: center;
  .box {display: flex;}
  button {
    background: none;
    color: #555;
    font-family: 'Pretendard-Regular';
    font-size: 16px; 
    padding: 10px 10px; 
    border: none;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  button:disabled {color: #ccc; cursor: default;}
  button.current-page {font-weight: bold;}
  button#num {
    background: none; 
    padding: 10px 10px; 
  }
  .pointer {cursor: pointer;}
  
  ///// 반응형 /////
  @media screen and (max-width: 768px) {
    max-width: 768px;
    min-width: 300px;
    width: calc(100vw - 70px);
  }

  @media screen and (max-width: 480px) {
    button {
      padding: 10px 5px; 
    }
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
        >
          <HiOutlineChevronDoubleLeft className='pointer' />
        </button>

        <button 
          onClick = {() => {
            setPage(page - 1)
            if (page % endPage === 1) {
              setCount(count - 1)
            }
          }} 
          disabled = {page === 1}
        >
          <HiOutlineChevronLeft className='pointer' />
        </button>
      
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
        >
          <HiOutlineChevronRight className='pointer' />
        </button>

        <button 
          onClick = {() => { 
            setCount(count + 1)
            setPage((endPage*(count+1))+1)
          }}
          disabled = {!(endPage < totalPages)}
        >
          <HiOutlineChevronDoubleRight className='pointer' />
        </button>
      </div>
    </PagenationWrap>
  )
};
export default Pagenation;
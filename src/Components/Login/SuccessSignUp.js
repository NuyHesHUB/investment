import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
/* Components */
import Header from '../Header';
import Footer from '../Footer';
/* icons */
import { PiCheckCircleThin } from 'react-icons/pi'
/* styled */
import styled from 'styled-components';
import { Navigate } from 'react-router-dom';

export const StyleFrame = styled.div`
  padding-top: 80px;
`
export const ContainerBox = styled.div`
  padding: 150px;
  margin: 70px auto;
  text-align: center;
  `
export const Inner = styled.div`
  background: #fff;
  margin: 0 500px;
  
  p.txt1 {
    font-size: 30px;
    font-weight: bold;
    margin: 20px auto;
  }
  p.txt2 {
    font-size: 18px;
    margin-bottom: 100px;
    color: #999;
    font-weight: 300;
  }
  .btn-box {
    display: flex;
    flex-direction: column;
  }
  button {
    padding: 20px 0;
    font-size: 20px;
    background: #3fa9f5c2;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color .2s;
    margin: 0 50px;
  }
  button:first-child {
    margin-bottom: 10px;
  }
  button:hover {
    background: #3fa9f5;
  }
`

const SuccessSignUp = () => {
  const navigate = useNavigate();
  return(
    <>
      <Header />
        <StyleFrame>
          <ContainerBox>
            <Inner>
              <PiCheckCircleThin size={120} color='#3fa9f5' />
              <p className='txt1'>회원가입이 완료되었습니다</p>
              <p className='txt2'>지금부터 후핀과 함께 투자 세계를 탐험하며 새로운 경험을 쌓아보세요.</p>
              <div className='btn-box'>
                <button onClick={() => navigate('/investment/ongoing')}>진행 중인 투자 보러 가기</button>
                <button onClick={() => navigate('/business_number_check')}>업체 등록하러 가기</button>
              </div>
            </Inner>
          </ContainerBox>
        </StyleFrame>
      <Footer />
    </>
  )
}
export default SuccessSignUp;
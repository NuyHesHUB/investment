import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
//import component
import Header from "../Header";
import Footer from "../Footer";
// styled
import { Wrap, PriceInfo, PriceCard, TitleBox, Container, Box, Line, TextBox } from "./StyledPaymentInfoPage";
// icon
import { CiEdit, CiDollar, CiPhone } from "react-icons/ci";
import { BsCheck2 } from "react-icons/bs";

const PaymentInfoPage = () => {
  const baseURL = process.env.REACT_APP_BASEURL;
  const userUid = sessionStorage.getItem('userUid');
  const userGroup = sessionStorage.getItem('userGroup');
  const uid = userUid === null ? '' : userUid
  const navigate = useNavigate();
  ///// page log /////
  // useEffect(() => {
  //    axios.post(`${baseURL}/v1/log/movement/form`, { userUid: uid, "page":"결제안내" }).then((res) => {
  //   }).catch((error) => {
  //     console.error(error)
  //   })
  // }, []);

  const navigateLogin = () => {
    if (window.confirm("로그인이 되어 있지 않습니다. 로그인하시겠습니까?")) {
        navigate('/login')
    }
  }
  const checkCompanyRegistration = () => {
      if (!["업체", "관리자"].includes(userGroup)) { 
          window.confirm("업체가 등록되어있지 않습니다. 등록하시겠습니까?") 
          ? navigate('/business_number_check') 
          : navigate('#')
      } else {
          navigate('/company_write')
      }
  }
  return (
    <>
      <Header />
      <Wrap>
        <TitleBox>
          결제 안내
        </TitleBox>
        <PriceInfo>
          <PriceCard>
            <p>투자 등록 1개</p> 
            <p className='price'>₩100,000원</p>
            <p className='surtax'>부가세포함..??</p>
            <p className='while'><span>30</span>일 동안 등록</p>
            <p>
              어쩌구저쩌구어쩌구저쩌구<br />
              어쩌구저쩌구어쩌구저쩌구<br />
              어쩌구저쩌구어쩌구저쩌구<br />
              어쩌구저쩌구어쩌구저쩌구
            </p>
          </PriceCard>
        </PriceInfo>
        <Container>
          <p className='sub-title'>결제 방법</p>
          <Box height="200px">
            <CiEdit className="icon" size={130} />
            <Line />
            <TextBox>
              <span>
                <span className='bold'>업체를 등록한 후, 게시물을 작성합니다<br /></span>
                {/* 1. 상단 메뉴바 <Link className='write' to='/company_write'>글쓰기</Link> 버튼 클릭 <br /> */}
                1. 상단 메뉴바 <span className='write' onClick={userUid ? checkCompanyRegistration : navigateLogin}>글쓰기</span> 버튼 클릭 <br />
                2. 내용 입력 후 등록하기
              </span>
            </TextBox>
          </Box>
          <Box height="200px">
            <CiDollar className="icon" size={130} />
            <Line />
            <TextBox>
              <span>
                <span className='bold'>아래의 계좌로 입금합니다아아아아아아 <br /></span>
                농협 1234-12-123456 | 예금주: 화진로보틱스
              </span>
            </TextBox>
          </Box>
          <Box height="200px">
            <CiPhone className="icon" size={130} />
            <Line />
            <TextBox>
              <span>
                <span className='bold'>아래의 번호로 전화하여 입금은행과 입금자명을 확인합니당<br /></span>
                전화번호: 010-1234-1234
              </span>
            </TextBox>
          </Box>
          <Box height="200px">
            <BsCheck2 className="icon" size={130} />
            <Line />
            <TextBox>
              <span>
                <span className='bold'>입금 확인이 완료되면 게시물이 승인됩니다 <br /></span>
                어쩌구저쩌꾸
              </span>
            </TextBox>
          </Box>
        </Container>
      
      </Wrap>
      <Footer />
    </>
    
  )
}
export default PaymentInfoPage;

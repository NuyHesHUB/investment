import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import component
import Header from "../Header";
import Footer from "../Footer";
// styled
import { Wrap, PriceInfo, TitleBox, Container, Box, Line, TextBox } from "./StyledPaymentInfoPage";
// icon
import { CiEdit, CiDollar, CiPhone, CiSquareCheck } from "react-icons/ci";
import { BsCheck2 } from "react-icons/bs";

const PaymentInfoPage = () => {
  const baseURL = process.env.REACT_APP_BASEURL;
  const accessToken = sessionStorage.getItem('accessToken'); 
  const userUid = sessionStorage.getItem('userUid');
  useEffect(async () => {
    await axios.post(`${baseURL}/v1/log/movement/form`, userUid).then((res) => {
    }).catch((error) => {
      console.error(error)
    })
  }, []);

  return (
    <>
      <Header />
      <Wrap>
        <TitleBox>
          결제 안내
        </TitleBox>
        <PriceInfo>
          <Box width="500px" height="96%">
            1개당 100,000만원
            asdasdasdasdasda
            asdadsdadsdasdasdasad
          </Box>
        </PriceInfo>
        <Container>
          <Box height="150px" justifyContent="space-between">
            <CiEdit size={150} color='#aaa' />
            <Line />
            <TextBox>
              <span>
                업체를 등록한 후, 게시물을 작성합니다아아아아아아아아아아아 <br />
                1. 상단 메뉴바 글쓰기 버튼 클릭 <br />
                2. 내용 입력 후 등록 ㅁㄴㅇㅁㄴㅇㅁㄴㅇ
              </span>
            </TextBox>
          </Box>
          <Box height="150px" justifyContent="space-between">
            <CiDollar size={150} color='#aaa' />
            <Line />
            <TextBox>
              <span>
                입금합니다아아아아아아 <br />
                입금계좌: 1234-12-123456 | 입금은행: 농협
              </span>
            </TextBox>
          </Box>
          <Box height="150px" justifyContent="space-between">
            <CiPhone size={150} color='#aaa' />
            <Line />
            <TextBox>
              <span>
                전화합니다아아아아아아 입금은행 입금자명 확인 ㅁㄴㅇㅁㄴㅇ <br />
                번호: 010-1234-1234
              </span>
            </TextBox>
          </Box>
          <Box height="150px" justifyContent="space-between">
            <BsCheck2 size={150} color='#aaa' />
            <Line />
            <TextBox>
              <span>
                입금 확인 완료 후 게시물을 승인합니다?????????? <br />
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

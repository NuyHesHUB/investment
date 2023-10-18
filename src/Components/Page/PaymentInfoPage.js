import React, { useEffect, useState } from 'react';
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
  const uid = userUid === null ? '' : userUid
  ///// page log /////
  useEffect(() => {
     axios.post(`${baseURL}/v1/log/movement/form`, { userUid: uid, "page":"결제안내" }).then((res) => {
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
          <PriceCard>
            <p>투자 등록 1개</p> 
            <p className='price'>₩100,000원</p>
            <p className='surtax'>부가세포함..??</p>
            <p className='while'>nn일 동안 등록</p>
            <p>
              어쩌구저쩌구어쩌구저쩌구<br />
              어쩌구저쩌구어쩌구저쩌구<br />
              어쩌구저쩌구어쩌구저쩌구<br />
              어쩌구저쩌구어쩌구저쩌구
            </p>
          </PriceCard>
        </PriceInfo>
        <Container>
          <Box height="150px">
            <CiEdit size={130} color='#aaa' />
            <Line />
            <TextBox>
              <span>
                업체를 등록한 후, 게시물을 작성합니다<br />
                1. 상단 메뉴바 <span>글쓰기</span> 버튼 클릭 <br />
                2. 내용 입력 후 등록하기
              </span>
            </TextBox>
          </Box>
          <Box height="150px">
            <CiDollar size={130} color='#aaa' />
            <Line />
            <TextBox>
              <span>
                아래의 계좌로 입금합니다아아아아아아 <br />
                입금계좌: 1234-12-123456 | 입금은행: 농협
              </span>
            </TextBox>
          </Box>
          <Box height="150px">
            <CiPhone size={130} color='#aaa' />
            <Line />
            <TextBox>
              <span>
                전화합니다아아아아아아 입금 은행과 입금자명 확인<br />
                전화번호: 010-1234-1234
              </span>
            </TextBox>
          </Box>
          <Box height="150px">
            <BsCheck2 size={130} color='#aaa' />
            <Line />
            <TextBox>
              <span>
                입금 확인이 완료되면 게시물이 승인됩니다.?????????? <br />
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

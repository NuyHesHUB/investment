import React, { useEffect, useState } from 'react';
//import component
import Header from "../Header"
// styled
import { Wrap, TitleBox, Container, Box, Line } from "./StyledPaymentInfoPage"
// icon
import { CiEdit, CiDollar, CiPhone, CiSquareCheck } from "react-icons/ci";
import { BsCheck2 } from "react-icons/bs";

const PaymentInfoPage = () => {


  return (
    <>
      <Header />
      <Wrap>
        <TitleBox>
          결제 안내
        </TitleBox>
        <Container>
          <Box>
            <CiEdit size={150} color='#555' />
            <Line />
            <span>
              어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구 <br />
              어쩌구저쩌꾸
            </span>
          </Box>
          <Box>
            <CiDollar size={150} color='#555' />
            <Line />
            <span>
              어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구 <br />
              어쩌구저쩌꾸
            </span>
          </Box>
          <Box>
            <CiPhone size={150} color='#555' />
            <Line />
            <span>
              어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구 <br />
              어쩌구저쩌꾸
            </span>
          </Box>
          <Box>
            <BsCheck2 size={150} color='#555' />
            <Line />
            <span>
              어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구 <br />
              어쩌구저쩌꾸
            </span>
          </Box>
        </Container>
      </Wrap>
    </>
    
  )
}
export default PaymentInfoPage;

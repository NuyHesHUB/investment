import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
/* Import Component */
import Header from "../../Header"
import Footer from "../../Footer"
/* Log */
import PageLog from '../../../Hook/PageLog'
/* Styled-Components */
import { StyledFrame } from '../../StyledComponents/StyledHome';
import {  } from './StyledAnnouncementBoard';

const Announcement = () => {
  const baseURL = process.env.REACT_APP_BASEURL;
  // const navigate = useNavigate();
  ///// JWT /////
  const accessToken = sessionStorage.getItem('accessToken'); 
  const headers = {
    Authorization: `${accessToken}`
  }

   /* page log */
  // PageLog("공지사항");

  useEffect(() => {
    axios.get(`${baseURL}/v1/board/:key/post?query&pageRows=&page=&category=&status=&condition=`, { headers }).then((res) => {
      console.log(res,"공지사항게시글테스트")
    }).catch((error) => {
      console.log(error,"공지사항ERROR")
    })
  },[])



  return(
    <>
      <Header />
      <StyledFrame>

      </StyledFrame>
      <Footer />
    </>
  )


}
export default Announcement;
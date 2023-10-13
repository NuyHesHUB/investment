import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

import Header from '../Header'

import { Wrap, Container, Inner } from './StyledBusinessNumberCheck'

const BusinessNumberCheck = () => {
  const baseURL = process.env.REACT_APP_BASEURL;
  const navigate = useNavigate();
  ///// JWT /////
  const accessToken = sessionStorage.getItem('accessToken'); 
  const userUid = sessionStorage.getItem('userUid');
  const headers = {
    Authorization: `${accessToken}`
  }

  // 진위 확인 버튼
  const [businessNum, setBusinessNum] = useState({
    b_no: ""
  });
  

  const checkBtn = async () =>  {
    console.log("businessNum.length", businessNum.b_no)

    if (businessNum.b_no.length < 10) {
      alert("사업자 등록번호는 10자리 입니다.")
    } else {
      await axios.post(`${baseURL}/v1/users/validate`, businessNum, {headers}).then((res) => { //데이터추가
        const b_no = res.data.data.b_no
        console.log("사업자등록번호진위여부test", res, b_no)
        sessionStorage.setItem('b_no', b_no)
        navigate(`/company_upload`)
        //사업자번호 넘기기
      }).catch((error) => {
        console.log(error.response.data,"error.response")
        if (error.response && error.response.data && error.response.data.err === '가입된 사업자 입니다.') {
          alert('가입된 사업자 입니다.');
        } else {
          console.error('error', error);
          alert('입력하신 사업자 번호의 사업자 등록 상태 확인이 필요합니다.')
        }
      })
    }
  }
 
  const [numberCheck, setNumberCheck] = useState();
  const onChange = (e, name) => {
    const value = e.target.value.replace(/[^0-9]/g, '')
    setNumberCheck(value)
    console.log(value,numberCheck)
    setBusinessNum({
      ...businessNum,
      [name]: value
    })
  }

  // const hypen = (e) => {
  //   e.target.value.replace(/[^0-9]/g, '').replace(/^(\d{3})(\d{2})(\d{5})$/, `$1-$2-$3`);
  //  }

  return (
    <Wrap>
      <Header />
      <Container>
        <Inner>
          <div>
            <h2>사업자 등록번호 확인</h2>
            <p className='txt'>사업자 등록번호 10자리를 입력해주세요.</p>
          </div>
          <input 
            type="text" 
            name='b_no'
            maxLength={10}
            placeholder='000-00-00000'
            value={numberCheck || ""}
            // onInput={(e) => hypen(e)}
            onChange={(e) => onChange(e, 'b_no')}
          />
          <button
            onClick={() => checkBtn()}
          >확인</button>
        </Inner>
      </Container>
    </Wrap>

  )
}
export default BusinessNumberCheck;
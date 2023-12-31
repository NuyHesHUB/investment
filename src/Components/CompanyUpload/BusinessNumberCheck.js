import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
/* import component */
import Header from '../Header'
/* styled */
import { Wrap, Container, Inner } from './StyledBusinessNumberCheck'
/* Log */
import PageLog from '../../Hook/PageLog'

const BusinessNumberCheck = () => {
  const baseURL = process.env.REACT_APP_BASEURL;
  const navigate = useNavigate();
  ///// JWT /////
  const accessToken = sessionStorage.getItem('accessToken'); 
  const headers = {
    Authorization: `${accessToken}`
  }

  /* page Log */
  // PageLog("사업자등록번호확인");
  
  const [businessNum, setBusinessNum] = useState({
    b_no: ""
  });
  const [numberCheck, setNumberCheck] = useState(0); // businessNum 진위확인 useState
  
  ///// 등록 버튼 click /////
  const checkBtn = async () =>  {
    if (businessNum.b_no.length < 10) {
      alert("사업자 등록번호는 10자리 입니다.")
    } else {
      await axios.post(`${baseURL}/v1/users/validate`, businessNum, { headers }).then((res) => { 
        const b_no = res.data.data.b_no
        sessionStorage.setItem('b_no', b_no) //사업자번호 sessionStorage 저장
        navigate(`/company_upload`)
      }).catch((error) => {
        const errRes = error.response
        console.log(errRes.data)
        if (errRes && errRes.data && errRes.data.err === '가입된 사업자 입니다.') {
          alert('이미 가입된 사업자 입니다.');
        } else {
          console.error(error);
          alert('입력하신 사업자 번호의 사업자 등록 상태 확인이 필요합니다.')
        }
      })
    }
  }

  const onChange = (e, name) => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10)
    setNumberCheck(value)
    setBusinessNum({
      ...businessNum,
      [name]: value
    })
  }

  // const hypen = (e) => {
  //   e.target.value.replace(/[^0-9]/g, '').replace(/^(\d{3})(\d{2})(\d{5})$/, `$1-$2-$3`);
  //  }

  useEffect(() => {
    if (!accessToken) {
      alert("회원만 접근할 수 있는 페이지입니다.")
      navigate("/");
    }
  }, [accessToken, navigate]);

  return (
    <>
    {accessToken ? 
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
              maxLength={13}
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
      : null
    }
    </>
  )
}
export default BusinessNumberCheck;
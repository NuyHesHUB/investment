import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

//import component
import Header from "../Header"

// styled
import { Wrap, Container, Inner } from "./StyledCompanyUpload"
import { StyledFrame, CommonStyleFrame } from "./StyleCommon"
// icon
import { AiOutlineCamera } from "react-icons/ai";


const CompanyUpload = () => {
  const baseURL = process.env.REACT_APP_BASEURL;
  const navigate = useNavigate();
  ///// JWT /////
  const accessToken = sessionStorage.getItem('accessToken'); 
  const userUid = sessionStorage.getItem('userUid');
  const headers = {
    Authorization: `${accessToken}`
  }

  const b_no = sessionStorage.getItem('b_no')

  const [placeholderActive, setPlaceholderActive] = useState(true);
  const [logoImage, setLogoImage] = useState('');
  const [companyData, setCompanyData] = useState({
      companyName: "",
      representativeName: "",
      businessNum: b_no,
      logoImg: "",
      introduction: ""
  });
 
  // 로고 이미지 미리보기
  const inputFileChange = async (e) => {
    try {
      const file = e.target.files[0]
      const encodedFilename = encodeURIComponent(file.name);
      const imgUrl = URL.createObjectURL(file)
      setPlaceholderActive(false) // 플레이스홀더없애기
      setLogoImage(imgUrl) //미리보기 이미지 링크
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('brdKey', "companyLogoImg");
      formData.append('filename', encodedFilename);
      
      await axios.post(`${baseURL}/v1/img/upload`, formData , { headers }).then((res) => {
        console.log(res, "res")
        const imageUrl = res.data.imageUrl
        console.log("이미지의 링크:", imageUrl);
        setCompanyData({
          ...companyData,
          logoImg: imageUrl
        }) //업체 데이터 로고 이미지부분 수정
      }).catch((error) => {
        console.error(error)
      })
    } catch {
      console.error("error")
    }
  }

  //input 값 입력(onchange)
  const companyValueWrite = (e, name) => {
    const value = e.target.value
    setCompanyData({
      ...companyData,
      [name]: value
    })
  }

  console.log(companyData)
  console.log("업체등록 test", companyData.companyName.length)

  const companyNameLen = companyData.companyName.length
  const representativeNameLen = companyData.representativeName.length

  const uploadBtnClick = async () => {
    if (companyNameLen === 0 || representativeNameLen.length === 0) {
      alert("사업자 등록번호가 없습니다.")
    } else if (!b_no){
      alert("회사명과 대표자 이름은 필수 입력값입니다.")
    } else {
      if(window.confirm("업체를 등록하시겠습니까?")) {
        await axios.post(`${baseURL}/v1/company/form`, companyData, { headers }).then((res) => {
          console.log("추가test")
          sessionStorage.removeItem('b_no');
          alert("추가하였습니다")
          navigate('/company_write')
        }).catch((error) => {
          console.error(error)
          alert("error")
        })
        }
      }
    }
  return(
    <StyledFrame>
      <Header />
      <Wrap>
        <Container>
          <CommonStyleFrame>
            <h2>업체 등록하기</h2>
            <p className='txt'>내용은 추후에 수정 가능합니다.</p>
            <Inner>
              <ul>
                <li>
                  <input 
                    type="text" 
                    value={b_no &&`${b_no.slice(0,3)}-${b_no.slice(3,5)}-${b_no.slice(5,10)}`}
                    disabled
                  />
                </li>
                <li>
                  <label htmlFor="logo-upload">
                    <div className={placeholderActive ? 'placeholder-active' : 'placeholder-none'}>
                      <AiOutlineCamera size="100" color="#c5c6c9" />
                      <p>로고 이미지 업로드</p>
                    </div>
                    <p className='imgBox'>
                      <img src={logoImage} id="preview" />
                    </p>
                  </label>
                  <input 
                    id='logo-upload' 
                    type="file" 
                    accept='image/*' 
                    onChange={(e) => inputFileChange(e)}
                  />
                </li>
                <li className={companyNameLen ? '' : 'required'}>
                  <input 
                    type="text" 
                    name="companyName"
                    placeholder='회사명'
                    onChange={(e) => companyValueWrite(e, "companyName")}
                  />
                </li>
                <li className={representativeNameLen ? '' : 'required'}>
                  <input 
                    type="text" 
                    name="representativeName"
                    placeholder='대표자 이름' 
                    onChange={(e) => companyValueWrite(e, "representativeName")}
                  />
                </li>
                <li>
                  <textarea 
                    name="introduction" 
                    rows="10" 
                    placeholder='회사 소개글 입력 (최대 300자)' 
                    maxLength={300}
                    onChange={(e) => companyValueWrite(e, "introduction")}
                  />
                </li>
                <li>
                  <button onClick={() => uploadBtnClick()}>등록</button>
                </li>
              </ul>
            </Inner>
          </CommonStyleFrame>
        </Container>
      </Wrap>
    </StyledFrame>
  )
}
export default CompanyUpload;
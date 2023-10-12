import React, { useEffect, useState } from 'react';
import { useNavigate  } from "react-router-dom";
import axios from 'axios';

//import component
import Header from "../Header"

// styled
import { StyledFrame, Wrap, Container, Inner } from "./StyledCompanyUpload"

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

  const [placeholderActive, setPlaceholderActive] = useState(true);
  const [logoImage, setLogoImage] = useState('');
  const [companyData, setCompanyData] = useState({
      companyName: "",
      representativeName: "",
      businessNum: "7597100000",
      logoImg: "",
      introduction: ""
  });

 
  // 로고 이미지 미리보기
  const inputFileChange = async (e) => {
    try {
      const file = e.target.files[0]
      const imgUrl = URL.createObjectURL(file)
      // console.log(file, imgUrl, "input file test")
      // console.dir(e.target)
      setPlaceholderActive(false) // 플레이스홀더없애기
      setLogoImage(imgUrl) //미리보기 이미지 링크

     

      const formData = new FormData();
      formData.append('file', file);
      formData.append('brdKey', "companyLogoImg");
      
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

  const companyValueWrite = (e, name) => {
    const value = e.target.value
    setCompanyData({
      ...companyData,
      [name]: value
    })
    console.log("테슽스스ㅡ틋", companyData)
  }

  const newCompanyUpload = async () => {
    console.log("업체등록 test", companyData)
    if(window.confirm("업체를 등록하시겠습니까?")) {
      await axios.post(`${baseURL}/v1/company/form`, companyData, { headers }).then((res) => {
        console.log("추가test")
      }).catch((error) => {
        console.error(error)
      })
      alert("추가하였습니다")
      // navigate(``) 글쓰기 페이지로
      }
    }

  return(
    <StyledFrame>
      <Header />
      <Wrap>
        <Container>
          <h2>업체 등록하기</h2>
          <Inner>
            <ul>
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
              <li>
                <input 
                  type="text" 
                  name="companyName"
                  placeholder='회사명'
                  onChange={(e) => companyValueWrite(e, "companyName")}
                />
              </li>
              <li>
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
                <button onClick={() => newCompanyUpload()}>등록</button>
              </li>
            </ul>
          </Inner>
        </Container>
      </Wrap>
    </StyledFrame>
  )
}
export default CompanyUpload;
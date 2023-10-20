import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
//import component
import Header from "../Header"
import Footer from "../Footer"
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
  const uid = userUid === null ? '' : userUid
  const userGroup = sessionStorage.getItem('userGroup');
  const b_no = sessionStorage.getItem('b_no')
  const headers = {
    Authorization: `${accessToken}`
  }

  ///// page log /////
  useEffect(() => {
    axios.post(`${baseURL}/v1/log/movement/form`, { userUid: uid, "page": "업체등록" }).then((res) => {
  }).catch((error) => {
    console.error(error)
  })
  }, []);

  const [placeholderActive, setPlaceholderActive] = useState(true); //이미지등록placeholder
  const [logoImage, setLogoImage] = useState(''); // 이미지미리보기링크데이터
  const [companyData, setCompanyData] = useState({
      companyName: "",
      representativeName: "",
      businessNum: b_no,
      logoImg: "",
      introduction: ""
  });
 
  ////////////////////////////////
  ///// 로고 이미지 미리보기 /////
  ////////////////////////////////
  const inputFileChange = async (e) => {
    try {
      const file = e.target.files[0]
      const encodedFilename = encodeURIComponent(file.name);
      const imgUrl = URL.createObjectURL(file)
      setLogoImage(imgUrl) //미리보기 이미지 링크
      // 폼데이터에 저장
      const formData = new FormData();
      formData.append('files', file);
      formData.append('brdKey', "companyLogoImg");
      formData.append('filename', encodedFilename);
      
      await axios.post(`${baseURL}/v1/img/upload`, formData , { headers }).then((res) => {
        const imageUrl = res.data.imageUrl
        //업체 데이터 로고 이미지부분 수정//
        setPlaceholderActive(false) // placeholder제거
        const updatedData = {
          ...companyData,
          logoImg: imageUrl,
          userUid: userUid,
        };
        setCompanyData(updatedData); 
        e.target.value = ''
      }).catch((error) => {
        console.error(error)
      })
    } catch {
      console.error("error")
    }
  }
  // 로고 이미지 삭제 //
  const logoImgDelete = async () => {
    console.log(companyData.logoImg,"companyData.logoImg")
    await axios.delete(`${baseURL}/v1/attachment/delete`, { data : {url: companyData.logoImg}, headers} ).then((res) => {
      setLogoImage('')
      setCompanyData({
        ...companyData,
        logoImg: ''
      })
      setPlaceholderActive(true)
    }).catch((error) => {
      console.error(error)
      alert("error")
    })
  }

  ///////////////////////////////////
  ///// input 값 입력(onchange) /////
  ///////////////////////////////////
  const companyValueWrite = (e, name) => {
    const value = e.target.value
    setCompanyData({
      ...companyData,
      [name]: value
    })
  }

  //////////////////////////
  ///// 수정 버튼 클릭 /////
  //////////////////////////
  const companyNameLen = companyData.companyName
  const representativeNameLen = companyData.representativeName
  const uploadBtnClick = async () => {
    if (!b_no) {
      alert("사업자 등록번호가 없습니다.")
    } else if (!companyNameLen || !representativeNameLen){
      alert("회사명과 대표자 이름은 필수 입력값입니다.")
    } else {
      if(window.confirm("업체를 등록하시겠습니까?")) {
        await axios.post(`${baseURL}/v1/company/form`, companyData, { headers }).then((res) => {
          if (userGroup === "일반") {
            sessionStorage.setItem('userGroup', '업체')
          }
          alert("추가하였습니다")
          navigate('/company_write')
        }).catch((error) => {
          console.error(error)
          alert("error")
        })
      }
    }
  }
  ///// 취소버튼 /////
  const cancelBtnClick = () => {
    if (window.confirm("취소하시겠습니까?")) {
      sessionStorage.removeItem('b_no');
      navigate(`/`)
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

                {/******* 로고 이미지 업로드 *******/}
                <li>
                  <label htmlFor="logo-upload">
                    <div className={placeholderActive ? 'placeholder-active' : 'placeholder-none'}>
                      <AiOutlineCamera size="100" color="#c5c6c9" />
                      <p>로고 이미지 업로드</p>
                    </div>
                    <div className={logoImage ? 'imgBox active' : 'imgBox'}>
                      <img src={logoImage} id="preview" />
                      <div className='logo-btnBox'>
                        <label htmlFor="logo-upload" className='logo-change-btn'>
                          변경
                        </label>
                        <button 
                          className='logo-delete-btn'
                          onClick={logoImgDelete}
                        >삭제</button>
                      </div>
                    </div>
                  </label>
                  <input 
                    id='logo-upload' 
                    type="file" 
                    accept='image/*' 
                    onChange={(e) => inputFileChange(e)}
                  />
                </li>

                {/******* 사업자등록번호 *******/}
                <li>
                  <p className='sub-title'>사업자등록번호</p>
                  <input 
                    type="text" 
                    value={b_no &&`${b_no.slice(0,3)}-${b_no.slice(3,5)}-${b_no.slice(5,10)}`}
                    disabled
                  />
                </li>
                
                {/******* 업체명 *******/}
                <li className={companyNameLen ? '' : 'required'}>
                  <p className='sub-title'>업체명</p>
                  <input 
                    type="text" 
                    name="companyName"
                    placeholder='업체명'
                    onChange={(e) => companyValueWrite(e, "companyName")}
                  />
                </li>

                {/******* 대표자 이름 *******/}
                <li className={representativeNameLen ? '' : 'required'}>
                  <p className='sub-title'>대표자명</p>
                  <input 
                    type="text" 
                    name="representativeName"
                    placeholder='대표자명' 
                    onChange={(e) => companyValueWrite(e, "representativeName")}
                  />
                </li>

                {/******* 회사 소개글 *******/}
                <li>
                  <p className='sub-title'>회사 소개글</p>
                  <textarea 
                    name="introduction" 
                    rows="10" 
                    placeholder='회사 소개글 입력 (최대 300자)' 
                    maxLength={300}
                    onChange={(e) => companyValueWrite(e, "introduction")}
                  />
                </li>

                {/******* 등록/취소 버튼 *******/}
                <li>
                  <button onClick={() => uploadBtnClick()}>등록</button>
                  <button onClick={() => cancelBtnClick()} className='cancel-btn'>취소</button>
                </li>
              </ul>
            </Inner>
          </CommonStyleFrame>
        </Container>
      </Wrap>
      <Footer />
    </StyledFrame>
  )
}
export default CompanyUpload;
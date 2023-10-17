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
  const userGroup = sessionStorage.getItem('userGroup');
  const headers = {
    Authorization: `${accessToken}`
  }

  const [placeholderActive, setPlaceholderActive] = useState(true);
  const [logoImage, setLogoImage] = useState('');
  const [companyData, setCompanyData] = useState({});
 
  ///// 업체 정보 불러오기 /////
  useEffect(() => {
    axios.get(`${baseURL}/v1/company/${5348100064}?userUid=${userUid}`, { headers }).then((res) => {
      setCompanyData(res.data.query[0]);
      console.log(res.data.query, companyData, "업체정보수정테스트")
    }).catch(() => {
      console.error("error");
    })
  }, []);

  ///// 로고 이미지 미리보기 /////
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

  ///// input 값 입력(onchange) /////
  const companyValueModify = (e, name) => {
    const value = e.target.value
    setCompanyData({
      ...companyData,
      [name]: value
    })
  }

  ///// 수정 버튼 클릭 /////
  // const companyNameLen = companyData.companyName.length
  // const representativeNameLen = companyData.representativeName.length

  const uploadBtnClick = async () => {
    // if (companyNameLen === 0 || representativeNameLen.length === 0){
    //   alert("회사명과 대표자 이름은 필수 입력값입니다.")
    // } else {
      if(window.confirm("업체 정보를 수정하시겠습니까?")) {
        await axios.patch(`${baseURL}/v1/company/modify/${companyData.businessNum}`, companyData, { headers }).then((res) => {
          console.log("추가test")
          
          if (userGroup === "일반") {
            sessionStorage.setItem('userGroup', '업체')
          }
          alert("추가하였습니다")
          navigate('/company_write')
        }).catch((error) => {
          console.error(error)
          alert("error")
        })
        // }
      }
    }
  return(
    <StyledFrame>
      <Header />
      <Wrap>
        <Container>
          <CommonStyleFrame>
            <h2>업체 정보 수정</h2>
            <Inner>
              <ul>
                <li>
                  <input 
                    type="text" 
                    value={companyData.businessNum}
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
                      <img src={companyData.logoImg} id="preview" />
                    </p>
                  </label>
                  <input 
                    id='logo-upload' 
                    type="file" 
                    accept='image/*' 
                    // onChange={(e) => inputFileChange(e)}
                  />
                </li>
                <li /* className={companyNameLen ? '' : 'required'} */>
                  <input 
                    type="text" 
                    name="companyName"
                    placeholder='회사명'
                    value={companyData.companyName}
                    onChange={(e) => companyValueModify(e, "companyName")}
                  />
                </li>
                <li /* className={representativeNameLen ? '' : 'required'} */>
                  <input 
                    type="text" 
                    name="representativeName"
                    value={companyData.representativeName}
                    placeholder='대표자 이름' 
                    onChange={(e) => companyValueModify(e, "representativeName")}
                  />
                </li>
                <li>
                  <textarea 
                    name="introduction" 
                    rows="10"
                    value={companyData.introduction}
                    placeholder='회사 소개글 입력 (최대 300자)' 
                    maxLength={300}
                    onChange={(e) => companyValueModify(e, "introduction")}
                  />
                </li>
                <li>
                  <button onClick={() => uploadBtnClick()}>수정</button>
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
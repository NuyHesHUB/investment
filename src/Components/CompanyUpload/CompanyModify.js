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
  const b_no = sessionStorage.getItem('b_no');
  const headers = {
    Authorization: `${accessToken}`
  }

  const [placeholderActive, setPlaceholderActive] = useState(true);
  const [logoImage, setLogoImage] = useState('');
  const [companyData, setCompanyData] = useState({});

  ///// 업체 정보 불러오기 /////
  useEffect(() => {
    axios.get(`${baseURL}/v1/company/${b_no}?userUid=${userUid}`, { headers }).then((res) => {
      setCompanyData(res.data.query[0]);
    }).catch(() => {
      console.error("error");
    })
  }, []);

  
  ////////////////////////////////
  ///// 로고 이미지 미리보기 /////
  ////////////////////////////////
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
        console.log(res, "로고이미지res")
        const imageUrl = res.data.imageUrl
        console.log("이미지의 링크:", imageUrl);
        //업체 데이터 로고 이미지부분 수정//
        const updatedData = {
          ...companyData,
          logoImg: imageUrl,
          userUid: userUid,
        };
        setCompanyData(updatedData); 

        // setCompanyData({
        //   ...companyData,
        //   logoImg: imageUrl
        // })
      }).catch((error) => {
        console.error(error)
      })
    } catch {
      console.error("error")
    }
  }
  ///////////////////////////////////
  ///// input 값 입력(onchange) /////
  ///////////////////////////////////
  const companyValueModify = (e, name) => {
    const value = e.target.value
    /* setCompanyData({
      ...companyData,
      [name]: value,
    }) */
    const updatedData = {
      ...companyData,
      [name]: value,
      userUid: userUid,
    };
    setCompanyData(updatedData);
  }
  // console.log(b_no, "disabled테스트당")

  //////////////////////////
  ///// 수정 버튼 클릭 /////
  //////////////////////////
  const companyNameLen = companyData?.companyName
  const representativeNameLen = companyData?.representativeName
  const uploadBtnClick = async () => {
    if (!companyNameLen || !representativeNameLen){
      alert("회사명과 대표자 이름은 필수 입력값입니다.")
    } else {
      console.log("수정test", companyData)
      if(window.confirm("업체 정보를 수정하시겠습니까?")) {
        await axios.patch(`${baseURL}/v1/company/modify/${companyData?.businessNum}`, companyData, { headers }).then((res) => {
          console.log("수정test",res)
          console.log("companyData 테스트",companyData)
          console.log("비즈니스넘버 테스트",companyData?.businessNum)
          alert("수정하였습니다")
          navigate('/')
        }).catch((error) => {
          console.error(error)
          console.log("companyData 테스트",companyData)
          alert("error")
        })
      }
    }
  }
  //////////////////////////
  ///// 수정 버튼 클릭 /////
  //////////////////////////
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
            <h2>업체 정보 수정</h2>
            <Inner>
              <ul>
                {/******* 로고 이미지 업로드 *******/}
                <li>
                  <label htmlFor="logo-upload" className='logo-upload'>
                    <div className={placeholderActive ? 'placeholder-active' : 'placeholder-none'}>
                      <AiOutlineCamera size="100" color="#c5c6c9" />
                      <p>로고 이미지 업로드</p>
                    </div>
                    <p className={logoImage ? 'imgBox active' : 'imgBox'}>
                      <img src={logoImage} id="preview" />
                      <div>
                        <button className='logo-change-btn'>변경</button>
                        <button className='logo-delete-btn'>삭제</button>
                      </div>
                    </p>
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
                  <input 
                    type="text" 
                    value={companyData?.businessNum || ""}
                    disabled
                  />
                </li>

                {/******* 업체명 *******/}
                <li className={companyNameLen ? '' : 'required'}>
                  <input 
                    type="text" 
                    name="companyName"
                    placeholder='회사명'
                    value={companyData?.companyName || ""}
                    onChange={(e) => companyValueModify(e, "companyName")}
                  />
                </li>

                {/******* 대표자 이름 *******/}
                <li className={representativeNameLen ? '' : 'required'}>
                  <input 
                    type="text" 
                    name="representativeName"
                    value={companyData?.representativeName || ""}
                    placeholder='대표자 이름' 
                    onChange={(e) => companyValueModify(e, "representativeName")}
                  />
                </li>

                {/******* 회사 소개글 *******/}
                <li>
                  <textarea 
                    name="introduction" 
                    rows="10"
                    value={companyData?.introduction || ""}
                    placeholder='회사 소개글 입력 (최대 300자)' 
                    maxLength={300}
                    onChange={(e) => companyValueModify(e, "introduction")}
                  />
                </li>

                {/******* 등록/취소 버튼 *******/}
                <li>
                  <button 
                    onClick={() => uploadBtnClick()} 
                    disabled={companyData?.userUid === undefined ? true : false}
                  >수정</button>
                  <button onClick={() => cancelBtnClick()} className='cancel-btn'>취소</button>
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
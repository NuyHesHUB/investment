import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Resizer from "react-image-file-resizer";
/* Import Component */ 
import Header from "../Header"
import Footer from "../Footer"
/* Styled */ 
import { Wrap, Container, Inner } from "./StyledCompanyUpload"
import { StyledFrame, CommonStyleFrame } from "./StyleCommon"
/* Icon */
import { AiOutlineCamera } from "react-icons/ai";
/* Log */
import PageLog from '../../Hook/PageLog'

const CompanyUpload = () => {
  const baseURL = process.env.REACT_APP_BASEURL;
  const navigate = useNavigate();
  ///// JWT /////
  const accessToken = sessionStorage.getItem('accessToken'); 
  const userUid = sessionStorage.getItem('userUid');
  const b_no = sessionStorage.getItem('b_no');
  const headers = {
    Authorization: `${accessToken}`
  }

  ///// page log /////
  // PageLog("업체정보수정");

  const [placeholderActive, setPlaceholderActive] = useState(true);
  const [logoImage, setLogoImage] = useState('');
  const [companyData, setCompanyData] = useState({});

  ///// 업체 정보 불러오기 /////
  useEffect(() => {
    axios.get(`${baseURL}/v1/company/${b_no}?userUid=${userUid}`, { headers }).then((res) => {
      setCompanyData(res.data.query[0]);
    }).catch((error) => {
      console.error(error);
    })
  }, []);
  
  useEffect(() => {
    if (companyData.logoImg) {
      setPlaceholderActive(false);
      setLogoImage(companyData.logoImg);
    }
  }, [companyData]);

  ////////////////////////////////
  ///// 로고 이미지 미리보기 /////
  ////////////////////////////////
  ///// 리사이즈 /////
  const resizeFile = (file) =>
    new Promise((res) => {
      Resizer.imageFileResizer(
        file, // target file
        100, // maxWidth
        100, // maxHeight
        "WEBP",
        80, 
        0,
        (uri) => res(uri),
        "file" 
      );
  });
  const inputFileChange = async (e) => {
    try {
      const file = e.target.files[0]
      const compressedFile = (await resizeFile(file)); // 리사이징
      const encodedFilename = encodeURIComponent(file.name);
      const imgUrl = URL.createObjectURL(file)
      setLogoImage(imgUrl) //미리보기 이미지 링크
      
      const formData = new FormData();
      formData.append('files', compressedFile);
      formData.append('brdKey', "companyLogoImg");
      formData.append('filename', encodedFilename);
      
      await axios.post(`${baseURL}/v1/img/upload`, formData , { headers }).then((res) => {
        const imageUrl = res.data.imageUrl
        //업체 데이터 로고 이미지부분 수정//
        setPlaceholderActive(false) // 플레이스홀더없애기
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
  const companyValueModify = (e, name) => {
    const value = e.target.value
    const updatedData = {
      ...companyData,
      [name]: value,
      userUid: userUid,
    };
    setCompanyData(updatedData);
  }

  //////////////////////////
  ///// 수정 버튼 클릭 /////
  //////////////////////////
  const companyNameLen = companyData?.companyName
  const representativeNameLen = companyData?.representativeName
  const uploadBtnClick = async () => {
    if (!companyNameLen || !representativeNameLen){
      alert("회사명과 대표자명은 필수 입력값입니다.")
    } else {
      if(window.confirm("업체 정보를 수정하시겠습니까?")) {
        await axios.patch(`${baseURL}/v1/company/modify/${companyData?.businessNum}`, companyData, { headers }).then((res) => {
          alert("수정하였습니다")
          navigate('/')
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
  
  useEffect(() => {
    if (!accessToken) {
      alert("회원만 접근할 수 있는 페이지입니다.")
      navigate("/");
    }
  }, [accessToken, navigate]);

  return(
    <StyledFrame>
      {accessToken ? 
      <>
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
                    <div className={logoImage ? 'imgBox active' : 'imgBox'}>
                      <img src={companyData.logoImg ? companyData.logoImg : logoImage} id="preview" />
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
                    value={companyData?.businessNum || ""}
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
                    value={companyData?.companyName || ""}
                    onChange={(e) => companyValueModify(e, "companyName")}
                  />
                </li>

                {/******* 대표자 이름 *******/}
                <li className={representativeNameLen ? '' : 'required'}>
                  <p className='sub-title'>대표자명</p>
                  <input 
                    type="text" 
                    name="representativeName"
                    value={companyData?.representativeName || ""}
                    placeholder='대표자명' 
                    onChange={(e) => companyValueModify(e, "representativeName")}
                  />
                </li>

                {/******* 회사 소개글 *******/}
                <li>
                  <p className='sub-title'>회사 소개글</p>
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
      <Footer /> 
      </>

      : null
      }
    </StyledFrame>
  )
}
export default CompanyUpload;
import React, { useEffect, useState, useMemo, useRef  } from 'react';
import { useNavigate  } from "react-router-dom";
import axios from 'axios';
import ReactQuill , { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

//import component
import Header from "../Header"
// styled
import { Container } from "./StyledCompanyWrite"
import { StyledFrame, CommonStyleFrame } from "./StyleCommon"

// const modules =  {
//     toolbar: [
//       [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
//       [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
//       [{ 'color': [] }, { 'background': [] }],
//       ['bold', 'italic', 'underline', 'strike'],
//       ['link', 'image'],
//        // Added color and background color buttons
//     ]
//   }

const CompanyWrite = () => {
  const baseURL = process.env.REACT_APP_BASEURL;
  ///// JWT /////
  const accessToken = sessionStorage.getItem('accessToken'); 
  const userUid = sessionStorage.getItem('userUid');
  const headers = {
    Authorization: `${accessToken}`
  }
  
  const navigate = useNavigate();

  const [content, setContent] = useState(''); // 내용부분
  const [asdf , setasdf] = useState()
  const [investmentAmount, setInvestmentAmount] = useState(0); //투자희망금액 (아직 코드 안짬)
  const [postData, setPostData] = useState({
    category: "제조",
    condition: "pending",
    isNotice: "N",
    title: "",
    content: "",
    extraField: {investmentAmount: investmentAmount},
    section1: "section1",
    section2: "section2",
    section3: "section3",
    section4: "section4",
    section5: "section5",
    isSecret: "N",
    attaches: ""
  });

  const quillRef = useRef(true);
  ///// 이미지 핸들러 /////
  const imageHandler = () => { 
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.setAttribute('multiple', 'true');
    input.click();
    
    input.onchange = async () => {
      const files = input.files;
      const editor = quillRef.current.getEditor();
      const formData = new FormData();

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const encodedFilename = encodeURIComponent(file.name);
        formData.append('files', file);  // Append each file to the FormData
        formData.append('filename', encodedFilename);
      }
      formData.append('brdKey', "companyLogoImg");
      try {
        const result = await axios.post(`${baseURL}/v1/img/upload`, formData , { headers })        
        for (let i = 0; i < files.length; i++) {
          let IMG_URL = '';
          if(result.data.length === undefined) {
            IMG_URL = result.data.imageUrl;
          } else {
            IMG_URL = result.data[i].imageUrl;
          }
          const range = editor.getSelection();
          setTimeout(() => editor.insertEmbed(range.index, "image", IMG_URL), 500);
        }
        // console.log('성공', IMG_URL);
      } catch (error) {
        console.log(error, '실패')
      }
    }
  }
    
  const handleContentChange = (value) => {
    setContent(value);
    setPostData({
      ...postData,
      content: value
    });
  };
  ///// 에디터 모듈 설정 /////
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ['image', 'link'],
          [{ header: [1, 2, 3, false] }],
          [{ 'align': [] }, { 'color': [] }, { 'background': [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          ['attachment']
        ],
        handlers: {
          image: imageHandler,
        },
      },
    };
  }, []);
  
  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'image',
    'attachment',
    'align', 
    'color', 
    'background', 
  ];

  const [formattedValue, setFormattedValue] = useState();
  ///// 투자희망금액 /////
  const investmentAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '')
    setFormattedValue(value.replace(/(\d)(?=(?:\d{3})+(?!\d))/g,'$1,'))
    console.log(formattedValue, 'formattedValue')
    setInvestmentAmount(value)
    setPostData({
      ...postData,
      extraField: {investmentAmount: value}
    })
  }

  const handleValueChange = (e, name) => {
    const value = e.target.value
    setPostData({
      ...postData,
      [name] : value
    });
  };

  ///// 첨부파일 /////
  // const [selectedFiles, setSelectedFiles] = useState([]); //test, 좀이따 위로 올리기
  const [selectedFilesName, setSelectedFilesName] = useState([]); //test, 좀이따 위로 올리기
  const filesName = [] // 파일명 미리보기 리스트
  const handleFileChange  = async (e) => {
    const files = e.target.files;
    
    if (files.length > 5 || postData.attaches.length >= 5 || postData.attaches.length + files.length > 5) {
      alert('최대 5개의 파일만 선택할 수 있습니다.');
      e.target.value = ''
      // setSelectedFiles()
      // setSelectedFilesName([])
      return;
    } else {
      // setSelectedFiles(files)
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        //파일명 미리보기 리스트에 push
        filesName.push(files[i].name)
        //폼데이터
        const file = files[i];
        const encodedFilename = encodeURIComponent(file.name);
        formData.append('file', file); 
        formData.append('filename', encodedFilename);
      }
      formData.append('brdKey', "companyLogoImg");
      setSelectedFilesName(filesName)
      console.log("gittest")

      let ATTACH_URL_LIST = [] //파일링크 담을 리스트
      try {
        const result = await axios.post(`${baseURL}/v1/attachment/upload`, formData , { headers })        
        for (let i = 0; i < files.length; i++) {
          let ATTACH_URL = '';
          if(result.data.length === undefined) {
            ATTACH_URL = result.data.attachesUrl;
            ATTACH_URL_LIST.push(ATTACH_URL)
          } else {
            ATTACH_URL = result.data[i].attachesUrl;
            ATTACH_URL_LIST.push(ATTACH_URL)
          }
        }
        console.log('성공', result);
      } catch (error) {
        console.log(error, '실패')
      }

      // postData에 저장
      setPostData({
        ...postData,
        attaches: [...postData.attaches, ATTACH_URL_LIST].flat(1)
      })
    } // if문 끝
  }

  ///// 등록/취소 Btn /////
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (window.confirm("등록하시겠습니까?")) {
      console.log('제목:', postData);
      await axios.post(`${baseURL}/v1/board/investment/post`, postData, { headers }).then((res) => {
        console.log("추가test")
        sessionStorage.removeItem('b_no');
        alert("추가하였습니다")
        navigate('/company_introduction_write')
      }).catch((error) => {
        console.error(error)
        alert("error")
      })
    }
  };

  const prevPage = () => {
    if (window.confirm("취소하시겠습니까?")) {
      navigate(-1)
    }  
  }
  console.log(postData)
  return (
    <StyledFrame>
      <Header />
      <Container>
        <CommonStyleFrame>
          <div className="container mt-5">
            <h2 className='title'>투자 등록하기</h2>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">업종</label> {/* select로 변경 */}
              <select 
                name="category"
                onChange={(e) => handleValueChange(e, "category")}
              >
                <option value="제조">제조</option>
                <option value="IT">IT</option>
                <option value="외식">외식</option>
                <option value="서비스">서비스</option>
                <option value="의료">의료</option>
                <option value="유통/물류">유통/물류</option>
                <option value="운송">운송</option>
                <option value="대여">대여</option>
                <option value="기타">기타</option>
                <option value="엔터테이먼트">엔터테이먼트</option>
                <option value="교육">교육</option>
                <option value="부동산">부동산</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">제목</label>
              <input 
                type="text" 
                className="form-control title" 
                name="title" 
                placeholder='제목을 입력해주세요'
                onChange={(e) => handleValueChange(e, "title")} 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">투자희망금액</label>
              <input 
                type="text" 
                className="form-control investment-amount" 
                value={formattedValue || ""}
                placeholder='0'
                onChange={(e) => investmentAmountChange(e)} 
              />
              <span> 원</span>
            </div>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">첨부파일</label>
              <input 
                type="file" 
                accept=".gif, .jpg, .jpeg, .png, .pdf, .ppt, .doc, .hwp, .txt, .xls, .xlsx"
                className="form-control" 
                // value={selectedFiles}
                onChange={(e) => handleFileChange(e)} 
                multiple
              />
              {/* 첨부파일 이미지 미리보기 */}
              <ul className={selectedFilesName.length > 0 ? "attachPreviewBox" : ""}>
                {selectedFilesName && selectedFilesName.map((item,index) => {
                  return(
                    <li className='attachPreview' key={index}>
                      <span>{item}</span>
                      <button className='attach_del_btn'>X</button> {/* //FIXME: 아이콘 고치기, 기능 구현 */}
                    </li> 
                  )
                })}
              </ul>
            </div>

            <div className="mb-3">
              <label htmlFor="content" className="form-label">내용</label>
              <ReactQuill ref={quillRef} value={content} onChange={(e) => handleContentChange(e)} modules={modules} formats={formats} />
            </div>
            <div className="btnBox">
              <button onClick={() => prevPage()} className='cancelBtn'>취소</button>
              <button 
                type="submit" 
                className="btn btn-primary" 
                onClick={handleSubmit} 
                disabled={
                  postData.title.length === 0 || 
                  postData.content.length === 0 || 
                  postData.extraField.length === 0 ? 
                  true : 
                  false
                }>등록</button>
            </div>
          </div>
        </CommonStyleFrame>
      </Container>
    </StyledFrame>
  );
};

export default CompanyWrite;
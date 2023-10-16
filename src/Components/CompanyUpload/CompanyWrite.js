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
    category: "",
    condition: "pending",
    isNotice: "N",
    title: "",
    content: content,
    section1: "section1",
    section2: "section2",
    section3: "section3",
    section4: "section4",
    section5: "section5",
    isSecret: "N",
    attaches: ""
  });

  
  const quillRef = useRef(true);

  const imageHandler = () => { 
    console.log("이미지핸들러")
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.setAttribute('multiple', 'true');
    input.click();
    
    input.onchange = async () => {
      const reader = new FileReader();
      console.log(reader, "reader")

      const file = input.files[0];
      const encodedFilename = encodeURIComponent(file.name);
      const imgUrl = URL.createObjectURL(file)

      const formData = new FormData();
      formData.append('file', file); 
      formData.append('brdKey', "companyLogoImg");
      formData.append('filename', encodedFilename);
      try {
        const result = await axios.post(`${baseURL}/v1/img/upload`, formData , { headers })
        
        const IMG_URL = result.data.imageUrl;
        const editor = quillRef.current.getEditor();
        const range = editor.getSelection();
        setTimeout(() => editor.insertEmbed(range.index, "image", IMG_URL), 500)
        
        console.log('성공', IMG_URL);
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
  
  // const imageHandler =  useEffect(() => { //useEffect 써야지 사진 엑박 안 뜸.
  //   quillRef.current = false
  //   //맨처음 렌더링시에 useEffect실행 막기 위해 조건문 사용(근데안됨..머임..)
  //   if (!quillRef.current) { 
  //     quillRef.current = true;
  //   } else {
  //     const input = document.createElement('input');
  //     input.setAttribute('type', 'file');
  //     input.setAttribute('accept', 'image/*');
  //     input.click();
  
  //     input.addEventListener('change', async () => {
  //       const file = input.files[0];
  //       const encodedFilename = encodeURIComponent(file.name);
  //       const imgUrl = URL.createObjectURL(file)
  
  //       const formData = new FormData();
  //       formData.append('file', file); 
  //       formData.append('brdKey', "companyLogoImg");
  //       formData.append('filename', encodedFilename);
  //       try {
  //         const result = await axios.post(`${baseURL}/v1/img/upload`, formData , { headers })
  //         if (result) {
  //           const IMG_URL = result.data.imageUrl;
  //           const editor = quillRef.current.getEditor();
  //           const range = editor.getSelection(true);
  //           editor.insertEmbed(range.index, "image", IMG_URL);
  //           console.log('성공 시, 백엔드가 보내주는 데이터', result.data.imageUrl);
  //         }
  //       } catch (error) {
  //         console.log(error, '실패')
  //       }
  //     }
  //   )
  //   }
  // }, [content,postData])

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ['image', 'link'],
          [{ header: [1, 2, 3, false] }],
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
    'attachment'
  ];

  ///// 투자희망금액 /////
  const investmentAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10)
    setInvestmentAmount(value)
    setPostData({
      ...postData,
      investmentAmount: value
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
  const [selectedFiles, setSelectedFiles] = useState([]); //test, 좀이따 위로 올리기
  const [selectedFilesName, setSelectedFilesName] = useState([]); //test, 좀이따 위로 올리기
  
  const handleFileChange  = (e) => {
    const filesName = []
    const files = e.target.files;
    console.log(files, "asdasdasddassadasdd")
    // 최대 3개의 파일만 허용
    if (files.length > 3) {
      alert('최대 3개의 파일만 선택할 수 있습니다.');
      return;
    } else {
      setSelectedFiles(files)
      setPostData({
        ...postData,
        attaches: selectedFiles
      })
      for (let i = 0; i < files.length; i++) {
        filesName.push(files[i].name)
      }
      setSelectedFilesName(filesName)
    }
  }
  console.log(selectedFiles,selectedFilesName, "selectedFiles")

  // 등록/취소 Btn //
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
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">업종</label> {/* select로 변경 */}
                {/* <input 
                  type="text" 
                  className="form-control" 
                  id="title" value={title} 
                  onChange={} 
                /> */}
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
                  value={investmentAmount || ""}
                  placeholder='0'
                  onChange={(e) => investmentAmountChange(e)} 
                />
                <span> 원</span>
              </div>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">첨부파일</label>
                <input 
                  type="file" 
                  className="form-control" 
                  // value={selectedFiles}
                  onChange={(e) => handleFileChange (e)} 
                  multiple
                />
                {selectedFilesName && selectedFilesName.map((item,index) => {
                  return(
                    <p>{item}</p>
                  )
                })}
              </div>

              <div className="mb-3">
                <label htmlFor="content" className="form-label">내용</label>
                <ReactQuill ref={quillRef} value={content} onChange={(e) => handleContentChange(e)} modules={modules} formats={formats} />
              </div>
              <button onClick={() => prevPage()}>취소</button>
              <button type="submit" className="btn btn-primary">등록</button>
            </form> 
          </div>
        </CommonStyleFrame>
      </Container>
    </StyledFrame>
  );
};

export default CompanyWrite;
import React, { useEffect, useState, useMemo, useRef  } from 'react';
import { useNavigate  } from "react-router-dom";
import axios from 'axios';
import ReactQuill , { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
//import component
import Header from "../Header"
// styled
import { StyleFrame, Container } from "./StyledCompanyWrite"

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

  const quillRef = useRef(null);
  const navigate = useNavigate();

  
  const [content, setContent] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState(0);
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




  




  const imageHandler = () => {
      
      console.log("이미지핸들러")
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.click();

      input.addEventListener('change', async () => {
        const file = input.files[0];
        const encodedFilename = encodeURIComponent(file.name);
        const imgUrl = URL.createObjectURL(file)

        const formData = new FormData();
        formData.append('file', file); 
        formData.append('brdKey', "companyLogoImg");
        formData.append('filename', encodedFilename);

        console.log('온체인지',imgUrl);
        
        /*
        try {
          const result = await axios.post(`${baseURL}/v1/img/upload`, formData , { headers })
          const IMG_URL = result.data.imageUrl;
          const editor = quillRef.current.getEditor();
          
          const range = editor.getSelection();
          editor.insertEmbed(range.index, 'image', IMG_URL);
          console.log(range.index, 'range.index')
          console.log('성공 시, 백엔드가 보내주는 데이터', result.data.imageUrl, editor);
        } catch (error) {
          console.log(error, 'e실패했어요ㅠrr')
        }*/

        try {
          const result = await axios.post(`${baseURL}/v1/img/upload`, formData , { headers })
          const IMG_URL = result.data.imageUrl;
          const editor = quillRef.current.getEditor();
          const range = editor.getSelection(true);
          editor.insertEmbed(range.index, "image", IMG_URL);

          // console.log(range.index, 'range.index')
          // console.log('성공 시, 백엔드가 보내주는 데이터', result.data.imageUrl);
        } catch (error) {
          console.log(error, 'e실패했어요ㅠrr')
        }
      });
    }


  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ['image'],
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        ],
        handlers: {
          // 이미지 처리는 우리가 직접 imageHandler라는 함수로 처리할 것이다.
          image: imageHandler,
        },
      },
    };
  }, []);
  // 위에서 설정한 모듈들 foramts을 설정한다
  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'image',
  ];


  
  const handleContentChange = (value) => {
    setContent(value);
    setPostData({
      ...postData,
      content: value
    });
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('제목:', postData);
    // console.log('내용:', content);
  };

  const prevPage = () => {
    if (window.confirm("취소하시겠습니까?")) {
      navigate(-1)
    }  
  }

  console.log(content, postData.content, "값확인값확인값확인")

  return (
    <StyleFrame>
      <Header />
      <Container>

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
                className="form-control" 
                value={investmentAmount}
                onChange={(e) => investmentAmountChange(e)} 
              />
              <span> 원</span>
            </div>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">ㅁ누엄누어ㅏㅁ누어ㅏㅁ누아너무아ㅓㅁ</label>
              <input 
                type="text" 
                className="form-control" 
                /* onChange={} */ 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="content" className="form-label">내용</label>
              <ReactQuill ref={quillRef} value={content} onChange={(e) => handleContentChange(e)} modules={modules} formats={formats} />
            </div>
            <button onClick={() => prevPage()}>취소</button>
            <button type="submit" className="btn btn-primary">등록</button>
          </form> 
        </div>
      </Container>
    </StyleFrame>
  );
};

export default CompanyWrite;
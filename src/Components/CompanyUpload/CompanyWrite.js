import React, { useEffect, useState } from 'react';
import { useNavigate  } from "react-router-dom";
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

//import component
import Header from "../Header"

// styled
import { StyleFrame, Container } from "./StyledCompanyWrite"

const modules =  {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'color': [] }, { 'background': [] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['link', 'image']
     // Added color and background color buttons
  ],
};
const formats = [
  'header',
  'font',
  'list',
  'color', 'background', // Added color and background formats
  'bold', 'italic', 'underline', 'strike',
  'link', 'image'
];

const CompanyWrite = () => {
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

  const handleContentChange = (value) => {
    // setContent(value);
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
  console.log(postData, content)

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
              <ReactQuill value={postData.content} onChange={(e) => handleContentChange(e)} modules={modules} formats={formats} />
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
import React, { useEffect, useState, useMemo, useRef  } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import ReactQuill , { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Resizer from "react-image-file-resizer";
/* import component */
import Header from "../../Header"
import Footer from "../../Footer"
/* styled */ 
import { Container } from "../../CompanyUpload/StyledCompanyWrite"
import { StyledFrame, CommonStyleFrame } from "../../CompanyUpload/StyleCommon"
/* Log */
import PageLog from '../../../Hook/PageLog'

const AnnouncementModify = () => {
  const baseURL = process.env.REACT_APP_BASEURL;
  ///// JWT /////
  const accessToken = sessionStorage.getItem('accessToken'); 
  const userGroup = sessionStorage.getItem('userGroup'); 
  const headers = {
    Authorization: `${accessToken}`
  }
  const navigate = useNavigate();
  const { id } = useParams();
  ///// page log /////
  // PageLog("글쓰기(투자등록)");

  const [postData, setPostData] = useState({
    category: "",
    condition: "ongoing",
    isNotice: "Y",
    title: "",
    content: "",
    extraField: "",
    section1: "section1",
    section2: "section2",
    section3: "section3",
    section4: "section4",
    section5: "section5",
    isSecret: "N",
    attaches: ""
  });

  useEffect(() => {
    axios.get(`${baseURL}/v1/board/announcement/post/${id}`, { headers }).then((res) => {
      const data = res.data?.query[0]
      setPostData(data);
      console.log(data,"공지사항게시글테스트");
    }).catch((error) => {
      console.log(error,"공지사항ERROR")
    })
  }, []);

  /////////////////////////
  /////     이미지    /////
  /////////////////////////
  ///// 리사이즈 /////
  const resizeFile = (file) =>
  new Promise((res) => {
    Resizer.imageFileResizer(
      file,
      900,
      1500,
      "WEBP",
      80,
      0,
      (uri) => res(uri), 
      "file" 
      );
    });
  ///// 이미지 핸들러 /////
  const quillRef = useRef(true);
  const imageHandler = () => { 
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.setAttribute('multiple', 'true');
    input.click();
    
    input.onchange = async () => {
      const files =input.files;
      const editor = quillRef.current.getEditor();
      const formData = new FormData();

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const compressedFile = (await resizeFile(file)); // 리사이징
        const encodedFilename = encodeURIComponent(file.name);
        formData.append('files', compressedFile);  // 리사이징
        formData.append('filename', encodedFilename);
      }
      formData.append('brdKey', "investment");
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
      } catch (error) {
        console.log(error, '실패')
      }
    }
  }
  
  ///// content 수정 /////
  const handleContentChange = (value) => {
    // setContent(value.replaceAll("'",""));
    setPostData({
      ...postData,
      content : value,
    });
  };

  ///// title 수정 /////
  const onChange = (e) => {
    const { value, name } = e.target;
    setPostData({
      ...postData,
      [name]: value,
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

  ///// 등록/취소 Btn /////
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (window.confirm("수정하시겠습니까?")) {
      await axios.patch(`${baseURL}/v1/board/announcement/post/${id}`, postData, { headers }).then((res) => {
        alert("수정하였습니다")
        navigate('/announcement')
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

  useEffect(() => {
    if (userGroup !== "관리자") {
      alert("관리자만 접근할 수 있는 페이지입니다.")
      navigate("/");
    }
  }, [accessToken, navigate]);

  return (
    <>
    {accessToken ? 
    <StyledFrame>
      <Header />
      <Container>
        <CommonStyleFrame>
          <div className="container mt-5">
            <h2 className='title'>공지수정</h2>

            {/********* 제목 input *********/}
            <div className="mb-3">
              <label htmlFor="title" className="form-label">제목</label>
              <input 
                type="text"
                id="title"
                className="form-control title" 
                name="title" 
                placeholder='공지 제목을 입력해주세요'
                value={postData.title}
                onChange={onChange} 
              />
            </div>


            {/********* 내용입력 *********/}
            <div className="mb-3">
              <label htmlFor="content" className="form-label">내용</label>
              <ReactQuill 
                ref={quillRef} 
                value={postData.content || ""} 
                name = "content"
                onChange={handleContentChange} 
                modules={modules} 
                formats={formats} 
              />
            </div>
            <div className="btnBox">
              <button onClick={() => prevPage()} className='cancelBtn'>취소</button>
              <button 
                type="submit" 
                className="btn btn-primary" 
                onClick={handleSubmit} 
                disabled={
                  postData.title?.length === 0 || 
                  postData.content?.length === 0 ? 
                  true : 
                  false
                }>수정</button>
            </div>
          </div>
        </CommonStyleFrame>
      </Container>
      <Footer />
    </StyledFrame>
    : null
    }
    </>
  );
};

export default AnnouncementModify;
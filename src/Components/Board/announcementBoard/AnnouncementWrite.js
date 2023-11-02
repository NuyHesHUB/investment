import React, { useEffect, useState, useMemo, useRef  } from 'react';
import { useNavigate } from "react-router-dom";
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
/* icon */
import { PiFilePlusThin } from "react-icons/pi";
import { BsTrash3 } from "react-icons/bs";
/* Log */
import PageLog from '../../../Hook/PageLog'

const AnnouncementWrite = () => {
  const baseURL = process.env.REACT_APP_BASEURL;
  ///// JWT /////
  const accessToken = sessionStorage.getItem('accessToken'); 
  const headers = {
    Authorization: `${accessToken}`
  }
  const navigate = useNavigate();

  ///// page log /////
  // PageLog("글쓰기(투자등록)");

  const [content, setContent] = useState(''); // 내용
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

  /////////////////////////
  /////     이미지    /////
  /////////////////////////
  ///// 리사이즈 /////
  const resizeFile = (file) =>
  new Promise((res) => {
    Resizer.imageFileResizer(
      file, // target file
      900, // maxWidth
      1500, // maxHeight
      "WEBP", // compressFormat : Can be either JPEG, PNG or WEBP.
      80, // quality : 0 and 100. Used for the JPEG compression
      0, // rotation
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
        // formData.append('files', file);  // Append each file to the FormData
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
  
  ///// 내용 변경 /////
  const handleContentChange = (value) => {
    setContent(value.replaceAll("'",""));
  };
  useEffect(() => {
    setPostData({
      ...postData,
      content: content
    });
  }, [content])
  
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


  ///// 제목 변경 /////
  const [title, setTitle] = useState('');
  const handleTitleChange = (e) => {
    const value = e.target.value
    setTitle(value.replaceAll("'",""));
  };
  useEffect(() => {
    setPostData({
      ...postData,
      title : title
    });
  },[title])

  ///// 첨부파일 /////
  const [selectedFilesName, setSelectedFilesName] = useState([]); //파일명 미리보기
  const handleFileChange  = async (e) => {
    const files = e.target.files;
    if (
      files.length > 5 
      || postData.attaches.length >= 5 
      || postData.attaches.length + files.length > 5
    ) {
      alert('최대 5개의 파일만 선택할 수 있습니다.');
      return;
    } else {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        // 파일명 미리보기 데이터
        setSelectedFilesName(selectedFilesName => [...selectedFilesName, files[i].name])
        //폼데이터 넣기
        const file = files[i];
        const encodedFilename = encodeURIComponent(file.name);
        formData.append('files', file); 
        formData.append('filename', encodedFilename);
      }
      formData.append('brdKey', "investment");
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
      } catch (error) {
        console.error(error)
      }
      // postData에 저장
      setPostData({
        ...postData,
        attaches: [...postData.attaches, ATTACH_URL_LIST].flat(1)
      })
    } // if문 끝
    e.target.value = ''
  }

  ///// 첨부파일 삭제 /////
  const attachDelete = async (e, index) => {
    await axios.delete(`${baseURL}/v1/attachment/delete`, { data : {url: postData.attaches[index]}, headers} ).then((res) => {
      let newSelectedFilesName = selectedFilesName.filter((item, idx) => idx !== index)
      setSelectedFilesName(newSelectedFilesName)
      let newAttaches = postData.attaches.filter((item, idx) => idx !== index)
      setPostData({
        ...postData,
        attaches: newAttaches
      })
    }).catch((error) => {
      console.error(error)
      alert("error")
    })
  }

  ///// 등록/취소 Btn /////
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (window.confirm("등록하시겠습니까?")) {
      await axios.post(`${baseURL}/v1/board/announcement/post`, postData, { headers }).then((res) => {
        sessionStorage.removeItem('b_no');
        alert("추가하였습니다")
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
    if (!accessToken) {
      alert("회원만 접근할 수 있는 페이지입니다.")
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
              <h2 className='title'>공지쓰기</h2>

              {/********* 제목 input *********/}
              <div className="mb-3">
                <label htmlFor="title" className="form-label">제목</label>
                <input 
                  type="text"
                  id="title"
                  className="form-control title" 
                  name="title" 
                  placeholder='공지 제목을 입력해주세요'
                  value={title || ""}
                  onChange={(e) => handleTitleChange(e)} 
                />
              </div>
  
              {/********* 첨부파일 input *********/}
              <div className="mb-3 attaches-cont">
                <label htmlFor="attaches" className="form-label attaches">
                  첨부파일
                  <div className='attaches-btn'>
                    {/* <BsFileEarmarkPlus size={70} color='#aaa' />  */}
                    <PiFilePlusThin size={70} color='#aaa' /> 
                    <p>첨부파일 업로드하기</p>
                    <p className='attach-amount'>최대 5개 / <span>{selectedFilesName.length}</span>개</p>
                  </div>
                </label>
                <input 
                  type="file"
                  accept=".gif, .jpg, .jpeg, .png, .pdf, .ppt, .doc, .hwp, .txt, .xls, .xlsx"
                  id="attaches" 
                  className="form-control" 
                  // value={selectedFiles}
                  onChange={(e) => handleFileChange(e)} 
                  multiple
                />
                {/* 첨부파일 이미지 미리보기 */}
                <ul className={selectedFilesName.length > 0 ? "attachPreviewBox" : ""}>
                  {selectedFilesName && selectedFilesName.map((item, index) => {
                    return(
                      <li className='attachPreview' key={index}>
                        <span>{item}</span>
                        <button 
                          className='attach_del_btn' 
                          onClick={(e) => attachDelete(e, index)}
                        ><BsTrash3 size={15} /></button>
                      </li> 
                    )
                  })}
                </ul>
              </div>
  
              {/********* 내용입력 *********/}
              <div className="mb-3">
                <label htmlFor="content" className="form-label">내용</label>
                <ReactQuill 
                  ref={quillRef} 
                  value={content} 
                  onChange={(e) => handleContentChange(e)} 
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
                    content?.length === 0 ? 
                    true : 
                    false
                  }>등록</button>
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

export default AnnouncementWrite;
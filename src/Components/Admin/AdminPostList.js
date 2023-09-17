import React, { useEffect, useState } from 'react';

/* Redux */
import { useSelector } from 'react-redux';

/* React-Router-Dom */
import { Link } from 'react-router-dom';

/* Axios */
/* import axiosInstance from '../../axiosInstance'; */
import axios from 'axios';

/* Components */
import Admin from './Admin';

/* StyledComponents */
import { StyledFrame, StyledTableWrap, EditSaveBtn, AdminListFrame, AdminModalFrame, StyledInfoBox, StyledSearchBox, StyledAdminBoard, StyledMemberListNav } from './StyledAdminTable';

const AdminPostList = () => {
    const baseURL = process.env.REACT_APP_BASEURL;

    const editPostData = useSelector((state) => state.reducer.adminPostData);
    
    const [AdminPostListData, setAdminPostListData] = useState([]); 
    const [selectedRows, setSelectedRows] = useState([]);
    const accessToken = sessionStorage.getItem('accessToken');
    const userUid = sessionStorage.getItem('userUid');
    const headers = {
        Authorization: `${accessToken}`
    }
    console.log('editPostData',editPostData);
    /*------------------------------------------------*\
                  Authorize 읽기 / 쓰기 수정
    \*------------------------------------------------*/
    /* const [readValue, setReadValue] = useState({});
    const [writeValue, setWriteValue] = useState({});
    const handleReadChange = (e, index) => {
        const value = e.target.value;
        setReadValue(prevValues => ({
            ...prevValues,
            [index]: value
        }));
        updateAuthorize(index, 'authorize', value, writeValue[index] || 0);
    };
    
    const handleWriteChange = (e, index) => {
        const value = e.target.value;
        setWriteValue(prevValues => ({
            ...prevValues,
            [index]: value
        }));
        updateAuthorize(index, 'authorize', readValue[index] || 0, value);
    };
    const updateAuthorize = (index, key, newReadValue, newWriteValue) => {
        setAdminPostListData(prevData => {
            const newData = [...prevData];
            const newAuthorize = JSON.stringify({ "읽기": newReadValue, "쓰기": newWriteValue });
            newData[index][key] = newAuthorize;
            return newData;
        });
    }; */
    

    /*------------------------------------------------*\
                  skins 데스크탑 / 모바일 수정
    \*------------------------------------------------*/
    /* const [deskTopSkins, setDeskTopSkins] = useState({});
    const [mobileSkins, setMobileSkins] = useState({});
    const handleDeskTopSkinsChange = (e, index) => {
        const value = e.target.value;
        setDeskTopSkins(prevValues => ({
            ...prevValues,
            [index]: value
        }));
        updateSkins(index, 'skins', mobileSkins[index] || '', value);
    };
    const handleMobileSkinsChange = (e, index) => {
        const value = e.target.value;
        setMobileSkins(prevValues => ({
            ...prevValues,
            [index]: value
        }));
        updateSkins(index, 'skins', value, deskTopSkins[index] || '');
    };
    const updateSkins = (index, key, newReadValue, newWriteValue) => {
        setAdminPostListData(prevData => {
            const newData = [...prevData];
            const newSkins = JSON.stringify({ "모바일": newReadValue, "웹": newWriteValue });
            newData[index][key] = newSkins; 
            return newData;
        });
    }; */
    
    /*------------------------------------------------*\
                  categoryList MODAL 구현
    \*------------------------------------------------*/
    /* const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategoryList, setSelectedCategoryList] = useState(null);
    const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(false);
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);
    const [prevSelectedCategoryList, setPrevSelectedCategoryList] = useState(null);
    const openModal = (index, categoryList) => {
        setIsModalOpen(true);
        setSelectedCategoryList(categoryList);
        setPrevSelectedCategoryList(categoryList)
        setSelectedRowIndex(index);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleCategoryInputChange = (index, e) => {
        const value = e.target.value;
        setSelectedCategoryList(value);
        setIsSaveButtonDisabled(false);
    };

    const handleSaveClick = () => {
        setIsSaveButtonDisabled(true);
        setAdminPostListData(prevData => {
            const newData = [...prevData];
            newData[selectedRowIndex]['categoryList'] = selectedCategoryList;
            return newData;
        });
    }

    console.log('selectedCategoryList',selectedCategoryList); */
    

    /*------------------------------------------------*\
                      CheckBox onChange
    \*------------------------------------------------*/
    const handleCheckboxChange = (item) => {
        setSelectedRows(prevRows => {
            if (prevRows.includes(item)) {
                return prevRows.filter(row => row !== item);
            } else {
                return [...prevRows, item];
            }
        });
    };

    /*------------------------------------------------*\
                        input onChange
    \*------------------------------------------------*/
    const handleInputChange = (e, index, key) => {
        const { value } = e.target;
        setAdminPostListData(prevData => {
            const newData = [...prevData];
            newData[index][key] = value;
            return newData;
        });
    };
    
    /*------------------------------------------------*\
          Redux에 저장한 값을 새로운 useState에 저장
    \*------------------------------------------------*/
    useEffect(() => {
        if(editPostData !== undefined && editPostData !== null){
            setAdminPostListData(editPostData);
            console.log('AdminPostListData',AdminPostListData);
        }else {
            console.log('editPostData', '해당 인덱스에 데이터가 없습니다.');
        }
    },[editPostData])

    const key = selectedRows[0]?.brdKey;
    const id = selectedRows[0]?.id;

    
    const handlePostEditSaveClick = async (e) => {
        e.preventDefault();
          const transformedData = {
            status: selectedRows[0].status,
            category: selectedRows[0].category,
            isNotice: selectedRows[0].isNotice,
            title: selectedRows[0].title,
            content: selectedRows[0].content,
            isSecret: selectedRows[0].isSecret,
            extraField: selectedRows[0].extraField,
            userUid: userUid
          };
        /* console.log(transformedData); */
        /* console.log('jsonData',jsonData); */

        try{/* /v1/board/:key/post/:boardPostId */
            const response = await axios.patch(`${baseURL}/v1/board/${key}/post/${id}`, transformedData, { headers });
            console.log('관리자 게시물관리 수정 성공', response);
        } catch(error) {
            console.error('관리자 게시물관리 수정 실패', error);
        }
        /* console.log('jsonData',jsonData); */
        // 요청 보내기
        
      };
    
    /*------------------------------------------------*\
                    console.log 테스트
    \*------------------------------------------------*/
    console.log('postData테스트', editPostData);
    console.log('selectedRows:', selectedRows);
    console.log('AdminPostListData',AdminPostListData);
    return (
        <AdminListFrame /* $isModalOpen={isModalOpen} */>
            <Admin/>
            <StyledFrame>
                {editPostData.length > 0 ? 
                <AdminListFrame>
                    <StyledTableWrap>
                    <div style={{display:'flex', width:'100%', justifyContent:'space-between', marginBottom:'50px'}}>
                        <h1>게시물 관리</h1>
                        <EditSaveBtn onClick={handlePostEditSaveClick} className='edit_save_btn'>저 장</EditSaveBtn>
                    </div>
                        <StyledAdminBoard>
                            <div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope='col'>
                                                <input 
                                                    type="checkbox" 
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setSelectedRows([...editPostData]);
                                                        } else {
                                                            setSelectedRows([]);
                                                        }
                                                    }} 
                                                />
                                            </th>
                                            <th scope='col'>
                                                <Link>status</Link>
                                            </th>
                                            <th scope='col'>
                                                <Link>카테고리</Link>
                                            </th>
                                            <th scope='col'>
                                                <Link>제목(title)</Link>
                                            </th>
                                            <th scope='col'>
                                                <Link>내용(content)</Link>
                                            </th>
                                            <th scope='col'>
                                                <Link>조회수</Link>
                                            </th>
                                            <th scope='col'>
                                                <Link>댓글수</Link>
                                            </th>
                                            <th scope='col'>
                                                <Link>좋아요</Link>
                                            </th>
                                            <th scope='col'>
                                                <Link>싫어요</Link>
                                            </th>
                                            <th scope='col'>
                                                <Link>비밀글</Link>
                                            </th>
                                            {/* <th scope='col'>
                                                <Link>썸네일</Link>
                                            </th> */}
                                            <th scope='col'>
                                                <Link>닉네임</Link>
                                            </th>
                                            <th scope='col'>
                                                <Link>extraField</Link>
                                            </th>
                                            <th scope='col'>
                                                관리
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {AdminPostListData.map((item, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <input 
                                                            type="checkbox" 
                                                            checked={selectedRows.includes(item)}
                                                            onChange={() => handleCheckboxChange(item)} 
                                                        />
                                                    </td>
                                                    <td rowSpan={1}>
                                                        <label>
                                                            <input
                                                            type="radio"
                                                            name={`status-radio-${index}`}
                                                            value="Y"
                                                            checked={item.status === "Y"}
                                                            onChange={(e) => handleInputChange(e, index, 'status')}
                                                            disabled={!selectedRows.includes(item)}
                                                            />
                                                            YES
                                                        </label>
                                                        <label>
                                                            <input
                                                            type="radio"
                                                            name={`status-radio-${index}`}
                                                            value="N"
                                                            checked={item.status === "N"}
                                                            onChange={(e) => handleInputChange(e, index, 'status')}
                                                            disabled={!selectedRows.includes(item)}
                                                            />
                                                            NO
                                                        </label>
                                                    </td>
                                                    <td rowSpan={1}>
                                                        <input 
                                                            placeholder={item.category} 
                                                            value={item.category}
                                                            onChange={(e) => handleInputChange(e, index, 'category')}
                                                            disabled={!selectedRows.includes(item)}
                                                        />
                                                    </td>
                                                    <td rowSpan={1}>
                                                        <input 
                                                            placeholder={item.title} 
                                                            value={item.title}
                                                            onChange={(e) => handleInputChange(e, index, 'title')}
                                                            disabled={!selectedRows.includes(item)}
                                                        />
                                                    </td>
                                                    <td rowSpan={1}>
                                                        <input 
                                                            placeholder={item.content} 
                                                            value={item.content}
                                                            onChange={(e) => handleInputChange(e, index, 'content')}
                                                            disabled={!selectedRows.includes(item)}
                                                        />
                                                    </td>
                                                    <td rowSpan={1}>
                                                        {/* <input 
                                                            placeholder={item.post_view_count} 
                                                            value={item.post_view_count}
                                                            onChange={(e) => handleInputChange(e, index, 'post_view_count')}
                                                            disabled={!selectedRows.includes(item)}
                                                        /> */}
                                                        <span>{item.post_view_count}</span>
                                                    </td>
                                                    <td rowSpan={1}>
                                                        {/* <input 
                                                            placeholder={item.comment_count} 
                                                            value={item.comment_count}
                                                            onChange={(e) => handleInputChange(e, index, 'comment_count')}
                                                            disabled={!selectedRows.includes(item)}
                                                        /> */}
                                                        <span>{item.comment_count}</span>
                                                    </td>
                                                    <td rowSpan={1}>
                                                        {/* <input 
                                                            placeholder={item.like} 
                                                            value={item.like}
                                                            onChange={(e) => handleInputChange(e, index, 'like')}
                                                            disabled={!selectedRows.includes(item)}
                                                        /> */}
                                                        <span>{item.like}</span>
                                                    </td>
                                                    <td rowSpan={1}>
                                                        {/* <input 
                                                            placeholder={item.dislike} 
                                                            value={item.dislike}
                                                            onChange={(e) => handleInputChange(e, index, 'dislike')}
                                                            disabled={!selectedRows.includes(item)}
                                                        /> */}
                                                        <span>{item.dislike}</span>
                                                    </td>
                                                    <td rowSpan={1}>
                                                        <label>
                                                            <input
                                                            type="radio"
                                                            name={`isSecret-radio-${index}`}
                                                            value="Y"
                                                            checked={item.isSecret === "Y"}
                                                            onChange={(e) => handleInputChange(e, index, 'isSecret')}
                                                            disabled={!selectedRows.includes(item)}
                                                            />
                                                            YES
                                                        </label>
                                                        <label>
                                                            <input
                                                            type="radio"
                                                            name={`isSecret-radio-${index}`}
                                                            value="N"
                                                            checked={item.isSecret === "N"}
                                                            onChange={(e) => handleInputChange(e, index, 'isSecret')}
                                                            disabled={!selectedRows.includes(item)}
                                                            />
                                                            NO
                                                        </label>
                                                    </td>
                                                    {/* <td rowSpan={1}>
                                                        <input 
                                                            placeholder={item.thumbnail} 
                                                            value={item.thumbnail}
                                                            onChange={(e) => handleInputChange(e, index, 'thumbnail')}
                                                            disabled={!selectedRows.includes(item)}
                                                        />
                                                    </td> */}
                                                    <td rowSpan={1}>
                                                        <input 
                                                            placeholder={item.nickname} 
                                                            value={item.nickname || ''}
                                                            onChange={(e) => handleInputChange(e, index, 'nickname')}
                                                            disabled={!selectedRows.includes(item)}
                                                        />
                                                    </td>
                                                    <td rowSpan={1}>
                                                        <input 
                                                            placeholder={item.extraField} 
                                                            value={item.extraField}
                                                            onChange={(e) => handleInputChange(e, index, 'extraField')}
                                                            disabled={!selectedRows.includes(item)}
                                                        />
                                                    </td>
                                                    <td rowSpan={1}>
                                                        <Link to={`/admin/post_edit/${index}`} style={{textDecoration:'none'}}>
                                                                <span style={{background:'#3f51b5',color:'#fff',padding:'5px',fontSize:'12px',borderRadius:'10px'}}>수정</span>
                                                        </Link>
                                                        <button disabled={!selectedRows.includes(item)} style={{padding:'5px',fontSize:'12px', marginLeft:'5px'}}>삭제</button>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </StyledAdminBoard>
                    </StyledTableWrap>
                </AdminListFrame> : <div>Loading...</div>}
                
            </StyledFrame>
        </AdminListFrame>
    );
};

export default AdminPostList;
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
    const editPostData = useSelector((state) => state.reducer);
    
    const [AdminPostListData, setAdminPostListData] = useState({}); 
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
    const [readValue, setReadValue] = useState({});
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
            /* const newAuthorize = `{"읽기":${newReadValue},"쓰기":${newWriteValue}}`;  */
            const newAuthorize = JSON.stringify({ "읽기": newReadValue, "쓰기": newWriteValue });
            newData[index][key] = newAuthorize;
            return newData;
        });
    };
    

    /*------------------------------------------------*\
                  skins 데스크탑 / 모바일 수정
    \*------------------------------------------------*/
    const [deskTopSkins, setDeskTopSkins] = useState({});
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
    };
    
    /*------------------------------------------------*\
                  categoryList MODAL 구현
    \*------------------------------------------------*/
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategoryList, setSelectedCategoryList] = useState(null);
    const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(false);
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);
    const [prevSelectedCategoryList, setPrevSelectedCategoryList] = useState(null);
    // 모달을 열고 닫는 함수
    const openModal = (index, categoryList) => {
        setIsModalOpen(true);
        setSelectedCategoryList(categoryList);
        /* 추가 */
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

    console.log('selectedCategoryList',selectedCategoryList);
    

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
        if(editPostData.length > 0){
            setAdminPostListData(editPostData);
            /* console.log('AdminPostListData',AdminPostListData); */
        }else {
            console.log('editPostData', '해당 인덱스에 데이터가 없습니다.');
        }
    },[editPostData])

    const handlePostEditSaveClick = async (e) => {
        e.preventDefault();
          const transformedData = {
            key: selectedRows[0].key,
            status: selectedRows[0].status,
            title: selectedRows[0].title,
            skins: JSON.parse(selectedRows[0].skins),
            authorize: JSON.parse(selectedRows[0].authorize),
            categoryList: selectedRows[0].categoryList,
            regUser: selectedRows[0].regUser,
            regDt: selectedRows[0].regDt,
            updUser: selectedRows[0].updUser,
            updDt: selectedRows[0].updDt,
            userUid: userUid
          };
        /* console.log(transformedData); */
        /* console.log('jsonData',jsonData); */
        try{
            const response = await axios.patch('http://39.117.244.34:3385/v1/board/modify', transformedData, { headers });
            console.log('관리자 게시판관리 수정 성공', response);
        } catch(error) {
            console.error('관리자 게시판관리 수정 실패', error);
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
        <AdminListFrame $isModalOpen={isModalOpen}>
            <Admin/>
            <StyledFrame>
                {editPostData.length > 0 ? 
                <AdminListFrame>
                    <StyledTableWrap>
                    <div style={{display:'flex', width:'100%', justifyContent:'space-between', marginBottom:'50px'}}>
                        <h1>게시물 관리1111111111111111</h1>
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
                                                <Link>그룹(Key)</Link>
                                            </th>
                                            <th scope='col'>
                                                <Link>제목(title)</Link>
                                            </th>
                                            <th scope='col'>
                                                <Link>읽기</Link>
                                            </th>
                                            <th scope='col'>
                                                <Link>쓰기</Link>
                                            </th>
                                            {/* <th scope='col'>
                                                <Link>Authorize</Link>
                                            </th> */}
                                            <th scope='col'>
                                                <Link>카테고리(Category)</Link>
                                            </th>
                                            {/* <th scope='col'>
                                                <Link>extraFields</Link>
                                            </th> */}
                                            {/* <th scope='col'>
                                                <Link>Options</Link>
                                            </th> */}
                                            <th scope='col'>
                                                <Link>regDt</Link>
                                            </th>
                                            <th scope='col'>
                                                <Link>regUser</Link>
                                            </th>
                                            <th scope='col'>
                                                <Link>웹(Skins)</Link>
                                            </th>
                                            <th scope='col'>
                                                <Link>모바일(Skins)</Link>
                                            </th>
                                            <th scope='col'>
                                                관리
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {editPostData.map((item, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <input 
                                                            type="checkbox" 
                                                            checked={selectedRows.includes(item)}
                                                            onChange={() => handleCheckboxChange(item)} 
                                                        />
                                                    </td>
                                                    <td rowSpan={1}>
                                                        <input 
                                                            placeholder={item.key} 
                                                            value={item.key}
                                                            onChange={(e) => handleInputChange(e, index, 'key')}
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
                                                    <td>
                                                        <select value={readValue[index]} onChange={(e) => handleReadChange(e, index)} disabled={!selectedRows.includes(item)}>
                                                            {['', 0, 1, 2, 3, 4, 5].map(num => (
                                                                <option key={num} value={num}>{num}{num === '' ? '선택' : ''}</option>
                                                            ))}
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <select value={writeValue[index]} onChange={(e) => handleWriteChange(e, index)} disabled={!selectedRows.includes(item)}>
                                                            {['', 0, 1, 2, 3, 4, 5].map(num => (
                                                                <option key={num} value={num}>{num}{num === '' ? '선택' : ''}</option>
                                                            ))}
                                                        </select>
                                                    </td>
                                                    {/* <td rowSpan={1}>{item.authorize}</td> */}
                                                    {/* <td rowSpan={1}>{item.categoryList}</td> */}
                                                    <td rowSpan={1}><button onClick={() => openModal(index, item.categoryList)} disabled={!selectedRows.includes(item)}>카테고리 추가/수정</button></td>
                                                    {/* <td rowSpan={1}>{item.extraFields}</td> */}
                                                    {/* <td rowSpan={1}>{item.options}</td> */}
                                                    <td rowSpan={1}>{item.regDt}</td>
                                                    <td rowSpan={1}>{item.regUser}</td>
                                                    {/* <td rowSpan={1}>{item.skins}</td> */}
                                                    <td>
                                                        <select value={deskTopSkins[index]} onChange={(e) => handleDeskTopSkinsChange(e, index)} disabled={!selectedRows.includes(item)}>
                                                            {['선택', 'deskTop-basic', 'red', 'orange', 'yellow', 'green', 'blue'].map(num => (
                                                                <option key={num} value={num}>{num}{num === '' ? '선택' : ''}</option>
                                                            ))}
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <select value={mobileSkins[index]} onChange={(e) => handleMobileSkinsChange(e, index)} disabled={!selectedRows.includes(item)}>
                                                            {['선택', 'mobil-basic', 'red', 'orange', 'yellow', 'green', 'blue'].map(num => (
                                                                <option key={num} value={num}>{num}{num === '' ? '선택' : ''}</option>
                                                            ))}
                                                        </select>
                                                    </td>
                                                    <td rowSpan={1}>
                                                        <Link to={`/admin/post_edit/${index}`} style={{textDecoration:'none'}}>
                                                                <span style={{background:'#3f51b5',color:'#fff',padding:'5px',fontSize:'12px',borderRadius:'10px'}}>수정</span>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                                {isModalOpen && (
                                    <AdminModalFrame >
                                        <div className='modal-header'>카테고리 추가/수정</div>
                                        <div className='modal-contents'>
                                            <div>변경전 : {prevSelectedCategoryList} </div>
                                            <div>변경후 : {isSaveButtonDisabled && <>{selectedCategoryList}</> }</div>
                                            {/* {isSaveButtonDisabled && <div>{selectedCategoryList}</div>} */}
                                            <input 
                                                placeholder={selectedCategoryList} 
                                                value={selectedCategoryList}
                                                onChange={(e) => handleCategoryInputChange(selectedRowIndex, e)}
                                            />
                                        </div>
                                        <div className='modal-btn' style={{textAlign:'center'}}>
                                            <EditSaveBtn 
                                                style={{margin:'0 5px'}}
                                                onClick={handleSaveClick}
                                                disabled={isSaveButtonDisabled}
                                            >저장</EditSaveBtn>
                                            <EditSaveBtn onClick={() => { 
                                                
                                                closeModal();
                                            }} style={{margin:'0 5px'}}>닫기</EditSaveBtn>
                                        </div>
                                    </AdminModalFrame>
                                )}
                            </div>
                        </StyledAdminBoard>
                    </StyledTableWrap>
                </AdminListFrame> : <div>Loading...</div>}
                
            </StyledFrame>
        </AdminListFrame>
    );
};

export default AdminPostList;
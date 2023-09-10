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
    const editPostData = useSelector((state) => state.reducer.adminPostData);
    const [AdminPostListData, setAdminPostListData] = useState({}); 
    const [selectedRows, setSelectedRows] = useState([]);
    const accessToken = sessionStorage.getItem('accessToken');
    const userUid = sessionStorage.getItem('userUid');
    const headers = {
        Authorization: `${accessToken}`
    }
    const [editedValues, setEditedValues] = useState({});

    /* const dataToSave = selectedRows.map(item => ({
        key: item.key,
        title: item.title,
        authorize: item.authorize,
        options: item.options,
        extraFields: item.extraFields,
        categoryList: item.categoryList,
        skins: item.skins,
        status: item.status,
        userUid: item.userUid
    }));
    
    const joinedData = `[${dataToSave.map(obj => JSON.stringify(obj)).join(',')}]`; */
    /* const dataToSave = selectedRows.map(item => ({
        key: item.key,
        title: item.title,
        authorize: JSON.parse(item.authorize),
        options: JSON.parse(item.options),
        extraFields: JSON.parse(item.extraFields),
        categoryList: JSON.parse(item.categoryList),
        skins: JSON.parse(item.skins),
        status: item.status,
        userUid: userUid
    }));
    
    const joinedData = dataToSave.map(obj => JSON.stringify(obj)); */

    const dataToSave = selectedRows.map(item => (
        {
            key: item.key,
            title: item.title,
            authorize: JSON.parse(item.authorize),
            options: JSON.parse(item.options),
            extraFields: JSON.parse(item.extraFields),
            categoryList: JSON.parse(item.categoryList),
            skins: JSON.parse(item.skins),
            status: item.status,
            userUid: userUid
        }
    ));
    
    const joinedData = dataToSave.map(obj => ({
        key: obj.key,
        title: obj.title,
        authorize: obj.authorize,
        options: obj.options,
        extraFields: obj.extraFields,
        categoryList: obj.categoryList,
        skins: obj.skins,
        status: obj.status,
        userUid: obj.userUid
    }));

    
    
    
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
        /* updateAuthorize(index, 'authorize', value, writeValue[index]); */
        updateAuthorize(index, 'authorize', value, writeValue[index] || 0);
    };
    const handleWriteChange = (e, index) => {
        const value = e.target.value;
        setWriteValue(prevValues => ({
            ...prevValues,
            [index]: value
        }));
        /* updateAuthorize(index, 'authorize', readValue[index], value); */
        updateAuthorize(index, 'authorize', readValue[index] || 0, value);
    };
    const updateAuthorize = (index, key, newReadValue, newWriteValue) => {
        setAdminPostListData(prevData => {
            const newData = [...prevData];
            const newAuthorize = `{"읽기":${newReadValue},"쓰기":${newWriteValue}}`; // 새로운 authorize 문자열 생성
            newData[index][key] = newAuthorize; // 업데이트된 값 설정
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
            const newSkins = `{"모바일":${newReadValue},"웹":${newWriteValue}}`;
            newData[index][key] = newSkins; // 업데이트된 값 설정
            return newData;
        });
    };

    /* 나중에 값이 다 생성되고나면 그 값이 input에 값이 남겨지도록 하는 기능인데 값을 다 전송하는 기능을 구현한 뒤에 구현 */
    /* useEffect(() => {
        if (editPostData.length > 0) {
            const initialReadValues = {};
            const initialWriteValues = {};
    
            editPostData.forEach((item, index) => {
                if (item.authorize) {
                    const authorizeObj = JSON.parse(item.authorize);
                    initialReadValues[index] = authorizeObj.읽기;
                    initialWriteValues[index] = authorizeObj.쓰기;
                } else {
                    initialReadValues[index] = '';
                    initialWriteValues[index] = '';
                }
            });
    
            setReadValue(initialReadValues);
            setWriteValue(initialWriteValues);
        } else {
            console.log('editPostData', '해당 인덱스에 데이터가 없습니다.');
        }
    }, [editPostData]); */

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

        /* setAdminPostListData(prevData => {
            const newData = [...prevData];
            newData[index]['categoryList'] = value; 
            return newData;
        }); */
    };

    const handleSaveClick = () => {
        setIsSaveButtonDisabled(true);
        setAdminPostListData(prevData => {
            const newData = [...prevData];
            newData[selectedRowIndex]['categoryList'] = selectedCategoryList;
            return newData;
        });
    }

    /* const handleCancelClick = (index) => {
        setSelectedCategoryList(prevSelectedCategoryList);
        setIsSaveButtonDisabled(true);
    }; */
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

    /* const handlePostEditSaveClick = async(e) => {
        e.preventDefault();
        console.log(joinedData);

        try{
            const response = await axios.patch('http://39.117.244.34:3385/v1/board/modify', joinedData, { headers });
            console.log('관리자 게시판관리 수정 성공', response);
        } catch(error) {
            console.error('관리자 게시판관리 수정 실패', error);
        }
    } */
    const handlePostEditSaveClick = async(e) => {
        e.preventDefault();
        console.log(joinedData);
    
        // joinedData를 JSON 문자열로 변환
        const jsonData = joinedData.map(obj => JSON.stringify(obj)).join(',');
    
        // JSON 파일 생성
        const blob = new Blob([`{${jsonData}}`], { type: 'application/json' });
    
        // Blob으로부터 데이터 URL을 생성하여 링크 생성
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = 'joinedData.json';
        downloadLink.click();
    }
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
                        <h1>게시판관리</h1>
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
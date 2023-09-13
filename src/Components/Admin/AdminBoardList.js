import React, { useEffect, useState } from 'react';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
/* import { setAdminPostData } from '../../store/actions/actions'; */

/* React-Router-Dom */
import { Link } from 'react-router-dom';

/* Axios */
/* import axiosInstance from '../../axiosInstance'; */
import axios from 'axios';

/* Components */
import Admin from './Admin';

/* StyledComponents */
import { StyledFrame, StyledTableWrap, EditSaveBtn, AdminListFrame, AdminModalFrame, StyledInfoBox, StyledSearchBox, StyledAdminBoard, StyledMemberListNav } from './StyledAdminTable';

const AdminBoardList = () => {
    /* const dispatch = useDispatch(); */
    const editBoardData = useSelector((state) => state.reducer.adminBoardData);
    const [AdminBoardListData, setAdminBoardListData] = useState([]); 
    const [selectedRows, setSelectedRows] = useState([]);
    const [newRowData, setNewRowData] = useState({
        key: '',
        title: '',
        authorize: '',
        categoryList: '',
        extraFields: '{}',
        options: '{}',
        regDt: '',
        regUser: '',    
        skins: '',
        /* status: 'Y', */
        status: '',
        updDt: '',
        updUser: '',
    });
    const accessToken = sessionStorage.getItem('accessToken');
    const userUid = sessionStorage.getItem('userUid');
    const headers = {
        Authorization: `${accessToken}`
    }
    
    /*------------------------------------------------*\
                  Authorize 읽기 / 쓰기 수정
    \*------------------------------------------------*/
    const [readValue, setReadValue] = useState({});
    const [writeValue, setWriteValue] = useState({});
    /* const handleReadChange = (e, index) => {
        const value = e.target.value;
        setReadValue(prevValues => ({
            ...prevValues,
            [index]: value
        }));
        updateAuthorize(index, 'authorize', value, writeValue[index] || 0);
    }; */
    const handleReadChange = (e, index) => {
        const value = e.target.value;
        setReadValue(prevValues => ({
            ...prevValues,
            [index]: value === '선택' ? '' : value // '선택'일 경우 빈 문자열로 설정
        }));
        updateAuthorize(index, 'authorize', value === '선택' ? '' : value, writeValue[index] === '선택' ? '' : writeValue[index]);
    };

    /* const handleWriteChange = (e, index) => {
        const value = e.target.value;
        setWriteValue(prevValues => ({
            ...prevValues,
            [index]: value
        }));
        updateAuthorize(index, 'authorize', readValue[index] || 0, value);
    }; */
    const handleWriteChange = (e, index) => {
        const value = e.target.value;
        setWriteValue(prevValues => ({
            ...prevValues,
            [index]: value === '선택' ? '' : value // '선택'일 경우 빈 문자열로 설정
        }));
        updateAuthorize(index, 'authorize', readValue[index] === '선택' ? '' : readValue[index], value === '선택' ? '' : value);
    };

    /* const updateAuthorize = (index, key, newReadValue, newWriteValue) => {
        setAdminBoardListData(prevData => {
            const newData = [...prevData];
            const newAuthorize = JSON.stringify({ "읽기": newReadValue || null, "쓰기": newWriteValue || null });
            newData[index][key] = newAuthorize;
            return newData;
        });
    }; */
    /* const updateAuthorize = (index, key, newReadValue, newWriteValue) => {
        setAdminBoardListData(prevData => {
            const newData = [...prevData];
            const newAuthorize = {};
            if (newReadValue !== null) {
                newAuthorize["읽기"] = newReadValue;
            }
            if (newWriteValue !== null) {
                newAuthorize["쓰기"] = newWriteValue;
            }
            newData[index][key] = Object.keys(newAuthorize).length > 0 ? JSON.stringify(newAuthorize) : "{}";
            return newData;
        });
    }; */
    const updateAuthorize = (index, key, newReadValue, newWriteValue) => {
        setAdminBoardListData(prevData => {
            const newData = [...prevData];
            const newAuthorize = {};
    
            if (newReadValue !== null && newReadValue !== '선택') {
                newAuthorize["읽기"] = newReadValue;
            }
    
            if (newWriteValue !== null && newWriteValue !== '선택') {
                newAuthorize["쓰기"] = newWriteValue;
            }
    
            newData[index][key] = JSON.stringify(newAuthorize);
            console.log('newData',newData);
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
        setAdminBoardListData(prevData => {
            const newData = [...prevData];
            /* const newSkins = `{"모바일":${newReadValue},"웹":${newWriteValue}}`; */
            /* const newSkins = `{"모바일":${newReadValue},"웹":${newWriteValue}}`; */
            const newSkins = JSON.stringify({ "모바일": newReadValue || null , "웹": newWriteValue || null });
            newData[index][key] = newSkins; 
            return newData;
        });
    };

    const handleAddRow = () => {
        setAdminBoardListData(prevData => [...prevData, newRowData]);
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
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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
        setAdminBoardListData(prevData => {
            const newData = [...prevData];
            newData[selectedRowIndex]['categoryList'] = selectedCategoryList;
            return newData;
        });
    }

    console.log('selectedCategoryList',selectedCategoryList);
    /* console.log('newRowData',newRowData); */

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
        setAdminBoardListData(prevData => {
            const newData = [...prevData];
            newData[index][key] = value;
            return newData;
        });
    };
    
    /*------------------------------------------------*\
          Redux에 저장한 값을 새로운 useState에 저장
    \*------------------------------------------------*/
    useEffect(() => {
        if(editBoardData?.length > 0){
            setAdminBoardListData(editBoardData);
            console.log('AdminBoardListData',editBoardData);
        }else {
            console.log('editBoardData', '해당 인덱스에 데이터가 없습니다.');
        }
    },[editBoardData])
    
    const handleBoardEditSaveClick = async (e) => {
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
           /*  updUser: selectedRows[0].updUser,
            updDt: selectedRows[0].updDt, */
            userUid: userUid
          };
        console.log(transformedData);
        /* console.log('jsonData',jsonData); */
        try{
            const response = await axios.patch('http://39.117.244.34:3385/v1/board/modify', transformedData, { headers });
            console.log('관리자 게시판관리 수정 성공', response);
            console.log('transformedData',transformedData);
        } catch(error) {
            console.error('관리자 게시판관리 수정 실패', error);
        }
      };
      const handleBoardGroupAddSaveClick = async (e) => {
        e.preventDefault();

        /* setAdminPostListData(prevData => [...prevData, newRowData]); */
        setNewRowData({ 
            key: '',
            title: '',
            authorize: '',
            categoryList: '',
            extraFields: '',
            options: '',
            regDt: '',
            regUser: '',    
            skins: '',
            /* status: 'Y', */
            status: '',
            updDt: '',
            updUser: '',
        });
        try {
            const response = await axios.post('http://39.117.244.34:3385/v1/board/form', newRowData, { headers });
            console.log('새로운 데이터 추가 성공', response);
            
    
        } catch (error) {
            console.error('작업 실패', error);
        }
      }
      /* const handleDeleteRow = (index) => {
        setAdminPostListData((prevData) => {
          // index에 해당하는 열을 제외한 나머지 열들을 필터링하여 새로운 배열을 생성
          const newData = prevData.filter((item, i) => i !== index);
          return newData;
        });
      }; */
      /* const deleteData = selectedRows?.[0]?.key; */
    
      const handleDeleteSave = async (e) => {
        e.preventDefault();
        setIsDeleteModalOpen(false);
        const deleteForm = {
            key: `${selectedRows?.[0]?.key}`,
            userUid: `${userUid}`
        }
        const headers = {
            Authorization: `${accessToken}`
        }
    
        try {
            const res = await axios.delete('http://39.117.244.34:3385/v1/board/delete', { data: deleteForm, headers });
            console.log('삭제 성공', res);
            console.log('deleteForm', deleteForm);
            console.log('headers', headers);
        } catch (error) {
            console.error('삭제 실패', error);
            console.log('deleteForm', deleteForm);
            console.log('headers', headers);
        }
    };
    /*------------------------------------------------*\
                    console.log 테스트
    \*------------------------------------------------*/
    console.log('boardData테스트', editBoardData);
    console.log('selectedRows:', selectedRows);
    console.log('AdminBoardListData',AdminBoardListData);
    return (
        <AdminListFrame $isModalOpen={isModalOpen}>
            <Admin/>
            <StyledFrame>
                {editBoardData?.length > 0 ?
                <AdminListFrame>
                    <StyledTableWrap>
                    <div style={{display:'flex', width:'100%', justifyContent:'space-between', marginBottom:'50px'}}>
                        <h1>게시판관리</h1>
                        <div>
                            <EditSaveBtn onClick={handleAddRow}>행 추가</EditSaveBtn>
                            <EditSaveBtn onClick={handleBoardGroupAddSaveClick}>행 추가 저장</EditSaveBtn>
                            <EditSaveBtn onClick={handleBoardEditSaveClick} className='edit_save_btn'>저 장</EditSaveBtn>
                        </div>
                    </div>
                        <StyledAdminBoard>
                            <div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope='col'>
                                                <input
                                                    name='checkbox' 
                                                    type="checkbox" 
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setSelectedRows([...editBoardData]);
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
                                        {AdminBoardListData.map((item, index) => {
                                            if (item.status === 'Y') {
                                                return (
                                                    <tr key={index}>
                                                    <td>
                                                        <input 
                                                            name='checkbox'
                                                            type="checkbox" 
                                                            checked={selectedRows.includes(item)}
                                                            onChange={() => handleCheckboxChange(item)} 
                                                        />
                                                    </td>
                                                    <td rowSpan={1}>
                                                        <input 
                                                            name='checkbox'
                                                            placeholder={item.key} 
                                                            value={item.key}
                                                            onChange={(e) => handleInputChange(e, index, 'key')}
                                                            disabled={!selectedRows.includes(item)}
                                                        />
                                                    </td>
                                                    <td rowSpan={1}>
                                                        <input 
                                                            name='checkbox'
                                                            placeholder={item.title} 
                                                            value={item.title}
                                                            onChange={(e) => handleInputChange(e, index, 'title')}
                                                            disabled={!selectedRows.includes(item)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <select 
                                                            value={readValue[index] === null ? '선택' : readValue[index]} // '선택' 값이면 null 대신 '선택'을 표시
                                                            onChange={(e) => handleReadChange(e, index)} 
                                                            disabled={!selectedRows.includes(item)}
                                                        >
                                                            <option value={null}>선택</option>
                                                            {[0, 1, 2, 3, 4, 5].map(num => (
                                                                <option key={num} value={num}>{num === '' ? '선택' : num}</option>
                                                            ))}
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <select 
                                                            value={writeValue[index] === null ? '선택' : writeValue[index]} // '선택' 값이면 null 대신 '선택'을 표시
                                                            onChange={(e) => handleWriteChange(e, index)} 
                                                            disabled={!selectedRows.includes(item)}
                                                        >
                                                            <option value={null}>선택</option>
                                                            {[0, 1, 2, 3, 4, 5].map(num => (
                                                                <option key={num} value={num}>{num === '' ? '선택' : num}</option>
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
                                                        <button disabled={!selectedRows.includes(item)} onClick={() => setIsDeleteModalOpen(true)} style={{padding:'5px',fontSize:'12px', marginLeft:'5px'}}>삭제</button>
                                                        {/* <button disabled={!selectedRows.includes(item)} onClick={handleDeleteSave} style={{padding:'5px',fontSize:'12px', marginLeft:'5px'}}>삭제</button> */}
                                                    </td>
                                                </tr>
                                                );
                                            } else {
                                                return null; 
                                            }
                                                
                                            })}
                                    </tbody>
                                </table>
                                {isDeleteModalOpen && (
                                    <AdminModalFrame>
                                        <div>삭제 하시겠습니까?</div>
                                        <button onClick={handleDeleteSave}>네</button>
                                        <button onClick={() => setIsDeleteModalOpen(false)}>아니오</button>
                                    </AdminModalFrame>
                                )}
                                {isModalOpen && (
                                    <AdminModalFrame >
                                        <div className='modal-header'>카테고리 추가/수정</div>
                                        <div className='modal-contents'>
                                            <div>변경전 : {prevSelectedCategoryList} </div>
                                            <div>변경후 : {isSaveButtonDisabled && <>{selectedCategoryList}</> }</div>
                                            {/* {isSaveButtonDisabled && <div>{selectedCategoryList}</div>} */}
                                            <input 
                                                name='checkbox'
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

export default AdminBoardList;
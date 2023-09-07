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
import { StyledFrame, StyledTableWrap, EditSaveBtn, StyledInfoBox, StyledSearchBox, StyledAdminBoard, StyledMemberListNav } from './StyledAdminTable';

const AdminPostList = () => {
    const editPostData = useSelector((state) => state.reducer.adminPostData);

    const [AdminPostListData, setAdminPostListData] = useState({}); 

    const [selectedRows, setSelectedRows] = useState([]);
    const [editedValues, setEditedValues] = useState({});

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
        updateAuthorize(index, 'authorize', value, writeValue[index]);
    };
    const handleWriteChange = (e, index) => {
        const value = e.target.value;
        setWriteValue(prevValues => ({
            ...prevValues,
            [index]: value
        }));
        updateAuthorize(index, 'authorize', readValue[index], value);
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
        updateSkins(index, 'skins', value, mobileSkins[index]);
    };
    const handleMobileSkinsChange = (e, index) => {
        const value = e.target.value;
        setMobileSkins(prevValues => ({
            ...prevValues,
            [index]: value
        }));
        updateSkins(index, 'skins', deskTopSkins[index], value);
    };
    const updateSkins = (index, key, newReadValue, newWriteValue) => {
        setAdminPostListData(prevData => {
            const newData = [...prevData];
            const newSkins = `{"모바일":${newReadValue},"웹":${newWriteValue}}`;
            newData[index][key] = newSkins; // 업데이트된 값 설정
            return newData;
        });
    };
/* skins: "{\"모바일\":\"basic\",\"웹\":\"basic\"}" */








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

    /*------------------------------------------------*\
                    console.log 테스트
    \*------------------------------------------------*/
    console.log('postData테스트', editPostData);
    console.log('selectedRows:', selectedRows);
    console.log('AdminPostListData',AdminPostListData);
    return (
        <div>
            <Admin/>
            <StyledFrame>
                {editPostData.length > 0 ? 
                <div>
                    <StyledTableWrap>
                    <div style={{display:'flex', width:'100%', justifyContent:'space-between', marginBottom:'50px'}}>
                        <h1>게시판관리</h1>
                        <EditSaveBtn className='edit_save_btn'>저 장</EditSaveBtn>
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
                                            <th scope='col'>
                                                <Link>extraFields</Link>
                                            </th>
                                            <th scope='col'>
                                                <Link>Options</Link>
                                            </th>
                                            <th scope='col'>
                                                <Link>regDt</Link>
                                            </th>
                                            <th scope='col'>
                                                <Link>regUser</Link>
                                            </th>
                                            <th scope='col'>
                                                <Link>Skins</Link>
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
                                                        />
                                                    </td>
                                                    <td rowSpan={1}>
                                                        <input 
                                                            placeholder={item.title} 
                                                            value={item.title}
                                                            onChange={(e) => handleInputChange(e, index, 'title')}
                                                        />
                                                    </td>
                                                    <td>
                                                        <select value={readValue[index]} onChange={(e) => handleReadChange(e, index)}>
                                                            {['선택', 0, 1, 2, 3, 4, 5].map(num => (
                                                                <option key={num} value={num}>{num}</option>
                                                            ))}
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <select value={writeValue[index]} onChange={(e) => handleWriteChange(e, index)}>
                                                            {['선택', 0, 1, 2, 3, 4, 5].map(num => (
                                                                <option key={num} value={num}>{num}</option>
                                                            ))}
                                                        </select>
                                                    </td>
                                                    {/* <td rowSpan={1}>{item.authorize}</td> */}
                                                    <td rowSpan={1}>{item.categoryList}</td>
                                                    <td rowSpan={1}>{item.extraFields}</td>
                                                    <td rowSpan={1}>{item.options}</td>
                                                    <td rowSpan={1}>{item.regDt}</td>
                                                    <td rowSpan={1}>{item.regUser}</td>
                                                    {/* <td rowSpan={1}>{item.skins}</td> */}
                                                    <td>
                                                        <select value={deskTopSkins[index]} onChange={(e) => handleDeskTopSkinsChange(e, index)}>
                                                            {['선택', 0, 1, 2, 3, 4, 5].map(num => (
                                                                <option key={num} value={num}>{num}</option>
                                                            ))}
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <select value={mobileSkins[index]} onChange={(e) => handleMobileSkinsChange(e, index)}>
                                                            {['선택', 0, 1, 2, 3, 4, 5].map(num => (
                                                                <option key={num} value={num}>{num}</option>
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
                            </div>
                        </StyledAdminBoard>
                    </StyledTableWrap>
                </div> : <div>Loading...</div>}
                
            </StyledFrame>
        </div>
    );
};

export default AdminPostList;
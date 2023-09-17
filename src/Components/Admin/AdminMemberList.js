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

const AdminMemberList = () => {
    const baseURL = process.env.REACT_APP_BASEURL;

    const editMemberData = useSelector((state) => state.reducer.adminUserData);
    const [AdminMemberListData, setAdminMemberListData] = useState([]); 
    const [selectedRows, setSelectedRows] = useState([]);
    const accessToken = sessionStorage.getItem('accessToken');
    const userUid = sessionStorage.getItem('userUid');
    const headers = {
        Authorization: `${accessToken}`
    }
    console.log('editMemberData',editMemberData);
    
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
        setAdminMemberListData(prevData => {
            const newData = [...prevData];
            newData[index][key] = value;
            return newData;
        });
    };
    
    /*------------------------------------------------*\
          Redux에 저장한 값을 새로운 useState에 저장
    \*------------------------------------------------*/
    useEffect(() => {
        if (editMemberData !== undefined && editMemberData !== null) {
          setAdminMemberListData(editMemberData);
          /* console.log('AdminMemberListData',AdminMemberListData); */
        } else {
          console.log('editMemberData', '해당 인덱스에 데이터가 없습니다.');
        }
      }, [editMemberData]);

    const handleMemberEditSaveClick = async (e) => {
        e.preventDefault();
          const transformedData = {
            userUid: userUid,
            status: selectedRows[0]?.status,
            group: selectedRows[0]?.group,
            /* isAdmin: selectedRows[0]?.isAdmin, */
            isAdmin: "Y",
            phone: selectedRows[0]?.phone,
            nickname: selectedRows[0]?.nickname,
            img: selectedRows[0]?.img,
            receiveSms: selectedRows[0]?.receiveSms,
            receiveEmail: selectedRows[0]?.receiveEmail,
            note: selectedRows[0]?.note,
          };
        console.log('transformedData',transformedData);
        /* console.log('jsonData',jsonData); */
        try{
            const response = await axios.patch(`${baseURL}/v1/users/modify`, transformedData, { headers , withCredentials: true });
            console.log('관리자 멤버관리 수정 성공', response);
            console.log('transformedData',transformedData);
        } catch(error) {
            console.error('관리자 멤버관리 수정 실패', error);
        }
      };
    
    /*------------------------------------------------*\
                    console.log 테스트
    \*------------------------------------------------*/
    console.log('memberData테스트', editMemberData);
    console.log('selectedRows:', selectedRows);
    console.log('AdminMemberListData',AdminMemberListData);
    return (
        <AdminListFrame>
            <Admin/>
            <StyledFrame>
                {editMemberData?.length > 0 ?
                <AdminListFrame>
                    <StyledTableWrap>
                    <div style={{display:'flex', width:'100%', justifyContent:'space-between', marginBottom:'50px'}}>
                        <h1>멤버관리</h1>
                        <div>
                            <EditSaveBtn onClick={handleMemberEditSaveClick} className='edit_save_btn'>저 장</EditSaveBtn>
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
                                                            setSelectedRows([...editMemberData]);
                                                        } else {
                                                            setSelectedRows([]);
                                                        }
                                                    }} 
                                                />
                                            </th>
                                            <th scope='col'>
                                                <Link>Status(status)</Link>
                                            </th>
                                            <th scope='col'>
                                                <Link>그룹(group)</Link>
                                            </th>
                                            <th scope='col'>
                                                <Link>권한(isAdmin)</Link>
                                            </th>
                                            <th scope='col'>
                                                <Link>아이디</Link>
                                            </th>
                                            <th scope='col'>
                                                <Link>닉네임</Link>
                                            </th>
                                            <th scope='col'>
                                                <Link>이메일</Link>
                                            </th>
                                            <th scope='col'>
                                                <Link>연락처</Link>
                                            </th>
                                            <th scope='col'>
                                                <Link>이미지</Link>
                                            </th>
                                            <th scope='col'>
                                                <Link>문자 수신</Link>
                                            </th>
                                            <th scope='col'>
                                                <Link>이메일 수신</Link>
                                            </th>
                                            <th scope='col'>
                                                관리
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {AdminMemberListData.map((item, index) => {
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
                                                        {/* <input 
                                                            name='checkbox'
                                                            placeholder={item.status} 
                                                            value={item.status}
                                                            onChange={(e) => handleInputChange(e, index, 'status')}
                                                            disabled={!selectedRows.includes(item)}
                                                        /> */}
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
                                                        {/* <input 
                                                            name='checkbox'
                                                            placeholder={item.group} 
                                                            value={item.group}
                                                            onChange={(e) => handleInputChange(e, index, 'group')}
                                                            disabled={!selectedRows.includes(item)}
                                                        /> */}
                                                        <label>
                                                            <input
                                                            type="radio"
                                                            name={`group-radio-${index}`}
                                                            value="일반"
                                                            checked={item.group === "일반"}
                                                            onChange={(e) => handleInputChange(e, index, 'group')}
                                                            disabled={!selectedRows.includes(item)}
                                                            />
                                                            일반
                                                        </label>
                                                        <label>
                                                            <input
                                                            type="radio"
                                                            name={`group-radio-${index}`}
                                                            value="기업"
                                                            checked={item.group === "기업"}
                                                            onChange={(e) => handleInputChange(e, index, 'group')}
                                                            disabled={!selectedRows.includes(item)}
                                                            />
                                                            기업
                                                        </label>
                                                        <label>
                                                            <input
                                                            type="radio"
                                                            name={`group-radio-${index}`}
                                                            value="프리미엄"
                                                            checked={item.group === "프리미엄"}
                                                            onChange={(e) => handleInputChange(e, index, 'group')}
                                                            disabled={!selectedRows.includes(item)}
                                                            />
                                                            프리미엄
                                                        </label>
                                                    </td>
                                                    <td rowSpan={1}>
                                                        {/* <input 
                                                            name='checkbox'
                                                            placeholder={item.isAdmin} 
                                                            value={item.isAdmin}
                                                            onChange={(e) => handleInputChange(e, index, 'isAdmin')}
                                                            disabled={!selectedRows.includes(item)}
                                                        /> */}
                                                        <label>
                                                            <input
                                                            type="radio"
                                                            name={`isAdmin-radio-${index}`}
                                                            value="Y"
                                                            checked={item.isAdmin === "Y"}
                                                            onChange={(e) => handleInputChange(e, index, 'isAdmin')}
                                                            disabled={!selectedRows.includes(item)}
                                                            />
                                                            YES
                                                        </label>
                                                        <label>
                                                            <input
                                                            type="radio"
                                                            name={`isAdmin-radio-${index}`}
                                                            value="N"
                                                            checked={item.isAdmin === "N"}
                                                            onChange={(e) => handleInputChange(e, index, 'isAdmin')}
                                                            disabled={!selectedRows.includes(item)}
                                                            />
                                                            NO
                                                        </label>
                                                    </td>
                                                    <td rowSpan={1}>
                                                        {/* <input 
                                                            name='checkbox'
                                                            placeholder={item.loginId} 
                                                            value={item.loginId}
                                                            onChange={(e) => handleInputChange(e, index, 'loginId')}
                                                            disabled={!selectedRows.includes(item)}
                                                        /> */}
                                                        <span>{item.loginId}</span>
                                                    </td>
                                                    <td rowSpan={1}>
                                                        <input 
                                                            name='checkbox'
                                                            placeholder={item.nickname} 
                                                            value={item.nickname}
                                                            onChange={(e) => handleInputChange(e, index, 'nickname')}
                                                            disabled={!selectedRows.includes(item)}
                                                        />
                                                    </td>
                                                    <td rowSpan={1}>
                                                        <input 
                                                            name='checkbox'
                                                            placeholder={item.email} 
                                                            value={item.email}
                                                            onChange={(e) => handleInputChange(e, index, 'email')}
                                                            disabled={!selectedRows.includes(item)}
                                                        />
                                                    </td>
                                                    <td rowSpan={1}>
                                                        <input 
                                                            name='checkbox'
                                                            placeholder={item.phone} 
                                                            value={item.phone}
                                                            onChange={(e) => handleInputChange(e, index, 'phone')}
                                                            disabled={!selectedRows.includes(item)}
                                                        />
                                                    </td>
                                                    <td rowSpan={1}>
                                                        <input 
                                                            name='checkbox'
                                                            placeholder={item.img} 
                                                            value={item.img}
                                                            onChange={(e) => handleInputChange(e, index, 'img')}
                                                            disabled={!selectedRows.includes(item)}
                                                        />
                                                    </td>
                                                    <td rowSpan={1}>
                                                        {/* <input 
                                                            name='checkbox'
                                                            placeholder={item.receiveSms} 
                                                            value={item.receiveSms}
                                                            onChange={(e) => handleInputChange(e, index, 'receiveSms')}
                                                            disabled={!selectedRows.includes(item)}
                                                        /> */}
                                                        <label>
                                                            <input
                                                            type="radio"
                                                            name={`receiveSms-radio-${index}`}
                                                            value="Y"
                                                            checked={item.receiveSms === "Y"}
                                                            onChange={(e) => handleInputChange(e, index, 'receiveSms')}
                                                            disabled={!selectedRows.includes(item)}
                                                            />
                                                            YES
                                                        </label>
                                                        <label>
                                                            <input
                                                            type="radio"
                                                            name={`receiveSms-radio-${index}`}
                                                            value="N"
                                                            checked={item.receiveSms === "N"}
                                                            onChange={(e) => handleInputChange(e, index, 'receiveSms')}
                                                            disabled={!selectedRows.includes(item)}
                                                            />
                                                            NO
                                                        </label>
                                                    </td>
                                                    <td rowSpan={1}>
                                                        {/* <input 
                                                            name='checkbox'
                                                            placeholder={item.receiveEmail} 
                                                            value={item.receiveEmail}
                                                            onChange={(e) => handleInputChange(e, index, 'receiveEmail')}
                                                            disabled={!selectedRows.includes(item)}
                                                        /> */}
                                                        <label>
                                                            <input
                                                            type="radio"
                                                            name={`receiveEmail-radio-${index}`}
                                                            value="Y"
                                                            checked={item.receiveEmail === "Y"}
                                                            onChange={(e) => handleInputChange(e, index, 'receiveEmail')}
                                                            disabled={!selectedRows.includes(item)}
                                                            />
                                                            YES
                                                        </label>
                                                        <label>
                                                            <input
                                                            type="radio"
                                                            name={`receiveEmail-radio-${index}`}
                                                            value="N"
                                                            checked={item.receiveEmail === "N"}
                                                            onChange={(e) => handleInputChange(e, index, 'receiveEmail')}
                                                            disabled={!selectedRows.includes(item)}
                                                            />
                                                            NO
                                                        </label>
                                                    </td>
                                                    <td rowSpan={1}>
                                                        {/* <Link to={`/admin/post_edit/${index}`} style={{textDecoration:'none'}}>
                                                                <span style={{background:'#3f51b5',color:'#fff',padding:'5px',fontSize:'12px',borderRadius:'10px'}}>수정</span>
                                                        </Link> */}
                                                        <button disabled={!selectedRows.includes(item)} style={{padding:'5px',fontSize:'12px', marginLeft:'5px'}}>삭제</button>
                                                    </td>
                                                </tr>
                                                );
                                            } else {
                                                return null; 
                                            }
                                                
                                        })}
                                    </tbody>
                                </table>
                                {/* {isDeleteModalOpen && (
                                    <AdminModalFrame>
                                        <div>삭제 하시겠습니까?</div>
                                        <button onClick={handleDeleteSave}>네</button>
                                        <button onClick={() => setIsDeleteModalOpen(false)}>아니오</button>
                                    </AdminModalFrame>
                                )} */}
                                {/* {isModalOpen && (
                                    <AdminModalFrame >
                                        <div className='modal-header'>카테고리 추가/수정</div>
                                        <div className='modal-contents'>
                                            <div>변경전 : {prevSelectedCategoryList} </div>
                                            <div>변경후 : {isSaveButtonDisabled && <>{selectedCategoryList}</> }</div>
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
                                )} */}
                            </div>
                        </StyledAdminBoard>
                    </StyledTableWrap>
                </AdminListFrame> : <div>Loading...</div>}
                
            </StyledFrame>
        </AdminListFrame>
    );
};

export default AdminMemberList;
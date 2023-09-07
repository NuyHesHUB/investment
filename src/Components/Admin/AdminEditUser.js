import React, { useState, useEffect } from 'react';

/* Axios */
import axios from 'axios';

/* React-Router-Dom */
import { useParams } from 'react-router-dom';

/* Components */
import Admin from './Admin';

/* Redux */
import { useSelector } from 'react-redux';

/* Styled Components */
import { StyledFrame, EditTableWrap, EditSaveBtn} from './StyledAdminTable';

const AdminEditUser = () => {
    const { index } = useParams();
    const editUserData = useSelector((state) => state.reducer.adminUserData);
    const [ editedData, setEditedData ] = useState({});
    const accessToken = sessionStorage.getItem('accessToken');
    const headers = {
        Authorization: `${accessToken}`
    }
    
    /*------------------------------------------------*\
                editUserData[index] 에러방지 조건문
    \*------------------------------------------------*/
    useEffect(() => {
        if (editUserData.length > index) {
            setEditedData(editUserData[index]);
        } else {
            console.log('editUserData', '해당 인덱스에 데이터가 없습니다.');
        }
    }, [editUserData, index]);
    
    const [editformData, setEditFormData] = useState({
        userUid: '',    
        status : '',
        group : '',
        isAdmin: '',
        phone : '',
        nickname : '',
        img : '',
        receiveSms : '',
        receiveEmail : '',
        note : ''
    });

    /*------------------------------------------------*\
                    editedData useState
    \*------------------------------------------------*/
    useEffect(() => {
        setEditFormData({
            userUid: editedData.uid,    
            status: editedData.status,
            group: '일반',
            isAdmin: 'N',
            phone: editedData.phone,
            nickname: editedData.nickname,
            img: editedData.img,
            receiveSms: editedData.receiveSms,
            receiveEmail: editedData.receiveEmail,
            note: ''
        });
    }, [editedData]);

    /*------------------------------------------------*\
                    input onChange
    \*------------------------------------------------*/
    const handleGroupChange = (e) => {
        const { name, value } = e.target;
        setEditFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };
    
    /*------------------------------------------------*\
                    회원수정 Submit Btn API
    \*------------------------------------------------*/
    const submitUpdatedData = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.patch('http://39.117.244.34:3385/v1/users/modify/', editformData ,{ headers })
            console.log('관리자 회원수정 성공', response);
        } catch(error) {
            console.error('관리자 회원수정 실패', error);
        }

    }

    /*------------------------------------------------*\
                    console.log 테스트
    \*------------------------------------------------*/
    /* console.log('editedData',editedData); */
    /* console.log('editformData',editformData); */

    return (
        <div>
            <Admin/>
            <StyledFrame>
                {editUserData.length > index ? 
                (<div>
                    <EditTableWrap>
                        <section>
                            <h1>관리자 {index}의 회원정보 수정</h1>
                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>기존값</th>
                                        <th>수정값</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope='row'>Status</th>
                                        <td>
                                            {editUserData[index].status === 'Y'? 'YES' : 'NO'}
                                        </td>
                                        <td>
                                            <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                                                <label style={{display:'flex',alignItems:'center', marginRight:'5px'}}>
                                                    <span style={{marginRight:'5px'}}>
                                                        YES
                                                    </span>
                                                    <input
                                                        type='radio'
                                                        name='status'
                                                        value="Y"
                                                        onChange={handleGroupChange}
                                                        checked={editUserData[index].status === "Y"}
                                                    />
                                                </label>
                                                <label style={{display:'flex',alignItems:'center'}}>
                                                    <span style={{marginRight:'5px'}}>
                                                        NO
                                                    </span>
                                                    <input
                                                        type='radio'
                                                        name='status'
                                                        value="N"
                                                        onChange={handleGroupChange}
                                                        checked={editUserData[index].status === "N"}
                                                    />
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope='row'>Group</th>
                                        <td>
                                            {editUserData[index].group}
                                        </td>
                                        <td>
                                            <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                                                <label style={{display:'flex',alignItems:'center', marginRight:'5px'}}>
                                                    <span style={{marginRight:'5px'}}>
                                                        일반
                                                    </span>
                                                    <input
                                                        type='radio'
                                                        name='group'
                                                        value="일반"
                                                        onChange={handleGroupChange}
                                                        defaultChecked 
                                                    />
                                                </label>
                                                <label style={{display:'flex',alignItems:'center'}}>
                                                    <span style={{marginRight:'5px'}}>
                                                        기업
                                                    </span>
                                                    <input
                                                        type='radio'
                                                        name='group'
                                                        value="기업"
                                                        onChange={handleGroupChange}
                                                    />
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope='row'>관리자 권한(isAdmin)</th>
                                        <td>
                                            {editUserData[index].isAdmin}
                                        </td>
                                        <td>
                                            <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                                                <label style={{display:'flex',alignItems:'center', marginRight:'5px'}}>
                                                    <span style={{marginRight:'5px'}}>
                                                        부여
                                                    </span>
                                                    <input
                                                        type='radio'
                                                        name='isAdmin'
                                                        value="Y"
                                                        onChange={handleGroupChange}
                                                    />
                                                </label>
                                                <label style={{display:'flex',alignItems:'center'}}>
                                                    <span style={{marginRight:'5px'}}>
                                                        미부여
                                                    </span>
                                                    <input
                                                        type='radio'
                                                        name='isAdmin'
                                                        value="N"
                                                        onChange={handleGroupChange}
                                                        defaultChecked 
                                                    />
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope='row'>닉네임</th>
                                        <td>
                                            {editUserData[index].nickname}
                                        </td>
                                        <td>
                                            <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                                                <label style={{display:'flex',alignItems:'center', marginRight:'5px'}}>
                                                    <input
                                                        type='text'
                                                        name='nickname'
                                                        value={editUserData.nickname}
                                                        placeholder='닉네임을 입력해 주세요.'
                                                        onChange={handleGroupChange}
                                                    />
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope='row'>연락처</th>
                                        <td>
                                            {editUserData[index].phone}
                                        </td>
                                        <td>
                                            <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                                                <label style={{display:'flex',alignItems:'center', marginRight:'5px'}}>
                                                    <input
                                                        type='text'
                                                        name='phone'
                                                        value={editUserData.phone}
                                                        placeholder='번호만 입력해 주세요.'
                                                        onChange={handleGroupChange}
                                                    />
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope='row'>이미지</th>
                                        <td>
                                            {editUserData[index].img === "이미지 없음" || editUserData[index].img === "" ? (<span style={{color:'red'}}>이미지 없음</span>):(null)}
                                        </td>
                                        <td>
                                            <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                                                <label style={{display:'flex',alignItems:'center', marginRight:'5px'}}>
                                                    <input
                                                        type='file'
                                                        name='img'
                                                        value={editUserData.img}
                                                        onChange={handleGroupChange}
                                                    />
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope='row'>이메일 수신</th>
                                        <td>
                                            {editUserData[index].receiveEmail === 'Y'? '수신' : '미수신'}
                                        </td>
                                        <td>
                                            <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                                                <label style={{display:'flex',alignItems:'center', marginRight:'5px'}}>
                                                    <span style={{marginRight:'5px'}}>
                                                        수신
                                                    </span>
                                                    <input
                                                        type='radio'
                                                        name='receiveEmail'
                                                        value="Y"
                                                        onChange={handleGroupChange}
                                                    />
                                                </label>
                                                <label style={{display:'flex',alignItems:'center'}}>
                                                    <span style={{marginRight:'5px'}}>
                                                        미수신
                                                    </span>
                                                    <input
                                                        type='radio'
                                                        name='receiveEmail'
                                                        value="N"
                                                        onChange={handleGroupChange}
                                                    />
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope='row'>문자 수신</th>
                                        <td>
                                            {editUserData[index].receiveSms === 'Y'? '수신' : '미수신'}
                                        </td>
                                        <td>
                                            <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                                                <label style={{display:'flex',alignItems:'center', marginRight:'5px'}}>
                                                    <span style={{marginRight:'5px'}}>
                                                        수신
                                                    </span>
                                                    <input
                                                        type='radio'
                                                        name='receiveSms'
                                                        value="Y"
                                                        onChange={handleGroupChange}
                                                    />
                                                </label>
                                                <label style={{display:'flex',alignItems:'center'}}>
                                                    <span style={{marginRight:'5px'}}>
                                                        미수신
                                                    </span>
                                                    <input
                                                        type='radio'
                                                        name='receiveSms'
                                                        value="N"
                                                        onChange={handleGroupChange}
                                                    />
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div style={{textAlign:'center', marginTop:'50px'}}>
                                <EditSaveBtn onClick={submitUpdatedData}>저 장</EditSaveBtn>
                            </div>
                        </section>
                    </EditTableWrap>
                </div>) : 
                (<div>Loading...</div>)}
            </StyledFrame>
        </div>
    );
};

export default AdminEditUser;
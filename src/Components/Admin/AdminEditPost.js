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
import { StyledFrame, EditTableWrap} from './StyledAdminTable';

const AdminEditPost = () => {
    const { index } = useParams();
    const editPostData = useSelector((state) => state.reducer.adminPostData);
    const [ editedData, setEditedData ] = useState({});
    const accessToken = sessionStorage.getItem('accessToken');
    const headers = {
        Authorization: `${accessToken}`
    }
    console.log('test',editPostData);
    /*------------------------------------------------*\
                editUserData[index] 에러방지 조건문
    \*------------------------------------------------*/
    useEffect(() => {
        if (editPostData.length > index) {
            setEditedData(editPostData[index]);
        } else {
            console.log('editPostData', '해당 인덱스에 데이터가 없습니다.');
        }
    }, [editPostData, index]);
    
    const [editformData, setEditFormData] = useState({
        authorize: '1',
        categoryList: '1',
        extraFields: '1',
        key: '',
        options: '',
        regDt: '',
        regUser: '',
        skins: '',
        status: '',
        title: '',
        updDt: '',
        updUser: '',
    });

    /*------------------------------------------------*\
                    editedData useState
    \*------------------------------------------------*/
    useEffect(() => {
        setEditFormData({
            
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
        /* try{
            const response = await axios.patch('http://39.117.244.34:3385/v1/users/modify/', editformData ,{ headers })
            console.log('관리자 게시물수정 성공', response);
        } catch(error) {
            console.error('관리자 게시물수정 실패', error);
        } */

    }

    /*------------------------------------------------*\
                    console.log 테스트
    \*------------------------------------------------*/
    /* console.log('editedData',editedData);
    console.log('editformData',editformData); */

    return (
        <div>
            <Admin/>
            <StyledFrame>
                {editPostData.length > index ? 
                (<div>
                    <EditTableWrap>
                        <section>
                            <h1>관리자 {index}의 게시판 수정</h1>
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
                                            {editPostData[index].status === 'Y'? 'YES' : 'NO'}
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
                                                        checked={editPostData[index].status === "Y"}
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
                                                        checked={editPostData[index].status === "N"}
                                                    />
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope='row'>Group</th>
                                        <td>
                                            {editPostData[index].group}
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
                                            {editPostData[index].isAdmin}
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
                                            {editPostData[index].nickname}
                                        </td>
                                        <td>
                                            <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                                                <label style={{display:'flex',alignItems:'center', marginRight:'5px'}}>
                                                    <input
                                                        type='text'
                                                        name='nickname'
                                                        value={editPostData.nickname}
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
                                            {editPostData[index].phone}
                                        </td>
                                        <td>
                                            <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                                                <label style={{display:'flex',alignItems:'center', marginRight:'5px'}}>
                                                    <input
                                                        type='text'
                                                        name='phone'
                                                        value={editPostData.phone}
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
                                            {editPostData[index].img === "이미지 없음" || editPostData[index].img === "" ? (<span style={{color:'red'}}>이미지 없음</span>):(null)}
                                        </td>
                                        <td>
                                            <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                                                <label style={{display:'flex',alignItems:'center', marginRight:'5px'}}>
                                                    <input
                                                        type='file'
                                                        name='img'
                                                        value={editPostData.img}
                                                        onChange={handleGroupChange}
                                                    />
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope='row'>이메일 수신</th>
                                        <td>
                                            {editPostData[index].receiveEmail === 'Y'? '수신' : '미수신'}
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
                                            {editPostData[index].receiveSms === 'Y'? '수신' : '미수신'}
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
                                <button className='edit_save_btn' onClick={submitUpdatedData}>저 장</button>
                            </div>
                        </section>
                    </EditTableWrap>
                </div>) : 
                (<div>Loading...</div>)}
            </StyledFrame>
        </div>
    );
};

export default AdminEditPost;
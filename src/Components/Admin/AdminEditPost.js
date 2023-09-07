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
    /* console.log('test',editPostData); */
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
        authorize: '',
        categoryList: '',
        extraFields: '',
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
            authorize: editedData.authorize,
            categoryList: editedData.categoryList,
            extraFields: editedData.extraFields,
            key: editedData.key,
            options: editedData.options,
            regDt: editedData.regDt,
            regUser: editedData.regUser,
            skins: editedData.skins,
            status: editedData.status,
            title: editedData.title,
            updDt: editedData.updDt,
            updUser: editedData.updUser,
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
    console.log('editedData',editedData);
    console.log('editformData',editformData);

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
                                    <th scope='row'>그룹(key)</th>
                                    <td>
                                        {editPostData[index].key}
                                    </td>
                                    <td>
                                        <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                                            <label style={{display:'flex',alignItems:'center', marginRight:'5px'}}>
                                                <input
                                                    type='text'
                                                    name='nickname'
                                                    value={editPostData.key}
                                                    placeholder=''
                                                    onChange={handleGroupChange}
                                                />
                                            </label>
                                        </div>
                                    </td>
                                </tr>   
                                {/* <tr>
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
                                    </tr> */}
                                    <tr>
                                        <th scope='row'>skins</th>
                                        <td>
                                            {editPostData[index].skins}
                                        </td>
                                        <td>
                                            <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                                                <label style={{display:'flex',alignItems:'center', marginRight:'5px'}}>
                                                    <input
                                                        type='text'
                                                        name='skins'
                                                        value={editPostData.skins}
                                                        placeholder=''
                                                        onChange={handleGroupChange}
                                                    />
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope='row'>authorize</th>
                                        <td>
                                            {editPostData[index].authorize}
                                        </td>
                                        <td>
                                            <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                                                <label style={{display:'flex',alignItems:'center', marginRight:'5px'}}>
                                                    <input
                                                        type='text'
                                                        name='authorize'
                                                        value={editPostData.authorize}
                                                        placeholder=''
                                                        onChange={handleGroupChange}
                                                    />
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope='row'>categoryList</th>
                                        <td>
                                            {editPostData[index].categoryList}
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
                                        <th scope='row'>title</th>
                                        <td>
                                            {editPostData[index].title}
                                        </td>
                                        <td>
                                            <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                                                <label style={{display:'flex',alignItems:'center', marginRight:'5px'}}>
                                                    <input
                                                        type='text'
                                                        name='title'
                                                        value={editPostData.title}
                                                        placeholder=''
                                                        onChange={handleGroupChange}
                                                    />
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope='row'>extraFields</th>
                                        <td>
                                            {editPostData[index].extraFields}
                                        </td>
                                        <td>
                                            <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                                                <label style={{display:'flex',alignItems:'center', marginRight:'5px'}}>
                                                    <input
                                                        type='text'
                                                        name='extraFields'
                                                        value={editPostData.extraFields}
                                                        placeholder=''
                                                        onChange={handleGroupChange}
                                                    />
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope='row'>options</th>
                                        <td>
                                            {editPostData[index].options}
                                        </td>
                                        <td>
                                            <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                                                <label style={{display:'flex',alignItems:'center', marginRight:'5px'}}>
                                                    <input
                                                        type='text'
                                                        name='options'
                                                        value={editPostData.options}
                                                        placeholder=''
                                                        onChange={handleGroupChange}
                                                    />
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope='row'>regUser</th>
                                        <td>
                                            {editPostData[index].regUser}
                                        </td>
                                        <td>
                                            <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                                                <label style={{display:'flex',alignItems:'center', marginRight:'5px'}}>
                                                    <input
                                                        type='text'
                                                        name='regUser'
                                                        value={editPostData.regUser}
                                                        placeholder=''
                                                        onChange={handleGroupChange}
                                                    />
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope='row'>regDt</th>
                                        <td>
                                            {editPostData[index].regDt}
                                        </td>
                                        <td>
                                            <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                                                <label style={{display:'flex',alignItems:'center', marginRight:'5px'}}>
                                                    <input
                                                        type='text'
                                                        name='regDt'
                                                        value={editPostData.regDt}
                                                        placeholder=''
                                                        onChange={handleGroupChange}
                                                    />
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                    {/* <tr>
                                        <th scope='row'>updUser</th>
                                        <td>
                                            {editPostData[index].updUser}
                                        </td>
                                        <td>
                                            <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                                                <label style={{display:'flex',alignItems:'center', marginRight:'5px'}}>
                                                    <input
                                                        type='text'
                                                        name='updUser'
                                                        value={editPostData.updUser}
                                                        placeholder=''
                                                        onChange={handleGroupChange}
                                                    />
                                                </label>
                                            </div>
                                        </td>
                                    </tr> */}
                                    {/* <tr>
                                        <th scope='row'>updDt</th>
                                        <td>
                                            {editPostData[index].updDt}
                                        </td>
                                        <td>
                                            <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                                                <label style={{display:'flex',alignItems:'center', marginRight:'5px'}}>
                                                    <input
                                                        type='text'
                                                        name='updDt'
                                                        value={editPostData.updDt}
                                                        placeholder=''
                                                        onChange={handleGroupChange}
                                                    />
                                                </label>
                                            </div>
                                        </td>
                                    </tr> */}
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
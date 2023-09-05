import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Admin from './Admin';
/* Redux */
import { setAdminUserData } from '../../store/actions/actions';
import { useDispatch, useSelector } from 'react-redux';

/* Styled Components */
import { StyledFrame, StyledTableWrap, StyledInfoBox, StyledSearchBox, StyledAdminBoard, StyledMemberListNav } from './StyledAdminTable';

const AdminEditUser = () => {
    const { index } = useParams();
    const editUserData = useSelector((state) => state.reducer.adminUserData[index]);
    const [post, setPost] = useState({});

    console.log('editUserData',editUserData);
    const [editedNickname, setEditedNickname] = useState(editUserData.nickname);
    console.log('editedNickname',editedNickname);
    
    return (
        <div>
            <Admin/>
            <StyledFrame>
            <h1>{index} 의 Edit User</h1>
            <h2>관리자 회원정보 수정</h2>
            {/* {adminUserData[index].nickname} */}
            <input
                value={editedNickname}
                onChange={(e) => setEditedNickname(e.target.value)}
            />
            </StyledFrame>
        </div>
    );
};

export default AdminEditUser;
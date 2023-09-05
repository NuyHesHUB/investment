import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Admin from './Admin';

/* Styled Components */
import { StyledFrame, StyledTableWrap, StyledInfoBox, StyledSearchBox, StyledAdminBoard, StyledMemberListNav } from './StyledAdminTable';

const AdminEditUser = () => {
    const { index } = useParams();
    const [post, setPost] = useState({});

    console.log('EditPost', post);

    return (
        <div>
            <Admin/>
            <StyledFrame>
            <h1>{index} 의 Edit User</h1>
            <h2>관리자 회원정보 수정</h2>
                <form /* onSubmit={handleSubmit} */>
                    {/* Render input fields for editing post data */}
                    <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={post.title || ''}
                        onChange={(e) => setPost({ ...post, title: e.target.value })}
                    />
                    </div>
                    {/* Add more input fields for other data fields */}
                    <button type="submit">Save Changes</button>
                </form>
            </StyledFrame>
        </div>
    );
};

export default AdminEditUser;
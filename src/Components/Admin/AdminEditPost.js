import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
/* Redux */
import { setAdminPostData } from '../../store/actions/actions';
import { useDispatch, useSelector } from 'react-redux';

/* Styled Components */
import { StyledFrame, StyledTableWrap, StyledInfoBox, StyledSearchBox, StyledAdminBoard, StyledMemberListNav } from './StyledAdminTable';
import Admin from './Admin';

const AdminEditPost = () => {
    const { key } = useParams();
    const adminPostData = useSelector((state) => state.reducer.adminPostData);
    
    const [post, setPost] = useState({});

    console.log('EditPost', post);

    return (
        <div>
            <Admin/>
            <StyledFrame>
                <h1>{key} 의 Edit Post</h1>
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

export default AdminEditPost;
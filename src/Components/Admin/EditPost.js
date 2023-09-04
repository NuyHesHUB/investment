import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditPost = () => {

    const { key } = useParams();

  // Define state to store the data for editing
    const [post, setPost] = useState({});
    console.log('EditPost', post);
    return (
        <div>
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
        </div>
    );
};

export default EditPost;
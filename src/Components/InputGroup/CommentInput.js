import React, { useState } from 'react';

const CommentInput = ({ onPostComment }) => {
  const [comment, setComment] = useState('');

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handlePostComment = (e) => {
    e.preventDefault();
    if (comment.trim() === '') {
      alert('댓글을 입력하세요.');
      return;
    }
    onPostComment(comment);
    setComment('');

    /* onPostComment(comment, () => {
      setComment('');
  }); */
    
  };

  return (
    <div style={{height:'40px',display:'flex',marginLeft:'20px'}}>
      <textarea
        placeholder="댓글을 입력하세요..."
        value={comment}
        onChange={handleCommentChange}
        style={{width:'700px',height:'100%',padding:'5px',boxSizing:'border-box'}}
      />
      <button style={{width:'100px',height:'100%',marginLeft:'20px'}} onClick={handlePostComment}>게시</button>
    </div>
  );
};

export default CommentInput;

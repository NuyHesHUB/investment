import React, { useState } from 'react';

const CommentInput = ({ onPostComment }) => {
  const [comment, setComment] = useState('');

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handlePostComment = () => {
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
    <div>
      <textarea
        placeholder="댓글을 입력하세요..."
        value={comment}
        onChange={handleCommentChange}
      />
      <button onClick={handlePostComment}>게시</button>
    </div>
  );
};

export default CommentInput;

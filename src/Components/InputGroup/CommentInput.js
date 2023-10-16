import React, { useState } from 'react';
import styled from 'styled-components';

const CommentFrame=styled.div`
    position: relative;
    width: 100%;
    background: #fff;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    overflow: hidden;
`
const TextArea=styled.textarea`
    resize: none;
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
    padding: 15px;
    box-sizing: border-box;
    &::placeholder{
        color: rgb(153, 153, 153);
        font-family: Pretendard;
        font-size: 14px;
        font-weight: 400;
    }
`
const CommentBtn=styled.button`
    width: 109px;
    height: 40px;
    background: rgb(63, 169, 245);
    border-radius: 10px;
    position: absolute;
    bottom: 15px;
    right: 15px;
    border: none;
    color: rgb(255, 255, 255);
    font-family: Pretendard;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
`

const CommentInput = ({ frameHeight, onPostComment, btnText, holder, initialValue }) => {

  /* const [comment, setComment] = useState(''); */
  const [comment, setComment] = useState(initialValue || '');

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handlePostComment = (e) => {
    e.preventDefault();
    if (comment.trim() === '') {
      alert('텍스트를 입력하세요.');
      return;
    }
    onPostComment(comment);
    setComment('');
  };

  return (
    <CommentFrame
        style={{height: frameHeight}}
    >
        <TextArea
          placeholder={holder}
          value={comment}
          onChange={handleCommentChange}
        />
        <CommentBtn 
        onClick={handlePostComment}
        >
            {btnText}
        </CommentBtn>
    </CommentFrame>
  );
};

export default CommentInput;

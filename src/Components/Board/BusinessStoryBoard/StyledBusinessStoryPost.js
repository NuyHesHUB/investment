import styled from 'styled-components';

export const PostWrap = styled.div`
  /* background: pink; */
  padding: 50px;
  overflow: hidden;
`
export const Container = styled.div`
  /* background: skyblue; */
  width: 1000px;
  padding: 50px;
  margin: 0 auto;

  p.cate {
    background:#d9eefd;
    display: inline-block;
    color: #3FA9F5;
    padding: 3px 10px;
    font-size: 0.8rem;
    border-radius: 10px;
  }
  h2 {
    font-size: 2.2rem;
    padding: 10px 0;
    font-weight: 400;
  }
  p.date {
    color: #aaa;
    font-weight: 300;
    padding: 0px 0 10px;
  }
  div.content {
    padding: 50px 0 50px;
    min-height: 100px;
    margin: 10px 0 30px;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    font-weight: 300;
  }
  .btn-container {
    display: flex;
    justify-content: space-between;
  }
  .comment-container {
    position: relative;
    margin-top: 20px;
  }
  .comment-textarea {
    width: 1000px;
    resize: none !important;
    border-radius: 10px;
    box-shadow: 0px 0px 5px #ccc;
    border: none;
  }
  .comment-container button {
    position: absolute;
    bottom: 15px;
    right: 10px;
  }

  button {
    cursor: pointer;
    background: #3FA9F5; 
    color: #fff; 
    margin-left: 5px;
    margin-top: 10px;
    padding: 6px 12px;
    border-radius: 10px;
    border: none;
    font-size: 18px;
  }
  button.back {
    background: #ccc;
  }
  button.delete-btn {
    background: #ff5269;
  }
`
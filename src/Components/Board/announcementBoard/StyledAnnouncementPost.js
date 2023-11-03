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
  p.content {
    padding: 50px 0 50px;
    margin: 10px 0 30px;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    font-weight: 300;
  }
  .btn-container {
    display: flex;
    justify-content: space-between;
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
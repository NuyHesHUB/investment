import styled from 'styled-components';

export const PostWrap = styled.div`
  background: pink;
  padding: 50px;
  overflow: hidden;
  margin-top: 60px;
`
export const TitleBox = styled.h2`
text-align: center;
color: #333;
font-size: 40px;
margin-bottom: 100px;
`
export const Container = styled.div`
  background: skyblue;
  width: 1000px;
  padding: 50px;
  margin: 0 auto;

  h2 {
    font-size: 2rem;
    padding: 10px 0;
    font-weight: 400;
  }
  p.date {
    color: #000;
    padding: 10px 0;
  }
  p.content {
    padding: 30px 0 50px;
    margin: 10px 0 30px;
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;
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
`
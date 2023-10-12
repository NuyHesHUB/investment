import styled from 'styled-components';

export const Wrap = styled.div`
  background: pink;
  width: 100%;
  *{box-sizing: border-box; padding: 0; margin: 0;}
`
export const Container = styled.section`
  background: green;
  width: 500px; 
  height: 100vh;
  margin: 0 auto;
  padding-top: 80px;
  display: flex;
  /* align-items: center; */
  justify-content: center;
  text-align: center;
`
export const Inner = styled.div`
  background: skyblue;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
  h2 {margin-bottom: 80px;}
  p.txt {margin-bottom: 20px;}
  input {
    width: 300px;
    padding: 10px 20px;
    text-align: center;
    border-radius: 10px;
    border: none;
    background: #f3f5f8;
  }
`
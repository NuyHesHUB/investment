import styled from 'styled-components';

export const Wrap = styled.div`
  /* background: pink; */
  width: 100%;
  `
export const Container = styled.section`
  *{box-sizing: border-box; padding: 0; margin: 0; color: #555;}
  /* background: green; */
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
  /* background: skyblue; */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;
  h2 {
    margin-bottom: 80px;
    font-size: 36px;
  }
  p.txt {margin-bottom: 20px;}

  input, button {
    width: 300px;
    padding: 12px 5px;
    text-align: center;
    border-radius: 10px;
    border: none;
    font-size: 16px;
  }
  input {
    background: #edeff2;
    margin-bottom: 10px;
  }

  button {
    background: #3fa9f5;
    color: #fff;
    cursor: pointer;
  }
`
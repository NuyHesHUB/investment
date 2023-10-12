import styled from 'styled-components';


export const StyledFrame = styled.div`
  background: palegreen;
  overflow: hidden;
  `
export const Wrap = styled.div`
  background: pink;
  color: #000;
  *{box-sizing: border-box; padding: 0; margin: 0;}
`
export const Container = styled.div`
  background: skyblue;
  padding-top: 80px;
  width: 500px;
  margin: 0 auto;
  h2 {text-align: center;}
`
export const Inner = styled.div`
  background: yellow;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  ul {
    background: green;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  ul li {
    margin-bottom: 30px;
    text-align: center;
  }
  ul li:last-child {margin-bottom: 0;}
  ul li input, ul li textarea, ul li button {
    width: 450px;
    border: none;
    background: #f3f5f8;
    border-radius: 10px;
    padding: 17px 10px;
  }
  input::placeholder, textarea::placeholder {color: #c5c6c9;}
  ul li input {
    
  }
  ul li textarea {

  }
  ul li button {
    width: 450px;
    background: #3fa9f5;
    padding: 13px 10px;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
  }
  ul li label {
    width: 140px; height: 140px;
    display: block;
    background: #f3f5f8;
    border-radius: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
    div p {color: #c5c6c9; text-align: center;}
    div.placeholder-none {display: none;}
    div.placeholder-active {display: block; width: 100%;}
    .imgBox {}
    img {object-fit: cover; width: 100%;}
  }

  input#logo-upload {display: none;}
`
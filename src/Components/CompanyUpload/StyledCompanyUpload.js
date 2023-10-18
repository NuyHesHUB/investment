import styled from 'styled-components';

export const Wrap = styled.div`
  /* background: pink; */
  color: #333;
`
export const Container = styled.div`
  /* background: skyblue; */
  width: 500px;
  margin: 0 auto;
  text-align: center;
  p,h2 {color: #333;}
  h2 {
    margin-bottom: 30px;
    font-size: 36px;
  }
  p.txt {color: #ff4848; margin-bottom: 15px; font-size: 14px;}
`
export const Inner = styled.div`
  /* background: yellow; */
  display: flex;
  justify-content: center;
  /* align-items: center; */
  ul {
    /* background: green; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-top: 50px;
  }
  ul li {
    margin-bottom: 30px;
    text-align: center;
  }
  ul li:last-child {margin-bottom: 0;}
  ul li input, ul li textarea, ul li button {
    width: 450px;
    border: none;
    background: #edeff2;
    border-radius: 10px;
    padding: 17px 10px;
  }
  input::placeholder, textarea::placeholder {color: #c5c6c9;}
  input:disabled {opacity: 0.5;}
  ul li input {
    font-size: 16px;
  }
  li.required {position: relative;}
  li.required::after {
    content:'*필수 입력값'; 
    color: #ff4848; 
    position: absolute; 
    bottom: -18px; 
    left: 5px;
    font-size: 12px;
  }
  ul li textarea {
  resize: none;
  }
  ul li textarea::placeholder {
    font-size: 16px;
  }
  ul li button {
    width: 450px;
    background: #3fa9f5;
    padding: 13px 10px;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
  }
  button:disabled {
    cursor: auto;
    opacity: 0.7;
  }
  .cancel-btn {
    background: #f0f0f0; 
    border: 1px solid #ccc; 
    color: #000; 
    margin-top: 10px;
  }

  ul li label {
    width: 140px; height: 140px;
    display: block;
    position: relative;
    background: #f3f5f8;
    border-radius: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
    div p {color: #c5c6c9; text-align: center;}
    div.placeholder-none {display: none;}
    div.placeholder-active {display: block; width: 100%;}
    .imgBox {display: none;}
    .imgBox.active {display: block; width: 100%;}
    img {object-fit: cover; width: 100%;}
    overflow: hidden;
  }
  ul li label.logo-upload {box-shadow: 0px 0px 10px #ddd;}
  .logo-btnBox {display: none;}
  label:hover .logo-btnBox {
    display: block;
    background: rgba(0,0,0,.3);
    width: 100%; 
    height: 100%;
    position: absolute;
    top: 0; left: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    transition: all .3s;
    cursor: auto;
  }
  .logo-change-btn, .logo-delete-btn {
    all:unset;
    width: 100px;
    height: 30px;
    border-radius: 5px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  
  .logo-change-btn {background: #ccc;}
  .logo-delete-btn {background: #e74646;}
  .logo-delete-btn {}
  input#logo-upload {display: none;}
  
`
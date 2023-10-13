import styled from 'styled-components'

export const StyleFrame = styled.div`

`
export const Container = styled.div`
*{box-sizing: border-box;}
  background: #b2bfd4;
  padding-top: 80px;
  width: 100%; height: 1000px;
  h2.title {text-align: center;}
  form {
    background: #a3c7bd;
    width: 700px;
    margin: 0 auto;
  }
  label {
    display: block;
  }
  input, select {
    border: none;
    background: #edeff2;
    border-radius: 10px;
    padding: 10px 10px;
    margin-bottom: 20px;
  }
  input {width: 400px;}
  select {width: 200px;}
  input.title {width: 100%;}
`
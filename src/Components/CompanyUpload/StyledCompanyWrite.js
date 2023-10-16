import styled from 'styled-components'

export const StyleFrame = styled.div`

`
export const Container = styled.div`
  /* background: #b2bfd4; */
  width: 100%; height: 1000px;
  h2.title {
    text-align: center;
    padding-bottom: 50px;
  }
  form {
    /* background: #a3c7bd; */
    width: 700px;
    margin: 0 auto;
  }
  label {
    display: block;
    margin-bottom: 3px;
  }
  input, select {
    border: none;
    background: #edeff2;
    border-radius: 10px;
    padding: 10px 10px;
    margin-bottom: 40px;
  }
  input {width: 400px;}
  input.investment-amount {text-align: right;}
  select {width: 200px;}
  input.title {width: 100%;}
  .ql-container {min-height: 80px; padding: 10px; cursor: text;}
  .ql-container .ql-blank {min-height: 50px;}
  .btnBox {margin-top: 10px;}
  .cancelBtn, .btn {
    padding: 6px 12px;
    border-radius: 10px;
    border: none;
    font-size: 18px;
  }
  .cancelBtn {border: 1px solid #ccc;}
  .btn {background: #3FA9F5; color: #fff; margin-left: 5px;}
`
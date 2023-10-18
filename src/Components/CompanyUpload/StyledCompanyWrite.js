import styled from 'styled-components'

export const Container = styled.div`
  /* background: #b2bfd4; */
  width: 700px;
  margin: 0 auto;
  h2.title {
    text-align: center;
    padding-bottom: 50px;
  }
  /* form {
    width: 700px;
    margin: 0 auto;
  } */
  label {
    display: block;
    margin-bottom: 3px;
  }
  input, select, .attaches-btn {
    border: none;
    border-radius: 10px;
    padding: 13px 10px;
    margin-bottom: 40px;
    font-size: 16px;
  }
  input {width: 400px;}
  input.investment-amount {text-align: right;}
  select {width: 200px; cursor: pointer;}
  input.title {width: 100%;}
  .ql-container {min-height: 330px; padding: 10px; cursor: text;}
  .ql-container .ql-blank {min-height: 300px;}
  .btnBox {margin-top: 20px; display: flex; justify-content: end;}
  .cancelBtn, .btn {
    padding: 6px 12px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    font-size: 18px;
  }
  .cancelBtn {border: 1px solid #ccc;}
  .btn {background: #3FA9F5; color: #fff; margin-left: 5px;}
  .btn:disabled {
    cursor: auto;
    opacity: 0.5;
  }
  label.attaches {width: 200px;}
  #attaches {display: none;}
  .attaches-btn {
    width: 200px;
    text-align: center; 
    color: #666;
    background: #F3F5F8;
    cursor: pointer;
  }
  .attach-amount {
    font-size: 14px;
    margin-top: 5px;
  }
  .attach-amount span {color: #1f93ff}
  // 첨부파일명 미리보기
  .attachPreviewBox {
    background: #edeff2;
    padding: 10px;
    border-radius: 5px;
    margin: -30px 0 40px 0;
  }
  .attachPreview {
    background: #fff;
    border: 1px solid #ddd;
    padding: 6px 6px;
    border-radius: 5px;
    font-size: 14px;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
  }
  .attachPreview:last-child {margin-bottom: 0;}

  .attach_del_btn {
    border: none;
    background: none;
    color: red;
    cursor: pointer;
  }
`
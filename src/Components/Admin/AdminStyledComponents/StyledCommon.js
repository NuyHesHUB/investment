import styled from 'styled-components';

export const CommonStyleFrame = styled.div`
  
  *{padding: 0; margin: 0; box-sizing: border-box;}
  position: relative;
  padding: 90px 0 0 300px ;
  .modifyBtn {margin-right: 5px; background: #73bbff;}
  .deleteBtn {background: #ff7373;}
  .createBtn {
    background: yellowgreen; //임시색
    padding: 4px 5px;
  }
  .detailBtn {background: #d0d0d0;}
  p.title {
    width: 130px;
    padding-bottom: 5px;
    display: inline-block;
    border-bottom: 2px solid #555;
    font-size: 26px;
  }
  // top //
  ul.top {
    width: 80%;
    min-width: 1000px; // 임시 넓이
    display: flex;
    justify-content: space-between;
    align-items: end;
    margin: 30px 0 20px;
  }
  button {
    border: none; 
    padding: 2px 5px; 
    border-radius: 3px; 
    cursor: pointer;
    color: #fff;
  }

  @media screen and (max-width: 768px) {
    max-width: 768px;
    width: calc(100vw - 60px);
    padding: 90px 0 0 60px ;
    p.title {
      width: 130px;
      margin: 0 auto 60px;
      display: block;
      border-bottom: 2px solid #555;
      font-size: 26px;
      text-align: center;
    }
  }

`
export const TableFrame = styled.div `


font-size: 14px;
  table {
    width: 80%;
    min-width: 1000px; // 임시 넓이
    table-layout: fixed;
  }
  table, th, td {
    border-collapse: collapse;
    border: 1px solid #222;
    padding: 3px 0;
    text-align: center;
  }
  th {background: #6371c2; color: #fff;}
  
  select {width: 80px;}


  @media screen and (max-width: 768px) {
    table {
      display: block;
      border: none;
      min-width: 300px;
    }
    thead {display: none;}
    /* tbody {border: 1px solid #000;} */
    tr {
      display:block;
      margin-bottom:10px;
      border-top:none;
      border: 1px solid #000;
    }
    td {
      display:block;
      position:relative;
      width: 100vw;
      padding-left:50%;
      border-width:0 0 1px 0;
    }
    td:last-child {border: none;}
    td:before {
      display:block;
      position:absolute;
      left:0;
      top:0;
      width:40%;
      /* padding:10px 0; */
      height: 100%;
      background:#ccc;
    }
  }
`

export const Modify = styled.div`
  display: none;
  &.active{
    display: block;
    position: absolute;
    width: 100%; 
    height: 100vh;
    top: 0; left: 0;
    .background {
      background: #000;
      opacity: .5;
      width: 100%; 
      height: 100vh;
      position: absolute;
      top: 0; 
      left: 0;
      cursor: pointer;
    }
    .popup {
      background: white;
      position: absolute;
      /* width: 800px; height: 200px; // 임시 사이즈 */
      left: 50%;
      top: 25%;
      /* margin: 90px 0 0 200px ; */
      transform: translateX(-50%);
      padding: 10px;
      select {width: 100px;}
      input {border: 1px solid #000; width: 100%;}
      input:disabled {border: 1px solid #bbb; background: #eee;}
      .popup-top {
        display: flex; 
        justify-content: 
        space-between; 
        margin-bottom: 4px;
      }
      .modify-btn {background: yellowgreen;}
      .cancel-btn {background: red;}
      table {width: 600px;}
      th {width: 120px;}
    }
  }
`
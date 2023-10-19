import styled from 'styled-components';

export const CommonStyleFrame = styled.div`
  *{padding: 0; margin: 0; box-sizing: border-box;}
  padding: 90px 0 0 300px ;
  position: relative;
  .modifyBtn {margin-right: 5px; background: #73bbff;}
  .deleteBtn {background: #ff7373;}
  .createBtn {
    background: yellowgreen; //임시색
    padding: 4px 5px;
  }
  .search-btn {
    background: #cbcdd4; //임시색
    color: #fff;
    height: 20px;
  }
  p.title {
    width: 130px;
    padding-bottom: 5px;
    display: inline-block;
    border-bottom: 2px solid #555;
    font-size: 26px;
  }
  // top //
  ul.top {
    width: 1000px; //임시 넓이
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 30px 0 10px;
  }
  ///// 검색 박스 /////
  ul.top .left-box {
    /* background: green; */
    color: #555;
    width: 370px;
    display: flex;
    justify-content: space-between;
  }
  //상태값 검색
  ul.top .left-box .search-status-box {
    /* background: pink; */
    display: flex;
    justify-content: space-between;
    padding-right: 120px;
    align-items: center;
    input {margin: 0 3px 0 8px;}
  }
  button, .search-btn {
    border: none; 
    padding: 2px 5px; 
    border-radius: 3px; 
    cursor: pointer;
  }
  .search-input {
    margin-right: 5px;
    border-radius: 3px;
    border: 1px solid #ccc;
    padding: 3px 5px;
  }
`

export const TableFrame = styled.div `
  table {width: 1000px; text-align: center;} // 임시 테이블 넓이
  table, th, td {
    border-collapse: collapse;
    border: 1px solid #222;
    padding: 3px 8px;
  }
  th {background: #6371c2; color: #fff;}
  select {width: 80px;}
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
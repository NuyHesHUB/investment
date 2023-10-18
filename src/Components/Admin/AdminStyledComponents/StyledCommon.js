import styled from 'styled-components';

export const CommonStyleFrame = styled.div`
  *{padding: 0; margin: 0; box-sizing: border-box;}
  padding: 90px 0 0 300px ;
  position: relative;
  .modifyBtn {margin-right: 5px; background: #73bbff;}
  .deleteBtn {background: #ff7373;}
  // top //
  ul.top {
    width: 1000px; //임시 넓이
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
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
  .createBtn {
    background: yellowgreen; //임시색
    padding: 4px 5px;
  }
  .search-btn {
    background: skyblue; //임시색
    padding: 4px 5px;
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
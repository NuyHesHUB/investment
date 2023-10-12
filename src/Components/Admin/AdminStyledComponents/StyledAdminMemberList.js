import styled from 'styled-components';

export const Wrap = styled.div`
  padding: 90px 0 0 300px ;
  position: relative;

  *{padding: 0; margin: 0; box-sizing: border-box;}

  // top
  .top {
    /* background: blue; */
    width: 800px;
    display: flex;
    justify-content: end;
    margin-bottom: 10px;
  }
  button, .search-btn {border: none; padding: 2px 5px; border-radius: 3px; cursor: pointer;}
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
  //modify & delete btn
  .modifyBtn {margin-right: 5px; background: #73bbff;}
  .deleteBtn {background: #ff7373;}

  //table
  table {width: 800px;} // 임시 테이블 넓이
  table, th, td {
    border-collapse: collapse;
    border: 1px solid #222;
    padding: 3px 8px;
  }
  th {background: #6371c2; color: #fff;}
  select {width: 100px;}
`

export const PageNation = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  button {
    background: none;
    color: #555;
    font-family: 'Pretendard-Regular';
    font-size: 16px; 
    padding: 10px 10px; 

  }
  button:disabled {color: #ccc; cursor: default;}
  button.current-page {color: blue ;}
  button#num {
    background: none; 
    padding: 10px 10px; 
  }
  div.box {
    /* background: pink; */
  }
`
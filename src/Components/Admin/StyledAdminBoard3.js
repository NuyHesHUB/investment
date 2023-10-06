import styled from 'styled-components';

export const Wrap = styled.div`
  /* background: pink; */
  *{padding: 0; margin: 0; box-sizing: border-box;}
  padding: 90px 0 0 300px ;
  position: relative;
  .top {
    background: blue;
    width: 80%;
    display: flex;
    justify-content: space-between;
  }

  table{width: 80%;} // 임시 테이블 넓이
  table, th, td {
    border-collapse: collapse;
    border: 1px solid #222;
    padding: 3px 8px;
  }
  th {background: #6371c2; color: #fff;}
  select {width: 100%;}
  input.search {margin-bottom: 20px;}
  // Btn //
  button, .searchBtn {border: none; padding: 2px 5px; border-radius: 3px; cursor: pointer; }
  .modifyBtn {margin-right: 5px; background: #73bbff;}
  .deleteBtn {background: #ff7373;}
  .createBtn {background: yellowgreen;}
  .searchBtn {background: skyblue;}
`

export const PopUpWrap = styled.div`
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
      input {border: 1px solid #000; width: 500px;}
      input:disabled {border: 1px solid #bbb; background: #eee;}
      .btn-box {display: flex; justify-content: space-between; margin-bottom: 4px;}
      .createBtnClick {background: yellowgreen;}
      .cancelBtn {background: red;}
    }
  }


`
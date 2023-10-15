import styled from 'styled-components';

export const Wrap = styled.div`
  .createBtn {margin-right: 5px;}
  //modify & delete btn
  .modifyBtn {margin-right: 5px; background: #73bbff;}
  .deleteBtn {background: #ff7373;}
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
      select {width: 100px;}
      input {border: 1px solid #000; width: 100%;}
      input:disabled {border: 1px solid #bbb; background: #eee;}
      .popup-top {
        display: flex; 
        justify-content: 
        space-between; 
        margin-bottom: 4px;
      }
      .create-btn {background: yellowgreen;}
      .cancel-btn {background: red;}
      th {width: 120px;}
    }
  }


`
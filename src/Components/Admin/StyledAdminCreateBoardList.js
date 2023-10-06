import styled from 'styled-components';

export const Wrap = styled.div`
  /* background: pink; */
  /* opacity: 0.5; */
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
      /* transform: translateX(-50%); */
      padding: 10px;
      input {border: 1px solid #000; width: 500px;}
      input:disabled {border: 1px solid #bbb; background: #eee;}
      .btn-box {display: flex; justify-content: space-between; margin-bottom: 4px;}
      .createBtnClick {background: yellowgreen;}
      .cancelBtn {background: red;}
    }
  }


`
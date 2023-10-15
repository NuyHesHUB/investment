import styled from 'styled-components';

export const Wrap = styled.div`
  //modify & delete btn
  .modifyBtn {margin-right: 5px; background: #73bbff;}
  .deleteBtn {background: #ff7373;}
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
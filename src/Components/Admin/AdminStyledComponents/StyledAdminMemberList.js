import styled from 'styled-components';

export const Wrap = styled.div`
  //modify & delete btn
  .modifyBtn {margin-right: 5px; background: #73bbff;}
  .deleteBtn {background: #ff7373;}
  @media screen and (max-width: 768px) {
    /* table, tr, tbody {
      min-width: calc(100vw - 85px);
    } */
    /* ul.top table,
    ul.top tr,
    ul.top tbody {
      min-width: 88vw;
    } */
    td:nth-child(1):before {content:'group';}
    td:nth-child(2):before {content:'isAdmin';}
    td:nth-child(3):before {content:'local';}
    td:nth-child(4):before {content:'kakao';}
    td:nth-child(5):before {content:'naver';}
    td:nth-child(6):before {content:'id';}
    td:nth-child(7):before {content:'email';}
    td:nth-child(8):before {content:'nickname';}
    td:nth-child(9):before {content:'phone';}
    td:nth-child(10):before {content:'regDt';}
    td:nth-child(11):before {content:'수정';}
  }
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
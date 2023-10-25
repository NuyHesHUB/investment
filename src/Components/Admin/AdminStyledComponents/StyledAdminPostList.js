import styled from 'styled-components';
export const Wrap = styled.div`
  th:nth-child(1) {width: 4%;}
  th:nth-child(2) {width: 6%;}
  th:nth-child(3) {width: 7%;}
  th:nth-child(4) {width: 8%;}
  th:nth-child(5) {width: 25%}
  /* th:nth-child(6) {width: 400px; } */
  th:last-child {width: 5.5%;}
  
  ///// 반응형 /////
  @media screen and (max-width: 768px) {
    td:nth-child(1):before {content:'status';}
    td:nth-child(2):before {content:'id';}
    td:nth-child(3):before {content:'brdKey';}
    td:nth-child(4):before {content:'category';}
    td:nth-child(5):before {content:'title';}
    td:nth-child(6):before {content:'content';}
    td:nth-child(7):before {content:'상세보기';}
  }

  @media screen and (max-width: 768px) {
    padding-left: 30px;
  }
  
`

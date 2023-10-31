import styled from 'styled-components';
export const Wrap = styled.div`
  th:nth-child(1) {width: 5%;}
  th:nth-child(2) {width: 7%;}
  th:nth-child(3) {width: 10%;}
  th:nth-child(4) {width: 10%;}
  th:nth-child(5) {width: 23%}
  th:nth-child(6) {width: 35%}
  th:last-child {width: 10%;}
  
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

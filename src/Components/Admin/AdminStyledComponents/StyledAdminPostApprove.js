import styled from 'styled-components';

export const Wrap = styled.div`
  th:nth-child(1) {width: 5%;}
  th:nth-child(2) {width: 5%;}
  th:nth-child(3) {width: 10%;}
  th:nth-child(4) {width: 10%;}
  th:nth-child(5) {width: 20%;}
  th:nth-child(6) {width: 30%;}
  th:nth-child(7) {width: 14%;}
  th:last-child {width: 6%;}


  @media screen and (max-width: 768px) {
    td {word-break: break-all;}
    td:nth-child(1):before {content:'num';}
    td:nth-child(2):before {content:'status';}
    td:nth-child(3):before {content:'condition';}
    td:nth-child(4):before {content:'category';}
    td:nth-child(5):before {content:'title';}
    td:nth-child(6):before {content:'content';}
    td:nth-child(7):before {content:'regDt';}
    td:nth-child(8):before {content:'상세보기';}
  }
`
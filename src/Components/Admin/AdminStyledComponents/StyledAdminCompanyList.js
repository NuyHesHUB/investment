import styled from 'styled-components';

export const Wrap = styled.div`
  th:nth-child(1) {width: 5%;}
  th:nth-child(2) {width: 5%;}
  th:nth-child(3) {width: 10%;}
  th:nth-child(4) {width: 10%;}
  th:nth-child(5) {width: 15%;}
  th:nth-child(6) {width: 17%;}
  th:nth-child(7) {width: 10%;}
  th:nth-child(8) {width: 18%;}
  th:nth-child(9) {width: 10%;}

   @media screen and (max-width: 768px) {
    td:nth-child(1):before {content:'id';}
    td:nth-child(2):before {content:'status';}
    td:nth-child(3):before {content:'loginId';}
    td:nth-child(4):before {content:'nickname';}
    td:nth-child(5):before {content:'companyName';}
    td:nth-child(6):before {content:'businessNum';}
    td:nth-child(7):before {content:'name';}
    td:nth-child(8):before {content:'regDt';}
    td:nth-child(9):before {content:'수정/삭제';}
  }
`


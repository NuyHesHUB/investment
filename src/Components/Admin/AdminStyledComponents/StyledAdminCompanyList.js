import styled from 'styled-components';

export const Wrap = styled.div`
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


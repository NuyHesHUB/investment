import styled from 'styled-components';

export const Wrap = styled.div`
  /* background: pink; */
  padding: 90px 0 0 300px ;
  input.search {margin-bottom: 20px;}
  select {width: 100%;}
  table, th, td {
    border-collapse: collapse;
    border: 1px solid #222;
    padding: 3px 8px;
  }
  /* tr {background: #ccc;} */
  tr.active {background: #fff;} // 수정 활성화 시에
  /* tr.active button.modify {background: #4294ff;} */
  th {background: #6371c2; color: #fff;}
  button {border: none; padding: 2px 5px; border-radius: 3px; cursor: pointer; }
  button.modify {margin-right: 5px; background: #73bbff;}
  button.delete {background: #ff7373;}
`
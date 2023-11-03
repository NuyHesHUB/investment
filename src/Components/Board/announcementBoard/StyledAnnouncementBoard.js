import styled from 'styled-components';

export const BoardWrap = styled.div`
  /* background: pink; */
  padding: 50px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
  * {box-sizing: border-box; margin: 0; padding: 0;}
  `
export const Container = styled.div`
  /* background: skyblue; */
  width: 1000px;
  padding: 50px;
  margin: 0 auto;

  div.top {
    /* background: green; */
    display: flex;
    justify-content: space-between;
    align-items: end;
    padding: 20px 10px;
  }
  .board-title-box p {
    color: #ccc;
    margin: 5px 0 0 2px;
  }
  h2{
    font-size: 2rem;
    font-weight: 500;
  }
  /* ul {background: #cf8182;} */
  ul li {
    /* background: #98bba0; */
    border-bottom: 1px solid #ccc;
    cursor: pointer;
  }
  li a {
    padding: 20px 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: #555;
  }
  ul li:first-child {border-top: 1px solid #ccc;}
  .post-title {
    font-size: 1.2rem;
    /* margin-bottom: 5px; */
  }
  button {
    cursor: pointer;
    background: #3FA9F5; 
    color: #fff; 
    padding: 8px 16px;
    border-radius: 20px;
    border: none;
    font-size: 18px;
  }
`

import styled from 'styled-components';

export const Wrap = styled.div`
  /* background: pink; */
  padding: 190px 0 500px;
  width: 100%;
  height: 1200px; //임시
  color: #888;
  *{box-sizing: border-box; margin: 0; padding: 0;}
`
export const TitleBox = styled.h2`
  text-align: center;
  color: #333;
  font-size: 36px;
  margin-bottom: 100px;
`
export const PriceInfo = styled.section`
 background: #f8f8fa;
 text-align: center;
 height: 400px; // 임시높이
 display: flex;
 align-items: center;
 justify-content: center;
`
export const PriceCard = styled.div`
  background: #fff;
  width: 300px;
  height: 96%;
  border: 1px solid #eee;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 50px 0 100px;
  color: #555;
  .price {font-size: 26px; margin-top: 15px; font-weight: 500;}
  .surtax {font-size: 12px;}
  .while {margin: 10px 0 30px; font-size: 14px;}
`
export const Container = styled.section`
  /* background: palegreen; */
  min-width: 700px;
  max-width: 950px;
  height: 900px; //임시
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
export const Box = styled.div`
  background: ${(props) => props.background};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Line = styled.p`
  width: 140px;
  height: 2px;
  display: inline-block;
  background: #ddd;
`
export const TextBox = styled.div`
  /* background: skyblue; */
  width: 500px;
  height: 150px;
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 300;
  line-height: 1.4;
`
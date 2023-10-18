import styled from 'styled-components';

export const Wrap = styled.div`
  /* background: pink; */
  padding: 200px 0 500px;
  width: 100%;
  height: 1200px; //임시
  color: #555;
`
export const PriceInfo = styled.section`
 background: rgba(0, 0, 0, 0.1);
 text-align: center;
 height: 400px; // 임시높이
 font-size: 30px;
 display: flex;
 align-items: center;
 justify-content: center;
`
export const TitleBox = styled.h2`
  text-align: center;
  color: #333;
  font-size: 36px;
  margin-bottom: 70px;
`
export const Container = styled.section`
  /* background: palegreen; */
  min-width: 700px;
  max-width: 950px;
  height: 900px; //임시
  margin: 50px auto;
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
  justify-content: ${(props) => props.justifyContent};
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
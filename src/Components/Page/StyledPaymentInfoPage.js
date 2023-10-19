import styled from 'styled-components';

export const Wrap = styled.div`
  /* background: pink; */
  padding: 190px 0 900px;
  width: 100%;
  height: 1200px; //임시
  color: #888;
  *{box-sizing: border-box; margin: 0; padding: 0;}
  p.sub-title{text-align: center; font-size: 36px; color: #555; font-weight: 500; margin-bottom: 50px;}
`
export const TitleBox = styled.h2`
  text-align: center;
  color: #333;
  font-size: 40px;
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
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
  .price {font-size: 26px; margin-top: 15px; font-weight: 500; color: #000;}
  .surtax {font-size: 12px;}
  .while {margin: 10px 0 30px; font-size: 14px;}
  .while span {color: #3fa9f5; font-weight: bold;}
`
export const Container = styled.section`
  /* background: palegreen; */
  min-width: 700px;
  max-width: 950px;
  height: 950px; //임시
  margin: 200px auto;
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
  padding: 0 50px;
  /* border: 1px solid #ddd;
  border-radius: 50px; */
  
  .icon {color: #afdaf8; transition: color .3s;}
  &:hover {
    .icon {color: #87cafa;}
  }
`

export const Line = styled.div`
  width: 140px;
  height: 1px;
  display: inline-block;
  background: #ddd;
`
export const TextBox = styled.div`
  /* background: skyblue; */
  width: 460px;
  height: 150px;
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 300;
  line-height: 1.4;
  span.bold {font-weight: 500; font-size: 22px; color: #555; margin-bottom: 10px; display: block;}
  .write {color: #75c1f7; font-weight: bold; transition: color .2s; cursor: pointer;}
  .write:hover {color: #3fa9f5;}
`
export const WriteBtn = styled.div`
  background: yellowgreen;
  text-align: center;
  padding: 10px 0;
  a {
    display: inline-block;
    background: #fff; 
    border: none; 
    font-size: 20px; 
    padding: 15px 10px;
    transition: all .2s;
    }
  a:hover {}
`
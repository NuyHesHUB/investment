import styled from 'styled-components';

export const Wrap = styled.div`
  /* background: pink; */
  padding: 190px 0 800px;
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
  padding: 30px 0 100px;
  color: #555;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
  .num_items {
    background: #79b8ff;
    display: inline-block;
    color: #fff;
    padding: 5px 10px;
    border-radius: 15px;
  }
  .price {font-size: 30px; margin: 25px 0 5px; font-weight: 600; /* color: #419aff; */}
  .surtax {font-size: 12px; color: #ccc;}
  .while {margin: 20px 0 50px; font-size: 18px;}
  .while span {font-weight: bold;}
`
export const Container = styled.section`
  /* background: palegreen; */
  min-width: 700px;
  max-width: 1000px;
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
  color: #333;
  transition: opacity .2s;
  .icon {color: #7fc8fc; }
  opacity: .7;
  &:hover {
    opacity: 1;
    /* .icon {color: #87cafa;} */
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
  width: 520px;
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

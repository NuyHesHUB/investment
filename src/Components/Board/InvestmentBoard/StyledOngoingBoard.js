import styled from 'styled-components';

export const DummyBanner=styled.div`
    width: 100%;
    height: 400px;
    padding: 0 240px;
    box-sizing: border-box;
    background: rgb(71, 111, 241);
    color: rgba(255, 255, 255, 0.9);
    font-size: 26px;
    font-weight: 500;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div.leftBox {
        width: 450px;
    }
`

export const BoardWrap=styled.div`
    width: 100%;
    height: auto;
    padding-top: 80px;
    margin-bottom: 124px;
`
export const PostCardTitleWrap=styled.div`
    width: 100%;
    padding: 0 250px;
    box-sizing: border-box;
    margin-top: 124px;
    margin-bottom: 42px;
    h3{
        color: rgb(0, 0, 0);
        font-size: 30px;
        font-weight: 600;
        text-align: left;
    }
`
export const PostCardWrap=styled.div`
    /* width: 100%;
    padding: 0 250px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between; */
    display: grid;
    grid-template-columns: repeat(3, minmax(386px, 1fr));
    gap: 37px;
    padding: 0 250px;
`

export const MoreWrap=styled.div`
    text-align: center;
`
export const MoreBtn=styled.button`
    width: 100px;
    height: 50px;
    border-radius: 20px;
    outline: none;
    border: none;
    background: rgb(63, 169, 245);
    position: relative;
    line-height: 50px;
    span{
        color: #fff;
        font-weight: 600;
        font-size: 18px;
    }
`
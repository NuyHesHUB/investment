import styled from 'styled-components';

export const DummyBanner=styled.div`
    width: 100%;
    height: 500px;
    background: rgb(51,51,51);
    color: rgba(255, 255, 255, 0.6);
    font-size: 64px;
    font-weight: 400;
    text-align: center;
    line-height: 500px;
`

export const BoardWrap=styled.div`
    width: 100%;
    height: 2000px;
    padding-top: 80px;
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
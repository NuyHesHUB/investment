import styled from 'styled-components';

export const StyledFrame=styled.div`
    /* background: rgba(0, 0, 0, .2); */
    width: 100%;
    max-width: 1920px;
    height: 800px;
    margin: 0 auto;
    h1{
        text-align: center;
    }
    a{
        text-decoration: none;
        color: #000;
    }
`
export const GalleryWrap=styled.div`
    display: flex;
    flex-direction: column;
`
export const LeftFrame=styled.div`
    width: 100%;
    height: 100%;
    /* background: rgba(0,0,0,.2); */
    border-radius: 20px;
`
export const LeftTable=styled.table`
    width: 100%;
    /* height: 100%; */
    height: 500px;
    padding: 20px;
    z-index: 999;
    thead{
        /* background: red; */
        border-bottom: 1px solid #000;
        tr{
            height: 80px;
            
        }
    }
`
export const TablePagination=styled.div`
    width: 100%;
    span{
        display: inline-block;
        border: 1px solid #000;
        width: 30px;
        height: 30px;
        line-height: 30px;
        margin: 0 2px;
        transition: ease-in-out .2s;
        cursor: pointer;
        &:hover{
            background: rgba(69,74,252,1);
            color: #fff;
            border: 1px solid rgba(69,74,252,1);
        }
    }
`
export const RightFrame=styled.div`
    width: 30%;
    height: 100%;
`
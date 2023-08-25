import styled from 'styled-components';

export const StyledFrame=styled.div`
    width: 100vw;
    height: 100vh;
`

export const StyledMemberFrame=styled.div`
    width: 730px;
    /* max-width: 384px; */
    height: 800px;
    margin: 0 auto;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
`

export const MemberForm=styled.form`
    width: 100%;
    margin-top: 50px;
    line-height: 1.5;
    font-size: 14px;
    border-collapse: collapse;
    table-layout: fixed;
    text-align: center;
`

export const MemberBody=styled.div`
    
`
export const MemberInfoBox=styled.div`
    display: flex;
    justify-content: space-between;
    height: 50px;
    align-items: center;
    border-bottom: 1px solid #888;
`
export const MemberInfoTitle=styled.div`
    text-align: left;
    width: 200px;
`
export const MemberTextBox=styled.div`
    width: 200px;
`

export const MemberBtn=styled.button`
    min-width: 100px;
    border: none;
    /* background: #3fa9f5; */
    background: rgba(69,74,252,1);
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    padding: 5px;
`
export const EditWrapFrame=styled.div`
    width: 100%;
`

export const EditInputFrame=styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const EditInput=styled.input`
    padding: 5px;
    border-radius: 5px;
    outline: none;
`
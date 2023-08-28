import styled from 'styled-components';

export const StyledMemberListFrame=styled.div`
    padding: 0 0 0 270px;
    margin-top: 100px;
    height: 100%;
    background: #fff;
    min-width: 1200px;
`
export const StyledMemberListWrap=styled.div`
    padding: 20px;
`
export const StyledMemberInfo=styled.div`
    min-width: 960px;
    margin: 10px 0;
    display: flex;
`
export const StyledMemberSearch=styled.form`
    margin: 10px 0;
`
export const StyledMemberListForm=styled.form`
    .none-label{
        display: inline-block !important;
        position: absolute;
        top: 0;
        left: 0;
        margin: 0 !important;
        padding: 0 !important;
        width: 1px !important;
        height: 1px !important;
        font-size: 0;
        line-height: 0;
        border: 0 !important;
        overflow: hidden !important;
    }
    table{
        clear: both;
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
    }
    thead th{
        background: #6f809a;
        color: #fff;
        border: 1px solid #60718b;
        font-weight: normal;
        text-align: center;
        padding: 8px 5px;
        font-size: 0.92em;
    }
    tbody td{
        border: 1px solid #d6dce7;
        padding: 5px;
        text-align: center;
    }
`
export const StyledMemberListNav=styled.nav`

`
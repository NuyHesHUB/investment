import styled from 'styled-components';

export const StyledFrame=styled.div`
    padding: 0 0 0 270px;
    /* margin-top: 50px; */
    margin-top: 28px;
    height: 100%;
    min-width: 1200px;
    a{
        color: #fff;
    }
`
export const StyledTableWrap=styled.div`
    padding: 20px;
`
export const StyledInfoBox=styled.div`
    min-width: 960px;
    margin: 10px 0;
    display: flex;
`
export const StyledSearchBox=styled.form`
    margin: 10px 0;
`
export const StyledAdminBoard=styled.div`
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

export const EditTableWrap=styled.div`
    /* min-height: 900px; */
    padding: 50px;
    background-color: #fff;
    /* border: 1px solid #ccc; */
    section{
        font-size: 12px;
        line-height: 1.6;
        color: #666;
        h1{
            margin: 0 0 10px;
            font-size: 30px;
            font-weight: bold;
            color: rgb(51, 51, 51);
            letter-spacing: -1px;
        }
        table{
            width: 100%;
            border-top: 2px solid #969696;
            border-collapse: collapse;
            text-align: center;
            thead{
                border-bottom: 1px solid #969696;
                tr{
                    height: 40px;
                    th{
                        background: #6f809a;
                        color: #fff;
                        border: 1px solid #60718b;
                        font-weight: normal;
                        text-align: center;
                        padding: 8px 5px;
                        font-size: 0.92em;
                    }
                }
            }
            tbody{
                tr{
                    height: 50px;
                    th{
                        border: 1px solid #d6dce7;
                        padding: 5px;
                        text-align: center;
                    }
                    td{
                        border: 1px solid #d6dce7;
                        padding: 5px;
                        text-align: center;
                    }
                }
            }
        }
        .edit_save_btn{
            
        }
    }
`
export const EditSaveBtn=styled.button`
    outline: none;
    border: none;
    background: rgb(63, 81, 181);
    color: rgb(255, 255, 255);
    padding: 10px 15px;
    font-size: 12px;
    border-radius: 10px;
    cursor: pointer;
`

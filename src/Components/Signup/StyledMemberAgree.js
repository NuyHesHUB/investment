import styled from "styled-components";

export const AgreeBox=styled.div`
    width: 541px;
    height: 300px;
    background: #fff;
    border: 1px solid rgb(238,238,238);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
`
export const AgreeItemWrap=styled.div`
    flex: 1 1 0%;
    text-align: center;
`
export const AgreeItem=styled.div`
    display: flex;
    align-items: center;
    padding-top: 12px;
    .all-agree{
        flex-direction: column;
        p{
            padding-left: 15px;
            font-size: 13px;
        }
    }
    .space-box{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    label{
        position: relative;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        vertical-align: top;
        line-height: normal;
        color: rgb(51, 51, 51);
        padding: 0px;
        font-weight: 500;
        font-size: 18px;
        input{
            overflow: hidden;
            position: absolute;
            clip: rect(0px, 0px, 0px, 0px);
            clip-path: inset(50%);
            width: 1px;
            height: 1px;
            &:checked + div > svg {
                path:first-child{
                    fill: #3fa9f5;
                    stroke: #3fa9f5;
                }
                path:last-child{
                    stroke: #fff;
                }
            }
        }
    }
`
export const CheckBoxWrap=styled.div`
    display: flex;
    align-items: center;
`
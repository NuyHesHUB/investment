import React from 'react';
import styled from 'styled-components';
import { BsFillBuildingFill } from 'react-icons/bs';
import { TbPhoneCall } from 'react-icons/tb';

const mainColor = '#3fa9f5';

const CardFrame = styled.div`
    cursor: pointer;
    position: relative;
    /* width: 300px; */
    width: 310px;
    /* height: 300px; */
    height: 296px;
    min-height: 296px;
    border-radius: 10px;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
    background: #fff;
    overflow: hidden;
    &::before{
        content: "";
        position: absolute;
        top: -50px;
        right: -50px;
        width: 100px;
        height: 100px;
        /* background-color: rgba(255, 255, 255, 0.08); */
        background-color: ${mainColor};
        transform: rotate(45deg);
        z-index: 1;
    }
    &::after{
        content: "PREMIUM";
        position: absolute;
        top: 19px;
        right: 0;
        width: auto;
        color: #fff;
        font-size: 12px;
        transform: rotate(45deg);
        z-index: 2;
    }
`
const CardWrap = styled.div`
    width: 100%;
    height: 100%;
    padding: 20px 50px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
const CompanyBox = styled.div`
    svg{
        color: ${mainColor};
        margin-right: 5px;
    }
    span{
        font-size: 17px;
        color: #242424;
    }
    display: flex;
    align-items: center;
    
`
const TitleBox = styled.div`
    /* color: ${mainColor}; */
    font-size: 30px;
    font-weight: bold;

`
const ContentBox = styled.div`

`

const TelBox = styled.div`
    font-size: 16px;
    display: flex;
    align-items: center;
`

const PremiumAdCard = ({adTitle, adCompany, adContent, adTel}) => {

    return (
        <React.Fragment>
                    <CardFrame>
                        <CardWrap>
                            <TitleBox>{adTitle}</TitleBox>
                            <CompanyBox>
                                <BsFillBuildingFill/>
                                <span>{adCompany}</span>
                            </CompanyBox>
                            <ContentBox>{adContent}</ContentBox>
                            <TelBox>
                                <TbPhoneCall/>
                                <span>{adTel}</span>
                            </TelBox>
                        </CardWrap>
                    </CardFrame>
        </React.Fragment>
    );
};

export default PremiumAdCard;
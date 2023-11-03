import React from 'react';
import styled from 'styled-components';
import { FcAssistant } from 'react-icons/fc';
import { HiPhone } from 'react-icons/hi';

const CardFrame = styled.div`
    width: 600px;
    height: 150px;
    border-radius: 10px;
    display: flex;
    align-items: center;
`
const CardWrap = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-around;
`
const LeftContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`
const RightContent = styled.div`
    /* display: flex; */
    svg{
        font-size: 105px;
    }
`
const ContentBox = styled.div`
    display: flex;
    margin-bottom: 10px;
    h4{
        font-size: 20px;
        color: #fff;
    }
`
const TitleBox = styled.div`
    margin-bottom: 10px;
    h2{
        font-size: 35px;
        font-weight: bold;
        color: #fff;
        text-shadow: 3px 4px 4px #000;
    }
`
const TelBox = styled.div`
    width: 142px;
    display: flex;
    align-items: center;
    padding: 5px;
    border-radius: 10px;
    background: #fff;
    svg{
        font-size: 20px;
        margin-right: 5px;
        
    }
    span{
        color: #888;
    }
`

const BannerAdCard = ({backgound, content, company, tel}) => {
    return (
        <CardFrame style={{background:`${backgound}`}}>
            <CardWrap>
                <LeftContent>
                    <ContentBox>
                        <h4>{content}</h4>
                    </ContentBox>
                    <TitleBox>
                        <h2>{company}</h2>
                    </TitleBox>
                    <TelBox>
                        <HiPhone/>
                        <span>{tel}</span>
                    </TelBox>
                </LeftContent>
                <RightContent>
                    <FcAssistant/>
                </RightContent>
            </CardWrap>
        </CardFrame>
    );
};

export default BannerAdCard;
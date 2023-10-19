import React from 'react';
import { 
    OngoingPostCardWrap, 
    IconBox, 
    IconImg, 
    CompanyName,
    Title,
    Content, 
    BottomContentWrap, 
    Category, 
    DeadlineDt 
} from './StyledPostCard';

import defaultLogo from '../../../assets/default-image/company-default-img.png';

const OngoingPostCard = ({logoimg, name, title, content, category, date}) => {
    return (
        <OngoingPostCardWrap>
            <IconBox>
                {
                    logoimg !== null && logoimg !== "" ? 
                        <IconImg src={logoimg} alt='companyLogo'/> : 
                        <IconImg src={defaultLogo} alt='defaultLogo'/>
                }
            </IconBox>
            <CompanyName>
                {
                    name !== null && name !== ""?
                    <>{name}</> : "..."
                }
            </CompanyName>
            <Title>
                {title.length > 20 ? `${title.slice(0, 20)}` : title}
            </Title>
            <Content>{content}</Content>
            <BottomContentWrap>
                <Category>{category}</Category>
                <DeadlineDt>{date}</DeadlineDt>
            </BottomContentWrap>
        </OngoingPostCardWrap>
    );
};

export default OngoingPostCard;
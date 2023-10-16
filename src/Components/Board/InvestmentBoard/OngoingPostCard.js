import React from 'react';
import { 
    OngoingPostCardWrap, 
    OngoingIconBox, 
    IconImg, 
    OngoingCompanyName,
    OngoingTitle,
    OngoingContent, 
    OngoingBottomContentWrap, 
    OngoingCategory, 
    OngoingDeadlineDt 
} from './StyledOngoingPostCard';

import defaultLogo from '../../../assets/default-image/company-default-img.png';

const OngoingPostCard = ({logoimg, name, title, content, category, date}) => {
    return (
        <OngoingPostCardWrap>
            <OngoingIconBox>
                {
                    logoimg !== null && logoimg !== "" ? 
                        <IconImg src={logoimg} alt='companyLogo'/> : 
                        <IconImg src={defaultLogo} alt='defaultLogo'/>
                }
            </OngoingIconBox>
            <OngoingCompanyName>
                {
                    name !== null && name !== ""?
                    <>{name}</> : "..."
                }
            </OngoingCompanyName>
            <OngoingTitle>
                {title.length > 20 ? `${title.slice(0, 20)}` : title}
            </OngoingTitle>
            <OngoingContent>{content}</OngoingContent>
            <OngoingBottomContentWrap>
                <OngoingCategory>{category}</OngoingCategory>
                <OngoingDeadlineDt>{date}</OngoingDeadlineDt>
            </OngoingBottomContentWrap>
        </OngoingPostCardWrap>
    );
};

export default OngoingPostCard;
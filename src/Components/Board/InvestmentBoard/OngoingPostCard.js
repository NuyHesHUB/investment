import React from 'react';
import { OngoingPostCardWrap, OngoingIcon, OngoingCompanyName, OngoingContent, OngoingBottomContentWrap, OngoingCategory, OngoingDeadlineDt } from './StyledOngoingPostCard';
const OngoingPostCard = ({name, content, category, date}) => {
    return (
        <OngoingPostCardWrap>
            <OngoingIcon>아이콘</OngoingIcon>
            <OngoingCompanyName>{name}</OngoingCompanyName>
            <OngoingContent>{content}</OngoingContent>
            <OngoingBottomContentWrap>
                <OngoingCategory>{category}</OngoingCategory>
                <OngoingDeadlineDt>{date}</OngoingDeadlineDt>
            </OngoingBottomContentWrap>
        </OngoingPostCardWrap>
    );
};

export default OngoingPostCard;
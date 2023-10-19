import React from 'react';
import { 
    DeadlinePostCardWrap, 
    DeadlineContainer,
    IconBox, 
    IconImg, 
    CompanyName,
    Title,
} from './StyledPostCard';

import defaultLogo from '../../../assets/default-image/company-default-img.png';

const DeadlinePostCard = ({logoimg, name, title, content, category, date}) => {
    return (
        <DeadlinePostCardWrap>
            <h2>마감된 투자입니다</h2>
            <DeadlineContainer>
                <div>
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
                </div>
            </DeadlineContainer>
        </DeadlinePostCardWrap>
    );
};

export default DeadlinePostCard;
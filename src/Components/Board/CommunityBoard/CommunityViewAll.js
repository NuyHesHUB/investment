import React from 'react';
import { Link } from 'react-router-dom';

const CommunityViewAll = () => {
    return (
        <div>
            커뮤니티 전체 페이지<br/>
            <Link to="/community/daily">일상</Link><br/>
            <Link to="/community/humor">유머</Link><br/>
            <Link to="/community/economy">경제</Link><br/>
            <Link to="/community/debate">토론</Link><br/>
            <Link to="/community/information">정보</Link><br/>
        </div>
    );
};

export default CommunityViewAll;
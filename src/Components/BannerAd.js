import React from 'react';

import styled from 'styled-components';
const BannerAdBox = styled.div`
    background: #ccc;
    width: 150px;
    height: 500px;
    margin: 20px 0 0 20px;
    top: 100px;
    right: 0;
    position: sticky;
    position: -webkit-sticky;
    text-align: center;
`
// sticky로 인해 부모 컴포넌트에 overflow:hidden이 없어야 적용 가능
const BannerAd = () => {
  return (
    <BannerAdBox>
      <div>
        광고자리
      </div>
    </BannerAdBox>
  )
}
export default BannerAd;
import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(270deg); }
`;

const colors = keyframes`
  0% { stroke: #3FA9F5; }
  50% { stroke: #2d00eb; }
  100% { stroke: #3FA9F5; }
`;

const dash = keyframes`
  0% { 
    stroke-dashoffset: 187; 
  }
  50% {
    stroke-dashoffset: 46.75;
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: 187;
    transform: rotate(450deg);
  }
`;

const LoadingWrap = styled.div`
    width: 100%;
    /* height: 100vh; */
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    .spinner {
        animation: ${rotate} 1.4s linear infinite;
    }

    .path {
        stroke-dasharray: 187;
        stroke-dashoffset: 0;
        transform-origin: center;
        animation: ${dash} 1.4s ease-in-out infinite, ${colors} 5.6s ease-in-out infinite;
    }
`;

const Loading = () => {
  return (
    <LoadingWrap>
      <svg className="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
        <circle className="path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
      </svg>
    </LoadingWrap>
  );
};

export default Loading;

import styled from "styled-components";
// import logo from "/ums_detailed_logo.svg";

export const Container = styled.div`
width: 100%;
height: 100%;
justify-items: center;
align-content: center;
`;

export const Headline = styled.h1`
text-align: center;
`;

export const IconContainer = styled.div`
margin-top: 12vh;
width: 50vmin;
height: 50vmin;
`;

export const Icon = styled.div`
width: 100%;
height: 100%;
background: url('/ums_detailed_logo.svg') no-repeat center;
background-size: contain;
animation: pops 1s infinite;
@keyframes pops {
    0% {scale: 1}
    10% {scale: 1.1; rotate: 0deg}
    20% {scale: 1.2; rotate: 20deg}
    30% {scale: 1.3; rotate: 30deg}
    40% {scale: 1.4; rotate: 20deg}
    50% {scale: 1.5; rotate: 0deg}
    60% {scale: 1.4; rotate: -20deg}    
    70% {scale: 1.3; rotate: -30deg}
    80% {scale: 1.2; rotate: -20deg}
    90% {scale: 1.1; rotate: 0deg}
    100% {scale: 1}   
}
`;
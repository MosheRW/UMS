import styled, { css } from 'styled-components';
export const TopBarContainerContainer = styled.div`
  /* background-color: ${({ theme }) => theme.backgroundColor}; */
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const TopBarContainer = styled.header<{ $isMobile?: boolean }>`
  display: flex;

  justify-content: space-between;
  /* justify-content: center; */
  padding: 0.5rem;
  margin: 0.5rem;
  border-radius: 0.5rem;

  background-color: ${({ theme }) => theme.primaryComponent.notChosen.backgroundColor};
  color: ${({ theme }) => theme.primaryComponent.notChosen.color};

  /* width: 100%; */
  height: 10vmin;

  @media (max-width: 1300px) {
    ${(props) => props.$isMobile && 'padding: 1.5rem'};
  }
`;
export const Content = css`
  font-size: 2.5rem;
  align-self: center;
  border: none;
  cursor: pointer;

  &:hover {
    transform: scale(0.95);
    color: ${({ theme }) => theme.primaryComponent.notChosen.color};
  }

  &:active {
    transform: scale(1.05);
    color: ${({ theme }) => theme.primaryComponent.chosen.color};
  }
`;

export const LogOutButton = styled.h1<{ $isMobile?: boolean }>`
  ${Content}
  color: ${({ theme }) => theme.thirdTextColor};
  cursor: pointer;

  :hover {
    color: red;
  }
`;

export const TitleAndIconContainer = styled.div<{ $isMobile?: boolean }>`
display: flex;
align-items: center;
direction: row;
gap: 1rem;`;

export const TopBarTitle = styled.h1`
  ${Content}
  text-align: right;
`;

export const Icon = styled.div<{ $isMobile?: boolean }>`
width: 10vmin;
height: 100%;
background: ${(props) => props.$isMobile ?  "url('/ums_logo.svg')" : "url('/ums_detailed_logo.svg')"} no-repeat center;
background-size: contain;
scale: 1.5;
animation: swing 10s ease-in-out  infinite;
@keyframes swing {
    0% {rotate: 0deg}
    1% {rotate: 2deg}
    2% {rotate: 4deg}
    3% {rotate: 6deg}
    4% {rotate: 8deg}
    5% {rotate: 10deg}
    6% {rotate: 12deg}
    7% {rotate: 14deg}
    8% {rotate: 16deg}
    9% {rotate: 18deg}
    10% {rotate: 20deg}
    11% {rotate: 22deg}
    12% {rotate: 24deg}
    13% {rotate: 26deg}
    14% {rotate: 28deg}
    15% {rotate: 30deg}
    16% {rotate: 28deg}
    17% {rotate: 26deg}
    18% {rotate: 24deg}
    19% {rotate: 22deg}
    20% {rotate: 20deg}
    21% {rotate: 18deg}
    22% {rotate: 16deg}
    23% {rotate: 14deg}
    24% {rotate: 12deg}
    25% {rotate: 10deg}
    26% {rotate: 8deg}
    27% {rotate: 6deg}
    28% {rotate: 4deg}
    29% {rotate: 2deg}
    30% {rotate: 0deg}
    49% {rotate: 0deg}
    50% {rotate: 0deg}
    51% {rotate: -2deg}
    52% {rotate: -4deg}
    53% {rotate: -6deg}
    54% {rotate: -8deg}
    55% {rotate: -10deg}
    56% {rotate: -12deg}
    57% {rotate: -14deg}
    58% {rotate: -16deg}
    59% {rotate: -18deg}
    60% {rotate: -20deg}
    61% {rotate: -18deg}
    62% {rotate: -16deg}
    63% {rotate: -14deg}
    64% {rotate: -12deg}
    65% {rotate: -10deg}
    66% {rotate: -8deg}
    67% {rotate: -6deg}
    69% {rotate: -4deg}
    69% {rotate: -2deg}
    70%{rotate: 0deg}
    100%{rotate: 0deg}

    
}
`;
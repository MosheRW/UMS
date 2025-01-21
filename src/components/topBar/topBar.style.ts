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
  height: 10vh;

  @media (max-width: 1300px) {
    ${(props) => props.$isMobile && 'padding: 1.5rem'};
  }
`;
export const Content = css`
  font-size: 2rem;
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

export const TopBarTitle = styled.h1`
  ${Content}
  text-align: right;
`;

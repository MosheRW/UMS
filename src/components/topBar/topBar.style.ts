import styled, { css } from 'styled-components';
export const TopBarContainerContainer = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const TopBarContainer = styled.header`
  display: flex;

  justify-content: space-between;
  /* justify-content: center; */
  padding: 10px;
  margin: 0.5rem;
  border-radius: 0.5rem;

  background-color: ${({ theme }) => theme.firstComponentsColorTransperent};
  color: ${({ theme }) => theme.primaryTextColor};

  /* width: 100%; */
  height: 10vh;
`;
export const Content = css`
  font-size: 2rem;
  color: ${({ theme }) => theme.primaryTextColor};
  align-self: center;
  border: none;
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

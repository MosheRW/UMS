import styled from 'styled-components';
export const TopBarContainerContainer = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const TopBarContainer = styled.header`
  display: flex;
  justify-content: space-between;
  justify-content: center;
  padding: 10px;
  margin: 0.5rem;
  border-radius: 0.5rem;

  background-color: ${({ theme }) => theme.firstComponentsColorTransperent};
  color: ${({ theme }) => theme.primaryTextColor};

  /* width: 100%; */
  height: 10vh;
`;


export const LogOutButton = styled.div`
  border: none;
  cursor: pointer;
  font-size: 4rem;
  color: #ff0000;
  position: relative;
  right: 35vw;
  align-self: center;
  
`;

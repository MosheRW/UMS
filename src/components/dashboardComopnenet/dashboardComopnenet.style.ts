import styled, { css } from 'styled-components';
import { Buttons } from '../../style/themes.style';

export const DashboardContainrer = styled.div`
  position: relative;
  display: flex;

  flex-direction: row-reverse;
  justify-content: center;
  gap: 2ch;
  margin: 0.5rem;

  @media (max-width: 1300px) {
    flex-direction: column;
  }
`;


export const Button = styled.div`
  ${Buttons}
`;


export const DisplayManagmentConstainer = styled.div<{ $isWide: boolean }>`
  display: flex;
  flex-direction: ${(props) => props.$isWide ?  'column' : 'row'};
  justify-content: center;
`;

export const DisplayButtonsContainer = styled.div<{ $isWide?: boolean, $color?: string }>`
display: flex;
flex-direction: ${(props) => props.$isWide ? 'column' : 'row'};
justify-content: center;
`;

export const DisplayEditorContainer = styled.div<{ $isWide: boolean }>`
display: ${(props) => props.$isWide ? 'flex' : 'none'};
display: flex;
flex-direction: column;
justify-self: center;
align-items: center;
margin-left: 8%;
width: 100%;
`;

export const DisplayUsersContainer = styled.div<{ $isWide?: boolean }>``;


/** browserView */

export const DisplayUsersBrowserEditionContainer = styled.div`
display: flex;
flex-direction: row;

justify-self: center;
max-width: 200ch;
`;

export const DisplayUsersBrowserEdition = styled.table`
  width: 100%;
  table-layout: fixed;
`;

export const DisplayUsersBrowserEditionHeader = styled.thead``;
export const DisplayUsersBrowserEditionBody = styled.tbody`
border: 1px solid #ddd;
`;
export const DisplayUsersBrowserEditionRow = styled.tr<{ $odd: boolean }>`
background-color: ${({ theme }) =>
    (props) =>
      props.$odd ? theme.secondComponentsColorTransperent : theme.thirdComponentsColorTransperent};
color: ${({ theme }) =>
    (props) =>
      props.$odd ? theme.primaryTextColor : theme.secondaryTextColor};
color: ${({ theme }) => theme.primaryTextColor};
text-align: ${({ theme }) => theme.alignText};
border-style: solid;
border-color: ${({ theme }) => theme.borderColor};
border-width: ${({ theme }) => theme.borderWidth};
`;

export const DisplayUsersBrowserEditionHeaderCell = styled.th``;
export const DisplayUsersBrowserEditionBodyCell = styled.td`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  `;

export const InputCheckMark = styled.input.attrs({ type: 'checkbox' })`
  align-self: center;
`;


/** mobileView */

export const DisplayUsersMobileEditionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const DisplayUserMobileEdition = styled.div<{ $isChoosen: boolean }>`
background-color: ${({ $isChoosen }) => ($isChoosen ? ({ theme }) => theme.thirdComponentsColorTransperent : ({ theme }) => theme.secondComponentsColorTransperent)};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid black;
  padding: 0.25rem;
  overflow: hidden;
  margin: 0.25rem;
`;

export const DisplayUserMobileEditionTable = styled.table`
  width: 100%;
  border: 1px solid black;
  `;

export const DisplayUserMobileEditionBody = styled.tbody``;
export const DisplayUserMobileEditionRow = styled.tr`
  width: 100%;
`;
export const DisplayUserMobileEditionLable = styled.th`
  width: 14ch;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  `;
export const DisplayUserMobileEditionValue = styled.td`
  width: calc(100% - 15ch);
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  `;

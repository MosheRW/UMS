import styled, { css } from 'styled-components';
import { Buttons } from '../../style/themes.style';

export const DashboardContainrer = styled.div`
  position: relative;
  display: flex;

  flex-direction: row;
  justify-content: center;
  gap: 2ch;
  margin: 0.5rem;

  @media (max-width: 1300px) {
    flex-direction: column-reverse;
  }
`;

export const ManagementArea = styled.div`
  position: sticky;
  top: calc(10vh + 2ch);

  width: 40ch;
  height: 80vh;
  background-color: ${({ theme }) => theme.secondComponentsColorTransperent};
  justify-items: center;
`;

export const TableContainer = styled.div`
  display: flex;
  flex-direction: row;

  justify-self: center;
  max-width: 200ch;
`;

export const Table = styled.table`
  width: 100%;
  table-layout: fixed;
`;

export const TableCellCss = css`
  /* width: 2ch; */
  /* padding-right: 3ch; */
`;

export const TableHeader = styled.thead``;
export const HeaderCell = styled.th`
  ${TableCellCss}
`;

export const TableBody = styled.tbody`
  border: 1px solid #ddd;
`;

export const TableRow = styled.tr<{ $odd: boolean }>`
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

export const TableCell = styled.td<{ $length?: number }>`
  ${TableCellCss}
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const InputCheckMark = styled.input.attrs({ type: 'checkbox' })`
  align-self: center;
`;

export const Button = styled.div`
  ${Buttons}
`;

export const MangmantEditorsModal = styled.div`
  align-content: center;
  justify-items: center;
`;

export const ManagmentButtons = styled.div`
  position: sticky;
  top: calc(10vh + 2ch);
  background-color: ${({ theme }) => theme.backgroundColor};
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;



export const MobileUserRecordContainer = styled.div<{ $choosen: boolean }>`
  background-color: ${({ $choosen }) => ($choosen ? ({ theme }) => theme.thirdComponentsColorTransperent : ({ theme }) => theme.secondComponentsColorTransperent)};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid black;
  padding: 0.25rem;
  overflow: hidden;
  margin: 0.25rem;
`;

export const MobileUserRecord = styled.table`
  width: 100%;
  border: 1px solid black;
`;
export const MobileUserRecordBody = styled.tbody``;

export const Row = styled.tr`
  width: 100%;
`;
export const TableLabel = styled.th`
  width: 14ch;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const TableValue = styled.td`
  width: calc(100% - 15ch);
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const UsersListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

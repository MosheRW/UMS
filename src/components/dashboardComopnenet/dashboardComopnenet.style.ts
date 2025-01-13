import styled, { css } from 'styled-components';
import { Buttons } from '../../style/themes.style';

export const DashboardContainrer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 2ch;
`;

export const ManagementArea = styled.div`
  position: sticky;
  top: 14vh;

  width: 40ch;
  height: 80vh;
  background-color: ${({ theme }) => theme. secondComponentsColorTransperent};
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
  /* border-radius:  ${({ theme }) => theme.borderRadius}; */
  border-color: ${({ theme }) => theme.borderColor};
  border-width: ${({ theme }) => theme.borderWidth};
`;

export const TableCell = styled.td<{ $length?: number }>`
  ${TableCellCss}
  width: ${({ $length }) => ($length && `${$length}ch`) || '30ch'};

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

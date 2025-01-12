import styled, { css } from "styled-components";



export const TableContainer = styled.div`
display: flex;
flex-direction:row;
justify-content: space-evenly;
/* background-color:  ${({ theme }) => theme.firstComponentsColor}; */
`;


export const Table = styled.table``;

export const TableCellCss = css`
/* width: 30ch; */
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
background-color: ${({ theme }) => props => props.$odd ? theme.secondComponentsColorTransperent : theme.thirdComponentsColorTransperent};
color: ${({ theme }) => props => props.$odd ? theme.primaryTextColor : theme.secondaryTextColor};
color:  ${({ theme }) => theme.primaryTextColor};
text-align: ${({ theme }) => theme.alignText};
border-style: solid;
/* border-radius:  ${({ theme }) => theme.borderRadius}; */
border-color:  ${({ theme }) => theme.borderColor};
border-width:  ${({ theme }) => theme.borderWidth};

`;

export const TableCell = styled.td<{ $length?: number }>`
${TableCellCss}
width: ${({ $length }) => $length && `${$length}ch` || '30ch'};
padding-right: 3ch;
border: 1px solid #ddd;

/* border-style: solid; */
/* border-radius:  ${({ theme }) => theme.borderRadius};
border-color:  ${({ theme }) => theme.borderColor};
border-width:  ${({ theme }) => theme.borderWidth}; */

overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;

`;

export const InputCheckMark = styled.input.attrs({ type: 'checkbox' })`
align-self: center;

`;


export const EditUserContainer = styled.div`
display: flex;
position: sticky;
right: 0;
top: 15vh;
height: 80vh;
/* justify-content: space-around; */


/* width: 30vw; */
`;
import styled, { css } from "styled-components";



export const TableContainer = styled.div`
display: flex;
flex-direction:row;


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
/* width: ${({ $length }) => $length && `${$length}ch` || '30ch'}; */

/* border: 1px solid #ddd; */

overflow: hidden;
/* text-overflow:clip; */
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


export const ModalContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: ${({ theme }) => theme.firstComponentsColor};
border: 1px solid black;
/* width: fit-content; */

position: fixed;
top : 30vh;
left: 40vw;
`;

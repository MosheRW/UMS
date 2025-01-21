import styled from 'styled-components';
import { Buttons, Version } from '../../style/themes.style';

export const DashboardContainrer = styled.div`
	position: relative;
	display: flex;

	flex-direction: row-reverse;
	/* justify-content: center; */
	gap: 2ch;
	margin: 0.5rem;

	@media (max-width: 1300px) {
		flex-direction: column;
	}
`;

export const Button = styled.div`
	${Buttons}
  justify-content:space-between ;
`;

export const DisplayManagmentConstainer = styled.div<{ $isWide: boolean }>`
	display: flex;
  flex-direction: column;
	/* flex-direction: ${(props) => (props.$isWide ? 'column' : 'row')}; */
	justify-content: ${(props) => (props.$isWide ? 'top' : 'center')};
	align-self: ${(props) => (props.$isWide ? 'top' : 'center')};
`;

export const DisplayButtonsContainerSub = styled.div<{
	$isWide?: boolean;
	$color?: string;
}>`
	display: flex;
	flex-direction: ${(props) => (props.$isWide ? 'column' : 'row')};
	justify-items: center;
	align-items: center;
	width: 100%;

	
`;

export const DisplayButtonsContainer = styled.div<{ $isWide?: boolean }>`
	display: flex;
	/* flex-wrap: wrap; */
	flex-direction: column; /*${(props) => (props.$isWide ? 'column' : 'row')};*/
	justify-items: center;
	align-items: center;
overflow : hidden;
	${(props) => (props.$isWide ? 'width: 40ch;' : 'width: 90vw;')};

	@media (max-width: 1300px) {
		/* width: 80%; */
	}

`;

export const DisplayEditorContainer = styled.div<{ $isWide: boolean }>`
	display: flex;
	flex-direction: column;
	justify-self: center;
	align-items: center;
	width: 40ch;

	@media (max-width: 1300px) {
		width: 33vw;
	}
	/* width: 100%; */
`;

export const DisplayUsersContainerContainer = styled.div`
`

export const DisplayUsersContainer = styled.div<{ $isWide?: boolean }>`
	color: ${({ theme }) => theme.primaryComponent[Version.unChosable].color};
	background-color: ${({ theme }) =>
		theme.primaryComponent[Version.chosen].backgroundColor};
	border: 1px solid
		${({ theme }) => theme.primaryComponent[Version.chosen].borderColor};
	border-radius: 0.5rem;
	padding: 0.25%;
`;

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
export const DisplayUsersBrowserEditionRow = styled.tr<{
	$odd?: boolean;
	$isHeader?: boolean;
}>`
	color: ${({ theme, $odd, $isHeader }) =>
		theme[$odd ? 'secondaryComponentV1' : 'secondaryComponentV2'][
			$isHeader ? Version.chosen : Version.unChosable
		].color};
	background-color: ${({ theme, $odd, $isHeader }) =>
		theme[$odd ? 'secondaryComponentV1' : 'secondaryComponentV2'][
			$isHeader ? Version.chosen : Version.unChosable
		].backgroundColor};
	border-color: ${({ theme, $odd, $isHeader }) =>
		theme[$odd ? 'secondaryComponentV1' : 'secondaryComponentV2'][
			$isHeader ? Version.chosen : Version.unChosable
		].borderColor};

	text-align: ${({ theme }) => theme.alignText};
	border-style: solid;
	border-color: ${({ theme }) => theme.borderColor};
	border-width: ${({ theme }) => theme.borderWidth};
`;

export const DisplayUsersBrowserEditionHeaderCell = styled.th`
cursor: pointer;
&:hover {
    background-color: ${({ theme }) => theme.secondaryComponentV2.notChosen.backgroundColor};
    color: ${({ theme }) => theme.secondaryComponentV2.notChosen.color};
    border-color: ${({ theme }) => theme.secondaryComponentV2.notChosen.borderColor};
    transform: scale(0.95);
  }

  &:active {
    transform: scale(1.05);
    border: 1px solid ${({ theme }) => theme.secondaryComponentV2.chosen.borderColor};
    background-color: ${({ theme }) => theme.secondaryComponentV2.chosen.backgroundColor};
    color: ${({ theme }) => theme.secondaryComponentV2.chosen.color};
  }
`;
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
	color: ${({ theme, $isChoosen }) =>
		theme.secondaryComponentV1[$isChoosen ? Version.chosen : Version.notChosen]
			.color};
	background-color: ${({ theme, $isChoosen }) =>
		theme.secondaryComponentV1[$isChoosen ? Version.chosen : Version.notChosen]
			.backgroundColor};
	border-color: ${({ theme, $isChoosen }) =>
		theme.secondaryComponentV1[$isChoosen ? Version.chosen : Version.notChosen]
			.borderColor};

	display: flex;
	flex-direction: column;
	justify-content: space-between;
	border: 1px solid;
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

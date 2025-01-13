import styled from "styled-components";

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
import styled, { css } from "styled-components";
import {Buttons} from '../../style/themes.style';
export enum Display {
    side,
    popUp,
    fullScreen
}

export const Container = styled.div<{
    $displayVersion?: Display
}>`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: ${({ theme }) => theme.primaryColorTransperent};
width: 90%;

`;

export const Form = styled.form`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: ${({ theme }) => theme.primaryColorTransperent};
border: 1px solid black;
border-radius: 0.5rem;

width: 100%;
`;

const Input = css``;

export const InputText = styled.input.attrs({ type: 'text' })`
${Input}
`;

export const InputEmail = styled.input.attrs({ type: 'email' })`
${Input}
`;

export const InputPassword = styled.input.attrs({ type: 'password' })`
${Input}
`;

export const Label = styled.label`

`;

export const Button = styled.button`
${Buttons}
`;
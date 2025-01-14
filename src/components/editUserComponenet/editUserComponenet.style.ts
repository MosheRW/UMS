import styled, { css } from 'styled-components';
import { Buttons } from '../../style/themes.style';
import {
  InputText as OGInputText,
  InputEmail as OGInputEmail,
  InputPassword as OGInputPassword,
  Label as OGLabel,
} from '../../style/themes.style';
export enum Display {
  side,
  popUp,
  fullScreen,
}

export const Container = styled.div<{
  $displayVersion?: Display;
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
  padding: 0.5rem;
  border-radius: 0.5rem;

  width: 100%;
`;
export const InputText = OGInputText;
export const InputEmail = OGInputEmail;
export const InputPassword = OGInputPassword;

export const Label = OGLabel;
export const Button = styled.button`
  ${Buttons}
  width: 80%;
`;

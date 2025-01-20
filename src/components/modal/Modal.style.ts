import styled from 'styled-components';
import { Buttons } from '../../style/themes.style';

interface Position {
  x: number;
  y: number;
}

export const ModalContainer = styled.div<{ $position?: Position; $fullScreen?: boolean }>`
  position: fixed;
  top: ${(props) => `${props?.$position?.y || 0}`}px;
  left: ${(props) => `${props?.$position?.x || 0}`}px;
  ${(props) => `${!props?.$position && `bottom: 0`}`};
  ${(props) => `${!props?.$position && `right: 0`}`};

  background-color: ${(props) => `${props.$fullScreen ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)'}`};
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  z-index:100;
`;

export const ModalContent = styled.div<{
  $fullScreen?: boolean;
  $height?: string | false;
  $width?: string | false;
  $backroundcolor?: string;
}>`
  background-color: ${(props) => `${props.$backroundcolor ? props.$backroundcolor : 'white'}`};
  padding: ${(props) => `${props.$fullScreen ? '20' : '0'}`}px;
  border-radius: 10px;
  overflow: hidden;
  justify-items: center;

  ${(props) => `${props.$height && `height: ${props.$height}`}`};
  ${(props) => `${props.$width && `width: ${props.$width}`}`};
`;

export const Headline = styled.h2`
  font-size: 1.5em;
  font-weight: bold;
  color: #333;
  margin: 10px;
  text-align: center;
  padding-right: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const SubHeadline = styled.h3`
  color: #333;
  margin: 10px;
  text-align: center;
  padding-right: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Header = styled.div<{ $fullScreen?: boolean }>`
  margin: ${(props) => `${props.$fullScreen ? '10' : '0'}`}px;
`;

export const Footer = styled.div<{ $fullScreen?: boolean }>`
  display: flex;
  justify-content: space-between;
  margin: ${(props) => `${props.$fullScreen ? '10px' : '5px'}`};
`;

export const CloseButton = styled.button`
  ${Buttons}
`;
// export const CloseButton = styled(Button)`
//   background-color: black;
// `;

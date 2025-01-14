import React from 'react';
import ReactDOM from 'react-dom';
import { CloseButton, Footer, Header, Headline, ModalContainer, ModalContent, SubHeadline } from './Modal.style';
// import ButtonProps from '../button/Button';
// import { FixedSizeGrid } from 'react-window';
import ClickOutsideComponent from './ClickOutsideComponent';


export interface ModalProps {
  isOpen: boolean;

  headline?: string | React.ReactNode;
  subHeadline?: string | React.ReactNode;

  onClose: () => void;

  // buttuns?: React.ReactElement<typeof ButtonProps>[];
  // closeButton?: string | React.ReactElement<typeof ButtonProps>;

  children?: React.ReactNode;


  fullScreen?: boolean;

  position?: { x: number, y: number };
  size?: { width: number, height: number };
  closeOnClickOutside?: boolean;
  withoutCloseButton?: boolean;
  bacroundColor?: string
}


/**
 * Modal component
 * 
 * @param {boolean} isOpen - Whether the modal is currently open
 * @param {string | React.ReactNode} headline - The headline to display in the modal header
 * @param {string | React.ReactNode} subHeadline - The subheadline to display in the modal header
 * @param {() => void} onClose - Called when the user clicks the close button
 * @param {React.ReactNode} children - The content to display in the modal
 * @param {React.ReactElement<ButtonProps>[]} buttuns - Buttons to display in the modal's footer
 * @param {string | React.ReactElement<ButtonProps>} closeButton - The close button to display in the modal's footer
 */

export default function Modal({ ...props }: ModalProps) {

  const { isOpen, headline, subHeadline,
    onClose, //buttuns, closeButton,
    children, fullScreen, position, size,
    withoutCloseButton = false, closeOnClickOutside = false } = props;


  function RenderHeadline() {

    switch (typeof headline) {
      case 'string':
        return <><Headline>{headline}</Headline></>;
      case 'object':
        return <>{headline}</>;
      case 'undefined':
      default:
        return <></>;

    }
  }

  function RenderSubHeadline() {

    switch (typeof subHeadline) {
      case 'string':
        return <><SubHeadline>{subHeadline}</SubHeadline></>;
      case 'object':
        return <>{subHeadline}</>;
      case 'undefined':
      default:
        return <></>;

    }
  }

  // function RenderButtons() {

  //   return <>{buttuns?.map((button, index) => (
  //     <button.type {...button.props} key={`button-${index}`} />
  //   ))}</>
  // }

  // function RenderCloseButton() {

  //   if (withoutCloseButton) return <></>

  //   switch (typeof closeButton) {
  //     case 'string':
  //       return <CloseButton  onClick={onClose}>{closeButton}</CloseButton>;
  //     case 'object':
  //       return closeButton;
  //     case 'undefined':
  //     default:
  //       return <CloseButton onClick={onClose}>close</CloseButton>;

  //   }
  // }


  return (
    <>
      {isOpen && ReactDOM.createPortal(
        <ClickOutsideComponent onClickOutside={() => closeOnClickOutside && onClose()}>

          <ModalContainer
            position={position}
            fullScreen={fullScreen}>

            <ModalContent
              fullScreen={fullScreen}
              width={size?.width && `${size?.width}px` || false}
              height={size?.height && `${size?.height}px` || false}
              backroundcolor={props.bacroundColor}>

              <Header>
                <RenderHeadline />
                <RenderSubHeadline />
              </Header>

              {children && children}

              {/* <Footer fullScreen={fullScreen}>
                <RenderButtons />
                <RenderCloseButton />
              </Footer> */}

            </ModalContent>
          </ModalContainer>
        </ClickOutsideComponent>

        ,
        document.body
      )
      }
    </>
  );


};


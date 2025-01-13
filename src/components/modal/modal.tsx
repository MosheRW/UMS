import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { ModalContainer } from "./modal.style";
import ClickOutsideComponent from "./ClickOutsideComponent";

interface Modal {
    children: React.ReactNode;
    display: boolean;
    closeOnClickOutside?: boolean;
    changeDisplay?: (bool: boolean) => void

}

export default function Modal({ ...props }: Modal) {
    const { closeOnClickOutside = false, changeDisplay = (bool: boolean) => { } } = props;

    useEffect(() => {
        console.log(props.display);
    }, [props.display]);

    if (closeOnClickOutside) {
        return <>{props.display && <ClickOutsideComponent
            onClickOutside={() => changeDisplay(false)}>
            {ReactDOM.createPortal(
                <ModalContainer>
                    {props.children}
                </ModalContainer>, document.body)}</ClickOutsideComponent>}</>
    }
    return <>{props.display && ReactDOM.createPortal(
        <ModalContainer>
            {props.children}
        </ModalContainer>, document.body)} </>

}
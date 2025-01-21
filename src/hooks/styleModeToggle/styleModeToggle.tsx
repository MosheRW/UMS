import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import { Button, Container } from './styleModeToggle.style';

interface useStyleModeToggleProps {
    initStyleModeState: boolean;
};

interface useStyleModeToggle {
    styleModeState: boolean;
    StyleModeComponent: () => React.ReactElement;

}

export default function useStyleModeToggle({ ...props }: useStyleModeToggleProps): useStyleModeToggle {

    const [state, setState] = useState<boolean>(props.initStyleModeState);

    function StyleModeComponent(): React.ReactElement {

        return (
            <>
                {ReactDOM.createPortal(
                    <Container><Button onClick={() => setState(!state)}>{state ? "☀️" : "🌜"}</Button></Container>
                    , document.body)}
            </>
        );
    };

    return {
        styleModeState: state,
        StyleModeComponent,
    };
}
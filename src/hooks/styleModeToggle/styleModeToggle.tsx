import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import { Button, Container } from './styleModeToggle.style';

interface useStyleModeToggleProps {
    initStyleModeState: boolean;
};

interface UseStyleModeToggle {
    styleModeState: boolean;
    StyleModeComponent: () => React.ReactElement;

}

export default function useStyleModeToggle({ ...props }: useStyleModeToggleProps): UseStyleModeToggle {

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
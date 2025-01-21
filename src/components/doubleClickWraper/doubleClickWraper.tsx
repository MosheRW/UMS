import React, { useCallback, useState } from "react";
export default function Clickable({
    onClick,
    onDoubleClick,
    children,
}: {
    onClick: () => void;
    onDoubleClick: () => void;
    children: React.ReactElement;
}) {
    const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);

    const handleClick = useCallback(() => {
        if (clickTimeout) clearTimeout(clickTimeout);

        const timeout = setTimeout(() => {
            onClick();
        }, 400);

        setClickTimeout(timeout);
    }, [clickTimeout, onClick]);

    const handleDoubleClick = useCallback(() => {
        if (clickTimeout) {
            clearTimeout(clickTimeout);
            setClickTimeout(null);
        }

        onDoubleClick();
    }, [clickTimeout, onDoubleClick]);
    const additionalProps = { onClick: handleClick, onDoubleClick: handleDoubleClick };

    return (
        React.cloneElement(children, additionalProps)
        
    );
}
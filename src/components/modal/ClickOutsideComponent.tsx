import React, { useEffect, useRef } from "react";

interface ClickOutsideProps {
  onClickOutside: () => void;
  children: React.ReactNode;
}

export default function ClickOutsideComponent({ onClickOutside, children }: ClickOutsideProps) {

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to check if the click is outside of the element
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Unbind the event listener on cleanup
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <><div ref={ref} >
      {children}
    </div></>
  );
}

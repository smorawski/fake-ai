import { useCallback } from "react";
import "./SendButton.css";

type SendButtonProps = {
  onClick: () => void;
  disabled?: boolean;
};

export const SendButton = (props: SendButtonProps) => {
  const handleClick = useCallback(() => {
    if (props.disabled) {
      return;
    }
    props.onClick();
  }, [props]);

  return (
    <div className={`button-wrapper${props.disabled ? " disabled" : ""}`}>
      <div className="triangle" onClick={handleClick} />
    </div>
  );
};

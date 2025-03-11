import { ChangeEventHandler } from "react";
import "./TextInput.css";

type TextInputProps = {
  onChange: ChangeEventHandler;
  value: string;
};

export const TextInput = (props: TextInputProps) => {
  return (
    <textarea
      className="text-input"
      value={props.value}
      onChange={props.onChange}
    />
  );
};

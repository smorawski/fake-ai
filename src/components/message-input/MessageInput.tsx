import { ChangeEvent, useCallback, useState } from "react";
import { TextInput } from "./text-input/TextInput";
import { SendButton } from "./send-button/SendButton";

import "./MessageInput.css";
import { FakeRecorder } from "./fake-recorder/FakeRecorder";

type MessageInputProps = {
  onSend: (message: string) => void;
  onRecording: (seconds: number) => void;
};

export const MessageInput = (props: MessageInputProps) => {
  const [textValue, setTextValue] = useState("");

  const updateTextValue = (event: ChangeEvent) => {
    const target = event.target as HTMLTextAreaElement;
    setTextValue(target.value);
  };

  const sendMessage = useCallback(() => {
    if (!textValue) {
      return;
    }
    props.onSend(textValue);
    setTextValue("");
  }, [textValue, props]);

  const isSendDisabled = !textValue;

  return (
    <div className="message-input">
      <TextInput onChange={updateTextValue} value={textValue} />
      <div className="buttons">
        <FakeRecorder onRecording={props.onRecording} />
        <SendButton onClick={sendMessage} disabled={isSendDisabled} />
      </div>
    </div>
  );
};

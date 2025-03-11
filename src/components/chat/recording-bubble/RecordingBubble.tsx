import { useMemo } from "react";
import { ChatBubble } from "../chat-bubble/ChatBubble";
import recordingImage from "./recording.png";
import { TimeDisplay } from "../../time-display/TimeDisplay";
import "./RecordingBubble.css";

type RecordingBubbleProps = {
  seconds: number;
};

export const RecordingBubble = (props: RecordingBubbleProps) => {
  const content = useMemo(() => {
    return (
      <div className="recording">
        <img width="200px" src={recordingImage} />
        <TimeDisplay seconds={props.seconds} />
      </div>
    );
  }, [props]);
  return <ChatBubble colorType="user" content={content} />;
};

import type { Message, Recording } from "../../hooks/useChat.hook";
import { Avatar } from "../avatar/Avatar";
import { ChatBubble } from "./chat-bubble/ChatBubble";
import "./Chat.css";
import { RecordingBubble } from "./recording-bubble/RecordingBubble";

type ChatProps = {
  messages: Array<Message | Recording>;
};

export const Chat = (props: ChatProps) => {
  return (
    <div className="chat">
      {props.messages.map((message, index) =>
        message.type === "message" ? (
          <ChatBubble
            colorType={message.user}
            key={index}
            content={message.content}
          />
        ) : (
          <RecordingBubble key={index} seconds={message.length} />
        )
      )}
      <div className="avatar-container">
        <Avatar />
      </div>
    </div>
  );
};

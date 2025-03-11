import { useCallback, useEffect, useRef } from "react";
import "./App.css";
import { useChat } from "./hooks/useChat.hook";
import { MessageInput } from "./components/message-input/MessageInput";
import { Chat } from "./components/chat/Chat";
import { useBot } from "./hooks/useBot.hook";

function App() {
  const { messages, addRobotMessage, addUserRecording, addUserMessage } =
    useChat();

  const { getHello, getFact, getAnythingElse } = useBot();

  const chatRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    addRobotMessage(getHello());
  }, []);

  const onUserAction = useCallback(
    (message?: string) => {
      setTimeout(() => {
        addRobotMessage(getFact(message));
        addRobotMessage(getAnythingElse());

        // meeeh timeout. Good enough
        setTimeout(() => {
          if (chatRef.current) {
            chatRef.current.scroll(0, chatRef.current.scrollHeight);
          }
        }, 200);
      }, 2000);
    },
    [addRobotMessage, getFact, getAnythingElse]
  );

  const onMessageSend = useCallback(
    (message: string) => {
      addUserMessage(message);
      onUserAction(message);
    },
    [addUserMessage, onUserAction]
  );

  const onRecording = useCallback(
    (seconds: number) => {
      addUserRecording(seconds);
      onUserAction();
    },
    [addUserRecording, onUserAction]
  );

  return (
    <>
      <div className="app-container">
        <div className="chat-container" ref={chatRef}>
          <Chat messages={messages} />
        </div>
        <div className="footer">
          <div className="message-input-container">
            <MessageInput onSend={onMessageSend} onRecording={onRecording} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

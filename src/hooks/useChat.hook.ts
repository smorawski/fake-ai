import { useCallback, useState } from "react";

export type UserType = "robot" | "user";

export type Message = {
  content: string;
  user: UserType;
  type: "message";
};

export type Recording = {
  length: number;
  user: UserType;
  type: "recording";
};

export const useChat = () => {
  const [messages, setMessages] = useState<Array<Message | Recording>>([]);

  const addUserMessage = useCallback(
    (message: string) => {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          user: "user",
          content: message,
          type: "message",
        },
      ]);
    },
    [setMessages]
  );

  const addUserRecording = useCallback(
    (seconds: number) => {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          user: "user",
          length: seconds,
          type: "recording",
        },
      ]);
    },
    [setMessages]
  );

  const addRobotMessage = useCallback(
    (message: string) => {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          user: "robot",
          content: message,
          type: "message",
        },
      ]);
    },
    [setMessages]
  );

  return {
    messages,
    addUserMessage,
    addUserRecording,
    addRobotMessage,
  };
};

import { useCallback, useState } from "react";
import messagesJson from "../resources/messages.json";

type Messages = {
  hello: string[];
  facts: string[];
  anythingElse: string[];
  custom: { regexp: string; response: string }[];
};

const shuffleArray = <T>(array: Array<T>): Array<T> => {
  const clone = [...array];

  return new Array(clone.length).fill(null).map(() => {
    const index = Math.floor(Math.random() * 100) % clone.length;
    const value = clone[index];
    clone.splice(index, 1);
    return value;
  });
};

const useMessageRepository = (initialMessages: string[]) => {
  const [messagesIndex, setMessagesIndex] = useState(0);
  const [messages] = useState(shuffleArray(initialMessages));

  const getNextMessage = useCallback(() => {
    const message = messages[messagesIndex];

    if (!messages[messagesIndex + 1]) {
      setMessagesIndex(0);
    } else {
      setMessagesIndex(messagesIndex + 1);
    }
    return message;
  }, [messages, messagesIndex, setMessagesIndex]);

  const reset = useCallback(() => {
    setMessagesIndex(0);
  }, [setMessagesIndex]);

  return {
    getNextMessage,
    reset,
  };
};

export const useBot = (messagesParam?: Messages) => {
  const messages: Messages = messagesParam ?? messagesJson;

  const { getNextMessage: getHello } = useMessageRepository(messages.hello);
  const { getNextMessage: getFact } = useMessageRepository(messages.facts);
  const { getNextMessage: getAnythingElse } = useMessageRepository(
    messages.anythingElse
  );

  return {
    getHello,
    getFact,
    getAnythingElse,
  };
};

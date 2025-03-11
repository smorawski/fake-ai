import { ReactNode } from "react";
import "./ChatBubble.css";

export type ColorType = "robot" | "user";

const bgColors: Record<ColorType, string> = {
  robot: "rgba(136, 158, 115, 0.4)",
  user: "rgba(126, 154, 163, 0.2)",
};

const borderColors: Record<ColorType, string> = {
  robot: "rgb(136, 158, 115)",
  user: "rgba(126, 154, 163)",
};

type ChatBubbleProps = {
  colorType: ColorType;
  content: string | ReactNode;
};

export const ChatBubble = ({ content, colorType }: ChatBubbleProps) => {
  const bubbleStyle = {
    borderColor: borderColors[colorType],
    backgroundColor: bgColors[colorType],
  };

  return (
    <div
      className={`chat-bubble ${colorType}`}
      dangerouslySetInnerHTML={
        typeof content === "string" ? { __html: content } : undefined
      }
      style={bubbleStyle}
    >
      {typeof content !== "string" ? content : undefined}
    </div>
  );
};

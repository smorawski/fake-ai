import { useMemo } from "react";

type TimeDisplayProps = {
  seconds: number;
};

const doubleDigit = (value: number): string => {
  return value < 10 ? `0${value}` : value.toString();
};

export const TimeDisplay = (props: TimeDisplayProps) => {
  const { seconds, minutes } = useMemo(() => {
    return {
      minutes: Math.floor(props.seconds / 60),
      seconds: props.seconds % 60,
    };
  }, [props]);
  return (
    <span>
      {doubleDigit(minutes)} : {doubleDigit(seconds)}
    </span>
  );
};

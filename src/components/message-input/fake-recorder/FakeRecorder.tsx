import { useCallback, useEffect, useMemo, useState } from "react";

import "./FakeRecorder.css";
import { TimeDisplay } from "../../time-display/TimeDisplay";
type FakeRecorderProps = {
  onRecording: (seconds: number) => void;
};

const getSeconds = (timeInMs: number) => {
  return parseInt((timeInMs / 1000).toString());
};

export const FakeRecorder = (props: FakeRecorderProps) => {
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [currentSeconds, setCurrentSeconds] = useState(0);

  useEffect(() => {
    let interval;
    if (startTime) {
      interval = setInterval(() => {
        if (startTime) {
          setCurrentSeconds(getSeconds(Date.now() - startTime?.getTime()));
        }
      }, 500);
    }

    return interval ? () => clearInterval(interval) : undefined;
  }, [startTime]);

  const startRecording = useCallback(() => {
    setStartTime(new Date());
  }, [setStartTime]);

  const stopRecording = useCallback(() => {
    if (startTime) {
      props.onRecording(getSeconds(Date.now() - startTime?.getTime()));
    }
    setCurrentSeconds(0);

    setStartTime(null);
  }, [props, startTime, setCurrentSeconds]);

  const isRecording = useMemo(() => {
    return startTime;
  }, [startTime]);

  const onPress = useCallback(() => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  }, [isRecording, stopRecording, startRecording]);

  return (
    <div className="fake-recorder">
      {isRecording && <TimeDisplay seconds={currentSeconds} />}
      <div className="record-border" onClick={onPress}>
        <div className={`record-inside${isRecording ? " active" : ""}`}></div>
      </div>
    </div>
  );
};

import * as React from "react";
import useRecorder from "./js/useRecorder";

const RecordView = () => {
  const [audioURL, isRecording, startRecording, stopRecording] = useRecorder();
    
  return (
    <div className="record-view">
      <div className="">
        <audio src={audioURL} controls />
      </div>
      <div className="">
        <button onClick={startRecording} disabled={isRecording}>
          start recording
        </button>
        <button onClick={stopRecording} disabled={!isRecording}>
          stop recording
        </button>
      </div>
    </div>
  );
}


export default RecordView;

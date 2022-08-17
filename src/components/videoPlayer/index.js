import React, { useState, createContext, useEffect } from "react";
import VideoScreen from "./videoScreen";
import VideoTimeline from "./videoTimeline";

export const VideoContext = createContext();

const VideoContextProvider = ({ children }) => {
  const onTimeUpdate = (e) => {
    const currentTime = e.target?.currentTime;
    const duration = e.target?.duration;
    updateVideoControls("status", "currentTime", currentTime);
    updateVideoControls("status", "duration", duration);
  };

  const [videoControls, setVideoControls] = useState({
    status: {
      currentTime: null,
      duration: null,
      isPlaying: null,
      volume: null,
    },
    actions: {
      play: () => {},
      pause: () => {},
      setVolume: () => {},
      goTo: () => {},
    },
    events: {
      timeUpdate: onTimeUpdate,
      ended: () => {},
    },
  });
  const [videoData, setVideoData] = useState({});
  // useEffect(() => {
  //   console.log(videoControls);
  // }, [videoControls]);
  //helper
  const updateVideoControls = (type, statusName, value) => {
    setVideoControls((videoControls) => {
      const cv = { ...videoControls };
      cv[type][statusName] = value;
      return cv;
    });
  };

  return (
    <VideoContext.Provider
      value={{
        videoControls: videoControls,
        setVideoControls: setVideoControls,
        updateVideoControls: updateVideoControls,
        videoData: videoData,
        setVideoData: setVideoData,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

const VideoPlayer = {
  VideoScreen,
  VideoTimeline,
  VideoContextProvider,
};
export default VideoPlayer;

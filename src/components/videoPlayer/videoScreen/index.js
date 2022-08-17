import React, { useEffect, useRef, useContext } from "react";
import * as styles from "./index.module.scss";
import MuxVideo from "@mux/mux-video-react";
import { VideoContext } from "../";

const VideoScreen = () => {
  const videoRef = useRef();
  const videoContext = useContext(VideoContext);
  const { videoControls, videoData, updateVideoControls } = videoContext;

  const { dataVideoPlaybackId, dataTitle, muxUserId } = videoData;

  const play = () => {
    videoRef.current.play();
  };
  const pause = () => {
    videoRef.current.pause();
  };
  const goTo = (time) => {
    console.log("goTo");
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };
  const setVolume = (volume) => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      updateVideoControls("status", "volume", volume);
    }
  };

  useEffect(() => {
    updateVideoControls("actions", "play", play);
    updateVideoControls("actions", "pause", pause);
    updateVideoControls("actions", "goTo", goTo);
    updateVideoControls("actions", "setVolume", setVolume);
  }, []);

  const onPlaying = () => {
    updateVideoControls("status", "isPlaying", true);
    console.log(videoRef.current.volume);
  };
  const onPause = () => {
    updateVideoControls("status", "isPlaying", false);
  };
  if (videoData === {}) return null;
  return (
    <MuxVideo
      ref={videoRef}
      className={styles.container}
      playbackId={dataVideoPlaybackId}
      metadata={{
        video_title: dataTitle,
        viewer_user_id: muxUserId,
      }}
      controls={false}
      streamType="on-demand"
      autoPlay="any"
      onTimeUpdate={videoControls.events.timeUpdate}
      onEnded={videoControls.events.ended}
      onPlaying={onPlaying}
      onPause={onPause}
    />
  );
};

export default VideoScreen;

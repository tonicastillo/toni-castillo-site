import React, { useEffect, useRef, useContext } from "react";
import * as styles from "./index.module.scss";
import MuxVideo from "@mux/mux-video-react";
import { VideoContext } from "../";

const VideoScreen = () => {
  const videoRef = useRef();
  const videoContext = useContext(VideoContext);
  const { videoControls, videoData, updateVideoControls } = videoContext;

  const { dataVideoPlaybackId, dataTitle, muxUserId, bgColor } = videoData;

  const play = () => {
    videoRef.current.play();
  };
  const pause = () => {
    videoRef.current.pause();
  };
  const goTo = (time) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      updateVideoControls("status", "currentTime", time);
    }
  };
  const setVolume = (volume) => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      if (volume > 0) {
        videoRef.current.muted = false;
      } else {
        videoRef.current.muted = true;
      }
      updateVideoControls("status", "volume", volume);
    }
  };

  const onPlaying = () => {
    updateVideoControls("status", "isPlaying", true);
    updateVideoControls("status", "volume", videoRef.current.muted ? 0 : 1);
  };
  const onPause = () => {
    updateVideoControls("status", "isPlaying", false);
  };

  const onPlay = () => {
    updateVideoControls("status", "isFirstPlaying", true);
  };

  const onSeeking = () => {
    updateVideoControls("status", "isSeeking", true);
  };

  const onSeeked = () => {
    updateVideoControls("status", "isSeeking", false);
  };

  useEffect(() => {
    updateVideoControls("actions", "play", play);
    updateVideoControls("actions", "pause", pause);
    updateVideoControls("actions", "goTo", goTo);
    updateVideoControls("actions", "setVolume", setVolume);
  }, []);

  if (videoData === {}) return null;
  return (
    <MuxVideo
      ref={videoRef}
      style={{
        "--bg-video-color": bgColor ? bgColor : "#000000",
      }}
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
      onPlay={onPlay}
      onSeeking={onSeeking}
      onSeeked={onSeeked}
    />
  );
};

export default VideoScreen;

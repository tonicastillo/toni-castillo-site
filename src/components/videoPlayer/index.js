import React, { useEffect, useRef } from "react";
import * as styles from "./index.module.scss";
import classNames from "classnames";
import MuxVideo from "@mux/mux-video-react";

const VideoPlayer = ({ videoData, onTimeUpdate, onEnded, controls }) => {
  const { dataVideoPlaybackId, dataTitle, muxUserId } = videoData;
  const [videoControls, setVideoControls] = controls;

  const videoRef = useRef();

  //helper
  const setVideoStatus = (statusName, value) => {
    setVideoControls((videoControls) => {
      const cv = { ...videoControls };
      cv.status[statusName] = value;
      return cv;
    });
  };
  const play = () => {
    console.log("play");
    videoRef.current.play();
  };
  const pause = () => {
    console.log("pause");
    videoRef.current.pause();
  };
  useEffect(() => {
    setVideoControls((videoControls) => {
      const cv = { ...videoControls };
      cv.actions.play = play;
      cv.actions.pause = pause;
      return cv;
    });
  }, []);

  const onPlaying = () => {
    setVideoStatus("isPlaying", true);
  };
  const onPause = () => {
    setVideoStatus("isPlaying", false);
  };
  return (
    <MuxVideo
      ref={videoRef}
      className={styles.container}
      playbackId={dataVideoPlaybackId}
      metadata={{
        video_title: dataTitle,
        viewer_user_id: muxUserId,
      }}
      streamType="on-demand"
      controls
      autoPlay="any"
      onTimeUpdate={onTimeUpdate}
      onEnded={onEnded}
      onPlaying={onPlaying}
      onPause={onPause}
    />
  );
};

export default VideoPlayer;

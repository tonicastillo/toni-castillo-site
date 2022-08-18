import React, { useEffect, useState, useContext } from "react";
import * as styles from "./index.module.scss";
import classNames from "classnames";
import { VideoContext } from "../";

const NoiseTransition = () => {
  const [opacity, setOpacity] = useState(0);
  const videoContext = useContext(VideoContext);
  const { videoControls } = videoContext;

  useEffect(() => {
    let isStarting = false;
    let isEnding = false;
    const transitionTime = 2;
    if (
      videoControls.status.isSeeking ||
      !videoControls.status.isFirstPlaying
    ) {
      setOpacity(1);
    } else {
      if (videoControls.status.currentTime < transitionTime) {
        isStarting = true;
      }
      if (
        videoControls.status.duration - videoControls.status.currentTime <
        transitionTime
      ) {
        isEnding = true;
      }
      if (isStarting || isEnding) {
        // const position = videoControls.status.currentTime / videoControls.status.duration;
        if (isStarting) {
          const isVis =
            Math.random() < videoControls.status.currentTime / transitionTime;
          setOpacity(isVis ? 1 : 0.02);
        }
        if (isEnding) {
          // setIsVisible(Math.random() > isEnding);
        }
      } else {
        const transitionOpacityTime = 6;
        if (
          videoControls.status.currentTime < transitionOpacityTime &&
          videoControls.status.currentTime >= transitionTime
        ) {
          const op =
            0.2 *
            (1 -
              (videoControls.status.currentTime - transitionTime) /
                (transitionOpacityTime - transitionTime));
          setOpacity(op);
        } else {
          setOpacity(0);
        }
      }
    }
  }, [videoControls.status.currentTime, videoControls.status.duration]);
  if (opacity === 0) return null;
  return (
    <div
      className={classNames(styles.container)}
      style={{
        "--opacity": opacity,
      }}
    >
      <video muted autoPlay loop>
        <source src="/videos/ruido1.webm" type="video/webm" />
        <source src="/videos/ruido1.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default NoiseTransition;

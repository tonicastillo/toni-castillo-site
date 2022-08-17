import React, { useEffect, useState } from "react";
import * as styles from "./index.module.scss";
import classNames from "classnames";

const NoiseTransition = ({ videoCurrentTime, videoDuration }) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    let isStarting = false;
    let isEnding = false;
    const transitionTime = 2;
    if (videoCurrentTime < transitionTime) {
      isStarting = true;
    }
    if (videoDuration - videoCurrentTime < transitionTime) {
      isEnding = true;
    }
    if (isStarting || isEnding) {
      // const position = videoCurrentTime / videoDuration;
      if (isStarting) {
        const isVis = Math.random() < videoCurrentTime / transitionTime;
        setOpacity(isVis ? 1 : 0.02);
      }
      if (isEnding) {
        // setIsVisible(Math.random() > isEnding);
      }
    } else {
      const transitionOpacityTime = 6;
      if (
        videoCurrentTime < transitionOpacityTime &&
        videoCurrentTime >= transitionTime
      ) {
        const op =
          0.2 *
          (1 -
            (videoCurrentTime - transitionTime) /
              (transitionOpacityTime - transitionTime));
        setOpacity(op);
      } else {
        setOpacity(0);
      }
    }
  }, [videoCurrentTime, videoDuration]);
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

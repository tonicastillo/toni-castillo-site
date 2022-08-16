import * as React from "react";
import * as styles from "./index.module.scss";
import classNames from "classnames";
// import GeneralContextProvider from "../../contexts/generalContext";

const VideoTimeline = ({ videoCurrentTime, videoDuration, controls }) => {
  const [videoControls, setVideoControls] = controls;
  return (
    <div className={classNames(styles.container, styles.open)}>
      {videoDuration ? (
        <div className={styles.contain}>
          <div>
            {videoControls.status.isPlaying ? (
              <div onClick={videoControls.actions.pause}>PAUSE</div>
            ) : (
              <div onClick={videoControls.actions.play}>PLAY</div>
            )}
          </div>
          <div className={styles.timeline}>
            <div className={styles.hLine} />
            <div className={styles.sliderContainer}>
              <div
                style={{
                  "--posx": `${(videoCurrentTime * 100) / videoDuration}%`,
                }}
                className={styles.slider}
              />
            </div>
          </div>
          <div className={styles.numbers}>
            <span>{toMMSS(videoCurrentTime)}</span> /{" "}
            <span>{toMMSS(videoDuration)}</span>
          </div>{" "}
        </div>
      ) : (
        <div className={styles.contain}>Loading...</div>
      )}
    </div>
  );
};

const toMMSS = (seconds) => {
  return new Date(seconds * 1000).toISOString().slice(14, 19);
};

export default VideoTimeline;

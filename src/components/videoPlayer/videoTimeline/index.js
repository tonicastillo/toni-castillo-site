import React, { useContext } from "react";
import * as styles from "./index.module.scss";
import classNames from "classnames";
import ReactSlider from "react-slider";
import { VideoContext } from "../index";
import SpeakerIcon from "./speakerIcon";

const VideoTimeline = () => {
  const videoContext = useContext(VideoContext);
  const { videoControls } = videoContext;
  return (
    <div className={classNames(styles.container, styles.open)}>
      {videoControls.status.duration ? (
        <div className={styles.contain}>
          <div className={styles.playPause}>
            {videoControls.status.isPlaying ? (
              <div onClick={videoControls.actions.pause}>PAUSE</div>
            ) : (
              <div onClick={videoControls.actions.play}>PLAY</div>
            )}
          </div>
          <TimeDrag
            currentTime={videoControls.status.currentTime}
            duration={videoControls.status.duration}
            goTo={videoControls.actions.goTo}
          />
          <div className={styles.volume}>
            <div
              onClick={() => {
                console.log(videoControls.status.volume);
                videoControls.actions.setVolume(
                  videoControls.status.volume === 0 ? 1 : 0
                );
              }}
              className={styles.speakerContainer}
            >
              <SpeakerIcon
                color="#ffffff"
                size="2em"
                vol={videoControls.status.volume === 1 ? 3 : 0}
              />
            </div>
          </div>
          <div className={styles.numbers}>
            <span>{toMMSS(videoControls.status.currentTime)}</span> /{" "}
            <span>{toMMSS(videoControls.status.duration)}</span>
          </div>{" "}
        </div>
      ) : (
        <div className={styles.contain}>
          <div className={styles.loading}>Loading...</div>
        </div>
      )}
    </div>
  );
};
const TimeDrag = ({ currentTime, duration, goTo }) => {
  return (
    <div className={styles.timeline}>
      <div className={styles.sliderContainer}>
        <ReactSlider
          defaultValue={0}
          value={currentTime}
          min={0}
          max={duration}
          className={styles.sliderContent}
          thumbClassName={styles.slider}
          trackClassName={styles.hLine}
          renderThumb={(props, state) => <div {...props} />}
          onChange={(time) => goTo(time)}
        />
      </div>
    </div>
  );
};
//todo
// const VolumeControls = () => {
//   return (
//     <div>
//       <VolumeDrag volume={0} setVolume={(n) => console.log("vtttolumen ", n)} />
//     </div>
//   );
// };

// const VolumeDrag = ({ volume, setVolume }) => {
//   return (
//     <div className={styles.timeline}>
//       <div className={styles.sliderContainer}>
//         <ReactSlider
//           defaultValue={7}
//           value={volume}
//           min={0}
//           max={10}
//           className={styles.sliderContent}
//           thumbClassName={styles.slider}
//           trackClassName={styles.hLine}
//           renderThumb={(props, state) => <div {...props} />}
//           // onChange={(time) => goTo(time)}
//         />
//       </div>
//     </div>
//   );
// };

const toMMSS = (seconds) => {
  return new Date(seconds * 1000).toISOString().slice(14, 19);
};

export default VideoTimeline;

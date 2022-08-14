import * as React from "react";
import * as styles from "./index.module.scss";
import classNames from "classnames";

const NoiseTransition = ({ isVisible }) => {
  return (
    <video muted autoplay className={styles.container}>

      <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
              type="video/webm">

        <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
                type="video/mp4">

          Sorry, your browser doesn't support embedded videos.
    </video>
  );
};

const toMMSS = (seconds) => {
  return new Date(seconds * 1000).toISOString().slice(14, 19);
};

export default NoiseTransition;

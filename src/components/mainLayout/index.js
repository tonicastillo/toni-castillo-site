import * as React from "react";
import "./reset.scss";
import "./body.scss";
import * as styles from "./index.module.scss";
// import { useTriggerTransition } from "gatsby-plugin-transition-link";
// import { tTransitionProps } from "../tLink";
import GeneralContextProvider from "../../contexts/generalContext";
import NavPanel from "../navPanel";
import VideoPlayer from "../videoPlayer";

const Layout = (props) => {
  // const triggerTransition = useTriggerTransition(tTransitionProps);
  const { children, data } = props;
  const projects = data?.allNotion.nodes;
  return (
    <VideoPlayer.VideoContextProvider>
      <GeneralContextProvider>
        <NavPanel projects={projects} />
        <div className={styles.templateContent}>{children}</div>
        <div className={styles.video}>
          <VideoPlayer.NoiseTransition />
          <VideoPlayer.VideoScreen />
        </div>
      </GeneralContextProvider>
    </VideoPlayer.VideoContextProvider>
  );
};
export default Layout;

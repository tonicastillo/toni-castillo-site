import * as React from "react";
import "./reset.scss";
import "./body.scss";
import * as styles from "./index.module.scss";
import { useTriggerTransition } from "gatsby-plugin-transition-link";
import { tTransitionProps } from "../tLink";
import { goNextProject } from "../../helpers/goNextProject";
import GeneralContextProvider from "../../contexts/generalContext";

const Layout = (props) => {
  const triggerTransition = useTriggerTransition(tTransitionProps);
  const { children, data } = props;
  const projects = data?.allNotion.nodes;
  return (
    <GeneralContextProvider>
      <div className={styles.mainLayout}>
        <TvDisplay projects={projects} triggerTransition={triggerTransition} />
        {children}
      </div>
    </GeneralContextProvider>
  );
};

const TvDisplay = (props) => {
  const { projects, triggerTransition } = props;
  return (
    <div
      className={styles.tvDisplayContainer}
      onClick={() =>
        goNextProject({
          projects: projects,
          triggerTransition: triggerTransition,
        })
      }
    >
      Next Project
    </div>
  );
};

export default Layout;

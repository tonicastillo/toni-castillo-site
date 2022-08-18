import React, { useContext } from "react";
import TransitionLink from "gatsby-plugin-transition-link";
import { GeneralContext } from "../contexts/generalContext";

export const tTransitionProps = {
  exit: { length: 1 },
  entry: { length: 1, delay: 0.8 },
};

const TLink = (props) => {
  const generalContext = useContext(GeneralContext);
  const { setIsNavPanelOpen } = generalContext;

  return (
    <TransitionLink
      onClick={() => setIsNavPanelOpen(false)}
      {...props}
      {...tTransitionProps}
    />
  );
};
export default TLink;

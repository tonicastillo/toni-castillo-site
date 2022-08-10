import React from "react";
import TransitionLink from "gatsby-plugin-transition-link";

const transitionProps = {
  exit: { length: 1 },
  entry: { length: 1, delay: 0.8 },
};

const TLink = (props) => {
  return <TransitionLink {...props} {...transitionProps} />;
};
export default TLink;

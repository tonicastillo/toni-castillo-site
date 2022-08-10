import * as React from "react";
import "./reset.scss";
import * as styles from "./index.module.scss";

const Layout = (props) => {
  const { children } = props;
  // console.log(props);
  return <div className={styles.mainLayout}>{children}</div>;
};

export default Layout;

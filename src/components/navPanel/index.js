import React, { useContext, useEffect, useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import * as styles from "./index.module.scss";
import classNames from "classnames";
import WhiteNoise from "./whiteNoise";
import TLink from "../tLink";
import { GeneralContext } from "../../contexts/generalContext";

const NavPanel = () => {
  const data = useStaticQuery(graphql`
    query menuQuery {
      allNotion(
        filter: {
          properties: { Published: { value: { name: { eq: "Done" } } } }
        }
        sort: { order: DESC, fields: properties___dataDate___value }
      ) {
        nodes {
          id
          title
          properties {
            dataTitle {
              value
            }
            dataDate {
              value
            }
          }
        }
      }
    }
  `);
  const projects = data?.allNotion.nodes;
  const generalContext = useContext(GeneralContext);
  const { isNavPanelOpen, setIsNavPanelOpen } = generalContext;
  return (
    <>
      <div
        onClick={() => setIsNavPanelOpen(!isNavPanelOpen)}
        className={classNames(styles.infoButton)}
      >
        {isNavPanelOpen ? "-" : "+"}info
      </div>
      <div
        className={classNames(styles.container, {
          [styles.open]: isNavPanelOpen,
        })}
      >
        <div className={styles.contain}>
          <div className={styles.texts}>
            <h1>Toni Castillo</h1>
            <h2>Fullstack web developer, specialising in visual experience.</h2>
            <p>
              I also do motion graphics, art direction and video editing,
              interactive installations, and a lot of other nonsense.
            </p>
          </div>
          <div className={styles.projects}>
            <ul className={styles.projectList}>
              {projects.map((p, idx) => {
                return (
                  <li key={p.id}>
                    <TLink
                      to={`/${p.title}`}
                      title={`Project ${p.properties.dataTitle.value}`}
                    >
                      {`${
                        p.properties.dataDate?.value
                          ? "#" + p.properties.dataDate?.value + " "
                          : ""
                      }${p.properties.dataTitle?.value}${
                        idx + 1 < projects.length ? ", " : ""
                      }`}
                    </TLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className={styles.background}>
          <WhiteNoise ratio={0.1} darkness={150} whiteness={200} />
        </div>
      </div>
    </>
  );
};

export default NavPanel;

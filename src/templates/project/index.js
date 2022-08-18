import React, { useState, useContext, useEffect } from "react";
import classNames from "classnames";
import * as styles from "./index.module.scss";
import { graphql } from "gatsby";
import VideoPlayer, { VideoContext } from "../../components/videoPlayer";

import {
  TransitionState,
  useTriggerTransition,
} from "gatsby-plugin-transition-link";
import { goNextProject } from "../../helpers/goNextProject";
import { tTransitionProps } from "../../components/tLink";
import { GeneralContext } from "../../contexts/generalContext";

export const query = graphql`
  query ($projectSlug: String!) {
    site {
      siteMetadata {
        muxUserId
      }
    }
    allNotion(
      filter: { properties: { Published: { value: { name: { eq: "Done" } } } } }
    ) {
      nodes {
        id
        title
        properties {
          dataVideoPlaybackId {
            value
          }
          dataTitle {
            value
          }
        }
      }
    }
    notion(title: { eq: $projectSlug }) {
      properties {
        ambito {
          value {
            name
          }
        }
        dataVideoPlaybackId {
          value
        }
        dataDate {
          value
        }
        dataTitle {
          value
        }
        dataSubtitle {
          value
        }
        clientTitle {
          value {
            string
          }
        }
        clientUrl {
          value {
            string
          }
        }
        Published {
          value {
            name
          }
        }
        dataTechnology {
          value {
            name
          }
        }
        dataLanguajes {
          value {
            name
          }
        }
        creditsTitle {
          value {
            string
          }
        }
        creditsUrl {
          value {
            string
          }
        }
      }
    }
  }
`;

const ProjectTemplate = ({ data }) => {
  const generalContext = useContext(GeneralContext);
  const { isProjectInfoOpen } = generalContext;
  const videoContext = useContext(VideoContext);
  const { videoControls, setVideoData, updateVideoControls } = videoContext;

  const triggerTransition = useTriggerTransition(tTransitionProps);
  const projects = data?.allNotion.nodes;

  const project = data?.notion;

  const muxUserId = data.site.siteMetadata.muxUserId;

  const dataVideoPlaybackId = project.properties.dataVideoPlaybackId?.value;
  const dataDate = project.properties.dataDate?.value;
  const dataTitle = project.properties.dataTitle?.value;
  const dataSubtitle = project.properties.dataSubtitle?.value;
  const clientTitle = project.properties.clientTitle?.value?.string;
  const clientUrl = project.properties.clientUrl?.value?.string;
  const creditsTitle = project.properties.creditsTitle?.value?.string;
  const creditsUrl = project.properties.creditsUrl?.value?.string;
  // const isPublished = project.properties.Published?.value?.name === "Done";

  const dataAmbitos = project.properties.ambito?.value;
  const dataTechnology = project.properties.dataTechnology?.value;
  const dataLanguajes = project.properties.dataLanguajes?.value;

  const dataTags = [...dataAmbitos, ...dataTechnology, ...dataLanguajes];

  const onVideoEnded = () => {
    console.log("onVideoEnded");
    goNextProject({
      projects: projects,
      triggerTransition: triggerTransition,
    });
  };

  const initVideoData = () => {
    setVideoData({
      dataVideoPlaybackId: dataVideoPlaybackId,
      dataTitle: dataTitle,
      muxUserId: muxUserId,
    });
  };

  useEffect(() => {
    initVideoData();
    updateVideoControls("events", "ended", onVideoEnded);
  }, []);
  return (
    <>
      {/*<Seo
        title={pageData.seo_title}
        image={pageData.seo_image.url}
        description={pageData.seo_description}
        langs={pageData.langs}
        esNoIndexable={pageData.seo_no_indexable}
      />*/}
      <TransitionState>
        {({ transitionStatus, exit, entry }) => {
          return (
            <main className={styles.main}>
              <div className={styles.panel}>
                <div
                  className={classNames(styles.projectInfo, {
                    [styles.open]: isProjectInfoOpen,
                  })}
                >
                  <div className={classNames(styles.titles, styles.tTitle)}>
                    {dataDate && (
                      <span className={styles.date}>#{dataDate}</span>
                    )}{" "}
                    <h2>{dataTitle}</h2>
                  </div>
                  <div className={classNames(styles.titles)}>
                    <h1>{dataSubtitle}</h1>
                  </div>
                  {clientTitle && (
                    <div className={classNames(styles.titles, styles.tCredits)}>
                      {clientUrl ? (
                        <span>
                          For:{" "}
                          <a href={clientUrl} target="_blank" rel="noreferrer">
                            {clientTitle}
                          </a>
                        </span>
                      ) : (
                        <span>For: {clientTitle}</span>
                      )}
                    </div>
                  )}
                  {creditsTitle && (
                    <div className={classNames(styles.titles, styles.tCredits)}>
                      {creditsUrl ? (
                        <span>
                          With:{" "}
                          <a href={creditsUrl} target="_blank" rel="noreferrer">
                            {creditsTitle}
                          </a>
                        </span>
                      ) : (
                        <span>With: {creditsTitle}</span>
                      )}
                    </div>
                  )}
                  <div className={classNames(styles.titles, styles.tTags)}>
                    {dataTags.map((tag, idx) => {
                      const name = "#" + tag.name.replaceAll(" ", "_");
                      const isLast = idx + 1 === dataTags.length;
                      return (
                        <span key={idx}>
                          {name}
                          {!isLast && ", "}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <VideoPlayer.VideoTimeline />
              </div>
            </main>
          );
        }}
      </TransitionState>
    </>
  );
};

export default ProjectTemplate;

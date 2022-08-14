import React, { useState, useEffect, useContext } from "react";
import classNames from "classnames";

import * as styles from "./index.module.scss";
import "./muxPlayer.css";
import { graphql } from "gatsby";
import MuxPlayer from "@mux/mux-player-react";
import {
  TransitionState,
  useTriggerTransition,
} from "gatsby-plugin-transition-link";
import { goNextProject } from "../../helpers/goNextProject";
import { tTransitionProps } from "../../components/tLink";
import { GeneralContext } from "../../contexts/generalContext";

import VideoTimeline from "../../components/videoTimeline";

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
        dataCliente {
          value
        }

        Published {
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

  const triggerTransition = useTriggerTransition(tTransitionProps);
  const projects = data?.allNotion.nodes;

  const [isStarting, setIsStarting] = useState();
  const [isEnding, setIsEnding] = useState();

  const project = data?.notion;

  const muxUserId = data.site.siteMetadata.muxUserId;

  const dataVideoPlaybackId = project.properties.dataVideoPlaybackId?.value;
  const dataDate = project.properties.dataDate?.value;
  const dataTitle = project.properties.dataTitle?.value;
  const dataSubtitle = project.properties.dataSubtitle?.value;
  const dataCliente = project.properties.dataCliente?.value;
  const creditsTitle = project.properties.creditsTitle?.value?.string;
  const creditsUrl = project.properties.creditsUrl?.value?.string;
  const isPublished = project.properties.Published?.value?.name === "Done";
  const dataLanguajes = project.properties.dataLanguajes?.value?.name;

  //   _  _  __  ____  ____  __     ____  _  _  ____  __ _  ____  ____
  //  / )( \(  )(    \(  __)/  \   (  __)/ )( \(  __)(  ( \(_  _)/ ___)
  //  \ \/ / )(  ) D ( ) _)(  O )   ) _) \ \/ / ) _) /    /  )(  \___ \
  //   \__/ (__)(____/(____)\__/   (____) \__/ (____)\_)__) (__) (____/

  const [videoCurrentTime, setVideoCurrentTime] = useState(null);
  const [videoDuration, setVideoDuration] = useState(null);

  const onVideoTimeUpdate = (e) => {
    const currentTime = e.target?.media?.currentTime;
    const duration = e.target?.media?.duration;
    if (currentTime < 3) {
      setIsStarting(true);
    } else {
      setIsStarting(false);
    }
    if (duration - currentTime < 3) {
      setIsEnding(true);
    } else {
      setIsEnding(false);
    }
    setVideoCurrentTime(currentTime);
    setVideoDuration(duration);
  };

  const onVideoEnded = () => {
    goNextProject({
      projects: projects,
      triggerTransition: triggerTransition,
    });
  };

  useEffect(() => {
    console.log("Esta empezando? ", isStarting);
  }, [isStarting]);
  useEffect(() => {
    console.log("Esta acabando? ", isEnding);
  }, [isEnding]);

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
              <div
                className={classNames(styles.projectInfo, {
                  [styles.open]: isProjectInfoOpen,
                })}
              >
                <div className={classNames(styles.titles, styles.tTitle)}>
                  {dataDate && <span className={styles.date}>#{dataDate}</span>}{" "}
                  <h2>{dataTitle}</h2>
                </div>
                <div className={classNames(styles.titles)}>
                  <h1>{dataSubtitle}</h1>
                </div>
                {dataCliente && (
                  <div className={classNames(styles.titles)}>
                    <span>For: {dataCliente}</span>
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

                <div className={classNames(styles.titles)}>
                  <span>{isPublished}</span>
                </div>
                <div className={classNames(styles.titles)}>
                  <span>{dataLanguajes}</span>
                </div>
              </div>
              <VideoTimeline
                videoCurrentTime={videoCurrentTime}
                videoDuration={videoDuration}
              />
              <MuxPlayer
                streamType="on-demand"
                playbackId={dataVideoPlaybackId}
                metadata={{
                  video_title: dataTitle,
                  video_user_id: muxUserId,
                }}
                // loop={true}
                autoplay="any"
                // controls={false}
                mure={true}
                className="muxVideoPlayer"
                onTimeUpdate={onVideoTimeUpdate}
                onEnded={onVideoEnded}
              />
            </main>
          );
        }}
      </TransitionState>
    </>
  );
};

export default ProjectTemplate;

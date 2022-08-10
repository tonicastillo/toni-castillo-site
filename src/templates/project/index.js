import * as React from "react";
import * as styles from "./index.module.scss";
import { graphql } from "gatsby";
import MuxPlayer from "@mux/mux-player-react";
import { TransitionState } from "gatsby-plugin-transition-link";

export const query = graphql`
  query ($projectSlug: String!) {
    site {
      siteMetadata {
        muxUserId
      }
    }
    notion(title: { eq: $projectSlug }) {
      properties {
        dataVideoPlaybackId {
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
        ambito {
          value {
            name
          }
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
      }
    }
  }
`;
const IndexPage = ({ data }) => {
  const project = data?.notion;

  const muxUserId = data.site.siteMetadata.muxUserId;

  const dataVideoPlaybackId = project.properties.dataVideoPlaybackId?.value;
  const dataTitle = project.properties.dataTitle?.value;
  const dataSubtitle = project.properties.dataSubtitle?.value;
  const dataCliente = project.properties.dataCliente?.value;
  const creditsUrl = project.properties.creditsUrl?.value;
  const ambito = project.properties.ambito?.value?.name;
  const isPublished = project.properties.Published?.value?.name === "Done";
  const dataLanguajes = project.properties.dataLanguajes?.value?.name;

  console.log("dataVideoPlaybackId: ", dataVideoPlaybackId);
  console.log("dataTitle: ", dataTitle);
  console.log("dataSubtitle: ", dataSubtitle);
  console.log("dataCliente: ", dataCliente);
  // console.log("creditsUrl: ", creditsUrl);
  console.log("ambito: ", ambito);
  console.log("isPublished: ", isPublished);
  console.log("dataLanguajes: ", dataLanguajes);

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
              <MuxPlayer
                streamType="on-demand"
                playbackId={dataVideoPlaybackId}
                metadata={{
                  video_title: dataTitle,
                  video_user_id: muxUserId,
                }}
                autoplay="any"
                className={styles.videoPlayer}
              />{" "}
            </main>
          );
        }}
      </TransitionState>
    </>
  );
};

export default IndexPage;

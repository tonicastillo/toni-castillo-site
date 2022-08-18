import * as React from "react";
import * as styles from "./index.module.scss";
import { graphql } from "gatsby";
import { TransitionState } from "gatsby-plugin-transition-link";
import TLink from "../components/tLink";

export const query = graphql`
  query MainPageQuery {
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
  }
`;
const IndexPage = ({ data }) => {
  const projects = data?.allNotion.nodes;

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
              <ul>
                {projects &&
                  projects.map((project) => {
                    const id = project.id;
                    const title = project.title;
                    const dataTitle =
                      project.properties.dataTitle?.value || title;
                    return (
                      <li key={id}>
                        <TLink to={`${title}`}>{dataTitle}</TLink>
                        {/*                {project.properties?.dataVideoPlaybackId?.value && (
                  <>
                    <h4>{project.properties.dataVideoPlaybackId.value}</h4>
                    <h4>{project.title}</h4>
                    <h4>{data.site.siteMetadata.muxUserId}</h4>
                  </>
                )}*/}
                        {/*{project.properties?.dataVideoPlaybackId?.value && (*/}
                        {/*  <MuxPlayer*/}
                        {/*    streamType="on-demand"*/}
                        {/*    playbackId={project.properties.dataVideoPlaybackId.value}*/}
                        {/*    metadata={{*/}
                        {/*      video_title: project.title,*/}
                        {/*      video_user_id: muxUserId,*/}
                        {/*    }}*/}
                        {/*  />*/}
                        {/*)}*/}
                      </li>
                    );
                  })}
              </ul>
            </main>
          );
        }}
      </TransitionState>
    </>
  );
};

export default IndexPage;

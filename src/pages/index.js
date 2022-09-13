import * as React from "react";
import * as styles from "./index.module.scss";
import { graphql } from "gatsby";
import { TransitionState } from "gatsby-plugin-transition-link";
import TLink from "../components/tLink";
import { getNextProject } from "../helpers/goNextProject";

export const query = graphql`
  query MainPageQuery {
    site {
      siteMetadata {
        muxUserId
      }
    }
    allNotion(
      filter: { properties: { Published: { value: { name: { eq: "Done" } } } } }
      sort: { order: DESC, fields: properties___dataDate___value }
    ) {
      nodes {
        id
        title
        properties {
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

  const nextProject = getNextProject({
    currentProjectSlug: null,
    projects: projects,
  });
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
              <div className={styles.container}>
                <h1>Toni Castillo</h1>
                <h2>
                  Fullstack web developer, specialising in visual experience.
                </h2>
                <TLink
                  to={`/${nextProject.title}`}
                  title={`Project ${nextProject.properties.dataTitle.value}`}
                  className={styles.playButton}
                >
                  PLAY
                </TLink>
              </div>
            </main>
          );
        }}
      </TransitionState>
    </>
  );
};

export default IndexPage;

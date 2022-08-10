const path = require("path");
// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const result = await graphql(
    `
      {
        allNotion(
          filter: {
            properties: { Published: { value: { name: { eq: "Done" } } } }
          }
        ) {
          edges {
            node {
              title
              properties {
                Published {
                  value {
                    name
                  }
                }
                dataTitle {
                  value
                }
              }
            }
          }
        }
      }
    `
  );
  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }
  // Create pages for each node.
  const projectTemplate = path.resolve(`src/templates/project/index.js`);
  result.data.allNotion.edges.forEach(({ node }) => {
    // if (node.properties?.Published?.value?.name === "Done") {
    const path = node.title;
    createPage({
      path,
      component: projectTemplate,
      // In your ... templates's graphql query, you can use pagePath
      // as a GraphQL variable to query for data from ¿the data?.
      context: {
        pagePath: path,
        projectSlug: node.title,
      },
      pageType: "project",
    });
    // }
  });
};

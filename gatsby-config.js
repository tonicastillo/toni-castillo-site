require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: `tonicastillosite`,
    siteUrl: `https://tonicastillo.com`,
    muxUserId: `${process.env.MUX_USER_ID}`,
  },
  plugins: [
    {
      resolve: `gatsby-source-notion-api`,
      options: {
        token: `${process.env.NOTION_INTEGRATION_TOKEN}`,
        databaseId: `${process.env.NOTION_DATABASE_ID}`,
        propsToFrontmatter: true,
        lowerTitleLevel: true,
      },
    },
    {
      resolve: "gatsby-plugin-transition-link",
      options: {
        layout: require.resolve(`./src/components/mainLayout/index.js`),
      },
    },
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "G-ZCLJTM6KJ9",
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
  ],
};

const { faL } = require("@fortawesome/free-solid-svg-icons")
module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app",
    "@storybook/addon-docs"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-webpack5"
  },
  webpackFinal: async config => {
    config.module.rules.push(
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: require.resolve("react-docgen-typescript-loader"),
            options: {
              shouldExtractLiteralValuesFromEnum: true,
              propFilter: (prop) => {
                if (prop.parent) {
                  return !prop.parent.fileName.includes('node_modules')
                }
                return true
              }
            }
          }
        ]
      },
    );
    config.resolve.extensions.push(".ts", ".tsx", ".md", ".scss");

    return config;
  },
}
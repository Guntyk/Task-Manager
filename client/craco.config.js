const path = require('path');

module.exports = {
  style: {
    modules: {
      localIdentName: '[name]__[local]__[hash:base64:5]',
    },
  },
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      const oneOfRule = webpackConfig.module.rules.find((rule) => rule.oneOf);
      const scssRule = {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]__[hash:base64:5]',
              },
            },
          },
          'sass-loader',
          {
            loader: 'style-resources-loader',
            options: {
              patterns: path.resolve(__dirname, './src/styles/main.scss'),
            },
          },
        ],
      };
      oneOfRule.oneOf.unshift(scssRule);
      return webpackConfig;
    },
  },
};

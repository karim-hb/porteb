// webpack.config.js

const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

module.exports = {
  plugins: [
    new WorkboxWebpackPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      include: [/\.js$/, /\.css$/, /\.woff2$/], // Add any other file types you want to cache
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/cdn\.your-cdn\.com\/your-node-module\/.*/,
          handler: "CacheFirst",
          options: {
            cacheName: "cacheAssets",
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 70, // Cache for 70 days
            },
          },
        },
      ],
    }),
  ],
};

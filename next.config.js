const path = require("path");
require("dotenv").config();

module.exports = {
  webpack: (config) => {
    config.resolve.alias["assets"] = path.join(__dirname, "assets");
    return config;
  },
  env: {
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  },
  reactStrictMode: true,
  swcMinify: true,
  // async rewrites() {
  //   return [
  //     {
  //       source: "/google/redirect",
  //       destination: "/api/google",
  //     },
  //   ];
  // },
};

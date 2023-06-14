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
    BE_URL: process.env.BE_URL,
  },
  reactStrictMode: true,
  swcMinify: true,
};

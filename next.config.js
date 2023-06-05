const path = require("path");

module.exports = {
  webpack: (config) => {
    config.resolve.alias["assets"] = path.join(__dirname, "assets");
    return config;
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

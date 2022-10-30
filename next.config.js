const path = require("path");
const { withKeystone } = require("@keystone-6/core/next");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = withKeystone(nextConfig);

// next.config.js
const path = require("path");

module.exports = {
    webpack(config, options) {
        // Add support for SVGs
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });

        return config;
    },
};

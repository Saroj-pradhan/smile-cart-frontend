// module.exports = {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// }
module.exports = {
   tailwindConfig: "./tailwind.config.js",
  plugins: [
    require("postcss-import"),
    require("postcss-flexbugs-fixes"),
    require("postcss-preset-env")({
      autoprefixer: {
        flexbox: "no-2009",
      },
      stage: 3,
    }),
    require("tailwindcss")("./tailwind.config.js"),
    require("autoprefixer"),
  ],
};

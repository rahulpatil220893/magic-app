const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const env = require("./env");
const ImageListPlugin = require("./image-list-plugin");
const ManifestFilePlugin = require("./manifest-file-plugin");

const ACTIVITY_NAME = env.name;
const ACTIVITY_CONFIG = require(`../src/${ACTIVITY_NAME}/config.json`);
ACTIVITY_CONFIG.name = ACTIVITY_NAME;

module.exports = () => {
  return {
    entry: [`./src/${ACTIVITY_CONFIG.name}/index.js`],
    output: {
      path: path.resolve("dist", ACTIVITY_CONFIG.name, ACTIVITY_CONFIG.scoId),
    },
    plugins: [
      new webpack.ProgressPlugin(),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [path.join(process.cwd(), "dist/**/*")],
      }),
      new webpack.DefinePlugin({
        ACTIVITY_CONFIG: JSON.stringify(ACTIVITY_CONFIG),
      }),
      new HtmlWebpackPlugin({
        title: "Player HTML",
        template: `./src/${ACTIVITY_CONFIG.name}/index.html`,
        filename: "player.html",
        templateParameters: {
          ACTIVITY_CONFIG,
          PRECACHE_IMAGES: true,
        },
      }),
      new HtmlWebpackPlugin({
        filename: "Launcher HTML",
        template: "launcher.html",
        filename: "../../launcher.html",
        inject: false,
        templateParameters: {
          ACTIVITY_PATH: `${ACTIVITY_CONFIG.name}/${ACTIVITY_CONFIG.scoId}/`,
          ZIP_PATH: `${ACTIVITY_CONFIG.name}.zip`,
        },
      }),
      new MiniCssExtractPlugin({
        filename: `[name].css`,
        chunkFilename: "[id].css",
      }),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery'",
        "window.$": "jquery",
        TincanService: path.resolve("./src/app/tincan/service.js"),
        TincanManager: path.resolve("./src/app/tincan/manager.js"),
      }),
      new CopyPlugin([
        {
          from: "tincanpackage",
          to: `${ACTIVITY_CONFIG.name}`,
          transformPath(targetPath, absolutePath) {
            return "../../" + targetPath;
          },
        },
      ]),
      new ImageListPlugin(),
      new ManifestFilePlugin({
        dir: "dist",
        file: `tincanpackage/imsmanifest.xml`,
        config: ACTIVITY_CONFIG,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js|.jsx?$/,
          exclude: /(node_modules)/,
          use: [
            {
              loader: "babel-loader",
            },
          ],
        },
        {
          test: /\.s?[ac]ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: "css-loader",
            },
            {
              loader: "sass-loader",
            },
          ],
        },
        {
          test: /\.(ttf|otf|eot|svg|woff|woff2)$/,
          loader: "file-loader",
          include: [path.resolve(__dirname, "../src/app/assets/fonts/")],
          options: {
            name: "fonts/[name].[ext]",
          },
        },
        {
          test: /\.(svg|bmp|cur|gif|icns|ico|jpe?g|JPE?G|png|PNG|psd|tiff|webp|dds)$/,
          include: [
            path.resolve(__dirname, "../src/app/assets/images/"),
            path.resolve(
              __dirname,
              `../src/${ACTIVITY_CONFIG.name}/assets/images/`
            ),
          ],
          loader: "file-loader",
          options: {
            name: "assets/images/[name].[ext]",
          },
        },
        {
          test: /\.(mp3|wav)$/,
          loader: "file-loader",
          include: [
            path.resolve(__dirname, "../src/app/assets/audios/"),
            path.resolve(
              __dirname,
              `../src/${ACTIVITY_CONFIG.name}/assets/audios/`
            ),
          ],
          options: {
            name: "assets/audios/[name].[ext]",
          },
        },
        {
          test: /\.(mp4)$/,
          loader: "file-loader",
          include: [
            path.resolve(__dirname, "../src/app/assets/videos/"),
            path.resolve(
              __dirname,
              `../src/${ACTIVITY_CONFIG.name}/assets/videos/`
            ),
          ],
          options: {
            name: "assets/videos/[name].[ext]",
          },
        },
      ],
    },
  };
};

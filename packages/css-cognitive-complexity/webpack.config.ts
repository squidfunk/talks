/*
 * Copyright (c) 2019 Martin Donath <martin.donath@squidfunk.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

import CopyWebpackPlugin from "copy-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import * as path from "path"
import { Configuration } from "webpack"

/* ----------------------------------------------------------------------------
 * Configuration
 * ------------------------------------------------------------------------- */

/**
 * Webpack configuration
 *
 * @param env - Webpack environment arguments
 * @param args - Command-line arguments
 *
 * @return Webpack configuration
 */
export default (_env: never, args: Configuration): Configuration => {
  return {
    mode: args.mode,

    /* Entrypoint */
    entry: "src",

    /* Loaders */
    module: {
      rules: [

        /* TypeScript */
        {
          test: /\.tsx?$/,
          use: ["ts-loader"],
          exclude: /\/node_modules\//
        },

        /* Stylesheet */
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        }
      ]
    },

    /* Output */
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.[hash].js"
    },

    /* Module resolver */
    resolve: {
      extensions: [
        ".ts", ".tsx",
        ".js", ".jsx",
        ".json"
      ],
      modules: [
        __dirname,
        "node_modules"
      ]
    },

    /* Plugins */
    plugins: [

      /* HTML */
      new HtmlWebpackPlugin({
        template: "src/index.html",
        minify: {
          collapseBooleanAttributes: true,
          includeAutoGeneratedTags: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        }
      }),

      /* Stylesheet */
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css"
      }),

      /* Assets */
      new CopyWebpackPlugin([
        { from: "src/assets", to: "assets" }
      ])
    ],

    /* Source maps */
    devtool: "source-map",

    /* Development server */
    devServer: {
      contentBase: "src"
    }
  }
}


const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin");

const terserPlugin = new TerserPlugin({
    parallel: 4,
    extractComments: true,
    terserOptions: {
        compress: {
            warnings: false,
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log'] 
        }
    }
})
module.exports = {
    mode: 'development',
    entry: './main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'assets/[hash][ext][query]'
    },
    devServer: {
        open: true,
        host: 'localhost',
        proxy: {
            "/mymap": {
                changeOrigin: true,
                target: "http://112.124.22.244",
                secure: false
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "assets"),
                    to: path.resolve(__dirname, "dist/assets"),
                },
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\\.(js|jsx)$/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/,
                type: 'asset',
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: true,
            }),
        ],
        minimizer: [
            terserPlugin
        ]
    }
};

const path = require('path');
const merge = require('webpack-merge');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const webpackConfigCommon = require('./webpack.config.common');

console.log('[PHASE]', process.env.PHASE); // phase 를 출력

const webpackConfigProd = {
    mode: process.env.PHASE === 'alpha' ? 'development' : 'production',  // production mode를 사용하면 자동으로 uglify와 minify가 됨.
    output: {
        filename: 'bundle.[name].[hash:20].js',
        path: path.resolve(__dirname, '../dist/js/') // JS file path를 지정함.
    },
    // style-loader가 제가된 것을 볼 수 있음.
    // CSS 추출을 위해서 MiniCssExtractPlugin.loader를 사용함.
    module: {
        rules: [{
            test: /\.css/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader',
            ]
        },
        {
            test: /\.(ico|png|jpg|jpeg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url-loader',
            options: {
                name: '[hash].[ext]',
                limit: 10000,
            },      
        },
        {
            test: /\.(svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url-loader',
            options: {
                name: '[hash].[ext]',
                publicPath: '../js/',
                limit: 10000,
            },      
        },
        { test: /\.handlebars$/, loader: "handlebars-loader" }
    ]
    },
    plugins: [
        // Clean build를 위해 dist 폴더의 내용을 지움.
        new CleanWebpackPlugin(['../dist'], {
            root: __dirname,
            allowExternal: true
        }),
        // ejs 템플릿의 JS/CSS 파일명을 치환함.
        new HtmlWebpackPlugin({
            template: 'src/index.handlebars',
            filename: '../index.html',
            inject: 'body',
            chunks : ['index'],
        }),
        new HtmlWebpackPlugin({
            template: 'src/main.ejs',
            filename: '../main.html',
            inject: 'body',
            chunks : ['main'],
        }),
        // 이미지 파일을 복사함.
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, '../src/images'),
                to: path.join(__dirname, '../dist/images')
            }
        ]),
        // CSS file을 dist폴더로 추출한다.
        new MiniCssExtractPlugin({
            filename: "../css/[name].[contenthash].css",
            chunkFilename: "../css/[id].[contenthash].css"
        })
    ]
};

module.exports = merge(webpackConfigCommon, webpackConfigProd);
//https://trustyoo86.github.io/webpack/2018/01/10/webpack-configuration.html
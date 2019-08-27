const fs = require('fs');
const path = require('path');
const glob = require('glob');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const PurifyCSSPlugin = require('purifycss-webpack');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const tvirus = {};

function getCompoents(){
    const files = glob.sync('./src/**');
    const arr = [];
    files.forEach((file)=>{
        let dir = path.dirname(file);
        dir = dir.replace(/\.(\/src\/?)?/, '')
        if(!dir){
            return;
        }
        arr.push(path.resolve(dir));
        tvirus[`@${dir}`] = `../${dir}`;
    })
    return Array.from(new Set(arr));
}

getCompoents();

module.exports = {
    devtool: 'source-map',
    // mode: 'production',
    mode: 'development',
    entry: {
        tvirus: './src/index.js'
    },
    output: {
        filename: 'tvirus.js',
        library: 'tvirus',
        libraryTarget: 'umd',
        path: path.resolve(__dirname, 'dist')
    },
    externals: {
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react',
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom'
        },
        'prop-types': {
            root: 'PropTypes',
            commonjs2: 'prop-types',
            commonjs: 'prop-types',
            amd: 'prop-types',
        },
        'echarts': 'echarts'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".less"],
        alias: Object.assign({
            '@Libs': `../../libs`
        }, tvirus)
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ["babel-loader?babelrc"],
                exclude: /node_modules/
            },
            {
                test: /\.svg$/,
                include: [
                    path.resolve(__dirname, './src/icon/svg/'),
                    path.resolve(__dirname, './src/result/svg/'),
                ],
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            symbolId: 'icon-[name]'
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 12000
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            },
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },
    plugins: [
        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, 'src/*.html'))
        }),
        /* new WebpackParallelUglifyPlugin({
            uglifyJS: {
                output: {
                    beautify: false, //不需要格式化
                    comments: false //不保留注释
                },
                compress: {
                    warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
                    drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
                    collapse_vars: true, // 内嵌定义了但是只用到一次的变量
                    reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
                }
            }
        }), */
        new ExtractTextPlugin({filename: '[name].css'}),
        new OptimizeCSSPlugin({
            cssProcessorOptions: {safe: true}
        }),
    ]
};
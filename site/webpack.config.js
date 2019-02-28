const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const execSync = require('child_process').execSync
const fs = require("fs");
const glob = require('glob')

class CreateSiteTempComp{
    constructor(options){
        this.opts = {
            output: options.output
        }
        this.siteTempComp = path.resolve(this.opts.output, `components`);
        this.siteTempLibs = path.resolve(this.opts.output, `libs`);

    }
    getDirs(){
        const files = glob.sync('../src/**');
        const arr = [];
        files.forEach((file)=>{
            let dir = path.dirname(file);
            dir = dir.replace(/\.\.(\/src\/?)?/, '')
            if(!dir){
                return;
            }
            arr.push(dir);
        })
        return Array.from(new Set(arr));
    }
    copy(){
        execSync(`mkdir -p ${this.siteTempComp}`);
        this.getDirs().forEach((item) => {
            execSync(`cd ${this.siteTempComp} && cp -rf ../../src/${item} ${this.siteTempComp}/${item}`);
            execSync(`rm -rf ${this.siteTempLibs} && cp -rf ../libs ${this.opts.output}`);

        });
    }
    remove(){
        execSync(`rm -rf ${this.siteTempComp}`);
    }
    apply(compiler) {
        compiler.plugin("entryOption",  (compilation, callback) => {
            this.remove()
            this.copy();
            // callback();
        });
    }
}

const tvirus = {};
[
    'button',
    'grid',
    'menu',
    'icon',
    'tabs',
    'input'
].map((item) => {
    tvirus[`@${item}`] = path.resolve(`./components/`, item);
});

module.exports = {
    entry: {
        app: './client/index.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        clientLogLevel: 'info',
        open: false
    },
    resolve: {
        extensions: [".js", ".json", ".less"],
        alias: Object.assign({
            '@Libs': `../../libs`
        }, tvirus)
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [{
                    loader: "babel-loader"
                }]
            },
            {
                test: /\.svg$/,
                include: [
                    path.resolve(__dirname, './components/icon/svg/'),
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
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader' // creates style nodes from JS strings
                    },

                    {
                        loader: 'css-loader' // translates CSS into CommonJS
                    },

                    {
                        loader: 'less-loader' // compiles Less to CSS
                    }
                ]
            }
        ]
    },
    plugins: [
        new CreateSiteTempComp({
            output: __dirname
        }),
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'T-virus',
            filename: 'index.html',
            template: './client/template/index.html'
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};
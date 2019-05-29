const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const execSync = require('child_process').execSync
const glob = require('glob')

function fsExistsSync(path) {
    try{
        fs.accessSync(path, fs.F_OK);
    }catch(e){
        return false;
    }
    return true;
}

function firstToUpperCase(str){
    const arr = str.split('');
    arr[0] = arr[0].toUpperCase();
    return arr.join('');
}

class CreateSiteTempComp{
    constructor(options){
        this.opts = {
            output: options.output
        }
        this.siteTempComp = path.resolve(this.opts.output, `components`);
        this.siteTempLibs = path.resolve(this.opts.output, `libs`);
        this.compoents = this.getDirs();
        this.specs = this.getSpecDirs();

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

    getSpecDirs(){
        const dirs = path.resolve(__dirname, './client/pages/spec/**');
        const dirsString = path.resolve(__dirname, './client/pages/spec/');
        const files = glob.sync(dirs);
        const arr = [];
        files.forEach((file)=>{
            let dir = path.dirname(file);
            dir = dir.replace(dirsString + '/', '');
            dir = dir.split('/')[0]
            if(!dir){
                return;
            }
            arr.push(dir);
        })
        return Array.from(new Set(arr));
    }
    copy(){
        execSync(`mkdir -p ${this.siteTempComp}`);
        this.compoents.forEach((item) => {
            execSync(`cd ${this.siteTempComp} && cp -rf ../../src/${item} ${this.siteTempComp}/${item}`);
            execSync(`rm -rf ${this.siteTempLibs} && cp -rf ../libs ${this.opts.output}`);

        });
    }
    mkdir(){
        const importComps = [];
        const linkComps = [];

        const newCompoents = this.compoents.filter((compoent) => {
            const arr = compoent.split('/');
            if(arr.length > 1){
                return false;
            }

            const name = firstToUpperCase(compoent);
            // importComps.push(`import ${name} from './pages/component/${compoent}';`);
            importComps.push(`const ${name} =  lazy(() => import('./pages/component/${compoent}'));`);
            linkComps.push(`<Route path="/component/${compoent}" component={${name}} />`);

            const pagePath = `./client/pages/component/${compoent}/index.js`
            return !fsExistsSync(pagePath);
        });

        const importSpec = [];
        const linkSpec = [];
        const newSpec = this.specs.filter((spec) => {
            const arr = spec.split('/');
            if(arr.length > 1){
                return false;
            }

            const name = firstToUpperCase(spec) + 'Spec';
            // importSpec.push(`import ${name} from './pages/spec/${spec}';`);
            importComps.push(`const ${name} =  lazy(() => import('./pages/spec/${spec}'));`);

            linkSpec.push(`<Route path="/spec/${spec}" component={${name}} />`);
        });

        fs.writeFileSync(`./client/router.js`, 
`import React, {lazy, Suspense} from 'react';
import { Route, HashRouter as Router } from 'react-router-dom';

import Layout from './layout';

const Index =  lazy(() => import('./pages/index'));
const Demo =  lazy(() => import('./pages/demo'));
const DemoLogin =  lazy(() => import('./pages/demo/login.js'));
const CompInstall =  lazy(() => import('./pages/component/install'));

${importSpec.join('\n')}
${importComps.join('\n')}
export default (
    <Router>
        <Layout>
            <Suspense fallback={<div></div>}>
                    <Route path="/" exact component= {Index} />
                    <Route path="/demo" exact component={Demo} />
                    <Route path="/login" exact component={DemoLogin} />
                    {/* 设计语言 */}
                    ${linkSpec.join('\n')}
                    {/* 组件 */}
                    <Route path="/component/install" component={CompInstall} />
                    ${linkComps.join('\n')}
            </Suspense>
        </Layout>
    </Router>
)
        
        `);


        console.log('[CreateNewComp]', JSON.stringify(newCompoents));

        if(!newCompoents.length){
            return;
        }

        newCompoents.forEach((comp) => {
            const dirpath = `./client/pages/component/${comp}`;
            execSync(`mkdir -p ${dirpath}`);
            const name = firstToUpperCase(comp);
            fs.writeFileSync(`${dirpath}/index.js`, `
import React, { Component } from 'react';
import Layout from '../../../common/webcomponent';

import {${name}} from 'tvirus';
import './index.less'

export default class ${name}Demo extends Component{
    constructor(props){
        super(props);
        this.state = {
            childs: []
        }
    }

    componentWillMount(){
        this.childs();
    }

    childs(){
        const childs = [];
        childs.push({
            title: '正常',
            children: (
                <div className="code-demo">
                    <${name}></${name}>
                </div>
            )
        });

        this.setState({childs})
    }

    render() {
        const {childs} = this.state;

        return <Layout {...this.props} 
            className="main-${comp}-box"
            title="${name}"
            desc="${name}的说明"
            childs={childs}
        />
    }
}
            `)
            fs.writeFileSync(`${dirpath}/index.less`, `.main-${comp}-box{}`);
        })
    }
    remove(){
        execSync(`rm -rf ${this.siteTempComp}`);
    }
    
    apply(compiler) {
        compiler.plugin("entryOption",  (compilation, callback) => {
            // this.optimizeIcon()
            this.remove()
            this.copy();
            this.mkdir();
            // callback();
        });
    }
}

const outputPath = path.resolve(__dirname, '../dist/tvirus.js');

module.exports = {
    // mode: "production",
    entry: './client/index.js',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        clientLogLevel: 'info',
        open: false
    },
    resolve: {
        extensions: [".js", ".json", ".less"],
        alias: {
            tvirus: outputPath
        }
    },
    externals: {
        'echarts': 'echarts'
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
                    path.resolve(__dirname, './client/pages/'),
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
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader' // creates style nodes from JS strings
                    },

                    {
                        loader: 'css-loader' // translates CSS into CommonJS
                    }
                ]
            },
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',   // initial、async和all
            minSize: 30000,   // 形成一个新代码块最小的体积
            maxAsyncRequests: 5,   // 按需加载时候最大的并行请求数
            maxInitialRequests: 3,   // 最大初始化请求数
            automaticNameDelimiter: '~',   // 打包分割符
            name: true,
            cacheGroups: {
                vendors: { // 基本框架
                  chunks: 'all',
                  test: /(react|react-dom|react-dom-router)/,
                  priority: 100,
                  name: 'vendors',
                },
                commons: { // 其余同步加载包
                  chunks: 'all',
                  minChunks: 2,
                  name: 'commons',
                  priority: 80,
                },
              }

          },
    },
    performance: {
        hints: false
    },
    plugins: [
        new CreateSiteTempComp({
            output: __dirname
        }),
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'T-virus',
            filename: 'index.html',
            template: './client/template/index.html',
            minify: {
                // 折叠空白符
                collapseWhitespace: true,
                // 移除注释
                removeComments: true,
                // 移除属性多余的引号
                removeAttributeQuotes: true
            }
        })
    ],
    output: {
        filename: '[name].[hash:8].js',
        path: path.resolve(__dirname, 'dist')
    }
};
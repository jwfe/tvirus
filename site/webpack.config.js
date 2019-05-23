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
const CompInstall =  lazy(() => import('./pages/component/install'));

${importSpec.join('\n')}
${importComps.join('\n')}
export default (
    <Router>
            <Suspense fallback={<div>Loading</div>}>
                <Layout>
                    <Route path="/" exact render={() => Index} />
                    <Route path="/demo" exact render={() => Demo} />
                    {/* 设计语言 */}
                    ${linkSpec.join('\n')}
                    {/* 组件 */}
                    <Route path="/component/install" render={() => CompInstall} />
                    ${linkComps.join('\n')}
                </Layout>
            </Suspense>
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
import Layout from '../../../common/compLayout';

import ${name} from '@${comp}';
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
    mode: "production",
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
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [{
                    loader: "babel-loader"
                }]
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
        // 抽离webpack runtime到单文件
        runtimeChunk: "single",
        splitChunks: {
            chunks: "all",
            // 最大初始请求数量
            maxInitialRequests: Infinity,
            // 抽离体积大于80kb的chunk
            minSize: 80 * 1024,
            // 抽离被多个入口引用次数大于等于1的chunk
            minChunks: 1,
            cacheGroups: {
                // 抽离node_modules下面的第三方库
                vendor: {
                test: /[\\/]node_modules[\\/]/,
                // 从模块的路径地址中获得库的名称
                name: function(module, chunks, chacheGroupKey) {
                        const packageName = module.context.match(
                            /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                        )[1];
                        return `vendor_${packageName.replace("@", "")}`;
                    }
                }
            }
        },
    // ...
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
        filename: '[name].bundle[hash:8].js',
        path: path.resolve(__dirname, 'dist')
    }
};
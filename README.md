# T-Virus

[![npm][npm-svg]][npm-home]

T-Virus 是一套服务于公司内部的设计语言和React实现。


### UI Design

T-Virus 设计原则 [点击查看][http://tvirus.art/#/spec/arts]。

## 支持的平台


### 浏览器

T-Virus 支持最新的，稳定版的全部主流浏览器和平台。 不推荐在移动端使用。

| IE   | Edge | Firefox | Chrome | Safari |
| ---- | ---- | ------- | ------ | ------ |
| >=10 | >=14 | >= 45   | >= 49  | >= 10  |


## 支持的开发环境

- 支持 React 16.6 +
- 支持 [TypeScript](http://www.typescriptlang.org/)
- 支持 [Flow](https://flow.org/)
- 支持 [Electron](https://electronjs.org/)


## 安装

T-Virus 可通过 [npm][npm-home] 安装。

```bash
npm i tvirus --save
```


## 使用

这里有一个简单的示例：

```js
import { Button } from 'tvirus';

ReactDOM.render(<Button>Button</Button>, mountNode);
```


### 文档

您可以阅读[完整文档][http://tvirus.art/#/component/install]，或者从下面几个章节开始学习
(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{419:function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return d});var r=n(0),o=n.n(r),i=n(62),a=n(53),c=n.n(a);function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(){return(s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function p(e,t){return!t||"object"!==l(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function f(e){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function m(e,t){return(m=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var d=function(e){function t(e){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(n=p(this,f(t).call(this,e))).state={childs:[]},n}var n,a,l;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&m(e,t)}(t,r["Component"]),n=t,(a=[{key:"componentWillMount",value:function(){this.childs()}},{key:"childs",value:function(){var e=[];e.push({doc:!0,title:"1. 前情提要",children:o.a.createElement("div",null,o.a.createElement("p",null,"T-virus 是基于react.js，依赖于16.6.0版本。内部通过新版本的context来完成数据转换，请检查您当前的版本是否支持。"),o.a.createElement("div",{className:"language-jsx"},o.a.createElement(c.a,null,"\n    npm install tvirus --save\n                            ")))}),e.push({doc:!0,title:"2. 使用组件",children:o.a.createElement("div",null,o.a.createElement("p",null,"T-virus 提供一个 Provider 组件用于配置组件内部文案的语言。组件利用 context 实现对组件内部文案的配置，需要在应用最外层包裹使用。"),o.a.createElement("div",{className:"language-jsx"},o.a.createElement(c.a,null,"\n    import React from 'react';\n    import ReactDOM from 'react-dom';\n    import { I18nProvider as Provider, I18nReceiver as Receiver, message } from 'tvirus';\n    import enUS from './en-US'; // 自获取\n    import \"tvirus/dist/tvirus.css\";\n    import \"./index.css\";\n\n    class App extends React.Component {\n    handleClick = () => {\n        message.info('第一个案例');\n    }\n    render() {\n        return (\n            <Receiver componentName=\"Select\">\n                {i18n => (\n                    <Button onClick={this.handleClick.bind(this)}>{i18n['message']}</Button>\n                )}\n            </Receiver>\n        );\n    }\n    }\n\n    ReactDOM.render(<Provider value={enUS}><App /></Provider>, document.getElementById('root'));\n                            ")))}),this.setState({childs:e})}},{key:"render",value:function(){var e=this.state.childs;return o.a.createElement(i.a,s({},this.props,{className:"main-install-box",title:"快速上手",desc:"T-virus 是一套服务于公司内部的底层UI组件库。",childs:e}))}}])&&u(n.prototype,a),l&&u(n,l),t}();d.displayName="I18nDemo"}}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jbGllbnQvcGFnZXMvY29tcG9uZW50L2luc3RhbGwvaW5kZXguanMiXSwibmFtZXMiOlsiSTE4bkRlbW8iLCJwcm9wcyIsIl90aGlzIiwiX2NsYXNzQ2FsbENoZWNrIiwidGhpcyIsIl9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuIiwiX2dldFByb3RvdHlwZU9mIiwiY2FsbCIsInN0YXRlIiwiY2hpbGRzIiwiQ29tcG9uZW50IiwicHVzaCIsImRvYyIsInRpdGxlIiwiY2hpbGRyZW4iLCJyZWFjdF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fX2RlZmF1bHQiLCJhIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsInJlYWN0X2hpZ2hsaWdodF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMl9fX2RlZmF1bHQiLCJzZXRTdGF0ZSIsIl9jb21tb25fd2ViY29tcG9uZW50X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18iLCJfZXh0ZW5kcyIsImRlc2MiXSwibWFwcGluZ3MiOiIrcUNBS3FCQSxjQUNqQixTQUFBQSxFQUFZQyxHQUFNLElBQUFDLEVBQUEsbUdBQUFDLENBQUFDLEtBQUFKLElBQ2RFLEVBQUFHLEVBQUFELEtBQUFFLEVBQUFOLEdBQUFPLEtBQUFILEtBQU1ILEtBQ0RPLE1BQVEsQ0FDVEMsT0FBUSxJQUhFUCx3UEFEZ0JRLG1FQVM5Qk4sS0FBS0ssMENBSUwsSUFBTUEsRUFBUyxHQUNmQSxFQUFPRSxLQUFLLENBQ1JDLEtBQUssRUFDTEMsTUFBTyxVQUNQQyxTQUNJQyxFQUFBQyxFQUFBQyxjQUFBLFdBQ0lGLEVBQUFDLEVBQUFDLGNBQUEsa0ZBQ0FGLEVBQUFDLEVBQUFDLGNBQUEsT0FBS0MsVUFBVSxnQkFDWEgsRUFBQUMsRUFBQUMsY0FBQ0UsRUFBQUgsRUFBRCwwRUFVaEJQLEVBQU9FLEtBQUssQ0FDUkMsS0FBSyxFQUNMQyxNQUFPLFVBQ1BDLFNBQ0lDLEVBQUFDLEVBQUFDLGNBQUEsV0FDSUYsRUFBQUMsRUFBQUMsY0FBQSwwRkFDQUYsRUFBQUMsRUFBQUMsY0FBQSxPQUFLQyxVQUFVLGdCQUNYSCxFQUFBQyxFQUFBQyxjQUFDRSxFQUFBSCxFQUFELCt4QkFnQ2hCWixLQUFLZ0IsU0FBUyxDQUFDWCw0Q0FHVixJQUNFQSxFQUFVTCxLQUFLSSxNQUFmQyxPQUVQLE9BQU9NLEVBQUFDLEVBQUFDLGNBQUNJLEVBQUEsRUFBREMsRUFBQSxHQUFZbEIsS0FBS0gsTUFBakIsQ0FDSGlCLFVBQVUsbUJBQ1ZMLE1BQU0sT0FDTlUsS0FBSyw4QkFDTGQsT0FBUUEsMENBaEZDVCIsImZpbGUiOiI1MC5hZjYwMTQ2YS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgTGF5b3V0IGZyb20gJy4uLy4uLy4uL2NvbW1vbi93ZWJjb21wb25lbnQnO1xuXG5pbXBvcnQgSGlnaGxpZ2h0IGZyb20gJ3JlYWN0LWhpZ2hsaWdodCcgXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEkxOG5EZW1vIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgY2hpbGRzOiBbXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCl7XG4gICAgICAgIHRoaXMuY2hpbGRzKCk7XG4gICAgfVxuXG4gICAgY2hpbGRzKCl7XG4gICAgICAgIGNvbnN0IGNoaWxkcyA9IFtdO1xuICAgICAgICBjaGlsZHMucHVzaCh7XG4gICAgICAgICAgICBkb2M6IHRydWUsXG4gICAgICAgICAgICB0aXRsZTogJzEuIOWJjeaDheaPkOimgScsXG4gICAgICAgICAgICBjaGlsZHJlbjogKFxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxwPlQtdmlydXMg5piv5Z+65LqOcmVhY3QuanPvvIzkvp3otZbkuo4xNi42LjDniYjmnKzjgILlhoXpg6jpgJrov4fmlrDniYjmnKznmoRjb250ZXh05p2l5a6M5oiQ5pWw5o2u6L2s5o2i77yM6K+35qOA5p+l5oKo5b2T5YmN55qE54mI5pys5piv5ZCm5pSv5oyB44CCPC9wPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxhbmd1YWdlLWpzeFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEhpZ2hsaWdodD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7YFxuICAgIG5wbSBpbnN0YWxsIHR2aXJ1cyAtLXNhdmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9IaWdobGlnaHQ+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PiAgICBcbiAgICAgICAgICAgIClcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY2hpbGRzLnB1c2goe1xuICAgICAgICAgICAgZG9jOiB0cnVlLFxuICAgICAgICAgICAgdGl0bGU6ICcyLiDkvb/nlKjnu4Tku7YnLFxuICAgICAgICAgICAgY2hpbGRyZW46IChcbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8cD5ULXZpcnVzIOaPkOS+m+S4gOS4qiBQcm92aWRlciDnu4Tku7bnlKjkuo7phY3nva7nu4Tku7blhoXpg6jmlofmoYjnmoTor63oqIDjgILnu4Tku7bliKnnlKggY29udGV4dCDlrp7njrDlr7nnu4Tku7blhoXpg6jmlofmoYjnmoTphY3nva7vvIzpnIDopoHlnKjlupTnlKjmnIDlpJblsYLljIXoo7nkvb/nlKjjgII8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGFuZ3VhZ2UtanN4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8SGlnaGxpZ2h0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtgXG4gICAgaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbiAgICBpbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbiAgICBpbXBvcnQgeyBJMThuUHJvdmlkZXIgYXMgUHJvdmlkZXIsIEkxOG5SZWNlaXZlciBhcyBSZWNlaXZlciwgbWVzc2FnZSB9IGZyb20gJ3R2aXJ1cyc7XG4gICAgaW1wb3J0IGVuVVMgZnJvbSAnLi9lbi1VUyc7IC8vIOiHquiOt+WPllxuICAgIGltcG9ydCBcInR2aXJ1cy9kaXN0L3R2aXJ1cy5jc3NcIjtcbiAgICBpbXBvcnQgXCIuL2luZGV4LmNzc1wiO1xuXG4gICAgY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBoYW5kbGVDbGljayA9ICgpID0+IHtcbiAgICAgICAgbWVzc2FnZS5pbmZvKCfnrKzkuIDkuKrmoYjkvosnKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFJlY2VpdmVyIGNvbXBvbmVudE5hbWU9XCJTZWxlY3RcIj5cbiAgICAgICAgICAgICAgICB7aTE4biA9PiAoXG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b24gb25DbGljaz17dGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpfT57aTE4blsnbWVzc2FnZSddfTwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L1JlY2VpdmVyPlxuICAgICAgICApO1xuICAgIH1cbiAgICB9XG5cbiAgICBSZWFjdERPTS5yZW5kZXIoPFByb3ZpZGVyIHZhbHVlPXtlblVTfT48QXBwIC8+PC9Qcm92aWRlcj4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290JykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGB9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0hpZ2hsaWdodD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+ICBcbiAgICAgICAgICAgIClcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y2hpbGRzfSlcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHtjaGlsZHN9ID0gdGhpcy5zdGF0ZTtcblxuICAgICAgICByZXR1cm4gPExheW91dCB7Li4udGhpcy5wcm9wc30gXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYWluLWluc3RhbGwtYm94XCJcbiAgICAgICAgICAgIHRpdGxlPVwi5b+r6YCf5LiK5omLXCJcbiAgICAgICAgICAgIGRlc2M9XCJULXZpcnVzIOaYr+S4gOWll+acjeWKoeS6juWFrOWPuOWGhemDqOeahOW6leWxglVJ57uE5Lu25bqT44CCXCJcbiAgICAgICAgICAgIGNoaWxkcz17Y2hpbGRzfVxuICAgICAgICAvPlxuICAgIH1cbn1cbiAgICAgICAgICAgICJdLCJzb3VyY2VSb290IjoiIn0=
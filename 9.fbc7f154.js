(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{364:function(e,n,t){var o=t(365);"string"==typeof o&&(o=[[e.i,o,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};t(5)(o,r);o.locals&&(e.exports=o.locals)},365:function(e,n,t){var o=t(15);(e.exports=t(4)(!1)).push([e.i,".font1 {\n  height: 267px;\n  background: url("+o(t(366))+") no-repeat 0 0;\n}\n.font2 {\n  height: 173px;\n  background: url("+o(t(367))+") no-repeat 0 0;\n}\n.font3 {\n  height: 261px;\n  background: url("+o(t(368))+") no-repeat 0 0;\n}\n.font4 {\n  height: 212px;\n  background: url("+o(t(369))+") no-repeat 0 0;\n}\n",""])},366:function(e,n,t){e.exports=t.p+"b757484fe24d3dcb588ccec5a4733fbb.png"},367:function(e,n,t){e.exports=t.p+"9b11a157e2aaf6942a0047bf210ccd2b.png"},368:function(e,n,t){e.exports=t.p+"a3dbc78ea876b13bba51ac998a44532d.png"},369:function(e,n,t){e.exports=t.p+"1080d21345a6a534e2fba2e8cdcde927.png"},45:function(e,n,t){var o=t(46);"string"==typeof o&&(o=[[e.i,o,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};t(5)(o,r);o.locals&&(e.exports=o.locals)},46:function(e,n,t){(e.exports=t(4)(!1)).push([e.i,".main {\n  line-height: 2;\n}\n.main h2,\n.main h3,\n.main h4,\n.main h5,\n.main h6 {\n  clear: both;\n  margin: 1.6em 0 0.6em;\n  color: #0d1a26;\n  font-weight: 500;\n}\n.main h3 {\n  font-size: 24px;\n  line-height: 32px;\n}\n.main h4 {\n  font-size: 18px;\n}\n.main ul,\n.main ol,\n.main li {\n  padding: 0;\n  margin: 0;\n  list-style: none;\n}\n.main .tv-menu-item {\n  padding-left: 59px;\n}\n.main hr {\n  clear: both;\n  height: 1px;\n  margin: 56px 0;\n  background: #ebedf0;\n  border: 0;\n}\n.main blockquote {\n  margin: 1em 0;\n  padding-left: 0.8em;\n  color: #697b8c;\n  font-size: 90%;\n  border-left: 4px solid #ebedf0;\n}\n.main em,\n.main cite {\n  font-style: normal;\n}\n.main cite {\n  color: #929292;\n  font-size: 90%;\n}\n.main-component {\n  margin: 0 60px;\n  width: 800px;\n}\n.main-component .code-wraper {\n  box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.15);\n}\n.main-component .code-demo {\n  padding: 35px 35px 20px;\n}\n.main-component .code-demo .tv-button {\n  margin-right: 68px;\n  margin-bottom: 25px;\n}\n.main-component .code-demo .tv-button-group .tv-button {\n  margin-right: 0;\n}\n.main-component .code-block-control {\n  position: absolute;\n  left: 0;\n  right: 0;\n  border-top: 1px solid #eee;\n  padding-top: 6px;\n  color: #1d1d1d;\n  text-align: center;\n  cursor: pointer;\n}\n.main-component .language-jsx pre {\n  margin: 0;\n}\n",""])},48:function(e,n,t){"use strict";t.d(n,"a",function(){return m});var o=t(0),r=t.n(o);t(2),t(45);function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function l(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function i(e,n){return!n||"object"!==a(n)&&"function"!=typeof n?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):n}function c(e){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function u(e,n){return(u=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e})(e,n)}var s={main:{display:"flex"},left:{flexGrow:0,width:299,minWidth:299,maxWidth:299,height:"auto",borderRight:"1px solid #ebebeb"},right:{flexGrow:1,margin:"0 60px",width:800}},m=function(e){function n(e){var t;return function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,n),(t=i(this,c(n).call(this,e))).state={children:null},t}var t,a,m;return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&u(e,n)}(n,o["Component"]),t=n,(a=[{key:"onClick",value:function(e,n,t){n&&(t[e]=!0,this.props.history.push({pathname:n,state:{openMaps:t}}))}},{key:"opened",value:function(e){var n=this.props.location.pathname.split("/")[2];return console.log(n,e),n===e}},{key:"render",value:function(){var e=this.props,n=e.children,t=e.className,o=e.title,a=e.desc;return r.a.createElement("section",{style:s.right,className:"main-spec"},r.a.createElement("article",{className:t},r.a.createElement("h1",null,o),r.a.createElement("p",null,a),r.a.createElement("section",{className:"main-body"},n)))}}])&&l(t.prototype,a),m&&l(t,m),n}();m.displayName="Layout"},483:function(e,n,t){"use strict";t.r(n),t.d(n,"default",function(){return f});var o=t(0),r=t.n(o),a=t(48),l=t(2);t(364);function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function c(){return(c=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e}).apply(this,arguments)}function u(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function s(e,n){return!n||"object"!==i(n)&&"function"!=typeof n?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):n}function m(e){return(m=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function p(e,n){return(p=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e})(e,n)}var f=function(e){function n(e){var t;return function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,n),(t=s(this,m(n).call(this,e))).state={fontweight_columns:[{title:"css number",key:"number",width:260,align:"center"},{title:"css value",key:"value",width:260},{title:"描述",key:"desc",width:260}],fontweight_data:[{value:"",number:"100",desc:"Thin"},{value:"",number:"200",desc:"Extra Light (Ultra Light)"},{value:"",number:"300",desc:"Light"},{value:"normal",number:"400",desc:"Regular (Normal、Book、Roman)"},{value:"",number:"500",desc:"Medium"},{value:"",number:"600",desc:"Semi Bold (Demi Bold)"},{value:"bold",number:"700",desc:"Bold"},{value:"",number:"800",desc:"Extra Bold (Ultra Bold)"},{value:"",number:"900",desc:"Black (Heavy)"}],columns:[{title:"字体调用顺序",key:"sort",width:260},{title:"OS",key:"os",width:260},{title:"Window",key:"window",width:260}],data:[{sort:"默认中文字体",os:"苹方",window:"微软雅黑"},{sort:"备用中文字体",os:"黑体",window:"黑体"},{sort:"默认英文字体",os:"Helvetica",window:"arial"},{sort:"备用英文字体",os:"arial",window:"SimHei"},{sort:"默认数字字体",os:"Helvetica",window:"arial"},{sort:"备用数字字体",os:"arial",window:"SimHei"}]},t}var t,i,f;return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&p(e,n)}(n,o["Component"]),t=n,(i=[{key:"render",value:function(){var e=this.state,n=e.columns,t=e.data,o=e.fontweight_columns,i=e.fontweight_data;return r.a.createElement(a.a,c({},this.props,{className:"main-font-box",title:"字体",desc:"从下面五个方面进行规范：1.字体\t2.字号\t3.字阶与行高\t4.字重\t5.字体颜色"}),r.a.createElement("h3",null,"字体使用"),r.a.createElement("p",null,"设计字体默认使用无版权字体，技术调用优先使用系统默认的界面字体，同时提供一套利于屏显的备用字体库，来维护在不同平台以及浏览器的显示下，字体始终保持易读性和可读性。"),r.a.createElement("div",null,r.a.createElement(l.Table,{style:{width:780},columns:n,data:t})),r.a.createElement("h3",null,"主字体"),r.a.createElement("p",null,"基于电脑显示器阅读距离（50 cm）以及最佳阅读角度（0.3），确定主字体大小为 14，以保证在多数常用显示器上的用户阅读效果。"),r.a.createElement("div",{className:"font1"}),r.a.createElement("h3",null,"字阶行高"),r.a.createElement("p",null,"字阶是指一系列有规律的不同尺寸的字体。行高可以理解为一个包裹在字体外面的无形的盒子。建议的主要字体为 14，与之对应的行高为 22。其余的字阶的选择可根据具体情况进行自由的定义。"),r.a.createElement("p",null,"在系统设计中（展示型页面除外）常用字阶为12、14、16、18，保持克制的原则。"),r.a.createElement("div",{className:"font2"}),r.a.createElement("h3",null,"字重"),r.a.createElement("p",null,"字重只出现 regular 以及 medium 的两种字体重量，分别对应代码中的 400 和 500。在英文字体加粗的情况下会采用 semibold 的字体重量，对应代码中的 600。"),r.a.createElement("div",{className:"font3"}),r.a.createElement("p",null,"下面是字重参照表"),r.a.createElement("div",null,r.a.createElement(l.Table,{style:{width:780},columns:o,data:i})),r.a.createElement("p",null,"特殊说明：",r.a.createElement("br",null),r.a.createElement("cite",null,"如果指定的权重值不可用，则使用以下规则来确定实际呈现的权重：",r.a.createElement("br",null),"如果指定的权重值在 400和 500之间（包括400和500）：",r.a.createElement("br",null),"按升序查找指定值与500之间的可用权重；",r.a.createElement("br",null),"如果未找到匹配项，按降序查找小于指定值的可用权重；",r.a.createElement("br",null),"如果未找到匹配项，按升序查找大于500的可用权重。",r.a.createElement("br",null),"如果指定值小于400，按降序查找小于指定值的可用权重。 如果未找到匹配项，按升序查找大于指定值的可用权重（先尽可能的小，再尽可能的大）。",r.a.createElement("br",null),"如果指定值大于500，按升序查找大于指定值的可用权重。 如果未找到匹配项，按降序查找小于指定值的可用权重（先尽可能的大，再尽可能的小）。",r.a.createElement("br",null),"以上策略意味着，如果一个字体只有 normal 和 bold 两种粗细值选择，指定粗细值为 100-500 时，实际渲染时将使用 normal，指定粗细值为 600-900 时，实际渲染时将使用 bold 。")),r.a.createElement("h3",null,"应用场合"),r.a.createElement("div",{className:"font4"}),r.a.createElement("h3",null,"原则"),r.a.createElement("p",null,"少即是多：在视觉展现上能够用尽量少的样式去实现设计目的。避免毫无意义的使用大量字阶、颜色、字重强调视觉重点或对比关系。"))}}])&&u(t.prototype,i),f&&u(t,f),n}();f.displayName="FontDemo"}}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jbGllbnQvcGFnZXMvc3BlYy9mb250L2luZGV4Lmxlc3M/MjczNSIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcGFnZXMvc3BlYy9mb250L2luZGV4Lmxlc3MiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3BhZ2VzL3NwZWMvZm9udC9pbWcvZm9udDEucG5nIiwid2VicGFjazovLy8uL2NsaWVudC9wYWdlcy9zcGVjL2ZvbnQvaW1nL2ZvbnQyLnBuZyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcGFnZXMvc3BlYy9mb250L2ltZy9mb250My5wbmciLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3BhZ2VzL3NwZWMvZm9udC9pbWcvZm9udDQucG5nIiwid2VicGFjazovLy8uL2NsaWVudC9jb21tb24vbWFpbi5sZXNzPzM5NjUiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbW1vbi9tYWluLmxlc3MiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbW1vbi9kZXNpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3BhZ2VzL3NwZWMvZm9udC9pbmRleC5qcyJdLCJuYW1lcyI6WyJjb250ZW50IiwiX193ZWJwYWNrX3JlcXVpcmVfXyIsIm1vZHVsZSIsImkiLCJvcHRpb25zIiwiaG1yIiwidHJhbnNmb3JtIiwiaW5zZXJ0SW50byIsInVuZGVmaW5lZCIsImxvY2FscyIsImV4cG9ydHMiLCJlc2NhcGUiLCJwdXNoIiwicCIsInN0eWxlIiwibWFpbiIsImRpc3BsYXkiLCJsZWZ0IiwiZmxleEdyb3ciLCJ3aWR0aCIsIm1pbldpZHRoIiwibWF4V2lkdGgiLCJoZWlnaHQiLCJib3JkZXJSaWdodCIsInJpZ2h0IiwibWFyZ2luIiwiTGF5b3V0IiwicHJvcHMiLCJfdGhpcyIsIl9jbGFzc0NhbGxDaGVjayIsInRoaXMiLCJfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybiIsIl9nZXRQcm90b3R5cGVPZiIsImNhbGwiLCJzdGF0ZSIsImNoaWxkcmVuIiwiQ29tcG9uZW50IiwiaW5kZXgiLCJ0byIsIm9wZW5NYXBzIiwiaGlzdG9yeSIsInBhdGhuYW1lIiwicXVlcnkiLCJjdXJyUXVlcnkiLCJsb2NhdGlvbiIsInNwbGl0IiwiY29uc29sZSIsImxvZyIsIl90aGlzJHByb3BzIiwiY2xhc3NOYW1lIiwidGl0bGUiLCJkZXNjIiwicmVhY3RfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfX19kZWZhdWx0IiwiYSIsImNyZWF0ZUVsZW1lbnQiLCJGb250RGVtbyIsImZvbnR3ZWlnaHRfY29sdW1ucyIsImtleSIsImFsaWduIiwiZm9udHdlaWdodF9kYXRhIiwidmFsdWUiLCJudW1iZXIiLCJjb2x1bW5zIiwiZGF0YSIsInNvcnQiLCJvcyIsIndpbmRvdyIsIl90aGlzJHN0YXRlIiwiX2NvbW1vbl9kZXNpZ25fX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXyIsIl9leHRlbmRzIiwidHZpcnVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8yX18iXSwibWFwcGluZ3MiOiI2RUFDQSxJQUFBQSxFQUFjQyxFQUFRLEtBRXRCLGlCQUFBRCxNQUFBLEVBQTRDRSxFQUFBQyxFQUFTSCxFQUFBLE1BT3JELElBQUFJLEVBQUEsQ0FBZUMsS0FBQSxFQUVmQyxlQVBBQSxFQVFBQyxnQkFBQUMsR0FFYVAsRUFBUSxFQUFSQSxDQUFpRUQsRUFBQUksR0FFOUVKLEVBQUFTLFNBQUFQLEVBQUFRLFFBQUFWLEVBQUFTLDZCQ2pCQSxJQUFBRSxFQUFhVixFQUFRLEtBQ3JCQyxFQUFBUSxRQUEyQlQsRUFBUSxFQUFSQSxFQUE2RCxJQUt4RlcsS0FBQSxDQUFjVixFQUFBQyxFQUFTLGlEQUE2QlEsRUFBK0JWLEVBQVEsTUFBaUIsc0VBQXFEVSxFQUErQlYsRUFBUSxNQUFpQixzRUFBcURVLEVBQStCVixFQUFRLE1BQWlCLHNFQUFxRFUsRUFBK0JWLEVBQVEsTUFBaUIsd0JBQXlCLDBCQ041Y0MsRUFBQVEsUUFBaUJULEVBQUFZLEVBQXVCLDREQ0F4Q1gsRUFBQVEsUUFBaUJULEVBQUFZLEVBQXVCLDREQ0F4Q1gsRUFBQVEsUUFBaUJULEVBQUFZLEVBQXVCLDREQ0F4Q1gsRUFBQVEsUUFBaUJULEVBQUFZLEVBQXVCLDJEQ0N4QyxJQUFBYixFQUFjQyxFQUFRLElBRXRCLGlCQUFBRCxNQUFBLEVBQTRDRSxFQUFBQyxFQUFTSCxFQUFBLE1BT3JELElBQUFJLEVBQUEsQ0FBZUMsS0FBQSxFQUVmQyxlQVBBQSxFQVFBQyxnQkFBQUMsR0FFYVAsRUFBUSxFQUFSQSxDQUEyREQsRUFBQUksR0FFeEVKLEVBQUFTLFNBQUFQLEVBQUFRLFFBQUFWLEVBQUFTLDZCQ2pCQVAsRUFBQVEsUUFBMkJULEVBQVEsRUFBUkEsRUFBdUQsSUFLbEZXLEtBQUEsQ0FBY1YsRUFBQUMsRUFBUyx1MkNBQXEyQyw0NEJDQTUzQyxJQUFNVyxFQUFRLENBQ1ZDLEtBQU0sQ0FDRkMsUUFBUyxRQUViQyxLQUFNLENBQ0ZDLFNBQVUsRUFDVkMsTUFBTyxJQUNQQyxTQUFVLElBQ1ZDLFNBQVUsSUFDVkMsT0FBUSxPQUVSQyxZQUFhLHFCQUVqQkMsTUFBTyxDQUNITixTQUFVLEVBQ1ZPLE9BQVEsU0FDUk4sTUFBTyxNQUdNTyxjQUNqQixTQUFBQSxFQUFZQyxHQUFNLElBQUFDLEVBQUEsbUdBQUFDLENBQUFDLEtBQUFKLElBQ2RFLEVBQUFHLEVBQUFELEtBQUFFLEVBQUFOLEdBQUFPLEtBQUFILEtBQU1ILEtBQ0RPLE1BQVEsQ0FDVEMsU0FBVSxNQUhBUCx3UEFEY1Esc0RBUXhCQyxFQUFPQyxFQUFJQyxHQUNYRCxJQUlKQyxFQUFTRixJQUFTLEVBQ2xCUCxLQUFLSCxNQUFNYSxRQUFRNUIsS0FBSyxDQUFFNkIsU0FBVUgsRUFBSUosTUFBTyxDQUFFSyw4Q0FFOUNHLEdBQ0gsSUFBTUMsRUFBWWIsS0FBS0gsTUFBTWlCLFNBQVNILFNBQVNJLE1BQU0sS0FBSyxHQUUxRCxPQURBQyxRQUFRQyxJQUFJSixFQUFZRCxHQUNqQkMsSUFBY0QsbUNBR2hCLElBQUFNLEVBQ3dDbEIsS0FBS0gsTUFBMUNRLEVBREhhLEVBQ0diLFNBQVVjLEVBRGJELEVBQ2FDLFVBQVdDLEVBRHhCRixFQUN3QkUsTUFBT0MsRUFEL0JILEVBQytCRyxLQUNwQyxPQUNJQyxFQUFBQyxFQUFBQyxjQUFBLFdBQVN4QyxNQUFPQSxFQUFNVSxNQUFPeUIsVUFBVSxhQUNuQ0csRUFBQUMsRUFBQUMsY0FBQSxXQUFTTCxVQUFXQSxHQUNoQkcsRUFBQUMsRUFBQUMsY0FBQSxVQUFLSixHQUNMRSxFQUFBQyxFQUFBQyxjQUFBLFNBQUlILEdBQ0pDLEVBQUFDLEVBQUFDLGNBQUEsV0FBU0wsVUFBVSxhQUNkZCwwQ0E5QkpULDBvQ0NsQkE2QixjQUNqQixTQUFBQSxFQUFZNUIsR0FBTSxJQUFBQyxFQUFBLG1HQUFBQyxDQUFBQyxLQUFBeUIsSUFDZDNCLEVBQUFHLEVBQUFELEtBQUFFLEVBQUF1QixHQUFBdEIsS0FBQUgsS0FBTUgsS0FDRE8sTUFBUSxDQUNUc0IsbUJBQW9CLENBQ2hCLENBQ0lOLE1BQU8sYUFBY08sSUFBSyxTQUFVdEMsTUFBTyxJQUMzQ3VDLE1BQU8sVUFFWCxDQUNJUixNQUFPLFlBQWFPLElBQUssUUFBU3RDLE1BQU8sS0FFN0MsQ0FDSStCLE1BQU8sS0FBTU8sSUFBSyxPQUFRdEMsTUFBTyxNQUd6Q3dDLGdCQUFpQixDQUNiLENBQ0lDLE1BQU8sR0FDUEMsT0FBUSxNQUNSVixLQUFNLFFBRVYsQ0FDSVMsTUFBTyxHQUNQQyxPQUFRLE1BQ1JWLEtBQU0sNkJBRVYsQ0FDSVMsTUFBTyxHQUNQQyxPQUFRLE1BQ1JWLEtBQU0sU0FFVixDQUNJUyxNQUFPLFNBQ1BDLE9BQVEsTUFDUlYsS0FBTSwrQkFFVixDQUNJUyxNQUFPLEdBQ1BDLE9BQVEsTUFDUlYsS0FBTSxVQUVWLENBQ0lTLE1BQU8sR0FDUEMsT0FBUSxNQUNSVixLQUFNLHlCQUVWLENBQ0lTLE1BQU8sT0FDUEMsT0FBUSxNQUNSVixLQUFNLFFBRVYsQ0FDSVMsTUFBTyxHQUNQQyxPQUFRLE1BQ1JWLEtBQU0sMkJBRVYsQ0FDSVMsTUFBTyxHQUNQQyxPQUFRLE1BQ1JWLEtBQU0sa0JBR2RXLFFBQVMsQ0FDTCxDQUFFWixNQUFPLFNBQVVPLElBQUssT0FBUXRDLE1BQU8sS0FDdkMsQ0FBRStCLE1BQU8sS0FBTU8sSUFBSyxLQUFNdEMsTUFBTyxLQUNqQyxDQUFFK0IsTUFBTyxTQUFVTyxJQUFLLFNBQVV0QyxNQUFPLE1BRTdDNEMsS0FBTSxDQUNGLENBQ0lDLEtBQUksU0FDSkMsR0FBSSxLQUNKQyxPQUFNLFFBR1YsQ0FDSUYsS0FBSSxTQUNKQyxHQUFJLEtBQ0pDLE9BQU0sTUFHVixDQUNJRixLQUFJLFNBQ0pDLEdBQUksWUFDSkMsT0FBTSxTQUdWLENBQ0lGLEtBQUksU0FDSkMsR0FBSSxRQUNKQyxPQUFNLFVBRVYsQ0FDSUYsS0FBSSxTQUNKQyxHQUFJLFlBQ0pDLE9BQU0sU0FFVixDQUNJRixLQUFJLFNBQ0pDLEdBQUksUUFDSkMsT0FBTSxZQW5HSnRDLHdQQURnQlEsdURBMkd6QixJQUFBK0IsRUFDMERyQyxLQUFLSSxNQUE1RDRCLEVBREhLLEVBQ0dMLFFBQVNDLEVBRFpJLEVBQ1lKLEtBQU1QLEVBRGxCVyxFQUNrQlgsbUJBQW9CRyxFQUR0Q1EsRUFDc0NSLGdCQUMzQyxPQUFPUCxFQUFBQyxFQUFBQyxjQUFDYyxFQUFBLEVBQURDLEVBQUEsR0FBWXZDLEtBQUtILE1BQWpCLENBQ0hzQixVQUFVLGdCQUNWQyxNQUFNLEtBQ05DLEtBQUssa0RBR0xDLEVBQUFDLEVBQUFDLGNBQUEsa0JBQ0FGLEVBQUFDLEVBQUFDLGNBQUEsOEZBQ0FGLEVBQUFDLEVBQUFDLGNBQUEsV0FDSUYsRUFBQUMsRUFBQUMsY0FBQ2dCLEVBQUEsTUFBRCxDQUNJeEQsTUFBTyxDQUFDSyxNQUFPLEtBQ2YyQyxRQUFTQSxFQUNUQyxLQUFNQSxLQUlkWCxFQUFBQyxFQUFBQyxjQUFBLGlCQUNBRixFQUFBQyxFQUFBQyxjQUFBLDZFQUNBRixFQUFBQyxFQUFBQyxjQUFBLE9BQUtMLFVBQVUsVUFFZkcsRUFBQUMsRUFBQUMsY0FBQSxrQkFDQUYsRUFBQUMsRUFBQUMsY0FBQSxzR0FDQUYsRUFBQUMsRUFBQUMsY0FBQSxxREFDQUYsRUFBQUMsRUFBQUMsY0FBQSxPQUFLTCxVQUFVLFVBRWZHLEVBQUFDLEVBQUFDLGNBQUEsZ0JBQ0FGLEVBQUFDLEVBQUFDLGNBQUEseUdBQ0FGLEVBQUFDLEVBQUFDLGNBQUEsT0FBS0wsVUFBVSxVQUNmRyxFQUFBQyxFQUFBQyxjQUFBLHFCQUNBRixFQUFBQyxFQUFBQyxjQUFBLFdBQ0lGLEVBQUFDLEVBQUFDLGNBQUNnQixFQUFBLE1BQUQsQ0FDSXhELE1BQU8sQ0FBQ0ssTUFBTyxLQUNmMkMsUUFBU04sRUFDVE8sS0FBTUosS0FHZFAsRUFBQUMsRUFBQUMsY0FBQSxpQkFDU0YsRUFBQUMsRUFBQUMsY0FBQSxXQUNMRixFQUFBQyxFQUFBQyxjQUFBLDZDQUM4QkYsRUFBQUMsRUFBQUMsY0FBQSxXQUQ5QixtQ0FFZ0NGLEVBQUFDLEVBQUFDLGNBQUEsV0FGaEMsdUJBR29CRixFQUFBQyxFQUFBQyxjQUFBLFdBSHBCLDRCQUl5QkYsRUFBQUMsRUFBQUMsY0FBQSxXQUp6Qiw0QkFLeUJGLEVBQUFDLEVBQUFDLGNBQUEsV0FMekIsdUVBTW9FRixFQUFBQyxFQUFBQyxjQUFBLFdBTnBFLHVFQU9vRUYsRUFBQUMsRUFBQUMsY0FBQSxXQVBwRSw2R0FZSkYsRUFBQUMsRUFBQUMsY0FBQSxrQkFDQUYsRUFBQUMsRUFBQUMsY0FBQSxPQUFLTCxVQUFVLFVBRWZHLEVBQUFDLEVBQUFDLGNBQUEsZ0JBQ0FGLEVBQUFDLEVBQUFDLGNBQUEsOEdBbktTQyIsImZpbGUiOiI5LmZiYzdmMTU0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9sZXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2luZGV4Lmxlc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9sZXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2luZGV4Lmxlc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvbGVzcy1sb2FkZXIvZGlzdC9janMuanMhLi9pbmRleC5sZXNzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwidmFyIGVzY2FwZSA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvdXJsL2VzY2FwZS5qc1wiKTtcbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLmZvbnQxIHtcXG4gIGhlaWdodDogMjY3cHg7XFxuICBiYWNrZ3JvdW5kOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4vaW1nL2ZvbnQxLnBuZ1wiKSkgKyBcIikgbm8tcmVwZWF0IDAgMDtcXG59XFxuLmZvbnQyIHtcXG4gIGhlaWdodDogMTczcHg7XFxuICBiYWNrZ3JvdW5kOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4vaW1nL2ZvbnQyLnBuZ1wiKSkgKyBcIikgbm8tcmVwZWF0IDAgMDtcXG59XFxuLmZvbnQzIHtcXG4gIGhlaWdodDogMjYxcHg7XFxuICBiYWNrZ3JvdW5kOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4vaW1nL2ZvbnQzLnBuZ1wiKSkgKyBcIikgbm8tcmVwZWF0IDAgMDtcXG59XFxuLmZvbnQ0IHtcXG4gIGhlaWdodDogMjEycHg7XFxuICBiYWNrZ3JvdW5kOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4vaW1nL2ZvbnQ0LnBuZ1wiKSkgKyBcIikgbm8tcmVwZWF0IDAgMDtcXG59XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiYjc1NzQ4NGZlMjRkM2RjYjU4OGNjZWM1YTQ3MzNmYmIucG5nXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiOWIxMWExNTdlMmFhZjY5NDJhMDA0N2JmMjEwY2NkMmIucG5nXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiYTNkYmM3OGVhODc2YjEzYmJhNTFhYzk5OGE0NDUzMmQucG5nXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiMTA4MGQyMTM0NWE2YTUzNGUyZmJhMmU4Y2RjZGU5MjcucG5nXCI7IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy9sZXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL21haW4ubGVzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL2xlc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWFpbi5sZXNzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL2xlc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWFpbi5sZXNzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIubWFpbiB7XFxuICBsaW5lLWhlaWdodDogMjtcXG59XFxuLm1haW4gaDIsXFxuLm1haW4gaDMsXFxuLm1haW4gaDQsXFxuLm1haW4gaDUsXFxuLm1haW4gaDYge1xcbiAgY2xlYXI6IGJvdGg7XFxuICBtYXJnaW46IDEuNmVtIDAgMC42ZW07XFxuICBjb2xvcjogIzBkMWEyNjtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxufVxcbi5tYWluIGgzIHtcXG4gIGZvbnQtc2l6ZTogMjRweDtcXG4gIGxpbmUtaGVpZ2h0OiAzMnB4O1xcbn1cXG4ubWFpbiBoNCB7XFxuICBmb250LXNpemU6IDE4cHg7XFxufVxcbi5tYWluIHVsLFxcbi5tYWluIG9sLFxcbi5tYWluIGxpIHtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxuICBsaXN0LXN0eWxlOiBub25lO1xcbn1cXG4ubWFpbiAudHYtbWVudS1pdGVtIHtcXG4gIHBhZGRpbmctbGVmdDogNTlweDtcXG59XFxuLm1haW4gaHIge1xcbiAgY2xlYXI6IGJvdGg7XFxuICBoZWlnaHQ6IDFweDtcXG4gIG1hcmdpbjogNTZweCAwO1xcbiAgYmFja2dyb3VuZDogI2ViZWRmMDtcXG4gIGJvcmRlcjogMDtcXG59XFxuLm1haW4gYmxvY2txdW90ZSB7XFxuICBtYXJnaW46IDFlbSAwO1xcbiAgcGFkZGluZy1sZWZ0OiAwLjhlbTtcXG4gIGNvbG9yOiAjNjk3YjhjO1xcbiAgZm9udC1zaXplOiA5MCU7XFxuICBib3JkZXItbGVmdDogNHB4IHNvbGlkICNlYmVkZjA7XFxufVxcbi5tYWluIGVtLFxcbi5tYWluIGNpdGUge1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbn1cXG4ubWFpbiBjaXRlIHtcXG4gIGNvbG9yOiAjOTI5MjkyO1xcbiAgZm9udC1zaXplOiA5MCU7XFxufVxcbi5tYWluLWNvbXBvbmVudCB7XFxuICBtYXJnaW46IDAgNjBweDtcXG4gIHdpZHRoOiA4MDBweDtcXG59XFxuLm1haW4tY29tcG9uZW50IC5jb2RlLXdyYXBlciB7XFxuICBib3gtc2hhZG93OiAwIDAgOHB4IDJweCByZ2JhKDAsIDAsIDAsIDAuMTUpO1xcbn1cXG4ubWFpbi1jb21wb25lbnQgLmNvZGUtZGVtbyB7XFxuICBwYWRkaW5nOiAzNXB4IDM1cHggMjBweDtcXG59XFxuLm1haW4tY29tcG9uZW50IC5jb2RlLWRlbW8gLnR2LWJ1dHRvbiB7XFxuICBtYXJnaW4tcmlnaHQ6IDY4cHg7XFxuICBtYXJnaW4tYm90dG9tOiAyNXB4O1xcbn1cXG4ubWFpbi1jb21wb25lbnQgLmNvZGUtZGVtbyAudHYtYnV0dG9uLWdyb3VwIC50di1idXR0b24ge1xcbiAgbWFyZ2luLXJpZ2h0OiAwO1xcbn1cXG4ubWFpbi1jb21wb25lbnQgLmNvZGUtYmxvY2stY29udHJvbCB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiAwO1xcbiAgcmlnaHQ6IDA7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgI2VlZTtcXG4gIHBhZGRpbmctdG9wOiA2cHg7XFxuICBjb2xvcjogIzFkMWQxZDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuLm1haW4tY29tcG9uZW50IC5sYW5ndWFnZS1qc3ggcHJlIHtcXG4gIG1hcmdpbjogMDtcXG59XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgTWVudSB9IGZyb20gJ3R2aXJ1cyc7XG5pbXBvcnQgJy4vbWFpbi5sZXNzJztcblxuY29uc3Qgc3R5bGUgPSB7XG4gICAgbWFpbjoge1xuICAgICAgICBkaXNwbGF5OiAnZmxleCdcbiAgICB9LFxuICAgIGxlZnQ6IHtcbiAgICAgICAgZmxleEdyb3c6IDAsXG4gICAgICAgIHdpZHRoOiAyOTksIFxuICAgICAgICBtaW5XaWR0aDogMjk5LFxuICAgICAgICBtYXhXaWR0aDogMjk5LFxuICAgICAgICBoZWlnaHQ6ICdhdXRvJyxcblxuICAgICAgICBib3JkZXJSaWdodDogJzFweCBzb2xpZCAjZWJlYmViJ1xuICAgIH0sXG4gICAgcmlnaHQ6IHtcbiAgICAgICAgZmxleEdyb3c6IDEsXG4gICAgICAgIG1hcmdpbjogJzAgNjBweCcsXG4gICAgICAgIHdpZHRoOiA4MDBcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMYXlvdXQgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBjaGlsZHJlbjogbnVsbFxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIG9uQ2xpY2soaW5kZXgsIHRvLCBvcGVuTWFwcyl7XG4gICAgICAgIGlmKCF0byl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBvcGVuTWFwc1tpbmRleF0gPSB0cnVlO1xuICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaCh7IHBhdGhuYW1lOiB0bywgc3RhdGU6IHsgb3Blbk1hcHMgfSB9KTtcbiAgICB9XG4gICAgb3BlbmVkKHF1ZXJ5KXtcbiAgICAgICAgY29uc3QgY3VyclF1ZXJ5ID0gdGhpcy5wcm9wcy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpWzJdO1xuICAgICAgICBjb25zb2xlLmxvZyhjdXJyUXVlcnkgLCBxdWVyeSlcbiAgICAgICAgcmV0dXJuIGN1cnJRdWVyeSA9PT0gcXVlcnk7XG4gICAgfVxuICAgIFxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBjaGlsZHJlbiwgY2xhc3NOYW1lLCB0aXRsZSwgZGVzYyB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxzZWN0aW9uIHN0eWxlPXtzdHlsZS5yaWdodH0gY2xhc3NOYW1lPVwibWFpbi1zcGVjXCI+XG4gICAgICAgICAgICAgICAgPGFydGljbGUgY2xhc3NOYW1lPXtjbGFzc05hbWV9PlxuICAgICAgICAgICAgICAgICAgICA8aDE+e3RpdGxlfTwvaDE+XG4gICAgICAgICAgICAgICAgICAgIDxwPntkZXNjfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwibWFpbi1ib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgICAgICA8L2FydGljbGU+XG4gICAgICAgICAgICA8L3NlY3Rpb24+ICAgXG4gICAgICAgIClcbiAgICB9XG59IiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBMYXlvdXQgZnJvbSAnLi4vLi4vLi4vY29tbW9uL2Rlc2lnbic7XG5pbXBvcnQgeyBUYWJsZSB9IGZyb20gJ3R2aXJ1cyc7XG5cbmltcG9ydCAnLi9pbmRleC5sZXNzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb250RGVtbyBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGZvbnR3ZWlnaHRfY29sdW1uczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdjc3MgbnVtYmVyJywga2V5OiAnbnVtYmVyJywgd2lkdGg6IDI2MCxcbiAgICAgICAgICAgICAgICAgICAgYWxpZ246ICdjZW50ZXInXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnY3NzIHZhbHVlJywga2V5OiAndmFsdWUnLCB3aWR0aDogMjYwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+P6L+wJywga2V5OiAnZGVzYycsIHdpZHRoOiAyNjBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgZm9udHdlaWdodF9kYXRhOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJycsXG4gICAgICAgICAgICAgICAgICAgIG51bWJlcjogJzEwMCcsXG4gICAgICAgICAgICAgICAgICAgIGRlc2M6ICdUaGluJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJycsXG4gICAgICAgICAgICAgICAgICAgIG51bWJlcjogJzIwMCcsXG4gICAgICAgICAgICAgICAgICAgIGRlc2M6ICdFeHRyYSBMaWdodCAoVWx0cmEgTGlnaHQpJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJycsXG4gICAgICAgICAgICAgICAgICAgIG51bWJlcjogJzMwMCcsXG4gICAgICAgICAgICAgICAgICAgIGRlc2M6ICdMaWdodCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdub3JtYWwnLFxuICAgICAgICAgICAgICAgICAgICBudW1iZXI6ICc0MDAnLFxuICAgICAgICAgICAgICAgICAgICBkZXNjOiAnUmVndWxhciAoTm9ybWFs44CBQm9va+OAgVJvbWFuKSdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICcnLFxuICAgICAgICAgICAgICAgICAgICBudW1iZXI6ICc1MDAnLFxuICAgICAgICAgICAgICAgICAgICBkZXNjOiAnTWVkaXVtJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJycsXG4gICAgICAgICAgICAgICAgICAgIG51bWJlcjogJzYwMCcsXG4gICAgICAgICAgICAgICAgICAgIGRlc2M6ICdTZW1pIEJvbGQgKERlbWkgQm9sZCknXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnYm9sZCcsXG4gICAgICAgICAgICAgICAgICAgIG51bWJlcjogJzcwMCcsXG4gICAgICAgICAgICAgICAgICAgIGRlc2M6ICdCb2xkJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJycsXG4gICAgICAgICAgICAgICAgICAgIG51bWJlcjogJzgwMCcsXG4gICAgICAgICAgICAgICAgICAgIGRlc2M6ICdFeHRyYSBCb2xkIChVbHRyYSBCb2xkKSdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICcnLFxuICAgICAgICAgICAgICAgICAgICBudW1iZXI6ICc5MDAnLFxuICAgICAgICAgICAgICAgICAgICBkZXNjOiAnQmxhY2sgKEhlYXZ5KSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgY29sdW1uczogW1xuICAgICAgICAgICAgICAgIHsgdGl0bGU6ICflrZfkvZPosIPnlKjpobrluo8nLCBrZXk6ICdzb3J0Jywgd2lkdGg6IDI2MH0sXG4gICAgICAgICAgICAgICAgeyB0aXRsZTogJ09TJywga2V5OiAnb3MnLCB3aWR0aDogMjYwIH0sXG4gICAgICAgICAgICAgICAgeyB0aXRsZTogJ1dpbmRvdycsIGtleTogJ3dpbmRvdycsIHdpZHRoOiAyNjAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IGDpu5jorqTkuK3mloflrZfkvZNgLFxuICAgICAgICAgICAgICAgICAgICBvczogJ+iLueaWuScsXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdzogYOW+rui9r+mbhem7kWAsXG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc29ydDogYOWkh+eUqOS4reaWh+Wtl+S9k2AsXG4gICAgICAgICAgICAgICAgICAgIG9zOiAn6buR5L2TJyxcbiAgICAgICAgICAgICAgICAgICAgd2luZG93OiBg6buR5L2TYCxcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBzb3J0OiBg6buY6K6k6Iux5paH5a2X5L2TYCxcbiAgICAgICAgICAgICAgICAgICAgb3M6ICdIZWx2ZXRpY2EnLFxuICAgICAgICAgICAgICAgICAgICB3aW5kb3c6IGBhcmlhbGAsXG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc29ydDogYOWkh+eUqOiLseaWh+Wtl+S9k2AsXG4gICAgICAgICAgICAgICAgICAgIG9zOiAnYXJpYWwnLFxuICAgICAgICAgICAgICAgICAgICB3aW5kb3c6IGBTaW1IZWlgLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBzb3J0OiBg6buY6K6k5pWw5a2X5a2X5L2TYCxcbiAgICAgICAgICAgICAgICAgICAgb3M6ICdIZWx2ZXRpY2EnLFxuICAgICAgICAgICAgICAgICAgICB3aW5kb3c6IGBhcmlhbGAsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IGDlpIfnlKjmlbDlrZflrZfkvZNgLFxuICAgICAgICAgICAgICAgICAgICBvczogJ2FyaWFsJyxcbiAgICAgICAgICAgICAgICAgICAgd2luZG93OiBgU2ltSGVpYCxcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgY29sdW1ucywgZGF0YSwgZm9udHdlaWdodF9jb2x1bW5zLCBmb250d2VpZ2h0X2RhdGEgfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIHJldHVybiA8TGF5b3V0IHsuLi50aGlzLnByb3BzfSBcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1haW4tZm9udC1ib3hcIlxuICAgICAgICAgICAgdGl0bGU9XCLlrZfkvZNcIlxuICAgICAgICAgICAgZGVzYz1cIuS7juS4i+mdouS6lOS4quaWuemdoui/m+ihjOinhOiMg++8mjEu5a2X5L2TXHQyLuWtl+WPt1x0My7lrZfpmLbkuI7ooYzpq5hcdDQu5a2X6YeNXHQ1LuWtl+S9k+minOiJslwiXG4gICAgICAgID5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPGgzPuWtl+S9k+S9v+eUqDwvaDM+XG4gICAgICAgICAgICA8cD7orr7orqHlrZfkvZPpu5jorqTkvb/nlKjml6DniYjmnYPlrZfkvZPvvIzmioDmnK/osIPnlKjkvJjlhYjkvb/nlKjns7vnu5/pu5jorqTnmoTnlYzpnaLlrZfkvZPvvIzlkIzml7bmj5DkvpvkuIDlpZfliKnkuo7lsY/mmL7nmoTlpIfnlKjlrZfkvZPlupPvvIzmnaXnu7TmiqTlnKjkuI3lkIzlubPlj7Dku6Xlj4rmtY/op4jlmajnmoTmmL7npLrkuIvvvIzlrZfkvZPlp4vnu4jkv53mjIHmmJPor7vmgKflkozlj6/or7vmgKfjgII8L3A+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxUYWJsZSBcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3t3aWR0aDogNzgwfX1cbiAgICAgICAgICAgICAgICAgICAgY29sdW1ucz17Y29sdW1uc31cbiAgICAgICAgICAgICAgICAgICAgZGF0YT17ZGF0YX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxoMz7kuLvlrZfkvZM8L2gzPlxuICAgICAgICAgICAgPHA+5Z+65LqO55S16ISR5pi+56S65Zmo6ZiF6K+76Led56a777yINTAgY23vvInku6Xlj4rmnIDkvbPpmIXor7vop5LluqbvvIgwLjPvvInvvIznoa7lrprkuLvlrZfkvZPlpKflsI/kuLogMTTvvIzku6Xkv53or4HlnKjlpJrmlbDluLjnlKjmmL7npLrlmajkuIrnmoTnlKjmiLfpmIXor7vmlYjmnpzjgII8L3A+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvbnQxXCI+PC9kaXY+XG5cbiAgICAgICAgICAgIDxoMz7lrZfpmLbooYzpq5g8L2gzPlxuICAgICAgICAgICAgPHA+5a2X6Zi25piv5oyH5LiA57O75YiX5pyJ6KeE5b6L55qE5LiN5ZCM5bC65a+455qE5a2X5L2T44CC6KGM6auY5Y+v5Lul55CG6Kej5Li65LiA5Liq5YyF6KO55Zyo5a2X5L2T5aSW6Z2i55qE5peg5b2i55qE55uS5a2Q44CC5bu66K6u55qE5Li76KaB5a2X5L2T5Li6IDE077yM5LiO5LmL5a+55bqU55qE6KGM6auY5Li6IDIy44CC5YW25L2Z55qE5a2X6Zi255qE6YCJ5oup5Y+v5qC55o2u5YW35L2T5oOF5Ya16L+b6KGM6Ieq55Sx55qE5a6a5LmJ44CCPC9wPlxuICAgICAgICAgICAgPHA+5Zyo57O757uf6K6+6K6h5Lit77yI5bGV56S65Z6L6aG16Z2i6Zmk5aSW77yJ5bi455So5a2X6Zi25Li6MTLjgIExNOOAgTE244CBMTjvvIzkv53mjIHlhYvliLbnmoTljp/liJnjgII8L3A+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvbnQyXCI+PC9kaXY+XG5cbiAgICAgICAgICAgIDxoMz7lrZfph408L2gzPlxuICAgICAgICAgICAgPHA+5a2X6YeN5Y+q5Ye6546wIHJlZ3VsYXIg5Lul5Y+KIG1lZGl1bSDnmoTkuKTnp43lrZfkvZPph43ph4/vvIzliIbliKvlr7nlupTku6PnoIHkuK3nmoQgNDAwIOWSjCA1MDDjgILlnKjoi7HmloflrZfkvZPliqDnspfnmoTmg4XlhrXkuIvkvJrph4fnlKggc2VtaWJvbGQg55qE5a2X5L2T6YeN6YeP77yM5a+55bqU5Luj56CB5Lit55qEIDYwMOOAgjwvcD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9udDNcIj48L2Rpdj5cbiAgICAgICAgICAgIDxwPuS4i+mdouaYr+Wtl+mHjeWPgueFp+ihqDwvcD5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPFRhYmxlIFxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e3dpZHRoOiA3ODB9fVxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zPXtmb250d2VpZ2h0X2NvbHVtbnN9XG4gICAgICAgICAgICAgICAgICAgIGRhdGE9e2ZvbnR3ZWlnaHRfZGF0YX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICDnibnmroror7TmmI7vvJo8YnIgLz5cbiAgICAgICAgICAgICAgICA8Y2l0ZT5cbiAgICAgICAgICAgICAgICDlpoLmnpzmjIflrprnmoTmnYPph43lgLzkuI3lj6/nlKjvvIzliJnkvb/nlKjku6XkuIvop4TliJnmnaXnoa7lrprlrp7pmYXlkYjnjrDnmoTmnYPph43vvJo8YnIgLz5cbiAgICAgICAgICAgICAgICDlpoLmnpzmjIflrprnmoTmnYPph43lgLzlnKggNDAw5ZKMIDUwMOS5i+mXtO+8iOWMheaLrDQwMOWSjDUwMO+8ie+8mjxiciAvPlxuICAgICAgICAgICAgICAgIOaMieWNh+W6j+afpeaJvuaMh+WumuWAvOS4jjUwMOS5i+mXtOeahOWPr+eUqOadg+mHje+8mzxiciAvPlxuICAgICAgICAgICAgICAgIOWmguaenOacquaJvuWIsOWMuemFjemhue+8jOaMiemZjeW6j+afpeaJvuWwj+S6juaMh+WumuWAvOeahOWPr+eUqOadg+mHje+8mzxiciAvPlxuICAgICAgICAgICAgICAgIOWmguaenOacquaJvuWIsOWMuemFjemhue+8jOaMieWNh+W6j+afpeaJvuWkp+S6jjUwMOeahOWPr+eUqOadg+mHjeOAgjxiciAvPlxuICAgICAgICAgICAgICAgIOWmguaenOaMh+WumuWAvOWwj+S6jjQwMO+8jOaMiemZjeW6j+afpeaJvuWwj+S6juaMh+WumuWAvOeahOWPr+eUqOadg+mHjeOAgiDlpoLmnpzmnKrmib7liLDljLnphY3pobnvvIzmjInljYfluo/mn6Xmib7lpKfkuo7mjIflrprlgLznmoTlj6/nlKjmnYPph43vvIjlhYjlsL3lj6/og73nmoTlsI/vvIzlho3lsL3lj6/og73nmoTlpKfvvInjgII8YnIgLz5cbiAgICAgICAgICAgICAgICDlpoLmnpzmjIflrprlgLzlpKfkuo41MDDvvIzmjInljYfluo/mn6Xmib7lpKfkuo7mjIflrprlgLznmoTlj6/nlKjmnYPph43jgIIg5aaC5p6c5pyq5om+5Yiw5Yy56YWN6aG577yM5oyJ6ZmN5bqP5p+l5om+5bCP5LqO5oyH5a6a5YC855qE5Y+v55So5p2D6YeN77yI5YWI5bC95Y+v6IO955qE5aSn77yM5YaN5bC95Y+v6IO955qE5bCP77yJ44CCPGJyIC8+XG4gICAgICAgICAgICAgICAg5Lul5LiK562W55Wl5oSP5ZGz552A77yM5aaC5p6c5LiA5Liq5a2X5L2T5Y+q5pyJIG5vcm1hbCDlkowgYm9sZCDkuKTnp43nspfnu4blgLzpgInmi6nvvIzmjIflrprnspfnu4blgLzkuLogMTAwLTUwMCDml7bvvIzlrp7pmYXmuLLmn5Pml7blsIbkvb/nlKggbm9ybWFs77yM5oyH5a6a57KX57uG5YC85Li6IDYwMC05MDAg5pe277yM5a6e6ZmF5riy5p+T5pe25bCG5L2/55SoIGJvbGQg44CCXG4gICAgICAgICAgICAgICAgPC9jaXRlPlxuICAgICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgICA8aDM+5bqU55So5Zy65ZCIPC9oMz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9udDRcIj48L2Rpdj5cblxuICAgICAgICAgICAgPGgzPuWOn+WImTwvaDM+XG4gICAgICAgICAgICA8cD7lsJHljbPmmK/lpJrvvJrlnKjop4bop4nlsZXnjrDkuIrog73lpJ/nlKjlsL3ph4/lsJHnmoTmoLflvI/ljrvlrp7njrDorr7orqHnm67nmoTjgILpgb/lhY3mr6vml6DmhI/kuYnnmoTkvb/nlKjlpKfph4/lrZfpmLbjgIHpopzoibLjgIHlrZfph43lvLrosIPop4bop4nph43ngrnmiJblr7nmr5TlhbPns7vjgII8L3A+XG4gICAgICAgIDwvTGF5b3V0PlxuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=
(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{273:function(e,t,o){var i=o(274);"string"==typeof i&&(i=[[e.i,i,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};o(6)(i,r);i.locals&&(e.exports=i.locals)},274:function(e,t,o){(e.exports=o(5)(!1)).push([e.i,"",""])},437:function(e,t,o){"use strict";o.r(t),o.d(t,"default",function(){return y});var i=o(0),r=o.n(i),a=o(62),n=o(2);o(273);function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(){return(s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var i in o)Object.prototype.hasOwnProperty.call(o,i)&&(e[i]=o[i])}return e}).apply(this,arguments)}function c(e,t){for(var o=0;o<t.length;o++){var i=t[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function h(e,t){return!t||"object"!==l(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function p(e){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function u(e,t){return(u=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var y=function(e){function t(e){var o;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(o=h(this,p(t).call(this,e))).state={child:[],line:{title:{text:"多条折线图模板"},xAxis:{type:"category",boundaryGap:!1,axisLine:{lineStyle:{color:"#e0e0e0"}},axisLabel:{color:"#333"},data:["周一","周二","周三","周四","周五","周六","周日"]},yAxis:{type:"value",axisLine:{show:!1},axisTick:{show:!1},splitLine:{show:!0,lineStyle:{type:"dashed",color:"#E9E9E9"}}},series:[{name:"点评数",type:"line",showSymbol:!1,smooth:!0,barWidth:20,itemStyle:{color:"#45a2fc"},data:[120,110,80,234,5,4]},{name:"好评率",type:"line",showSymbol:!1,smooth:!0,barWidth:20,itemStyle:{color:"#57ca77"},data:[110,10,120,124,95,204]}]},bar:{title:{text:"普通柱状图"},grid:{top:100,left:50,right:0,bottom:25},tooltip:{trigger:"axis"},legend:{x:80,y:"top"},xAxis:{type:"category",axisLine:{lineStyle:{color:"#e0e0e0"}},axisTick:{show:!1},axisLabel:{color:"#333"},data:["周一","周二","周三","周四","周五","周六","周日"]},yAxis:{type:"value",axisLine:{show:!1},axisTick:{show:!1},splitLine:{show:!0,lineStyle:{type:"dashed",color:"#E9E9E9"}}},series:[{type:"bar",showSymbol:!1,smooth:!0,barWidth:20,itemStyle:{color:"#45a2fc"},data:[120,110,80,234,5,4]}]},bar2:{title:{text:"普通条形图"},grid:{top:100,left:50,right:0,bottom:25},tooltip:{trigger:"axis"},legend:{x:80,y:"top"},xAxis:{type:"value",axisLine:{show:!1},axisTick:{show:!1},splitLine:{show:!0,lineStyle:{type:"dashed",color:"#E9E9E9"}}},yAxis:{type:"category",axisTick:{show:!1},axisLine:{lineStyle:{color:"#e0e0e0"}},axisLabel:{color:"#333"},data:["周一","周二","周三","周四","周五","周六","周日"]},series:[{type:"bar",showSymbol:!1,smooth:!0,barWidth:20,itemStyle:{color:"#45a2fc"},data:[120,110,80,234,5,4]}]},pie:{tooltip:{trigger:"item",formatter:"{b}: {c}<br />占比：{d}%"},legend:{orient:"horizontal",x:80,y:"top"},series:[{type:"pie",showSymbol:!1,smooth:!0,barWidth:20,data:[{name:"展会占比",value:20,itemStyle:{color:"#45a2fc"}},{name:"情侣出行占比",value:50,itemStyle:{color:"#57ca77"}},{name:"旅游占比",value:80,itemStyle:{color:"#fed465"}},{name:"家人出行占比",value:100,itemStyle:{color:"#9766e1"}},{name:"商务出行占比",value:130,itemStyle:{color:"#ff856a"}}]}]}},o}var o,l,y;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&u(e,t)}(t,i["Component"]),o=t,(l=[{key:"componentWillMount",value:function(){this.childs()}},{key:"childs",value:function(){var e=[];e.push({title:"线",children:r.a.createElement("div",{className:"code-demo"},r.a.createElement(n.Chart,{option:this.state.line}))}),e.push({title:"柱",children:r.a.createElement("div",{className:"code-demo"},r.a.createElement(n.Chart,{option:this.state.bar}))}),e.push({title:"饼",children:r.a.createElement("div",{className:"code-demo"},r.a.createElement(n.Chart,{notUseDefault:!0,option:this.state.pie}))}),e.push({title:"圆环",children:r.a.createElement("div",{className:"code-demo"},r.a.createElement(n.Chart.ProgressCircle,{value:60,startColor:"#FF9645",endColor:"#FF9645",width:300,height:300}))}),this.setState({childs:e})}},{key:"render",value:function(){var e=this.state.childs;return r.a.createElement(a.a,s({},this.props,{keyword:"chart",className:"main-chart-box",title:"Chart",desc:"图表让数据表达更符合用户心理，帮助『设计者』孵化出更具业务特性的可视化解决方案以满足个性化设计需求。注：需要手工引入Echart",childs:e}))}}])&&c(o.prototype,l),y&&c(o,y),t}();y.displayName="ChartDemo"}}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jbGllbnQvcGFnZXMvY29tcG9uZW50L2NoYXJ0L2luZGV4Lmxlc3M/YzZjYiIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcGFnZXMvY29tcG9uZW50L2NoYXJ0L2luZGV4Lmxlc3MiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3BhZ2VzL2NvbXBvbmVudC9jaGFydC9pbmRleC5qcyJdLCJuYW1lcyI6WyJjb250ZW50IiwiX193ZWJwYWNrX3JlcXVpcmVfXyIsIm1vZHVsZSIsImkiLCJvcHRpb25zIiwiaG1yIiwidHJhbnNmb3JtIiwiaW5zZXJ0SW50byIsInVuZGVmaW5lZCIsImxvY2FscyIsImV4cG9ydHMiLCJwdXNoIiwiQ2hhcnREZW1vIiwicHJvcHMiLCJfdGhpcyIsIl9jbGFzc0NhbGxDaGVjayIsInRoaXMiLCJfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybiIsIl9nZXRQcm90b3R5cGVPZiIsImNhbGwiLCJzdGF0ZSIsImNoaWxkIiwibGluZSIsInRpdGxlIiwidGV4dCIsInhBeGlzIiwidHlwZSIsImJvdW5kYXJ5R2FwIiwiYXhpc0xpbmUiLCJsaW5lU3R5bGUiLCJjb2xvciIsImF4aXNMYWJlbCIsImRhdGEiLCJ5QXhpcyIsInNob3ciLCJheGlzVGljayIsInNwbGl0TGluZSIsInNlcmllcyIsIm5hbWUiLCJzaG93U3ltYm9sIiwic21vb3RoIiwiYmFyV2lkdGgiLCJpdGVtU3R5bGUiLCJiYXIiLCJncmlkIiwidG9wIiwibGVmdCIsInJpZ2h0IiwiYm90dG9tIiwidG9vbHRpcCIsInRyaWdnZXIiLCJsZWdlbmQiLCJ4IiwieSIsImJhcjIiLCJwaWUiLCJmb3JtYXR0ZXIiLCJvcmllbnQiLCJ2YWx1ZSIsIkNvbXBvbmVudCIsImNoaWxkcyIsImNoaWxkcmVuIiwicmVhY3RfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfX19kZWZhdWx0IiwiYSIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJ0dmlydXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzJfXyIsIm9wdGlvbiIsIm5vdFVzZURlZmF1bHQiLCJQcm9ncmVzc0NpcmNsZSIsInN0YXJ0Q29sb3IiLCJlbmRDb2xvciIsIndpZHRoIiwiaGVpZ2h0Iiwic2V0U3RhdGUiLCJfY29tbW9uX3dlYmNvbXBvbmVudF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fIiwiX2V4dGVuZHMiLCJrZXl3b3JkIiwiZGVzYyJdLCJtYXBwaW5ncyI6IjhFQUNBLElBQUFBLEVBQWNDLEVBQVEsS0FFdEIsaUJBQUFELE1BQUEsRUFBNENFLEVBQUFDLEVBQVNILEVBQUEsTUFPckQsSUFBQUksRUFBQSxDQUFlQyxLQUFBLEVBRWZDLGVBUEFBLEVBUUFDLGdCQUFBQyxHQUVhUCxFQUFRLEVBQVJBLENBQWlFRCxFQUFBSSxHQUU5RUosRUFBQVMsU0FBQVAsRUFBQVEsUUFBQVYsRUFBQVMsOEJDakJBUCxFQUFBUSxRQUEyQlQsRUFBUSxFQUFSQSxFQUE2RCxJQUt4RlUsS0FBQSxDQUFjVCxFQUFBQyxFQUFTLDJuQ0NFRlMsY0FDakIsU0FBQUEsRUFBWUMsR0FBTSxJQUFBQyxFQUFBLG1HQUFBQyxDQUFBQyxLQUFBSixJQUNkRSxFQUFBRyxFQUFBRCxLQUFBRSxFQUFBTixHQUFBTyxLQUFBSCxLQUFNSCxLQUNETyxNQUFRLENBQ1RDLE1BQU8sR0FDUEMsS0FBTSxDQUNGQyxNQUFPLENBQ0hDLEtBQU0sV0FFVkMsTUFBTyxDQUNIQyxLQUFNLFdBQ05DLGFBQWEsRUFDYkMsU0FBVSxDQUNOQyxVQUFXLENBQ1BDLE1BQU8sWUFHZkMsVUFBVyxDQUNQRCxNQUFPLFFBRVhFLEtBQU0sQ0FBQyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxPQUV6Q0MsTUFBUSxDQUNKUCxLQUFPLFFBQ1BFLFNBQVUsQ0FDTk0sTUFBTSxHQUVWQyxTQUFTLENBQ0xELE1BQU0sR0FFVkUsVUFBVSxDQUNORixNQUFNLEVBQ05MLFVBQVUsQ0FDTkgsS0FBSyxTQUNMSSxNQUFPLGFBS25CTyxPQUFRLENBQ0osQ0FDSUMsS0FBTSxNQUNOWixLQUFNLE9BQ05hLFlBQVksRUFDWkMsUUFBUSxFQUNSQyxTQUFVLEdBQ1ZDLFVBQVUsQ0FDTlosTUFBTyxXQUdYRSxLQUFNLENBQ0YsSUFDQSxJQUNBLEdBQ0EsSUFDQSxFQUNBLElBR1IsQ0FDSU0sS0FBTSxNQUNOWixLQUFNLE9BQ05hLFlBQVksRUFDWkMsUUFBUSxFQUNSQyxTQUFVLEdBQ1ZDLFVBQVUsQ0FDTlosTUFBTyxXQUdYRSxLQUFNLENBQ0YsSUFDQSxHQUNBLElBQ0EsSUFDQSxHQUNBLFFBS2hCVyxJQUFLLENBQ0RwQixNQUFPLENBQ0hDLEtBQU0sU0FFVm9CLEtBQU0sQ0FDRkMsSUFBSyxJQUNMQyxLQUFNLEdBQ05DLE1BQU8sRUFDUEMsT0FBUSxJQUVaQyxRQUFTLENBQ0xDLFFBQVMsUUFFYkMsT0FBUSxDQUNKQyxFQUFHLEdBQ0hDLEVBQUcsT0FFUDVCLE1BQU8sQ0FDSEMsS0FBTyxXQUNQRSxTQUFVLENBQ05DLFVBQVcsQ0FDUEMsTUFBTyxZQUdmSyxTQUFTLENBQ0xELE1BQU0sR0FFVkgsVUFBVyxDQUNQRCxNQUFPLFFBRVhFLEtBQU0sQ0FBQyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxPQUV6Q0MsTUFBUSxDQUNKUCxLQUFNLFFBQ05FLFNBQVUsQ0FDTk0sTUFBTSxHQUVWQyxTQUFTLENBQ0xELE1BQU0sR0FFVkUsVUFBVSxDQUNORixNQUFNLEVBQ05MLFVBQVUsQ0FDTkgsS0FBSyxTQUNMSSxNQUFPLGFBS25CTyxPQUFRLENBQ0osQ0FDSVgsS0FBTSxNQUNOYSxZQUFZLEVBQ1pDLFFBQVEsRUFDUkMsU0FBVSxHQUNWQyxVQUFVLENBQ05aLE1BQU8sV0FHWEUsS0FBTSxDQUNGLElBQ0EsSUFDQSxHQUNBLElBQ0EsRUFDQSxNQUtoQnNCLEtBQU0sQ0FDRi9CLE1BQU8sQ0FDSEMsS0FBTSxTQUVWb0IsS0FBTSxDQUNGQyxJQUFLLElBQ0xDLEtBQU0sR0FDTkMsTUFBTyxFQUNQQyxPQUFRLElBRVpDLFFBQVMsQ0FDTEMsUUFBUyxRQUViQyxPQUFRLENBQ0pDLEVBQUcsR0FDSEMsRUFBRyxPQUVQNUIsTUFBTyxDQUNIQyxLQUFNLFFBQ05FLFNBQVUsQ0FDTk0sTUFBTSxHQUVWQyxTQUFTLENBQ0xELE1BQU0sR0FFVkUsVUFBVSxDQUNORixNQUFNLEVBQ05MLFVBQVUsQ0FDTkgsS0FBSyxTQUNMSSxNQUFPLGFBSW5CRyxNQUFRLENBQ0pQLEtBQU8sV0FDUFMsU0FBUyxDQUNMRCxNQUFNLEdBRVZOLFNBQVUsQ0FDTkMsVUFBVyxDQUNQQyxNQUFPLFlBR2ZDLFVBQVcsQ0FDUEQsTUFBTyxRQUVYRSxLQUFNLENBQUMsS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssT0FHekNLLE9BQVEsQ0FDSixDQUNJWCxLQUFNLE1BQ05hLFlBQVksRUFDWkMsUUFBUSxFQUNSQyxTQUFVLEdBQ1ZDLFVBQVUsQ0FDTlosTUFBTyxXQUdYRSxLQUFNLENBQ0YsSUFDQSxJQUNBLEdBQ0EsSUFDQSxFQUNBLE1BS2hCdUIsSUFBSyxDQUNETixRQUFTLENBQ0xDLFFBQVMsT0FDVE0sVUFBVyx5QkFFZkwsT0FBUSxDQUNKTSxPQUFRLGFBQ1JMLEVBQUcsR0FDSEMsRUFBRyxPQUVQaEIsT0FBUSxDQUNKLENBRUlYLEtBQU0sTUFDTmEsWUFBWSxFQUNaQyxRQUFRLEVBQ1JDLFNBQVUsR0FFVlQsS0FBTSxDQUNGLENBQ0lNLEtBQU0sT0FDTm9CLE1BQU8sR0FDUGhCLFVBQVUsQ0FDTlosTUFBTyxZQUdmLENBQ0lRLEtBQU0sU0FDTm9CLE1BQU8sR0FDUGhCLFVBQVUsQ0FDTlosTUFBTyxZQUdmLENBQ0lRLEtBQU0sT0FDTm9CLE1BQU8sR0FDUGhCLFVBQVUsQ0FDTlosTUFBTyxZQUdmLENBQ0lRLEtBQU0sU0FDTm9CLE1BQU8sSUFDUGhCLFVBQVUsQ0FDTlosTUFBTyxZQUdmLENBQ0lRLEtBQU0sU0FDTm9CLE1BQU8sSUFDUGhCLFVBQVUsQ0FDTlosTUFBTyxpQkE5UXJCaEIsd1BBRGlCNkMsbUVBMFIvQjNDLEtBQUs0QywwQ0FJTCxJQUFNQSxFQUFTLEdBQ2ZBLEVBQU9qRCxLQUFLLENBQ1JZLE1BQU8sSUFDUHNDLFNBQ0lDLEVBQUFDLEVBQUFDLGNBQUEsT0FBS0MsVUFBVSxhQUNYSCxFQUFBQyxFQUFBQyxjQUFDRSxFQUFBLE1BQUQsQ0FBT0MsT0FBUW5ELEtBQUtJLE1BQU1FLFVBS3RDc0MsRUFBT2pELEtBQUssQ0FDUlksTUFBTyxJQUNQc0MsU0FDSUMsRUFBQUMsRUFBQUMsY0FBQSxPQUFLQyxVQUFVLGFBQ1hILEVBQUFDLEVBQUFDLGNBQUNFLEVBQUEsTUFBRCxDQUFPQyxPQUFRbkQsS0FBS0ksTUFBTXVCLFNBS3RDaUIsRUFBT2pELEtBQUssQ0FDUlksTUFBTyxJQUNQc0MsU0FDSUMsRUFBQUMsRUFBQUMsY0FBQSxPQUFLQyxVQUFVLGFBQ1hILEVBQUFDLEVBQUFDLGNBQUNFLEVBQUEsTUFBRCxDQUFPRSxlQUFlLEVBQU1ELE9BQVFuRCxLQUFLSSxNQUFNbUMsU0FLM0RLLEVBQU9qRCxLQUFLLENBQ1JZLE1BQU8sS0FDUHNDLFNBQ0lDLEVBQUFDLEVBQUFDLGNBQUEsT0FBS0MsVUFBVSxhQUNYSCxFQUFBQyxFQUFBQyxjQUFDRSxFQUFBLE1BQU1HLGVBQVAsQ0FBc0JYLE1BQU8sR0FBSVksV0FBVyxVQUFVQyxTQUFTLFVBQVVDLE1BQU8sSUFBS0MsT0FBUSxTQUt6R3pELEtBQUswRCxTQUFTLENBQUNkLDRDQUdWLElBQ0VBLEVBQVU1QyxLQUFLSSxNQUFmd0MsT0FFUCxPQUFPRSxFQUFBQyxFQUFBQyxjQUFDVyxFQUFBLEVBQURDLEVBQUEsR0FBWTVELEtBQUtILE1BQWpCLENBQ1pnRSxRQUFRLFFBQ0NaLFVBQVUsaUJBQ1YxQyxNQUFNLFFBQ051RCxLQUFLLG1FQUNMbEIsT0FBUUEsMENBOVVDaEQiLCJmaWxlIjoiMjQuZmFhMWUzYTUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xlc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaW5kZXgubGVzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xlc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaW5kZXgubGVzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9sZXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2luZGV4Lmxlc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsIlxuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBMYXlvdXQgZnJvbSAnLi4vLi4vLi4vY29tbW9uL3dlYmNvbXBvbmVudCc7XG5cbmltcG9ydCB7IENoYXJ0IH0gZnJvbSAndHZpcnVzJztcbmltcG9ydCAnLi9pbmRleC5sZXNzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGFydERlbW8gZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBjaGlsZDogW10sXG4gICAgICAgICAgICBsaW5lOiB7XG4gICAgICAgICAgICAgICAgdGl0bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ+WkmuadoeaKmOe6v+WbvuaooeadvydcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHhBeGlzOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdjYXRlZ29yeScsXG4gICAgICAgICAgICAgICAgICAgIGJvdW5kYXJ5R2FwOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgYXhpc0xpbmU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVTdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnI2UwZTBlMCdcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgYXhpc0xhYmVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyMzMzMnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFsn5ZGo5LiAJywn5ZGo5LqMJywn5ZGo5LiJJywn5ZGo5ZubJywn5ZGo5LqUJywn5ZGo5YWtJywn5ZGo5pelJ11cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHlBeGlzIDogeyBcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA6ICd2YWx1ZScsXG4gICAgICAgICAgICAgICAgICAgIGF4aXNMaW5lOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93OiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBheGlzVGljazp7IFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvdzogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgc3BsaXRMaW5lOnsgXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVTdHlsZTp7IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6J2Rhc2hlZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjRTlFOUU5J1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgc2VyaWVzOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICfngrnor4TmlbAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2xpbmUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1N5bWJvbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBzbW9vdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXJXaWR0aDogMjAsXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtU3R5bGU6e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnIzQ1YTJmYycsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAxMjAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMTEwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDgwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDIzNCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA1LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDRcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ+WlveivhOeOhycsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnbGluZScsXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93U3ltYm9sOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNtb290aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhcldpZHRoOiAyMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1TdHlsZTp7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjNTdjYTc3JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDExMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAxMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAxMjAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMTI0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDk1LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDIwNFxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJhcjoge1xuICAgICAgICAgICAgICAgIHRpdGxlOiB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICfmma7pgJrmn7Hnirblm74nXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBncmlkOiB7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogMTAwLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiA1MCxcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IDAsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbTogMjVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHRvb2x0aXA6IHtcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcjogJ2F4aXMnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBsZWdlbmQ6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogODAsXG4gICAgICAgICAgICAgICAgICAgIHk6ICd0b3AnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB4QXhpczoge1xuICAgICAgICAgICAgICAgICAgICB0eXBlIDogJ2NhdGVnb3J5JyxcbiAgICAgICAgICAgICAgICAgICAgYXhpc0xpbmU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVTdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnI2UwZTBlMCdcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgYXhpc1RpY2s6eyBcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3c6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGF4aXNMYWJlbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjMzMzJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbJ+WRqOS4gCcsJ+WRqOS6jCcsJ+WRqOS4iScsJ+WRqOWbmycsJ+WRqOS6lCcsJ+WRqOWFrScsJ+WRqOaXpSddLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgeUF4aXMgOiB7IFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAndmFsdWUnLFxuICAgICAgICAgICAgICAgICAgICBheGlzTGluZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hvdzogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgYXhpc1RpY2s6eyBcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3c6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHNwbGl0TGluZTp7IFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lU3R5bGU6eyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOidkYXNoZWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnI0U5RTlFOSdcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHNlcmllczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnYmFyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3dTeW1ib2w6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc21vb3RoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmFyV2lkdGg6IDIwLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVN0eWxlOntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyM0NWEyZmMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMTIwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDExMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA4MCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAyMzQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgNSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA0XG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFyMjoge1xuICAgICAgICAgICAgICAgIHRpdGxlOiB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICfmma7pgJrmnaHlvaLlm74nXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBncmlkOiB7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogMTAwLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiA1MCxcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IDAsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbTogMjVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHRvb2x0aXA6IHtcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcjogJ2F4aXMnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBsZWdlbmQ6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogODAsXG4gICAgICAgICAgICAgICAgICAgIHk6ICd0b3AnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB4QXhpczoge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAndmFsdWUnLFxuICAgICAgICAgICAgICAgICAgICBheGlzTGluZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hvdzogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgYXhpc1RpY2s6eyBcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3c6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHNwbGl0TGluZTp7IFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lU3R5bGU6eyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOidkYXNoZWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnI0U5RTlFOSdcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHlBeGlzIDogeyBcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA6ICdjYXRlZ29yeScsXG4gICAgICAgICAgICAgICAgICAgIGF4aXNUaWNrOnsgXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93OiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBheGlzTGluZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGluZVN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjZTBlMGUwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBheGlzTGFiZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnIzMzMydcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogWyflkajkuIAnLCflkajkuownLCflkajkuIknLCflkajlm5snLCflkajkupQnLCflkajlha0nLCflkajml6UnXSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHNlcmllczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnYmFyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3dTeW1ib2w6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc21vb3RoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmFyV2lkdGg6IDIwLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVN0eWxlOntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyM0NWEyZmMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMTIwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDExMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA4MCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAyMzQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgNSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA0XG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGllOiB7XG4gICAgICAgICAgICAgICAgdG9vbHRpcDoge1xuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyOiAnaXRlbScsXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlcjogXCJ7Yn06IHtjfTxiciAvPuWNoOavlO+8mntkfSVcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbGVnZW5kOiB7XG4gICAgICAgICAgICAgICAgICAgIG9yaWVudDogJ2hvcml6b250YWwnLFxuICAgICAgICAgICAgICAgICAgICB4OiA4MCxcbiAgICAgICAgICAgICAgICAgICAgeTogJ3RvcCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNlcmllczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdwaWUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1N5bWJvbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBzbW9vdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXJXaWR0aDogMjAsXG4gICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ+WxleS8muWNoOavlCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAyMCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1TdHlsZTp7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyM0NWEyZmMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICfmg4XkvqPlh7rooYzljaDmr5QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogNTAsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtU3R5bGU6e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjNTdjYTc3JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAn5peF5ri45Y2g5q+UJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDgwLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVN0eWxlOntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnI2ZlZDQ2NScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ+WutuS6uuWHuuihjOWNoOavlCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAxMDAsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtU3R5bGU6e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjOTc2NmUxJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAn5ZWG5Yqh5Ye66KGM5Y2g5q+UJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDEzMCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1TdHlsZTp7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyNmZjg1NmEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCl7XG4gICAgICAgIHRoaXMuY2hpbGRzKCk7XG4gICAgfVxuXG4gICAgY2hpbGRzKCl7XG4gICAgICAgIGNvbnN0IGNoaWxkcyA9IFtdO1xuICAgICAgICBjaGlsZHMucHVzaCh7XG4gICAgICAgICAgICB0aXRsZTogJ+e6vycsXG4gICAgICAgICAgICBjaGlsZHJlbjogKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29kZS1kZW1vXCI+XG4gICAgICAgICAgICAgICAgICAgIDxDaGFydCBvcHRpb249e3RoaXMuc3RhdGUubGluZX0vPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKVxuICAgICAgICB9KTtcblxuICAgICAgICBjaGlsZHMucHVzaCh7XG4gICAgICAgICAgICB0aXRsZTogJ+afsScsXG4gICAgICAgICAgICBjaGlsZHJlbjogKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29kZS1kZW1vXCI+XG4gICAgICAgICAgICAgICAgICAgIDxDaGFydCBvcHRpb249e3RoaXMuc3RhdGUuYmFyfS8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNoaWxkcy5wdXNoKHtcbiAgICAgICAgICAgIHRpdGxlOiAn6aW8JyxcbiAgICAgICAgICAgIGNoaWxkcmVuOiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2RlLWRlbW9cIj5cbiAgICAgICAgICAgICAgICAgICAgPENoYXJ0IG5vdFVzZURlZmF1bHQ9e3RydWV9IG9wdGlvbj17dGhpcy5zdGF0ZS5waWV9Lz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY2hpbGRzLnB1c2goe1xuICAgICAgICAgICAgdGl0bGU6ICflnIbnjq8nLFxuICAgICAgICAgICAgY2hpbGRyZW46IChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvZGUtZGVtb1wiPlxuICAgICAgICAgICAgICAgICAgICA8Q2hhcnQuUHJvZ3Jlc3NDaXJjbGUgdmFsdWU9ezYwfSBzdGFydENvbG9yPVwiI0ZGOTY0NVwiIGVuZENvbG9yPVwiI0ZGOTY0NVwiIHdpZHRoPXszMDB9IGhlaWdodD17MzAwfSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtjaGlsZHN9KVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3Qge2NoaWxkc30gPSB0aGlzLnN0YXRlO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIDxMYXlvdXQgey4uLnRoaXMucHJvcHN9IFxuXHRcdFx0a2V5d29yZD1cImNoYXJ0XCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1haW4tY2hhcnQtYm94XCJcbiAgICAgICAgICAgIHRpdGxlPVwiQ2hhcnRcIlxuICAgICAgICAgICAgZGVzYz1cIuWbvuihqOiuqeaVsOaNruihqOi+vuabtOespuWQiOeUqOaIt+W/g+eQhu+8jOW4ruWKqeOAjuiuvuiuoeiAheOAj+WtteWMluWHuuabtOWFt+S4muWKoeeJueaAp+eahOWPr+inhuWMluino+WGs+aWueahiOS7pea7oei2s+S4quaAp+WMluiuvuiuoemcgOaxguOAguazqO+8mumcgOimgeaJi+W3peW8leWFpUVjaGFydFwiXG4gICAgICAgICAgICBjaGlsZHM9e2NoaWxkc31cbiAgICAgICAgLz5cbiAgICB9XG59XG4gICAgICAgICAgICBcbiJdLCJzb3VyY2VSb290IjoiIn0=
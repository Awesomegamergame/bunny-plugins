(function(t,o,c){"use strict";const{View:r}=o.ReactNative,e=function(n){return typeof n=="string"?n.replace(/-/g," "):Array.isArray(n)?n.map(e):n&&typeof n=="object"&&n.props&&n.props.children?{...n,props:{...n.props,children:e(n.props.children)}}:n},p=function(){return c.after("render",r,function(n,s){return e(s)})},i=p(),a=function(){i()};return t.onUnload=a,t})({},vendetta.metro.common,vendetta.patcher);

require("babel-polyfill");
var react = require("react");
var reactDom = require("react-dom");

var {RootComponent} = require("react-route-system");

window.onload = function(){
	reactDom.render(react.createElement(RootComponent,{component:require("./app")}),document.body);
};

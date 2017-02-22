var react = require("react");
var Input = require("./input.js");

module.exports = class Component extends react.Component{
	constructor(props,context){
		super(props,context);
		this.componentWillReceiveProps(props);
	}
	componentWillReceiveProps(props){
		this.text = (props.value!==null && props.value !== undefined)?(props.value+""):"";
	}
	render(){
		return react.createElement(Input,{type:"text",value:this.text,onChange:this.onChange.bind(this),onBlur:this.onBlur.bind(this),errors:this.props.errors,className:this.props.className,disabled:this.props.disabled});
	}
	onBlur(){
		this.props.onChange(this.text.length?(parseFloat(this.text)||0):null);
	}
	onChange(text){
		this.text = text;
		this.forceUpdate();
	}
}
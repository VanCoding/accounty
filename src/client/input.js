var react = require("react");
var Textarea = require("react-autosize-textarea");
module.exports = class Input extends react.Component{
	constructor(props,context){
		super(props,context);
		this.componentWillReceiveProps(props);
	}
	async componentWillReceiveProps(props){
		this.value = props.value;
		if(props.options){
			var opts = props.options;
			this.options = (props.allowNull?[{value:null,label:""}]:[]).concat(opts);
			var val = this.value;
			this.value = "0";
			for(var i = 0; i < this.options.length; i++){
				if(this.options[i].value == val){
					this.value = i+"";
					break;
				}
			}
			this.forceUpdate();
		}else{
			delete this.options;
		}
	}
	render(){
		var component = ["select","textarea"].indexOf(this.props.type)>=0?this.props.type:"input";
		if(component == "textarea") component = Textarea;
		var isCheckbox = this.props.type=="checkbox"||this.props.type=="radio";
		var props = Object.assign({},this.props,{
			ref:"input",
			value:!isCheckbox?this.value:undefined,
			checked:isCheckbox?this.value:undefined,
			onChange:this.onChange.bind(this),
			onBlur:this.onBlur.bind(this),
			className:(isCheckbox?"":"form-control")+(this.props.errors.length?" has-error":"")+(this.props.className?(" "+this.props.className):""),
			onKeyDown:this.onKeyDown.bind(this)
		});
		var children = this.props.children;
		if(this.props.type=="select" && this.options){
			children = this.options.map((o,i)=>react.createElement("option",{value:i+""},o.label))
		}
		delete props.errors;
		delete props.dataProvider;
		delete props.allowNull;
		return react.createElement.apply(react,[component,props].concat(children));
	}
	onChange(e){
		this.value = this.props.type == "checkbox" || this.props.type=="radios"?e.target.checked:e.target.value;
		if(this.props.type == "select" && this.options){
			this.value = this.options[parseFloat(this.value)].value;
		}
		if(this.props.type != "text" && this.props.type != "textarea" && this.props.type != "password"){
			this.props.onChange(this.value);
		}else{
			this.forceUpdate();
		}
	}
	onKeyDown(e){
		if(e.keyCode == 13) this.refs.input.blur();
	}
	onBlur(e){
		if(this.props.type == "text" || this.props.type == "textarea" || this.props.type == "password"){
			this.props.onChange(this.value);
		}
		if(this.props.onBlur) this.props.onBlur(e);
	}
}

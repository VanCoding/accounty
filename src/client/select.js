var ReactSelect = require("react-select").Async;
var react = require("react");

class Select extends react.Component{
	componentDidMount(){
		this.componentWillReceiveProps(this.props);
		this.mounted = true;
	}
	componentWillUnmount(){
		delete this.mounted;
	}

	componentWillReceiveProps(props){
		this.updateValue(props.value);
	}

	async updateValue(value,label){
		if(value == this.value) return;
		this.value = value;
		this.label = label;
		this.forceUpdate();
		if(value && !label && this.getLabel){
			this.label = await this.getLabel(value);
			if(!this.mounted) return;
			this.forceUpdate();
		}
	}

	async _loadOptions(term){
		return {options:await this.loadOptions(term)}
	}
	render(){
		return react.createElement(ReactSelect,Object.assign({cache:false},this.props,{loadOptions:this._loadOptions.bind(this),value:this.value?{value:this.value,label:this.label}:null,onChange:this.onChange.bind(this),ref:"select"}))
	}
	onChange(val){
		if(val){
			this.updateValue(val.value,val.label);
			this.props.onChange(val.value);
		}else{
			this.updateValue(null);
			this.props.onChange(null);
		}
	}
	select(){
		this.refs.select.focus();
	}
}
module.exports = Select;

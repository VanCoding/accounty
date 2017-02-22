var react = require("react");
var DatePicker = require("react-widgets/lib/DateTimePicker");
var moment = require("moment");
require("moment/locale/de");
moment.locale("de");

require("react-widgets/lib/localizers/moment")(moment);

module.exports = class Component extends react.Component{
	render(){
		return react.createElement(DatePicker,Object.assign({},this.props,{ref:"picker",time:false,onChange:this.onChange.bind(this),value:this.props.value?new Date(this.props.value):null,format:"L"}))
	}
	onChange(date){
		this.props.onChange(date?date.getTime():null);
	}
}

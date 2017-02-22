var react = require("react");
var DateTimePicker = require("./datetimefield");
var moment = require("moment");
var convert = require("../shared/dayConvert");

module.exports = class Component extends react.Component{
	render(){
		var date = this.props.value;
		if(date !== null && date !== undefined){
			date = convert.toDate(date);
			date = new Date(date.year(),date.month(),date.date()).getTime();
		}
		return react.createElement(DateTimePicker,Object.assign({},this.props,{onChange:this.onChange.bind(this),value:date}))
	}
	onChange(date){
		if(date){
			date = new Date(date);
			date = convert.toDay(moment.utc({year:date.getFullYear(),month:date.getMonth(),day:date.getDate()}))
		}
		this.props.onChange(date);
	}
}

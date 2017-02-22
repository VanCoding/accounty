var Select = require("./select");
var client = require("./client");

module.exports = class PeriodSelect extends Select{
	async loadOptions(term){
		return (await client.getPeriods({})).map(a=>({value:a.id,label:a.name}))
	}
	async getLabel(id){
		return (await client.getPeriod(id)).name;
	}
}

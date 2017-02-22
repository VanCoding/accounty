var Select = require("./select");
var client = require("./client");

module.exports = class AccountSelect extends Select{
	async loadOptions(term){
		return (await client.getAccounts({name:term})).map(a=>({value:a.id,label:a.name}))
	}
	async getLabel(id){
		return (await client.getAccount(id)).name;
	}
}

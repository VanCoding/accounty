var sql = require("sql");
var a = require("../../models").Account;
var b = require("../../models").Booking;
var decimal = require("decimal.js");

module.exports = async function(c){
	var fromBalances = b.subQuery("from").select(b.get("from").max().as("account"),b.amount.sum().as("amount")).group(b.get("from"));
	var toBalances = b.subQuery("to").select(b.to.max().as("account"),b.amount.sum().as("amount")).group(b.to);
	var query = sql
		.select(a.id,a.name,a.number,a.type,a.active,fromBalances.amount.plus(0).as("fromTotal"),toBalances.amount.plus(0).as("toTotal"))
		.from(a
			.leftJoin(fromBalances).on(a.id.equals(fromBalances.account))
			.leftJoin(toBalances).on(a.id.equals(toBalances.account))
		);
	var accounts = await c.db.query(query.toQuery());
	for(var account of accounts){
		account.fromTotal = decimal(account.fromTotal||"0")
		account.toTotal = decimal(account.toTotal||"0")
		account.balance = account.fromTotal.minus(account.toTotal);
	}

	c.set("Content-Type","application/json");
	c.body = JSON.stringify(accounts);
}

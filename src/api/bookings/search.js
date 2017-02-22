var sql = require("sql");
var b = require("../../models").Booking;
var t = require("../../models").Transaction;
var a = require("../../models").Account;

var from = a.as("from");
var to = a.as("to");

module.exports = async function(c){
	var query = sql
		.select(b.id,b.transaction,b.get("from"),b.to,b.amount,t.date.as("transactionDate"),t.comment.as("transactionComment"),from.name.as("fromName"),to.name.as("toName"))
		.from(b
			.join(t).on(b.transaction.equals(t.id))
			.join(from).on(b.get("from").equals(from.id))
			.join(to).on(b.to.equals(to.id))
		);

	if(c.query.transaction){
		query.where(b.transaction.equals(parseFloat(c.query.transaction)));
	}

	query.order([t.date.asc,b.id.asc])

	var bookings = await c.db.query(query.toQuery());

	c.set("Content-Type","application/json");
	c.body = JSON.stringify(bookings);
}

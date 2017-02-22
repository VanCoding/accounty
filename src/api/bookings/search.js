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

	if(c.query.period) query.where(t.period.equals(c.query.period));
	if(c.query.transaction)	query.where(b.transaction.equals(c.query.transaction));
	if(c.query.comment) query.where(t.comment.like("%"+c.query.comment+"%"));
	if(c.query.dateFrom) query.where(t.date.gte(parseFloat(c.query.dateFrom)));
	if(c.query.dateTo) query.where(t.date.lte(parseFloat(c.query.dateTo)));
	if(c.query.amount) query.where(b.amount.equals(c.query.amount));

	query.order([t.date.asc,b.id.asc])

	var bookings = await c.db.query(query.toQuery());

	c.set("Content-Type","application/json");
	c.body = JSON.stringify(bookings);
}

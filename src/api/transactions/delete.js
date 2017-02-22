var t = require("../../models").Transaction;
var b = require("../../models").Booking;

module.exports = async function(c){
	var query = t.delete().where(t.id.equals(parseFloat(c.params.transaction)));
	await c.db.none(query.toQuery());
	var query = b.delete().where(b.transaction.equals(c.params.transaction))
	await c.db.none(query.toQuery());
	c.status = 200;
}

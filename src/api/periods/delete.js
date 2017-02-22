var models = require("../../models");
var p = models.Period;
var a = models.Account;
var t = models.Transaction;
var b = models.Booking;

module.exports = async function(c){
	var query = p.delete().where(p.id.equals(parseFloat(c.params.period)));
	await c.db.none(query.toQuery());
	var query = b.delete().where(b.transaction.in(t.select(t.id).from(t).where(t.period.equals(c.params.period))));
	await c.db.none(query.toQuery());
	var query = t.delete().where(t.period.equals(c.params.period));
	await c.db.none(query.toQuery());
	var query = a.delete().where(a.period.equals(c.params.period));
	await c.db.none(query.toQuery());
	c.status = 200;
}

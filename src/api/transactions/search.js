var sql = require("sql");
var t = require("../../models").Transaction;

module.exports = async function(c){
	var query = sql.select(t.id,t.date,t.comment).from(t);

	if(c.query.period) query.where(t.period.equals(c.query.period));
	if(c.query.comment) query.where(t.comment.like("%"+c.query.comment+"%"));
	if(c.query.dateFrom) query.where(t.date.gte(parseFloat(c.query.dateFrom)));
	if(c.query.dateTo) query.where(t.date.lte(parseFloat(c.query.dateTo)));

	query.order(t.date.asc)

	var transactions = await c.db.query(query.toQuery());

	c.set("Content-Type","application/json");
	c.body = JSON.stringify(transactions);
}

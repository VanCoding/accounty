var sql = require("sql");
var t = require("../../models").Transaction;

module.exports = async function(c){
	var query = sql.select(t.id,t.date,t.comment).from(t).order(t.date.asc);
	var transactions = await c.db.query(query.toQuery());

	c.set("Content-Type","application/json");
	c.body = JSON.stringify(transactions);
}

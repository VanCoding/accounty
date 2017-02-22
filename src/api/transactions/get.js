var sql = require("sql");
var t = require("../../models").Transaction;

module.exports = async function(c){
	var query = sql.select(t.id,t.date,t.comment).from(t).where(t.id.equals(parseFloat(c.params.transaction)));
	var transaction = await c.db.one(query.toQuery());
	if(transaction == null) c.throw(404);
	c.set("Content-Type","application/json");
	c.body = JSON.stringify(transaction);
}

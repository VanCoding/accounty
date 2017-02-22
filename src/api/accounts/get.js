var sql = require("sql");
var a = require("../../models").Account;

module.exports = async function(c){
	var query = sql.select(a.id,a.name,a.number,a.type,a.active).from(a).where(a.id.equals(parseFloat(c.params.account)));
	var account = await c.db.one(query.toQuery());
	if(account == null) c.throw(404);
	c.set("Content-Type","application/json");
	c.body = JSON.stringify(account);
}

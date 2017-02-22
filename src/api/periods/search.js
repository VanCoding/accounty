var sql = require("sql");
var p = require("../../models").Period;

module.exports = async function(c){
	var query = sql.select(p.id,p.name,p.start,p.end).from(p).order(p.start.desc);
	var periods = await c.db.query(query.toQuery());
	c.set("Content-Type","application/json");
	c.body = JSON.stringify(periods);
}

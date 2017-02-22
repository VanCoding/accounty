var sql = require("sql");
var p = require("../../models").Period;

module.exports = async function(c){
	var query = sql.select(p.id,p.name,p.start,p.end).from(p).where(p.id.equals(parseFloat(c.params.period)));
	var period = await c.db.one(query.toQuery());
	if(period == null) c.throw(404);
	c.set("Content-Type","application/json");
	c.body = JSON.stringify(period);
}

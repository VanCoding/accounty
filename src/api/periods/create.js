var parse = require("co-body");
var p = require("../../models").Period;

module.exports = async function(c){
	var query = p.insert(await parse.json(c)).returning(p.id);
	var period = await c.db.one(query.toQuery());
	c.set("Content-Type","text/plain");
	c.body = period.id+"";
}

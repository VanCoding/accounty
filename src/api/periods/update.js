var parse = require("co-body");
var p = require("../../models").Period;

module.exports = async function(c){
	var query = p.update(await parse.json(c)).where(p.id.equals(parseFloat(c.params.period)))
	await c.db.none(query.toQuery());
	c.status = 200;
}

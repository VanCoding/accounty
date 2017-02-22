var parse = require("co-body");
var t = require("../../models").Transaction;

module.exports = async function(c){
	var query = t.update(await parse.json(c)).where(t.id.equals(parseFloat(c.params.transaction)))
	await c.db.none(query.toQuery());
	c.status = 200;
}

var parse = require("co-body");
var a = require("../../models").Account;

module.exports = async function(c){
	var query = a.update(await parse.json(c)).where(a.id.equals(parseFloat(c.params.account)))
	await c.db.none(query.toQuery());
	c.status = 200;
}

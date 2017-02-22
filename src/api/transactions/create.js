var parse = require("co-body");
var t = require("../../models").Transaction;

module.exports = async function(c){
	var query = t.insert(await parse.json(c)).returning(t.id);
	var transaction = await c.db.one(query.toQuery());
	c.set("Content-Type","text/plain");
	c.body = transaction.id+"";
}

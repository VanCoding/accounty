var parse = require("co-body");
var a = require("../../models").Account;

module.exports = async function(c){
	var query = a.insert(await parse.json(c)).returning(a.id);
	var account = await c.db.one(query.toQuery());
	c.set("Content-Type","text/plain");
	c.body = account.id+"";
}

var parse = require("co-body");
var p = require("../../models").Period;
var a = require("../../models").Account;

module.exports = async function(c){
	var body = await parse.json(c);
	var query = p.insert(body).returning(p.id);
	var period = await c.db.one(query.toQuery());
	c.set("Content-Type","text/plain");
	c.body = period.id+"";
}

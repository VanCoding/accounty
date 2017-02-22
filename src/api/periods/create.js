var parse = require("co-body");
var p = require("../../models").Period;
var a = require("../../models").Account;

module.exports = async function(c){
	var body = await parse.json(c);
	var query = p.insert(body).returning(p.id);
	var period = await c.db.one(query.toQuery());
	var query = a.insert({period:period.id+"",name:"Erfolgsrechnung",number:"2",type:3,active:true})
	await c.db.none(query.toQuery());
	c.set("Content-Type","text/plain");
	c.body = period.id+"";
}

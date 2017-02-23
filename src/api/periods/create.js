var parse = require("co-body");
var p = require("../../models").Period;
var a = require("../../models").Account;

module.exports = async function(c){
	var body = await parse.json(c);
	var query = p.insert(body).returning(p.id);
	var period = await c.db.one(query.toQuery());
	var query = a.insert({period:period.id+"",name:"Erfolgsrechnung",number:"",type:3})
	await c.db.none(query.toQuery());
	var query = a.insert({period:period.id+"",name:"Debitoren Vorsteuer",number:"",type:0,active:true,tax:true})
	await c.db.none(query.toQuery());
	var query = a.insert({period:period.id+"",name:"Kreditoren Umsatzsteuer",number:"",type:0,active:false,tax:true})
	await c.db.none(query.toQuery());
	c.set("Content-Type","text/plain");
	c.body = period.id+"";
}

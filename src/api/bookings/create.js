var parse = require("co-body");
var b = require("../../models").Booking;

module.exports = async function(c){
	var query = b.insert(await parse.json(c)).returning(b.id);
	var booking = await c.db.one(query.toQuery());
	c.set("Content-Type","text/plain");
	c.body = booking.id+"";
}

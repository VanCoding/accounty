var parse = require("co-body");
var b = require("../../models").Booking;

module.exports = async function(c){
	var query = b.update(await parse.json(c)).where(b.id.equals(parseFloat(c.params.booking)))
	await c.db.none(query.toQuery());
	c.status = 200;
}

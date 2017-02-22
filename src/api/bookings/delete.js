var b = require("../../models").Booking;

module.exports = async function(c){
	var query = b.delete().where(b.id.equals(parseFloat(c.params.booking)));
	await c.db.none(query.toQuery());
	c.status = 200;
}

var sql = require("sql");
var b = require("../../models").Booking;

module.exports = async function(c){
	var query = sql.select(b.id,b.transaction,b.get("from"),b.to,b.amount).from(b).where(b.id.equals(parseFloat(c.params.booking)));
	var booking = await c.db.one(query.toQuery());
	if(booking == null) c.throw(404);
	c.set("Content-Type","application/json");
	c.body = JSON.stringify(booking);
}

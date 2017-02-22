var t = require("../../models").Transaction;

module.exports = async function(c){
	var query = t.delete().where(t.id.equals(parseFloat(c.params.transaction)));
	await c.db.none(query.toQuery());
	c.status = 200;
}

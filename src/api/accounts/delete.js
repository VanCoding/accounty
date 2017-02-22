var a = require("../../models").Account;

module.exports = async function(c){
	var query = a.delete().where(a.id.equals(parseFloat(c.params.account)));
	await c.db.none(query.toQuery());
	c.status = 200;
}

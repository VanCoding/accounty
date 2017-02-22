var sql = require("sql");

sql.setDialect("postgres");

exports.Account = sql.define({
	name:"accounts",
	columns:["id","name","number","type","active"]
});

exports.Transaction = sql.define({
	name:"transactions",
	columns:["id","date","comment"]
});

exports.Booking = sql.define({
	name:"bookings",
	columns:["id","transaction","from","to","amount"]
});

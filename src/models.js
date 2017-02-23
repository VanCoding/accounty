var sql = require("sql");

sql.setDialect("postgres");

exports.Version = sql.define({
	name:"version",
	columns:["id","version"]
})

exports.Period = sql.define({
	name:"periods",
	columns:["id","name","start","end"]
})

exports.Account = sql.define({
	name:"accounts",
	columns:["id","period","name","number","type","active"]
});

exports.Transaction = sql.define({
	name:"transactions",
	columns:["id","period","date","comment"]
});

exports.Booking = sql.define({
	name:"bookings",
	columns:["id","transaction","from","to","amount"]
});

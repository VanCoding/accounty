var router = require("koa-router");
var mount = require("koa-mount");
var compose = require("koa-compose");

module.exports = compose([
	mount("/periods",require("./periods")),
	mount("/accounts",require("./accounts")),
	mount("/transactions",require("./transactions")),
	mount("/bookings",require("./bookings"))
]);

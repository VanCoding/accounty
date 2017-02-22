var router = require("koa-router");

module.exports = router()
	.get("",require("./search"))
	.post("",require("./create"))
	.get("/:transaction",require("./get"))
	.patch("/:transaction",require("./update"))
	.delete("/:transaction",require("./delete"))
	.middleware()

var router = require("koa-router");

module.exports = router()
	.get("",require("./search"))
	.post("",require("./create"))
	.get("/:account",require("./get"))
	.patch("/:account",require("./update"))
	.delete("/:account",require("./delete"))
	.middleware()

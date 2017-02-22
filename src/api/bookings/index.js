var router = require("koa-router");

module.exports = router()
	.get("",require("./search"))
	.post("",require("./create"))
	.get("/:booking",require("./get"))
	.patch("/:booking",require("./update"))
	.delete("/:booking",require("./delete"))
	.middleware()

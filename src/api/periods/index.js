var router = require("koa-router");

module.exports = router()
	.get("",require("./search"))
	.post("",require("./create"))
	.get("/:period",require("./get"))
	.patch("/:period",require("./update"))
	.delete("/:period",require("./delete"))
	.middleware()

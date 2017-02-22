var Koa = require("koa");
var mount = require("koa-mount");
var files = require("koa-static");
var auth = require("koa-basic-auth");
var fs = require("fs");
var Database = require("pg-promise")();

var config = JSON.parse(fs.readFileSync("./config.json")+"");

require("babel-polyfill");

var db = Database(config.db);

var app = new Koa();
app.use(async (ctx, next) => {
	try {
		await next();
	} catch (err) {
		if (401 == err.status) {
			ctx.status = 401;
			ctx.set('WWW-Authenticate', 'Basic');
		} else {
			throw err;
		}
	}
});

// require auth
app.use(auth({ name: 'admin', pass: config.password }));
app.use(mount("/public",files("./public")));
app.use(async function(ctx,next){
	ctx.db = db;
	await next();
});
app.use(mount("/api",require("./api")));
app.use(async function(c){
	c.set("Content-Type","text/html");
	c.body = "<html><head><link rel='stylesheet' href='/public/bootstrap/css/bootstrap.min.css'/><link rel='stylesheet' href='/public/react-widgets/css/react-widgets.css'/><link rel='stylesheet' href='/public/react-select/react-select.css'/><script src='/public/main.js'></script></head><body></body></html>";
})
app.listen(config.port);

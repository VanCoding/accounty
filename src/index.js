var Koa = require("koa");
var mount = require("koa-mount");
var files = require("koa-static");
var auth = require("koa-basic-auth");
var fs = require("fs-promise");
var Database = require("pg-promise")();
var cp = require("child_process");
var v = require("./models").Version;
require("babel-polyfill");

async function start(){
	try{
		var config = JSON.parse((await fs.readFile("./config.json"))+"");
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


		try {
			var query = v.select(v.id,v.version).from(v);
			var version = await db.one(query.toQuery());
			console.log("database is at version",version.version);
		} catch (e) {
			try{
				await new Promise((s,e)=>{
					var process = cp.spawn("psql",["postgresql://"+config.db.user+":"+config.db.password+"@"+config.db.host+":5432/"+config.db.database]);
					process.stdin.write("CREATE SCHEMA IF NOT EXISTS public;\r\n");
					fs.createReadStream("./database.sql").pipe(process.stdin);
					process.on("error",e);
					process.on("exit",function(code){
						if(code !== 0) return e(code);
						s();
					});
				});
				var query = v.insert({version:JSON.parse((await fs.readFile("./package.json"))+"").version});
				await db.none(query.toQuery());
				console.log("initialized database");
			}catch(e){
				console.log("database could not be initialized",e.message,e.stack);
				return;
			}
		}
		app.listen(config.port);
	}catch(e){
		console.log(e.message,e.stack);
	}
}

start().then(function(){});

var gulp = require("gulp");
var fs = require("fs");
var path = require("path");
var rimraf = require("rimraf").sync;
var browserify = require("browserify");
var replaceExt = require("gulp-ext-replace");
var transform = require("gulp-transform");
var jade2react = require("jade2react");
var cp = require("child_process");
var babel = require("gulp-babel");
var es = require("event-stream");
var cache = new (require("gulp-file-cache"))();
var cacheApi = require("browserify-cache-api");
var extra = require("fs-extra");

gulp.task("clean",function(){
	rimraf("./lib");
	rimraf("./public");
	fs.unlinkSync("./.gulp-cache");
	fs.unlinkSync("./cache.json");
});

gulp.task("compile",function(){
	if(!fs.existsSync("./lib")) fs.mkdirSync("./lib");
	return es.merge(
		gulp.src("src/**/*.jade")
		.pipe(cache.filter())
		.pipe(cache.cache())
		.pipe(replaceExt(".js"))
		.pipe(transform((code)=>jade2react.compile(code.toString("utf8")))),
		gulp.src("src/**/*.js")
		.pipe(cache.filter())
		.pipe(cache.cache())
	)
	.pipe(babel({
		presets:["es2015"],
		plugins:["syntax-async-functions","transform-regenerator"]
	}))
	.pipe(gulp.dest("lib"));
});

gulp.task("buildClient",["compile"],function(cb){
	if(!fs.existsSync("./public")) fs.mkdirSync("./public");
	if(!fs.existsSync("./public/bootstrap")) extra.copySync("./node_modules/bootstrap/dist","./public/bootstrap");
	if(!fs.existsSync("./public/react-widgets")) extra.copySync("./node_modules/react-widgets/dist","./public/react-widgets");
	if(!fs.existsSync("./public/react-select")) extra.copySync("./node_modules/react-select/dist","./public/react-select");
	var bundle = browserify({cache:{},packageCache:{}});
	cacheApi(bundle,{cacheFile:"./cache.json"})
	bundle.add(require.resolve("./lib/client"));
	bundle.bundle((err,build)=>{
		if(err) return cb(err);
		fs.writeFileSync("./public/main.js",build);
		cb();
	});
});

gulp.task("buildServer",["compile"],function(cb){
	cb();
});

gulp.task("build",["buildClient","buildServer"],function(){
});

gulp.task("start",["build"],function(cb){
	require("./lib");
});

var moment = require("moment");

var dayMilliseconds = 24*60*60*1000;
exports.toDay = function(date){
	return Date.UTC(date.year(),date.month(),date.date())/dayMilliseconds;
}
exports.toDate = function(day){
	return moment.utc(new Date(day*dayMilliseconds));
}

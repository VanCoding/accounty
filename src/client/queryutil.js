module.exports = class QueryUtil{
	constructor(model){
		this.model = model;
		for(var key in this.model){
			var module = this.model[key];
			if(typeof module == "string"){
				this.model[key] = new StringModule(module);
			}else if(typeof module == "number"){
				this.model[key] = new NumberModule(module);
			}else if(typeof module == "boolean"){
				this.model[key] = new BoolModule(module);
			}else if(module == Number){
				this.model[key] = new NumberModule(null);
			}else if(module == String){
				this.model[key] = new StringModule(null);
			}else if(module == Boolean){
				this.model[key] = new BoolModule(null);
			}
		}
	}

	parse(query){
		var result = {};
		for(var key in this.model){
			result[key] = query[key] === undefined?this.model[key].default:this.model[key].parse(query[key]);
		}
		return result;
	}

	serialize(query){
		var result = {};
		for(var key in query){
			if(query[key] === this.model[key].default) continue;
			result[key] = this.model[key].serialize(query[key]);
		}
		return result;
	}
}

class BoolModule{
	constructor(d){
		this.default = d;
	}
	parse(str){
		return str=="true"?true:(str=="false"?false:null);
	}
	serialize(val){
		return val === true?"true":(val === false?"false":null);
	}
}

class NumberModule{
	constructor(d){
		this.default = d;
	}
	parse(str){
		if(str == null) return null;
		var val = parseFloat(str);
		if(isNaN(val)) return null;
		return val;
	}
	serialize(val){
		if(val == null) return null;
		return val+"";
	}
}

class StringModule{
	constructor(d){
		this.default = d;
	}
	parse(str){
		return str;
	}
	serialize(val){
		return val;
	}
}

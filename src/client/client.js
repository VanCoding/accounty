require("whatwg-fetch");

class Client{
    async getResponse(url,opts){
		opts = opts||{};
        opts.headers = opts.headers||{};
		opts.credentials = "same-origin";
        if(!opts.body && opts.jsonBody){
            opts.body = JSON.stringify(opts.jsonBody);
            opts.headers["Content-Type"] = "application/json";
        }
		var response = await fetch(url,opts);
		if(response.status != 200) {
			var err = new Error(response.statusText);
			err.code = response.status;
			err.message = await response.text();
			throw err;
		};
		return response;
	}
	async getText(url,opts){
		var res = await this.getResponse(url,opts);
		return await res.text();
	}
	async getJson(url,opts){
		var data = await this.getText(url,opts);
		try{
			data = JSON.parse(data);
		}catch(e){
			throw new Error("Response was not valid JSON");
		}
		return data;
	}
	async execute(url,opts){
		await this.getResponse(url,opts);
	}

	async getPeriods(opts){
        var params = new URLSearchParams();
		return await this.getJson("/api/periods?"+params.toString());
	}

	async createPeriod(data){
		return await this.getText("/api/periods",{method:"POST",jsonBody:data})
	}

	async getPeriod(period){
		return await this.getJson("/api/periods/"+period);
	}

	async updatePeriod(period,data){
		await this.execute("/api/periods/"+period,{method:"PATCH",jsonBody:data});
	}

	async deletePeriod(period){
		await this.execute("/api/periods/"+period,{method:"DELETE"});
	}

	async getAccounts(opts){
        var params = new URLSearchParams();
		if(opts.period) params.append("period",opts.period);
		if(opts.name) params.append("name",opts.name);
		if(opts.number) params.append("number",opts.number);
		if(opts.type !== null && opts.type !== undefined) params.append("type",opts.type);
		if(opts.active !== null && opts.active !== undefined) params.append("active",opts.active);
		if(opts.tax !== null && opts.tax !== undefined) params.append("tax",opts.tax);
		return await this.getJson("/api/accounts?"+params.toString());
	}

	async createAccount(data){
		return await this.getText("/api/accounts",{method:"POST",jsonBody:data})
	}

	async getAccount(account){
		return await this.getJson("/api/accounts/"+account);
	}

	async updateAccount(account,data){
		await this.execute("/api/accounts/"+account,{method:"PATCH",jsonBody:data});
	}

	async deleteAccount(account){
		await this.execute("/api/accounts/"+account,{method:"DELETE"});
	}
	async getTransactions(opts){
        var params = new URLSearchParams();
		if(opts.period) params.append("period",opts.period);
		if(opts.comment) params.append("comment",opts.comment);
		if(opts.dateFrom !== null && opts.dateFrom !== undefined) params.append("dateFrom",opts.dateFrom);
		if(opts.dateTo !== null && opts.dateTo !== undefined) params.append("dateTo",opts.dateTo);
		return await this.getJson("/api/transactions?"+params.toString());
	}

	async createTransaction(data){
		return await this.getText("/api/transactions",{method:"POST",jsonBody:data})
	}

	async getTransaction(transaction){
		return await this.getJson("/api/transactions/"+transaction);
	}

	async updateTransaction(transaction,data){
		await this.execute("/api/transactions/"+transaction,{method:"PATCH",jsonBody:data});
	}

	async deleteTransaction(transaction){
		await this.execute("/api/transactions/"+transaction,{method:"DELETE"});
	}
	async getBookings(opts){
        var params = new URLSearchParams();
		if(opts.period) params.append("period",opts.period);
		if(opts.transaction) params.append("transaction",opts.transaction);
		if(opts.comment) params.append("comment",opts.comment);
		if(opts.amount !== null && opts.amount !== undefined) params.append("amount",opts.amount);
		if(opts.dateFrom !== null && opts.dateFrom !== undefined) params.append("dateFrom",opts.dateFrom);
		if(opts.dateTo !== null && opts.dateTo !== undefined) params.append("dateTo",opts.dateTo);
		if(opts.from) params.append("from",opts.from);
		if(opts.to) params.append("to",opts.to);
		return await this.getJson("/api/bookings?"+params.toString());
	}

	async createBooking(data){
		return await this.getText("/api/bookings",{method:"POST",jsonBody:data})
	}

	async getBooking(booking){
		return await this.getJson("/api/bookings/"+booking);
	}

	async updateBooking(booking,data){
		await this.execute("/api/bookings/"+booking,{method:"PATCH",jsonBody:data});
	}

	async deleteBooking(booking){
		await this.execute("/api/bookings/"+booking,{method:"DELETE"});
	}
}
module.exports = new Client();

"use strict";

var FbAPI = (function(oldFirebase){
	
	oldFirebase.getTodos = function (apiKeys) {
		return new Promise((resolve, reject) =>{
			$.ajax({
				method:"GET",
				url:`${apiKeys.databaseURL}/items.json`
			}).then((response)=>{
				let items = [];
				Object.keys(response).forEach(function(key){ // exact code to use every firebase project
					response[key].id = key;
					items.push(response[key]);
				});
				resolve(response);
			},(error)=>{
				reject(error);
			});

		});
	};

	return oldFirebase;

})(FbAPI || {});
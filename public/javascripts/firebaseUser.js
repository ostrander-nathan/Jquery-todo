"use strict";

var FbAPI = (function (oldFirebase) {

oldFirebase.getUser = function (apiKeys, uid) {
		return new Promise((resolve, reject) =>{
			$.ajax({
				method:"GET",
				url:`${apiKeys.databaseURL}/items.json?orderBy="uid"&equalTo="${uid}"`
			}).then((response)=>{
				console.log("getUserresponse",response );
				let users = [];
				Object.keys(response).forEach(function(key){ // exact code to use every firebase project
					response[key].id = key; //
					users.push(response[key]); //
				});
				resolve(users[0]);
			},(error)=>{
				reject(error);
			});

		});
		
	};
	oldFirebase.addUser = function(apiKeys, newUser){
		return new Promise((resolve, reject) =>{
			$.ajax({
				method:"POST",
				url:`${apiKeys.databaseURL}/users.json`,
				data: JSON.stringify(newUser),
				dataType:"json"
			}).then((response)=>{
				console.log("resolve from POST",response);
				resolve(response);
			},(error)=>{
				reject(error);
			});

		});
	};

	return oldFirebase;
})(FbAPI || {});
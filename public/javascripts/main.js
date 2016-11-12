"use strict";	

let apiKeys = {};
let uid ="";

function putTodoInDOM (){ // only place dom is being manipulated other than hide and show in the calls to firebase
  FbAPI.getTodos(apiKeys, uid).then(function(items){
      console.log("items from FB", items);
      $('#completed-tasks').html("");
      $('#incomplete-tasks').html("");
      items.forEach(function(item){
        if(item.isCompleted === true){
          let newListItem = `<li data-completed="${item.isCompleted}">`;
          newListItem+=`<div class="col-xs-8" data-fbid="${item.id}">`;
          newListItem+='<input class="checkboxStyle" type="checkbox" checked>';
          newListItem+=`<label class="inputLabel">${item.task}</label>`;
          newListItem+='<input type="text" class="inputTask">';
          newListItem+='</div>';
          newListItem+='</li>';
          //apend to list
          $('#completed-tasks').append(newListItem);
        } else {
          let newListItem = `<li data-completed="${item.isCompleted}">`;
          newListItem+=`<div class="col-xs-8" data-fbid="${item.id}">`;
          newListItem+='<input class="checkboxStyle" type="checkbox">';
          newListItem+=`<label class="inputLabel">${item.task}</label>`;
          newListItem+='<input type="text" class="inputTask">';
          newListItem+='</div>';
          newListItem+='<div class="col-xs-4">';
          newListItem+=`<button class="btn btn-default col-xs-6 edit" data-fbid="${item.id}">Edit</button>`;
          newListItem+=`<button class="btn btn-danger col-xs-6 delete"  data-fbid="${item.id}">Delete</button> `;
          newListItem+='</div>';
          newListItem+='</li>';
          //apend to list
          $('#incomplete-tasks').append(newListItem);
        }

      });
    });
  }
  function createLogoutButton(){ // calling to firebase 
  	FbAPI.getUser(apiKeys,uid).then(function(userResponse){
  		console.log("userResponse",userResponse );
  		$("#logout-container").html("");
  		let currentUsername = userResponse.username;
  		let logoutButton = `<button class="btn btn-danger" id="logoutButton">LOGOUT${currentUsername}</button>`;
  		$("#logout-container").append(logoutButton);
  	});
}

$(document).ready(function(){ 
  FbAPI.firebaseCredentials().then(function(keys){
    console.log("keys", keys);
    apiKeys = keys;
    firebase.initializeApp(apiKeys);
  });

  $('#add-todo-button').on('click', function(){
    console.log("clicked new todo button");
    let newItem = {
      "task": $('#add-todo-text').val(),
      "isCompleted" : false,
      "uid": uid
    };
    FbAPI.addTodo(apiKeys, newItem).then(function(){
      putTodoInDOM();
    });
  });


$('ul').on("click", ".delete", function(){
  let itemId = $(this).data("fbid");
  FbAPI.deleteTodo(apiKeys, itemId).then(function(){
    putTodoInDOM();
  });
});

 $("ul").on("click", ".edit", function() {
	let itemId = $(this).data("fbid");
	console.log("itemId",itemId );	
	let parent = $(this).closest("li");
	console.log("parent",parent );
	if(!parent.hasClass("editMode")){
		parent.addClass("editMode");
	}else{
		let editedItem ={
			"task": parent.find(".inputTask").val(),
			"isCompleted": false,
			"uid": uid
		};
	  FbAPI.editTodo(apiKeys, itemId, editedItem).then(function(){
		parent.removeClass("editMode");
	    putTodoInDOM();
	  });
	}
});

$('ul').on("change", 'input[type="checkbox"]', function(){
	let updatedIsCompleted = $(this).closest("li").data("completed");
	let itemId = $(this).parent().data("fbid");
	let task = $(this).siblings(".inputLabel").html();


	let editedItem = {
		"task":task,
		"isCompleted": !updatedIsCompleted,
		"uid": uid
	};
	FbAPI.editTodo(apiKeys, itemId, editedItem).then(function () {
		putTodoInDOM();
	});

});
// same every time
$("#registerButton").on("click", function(){
	let email = $("#inputEmail").val();
	let password = $("#inputPassword").val();
	let username = $("#inputUsername").val();
	let user = {
		"email": email,
		"password": password
	};
	FbAPI.registerUser(user).then(function(registerResponse){
		console.log("register response", registerResponse);
		let uid = registerResponse;
		let newUser = {
			"username": username,
			"uid": registerResponse.uid
		};
		return FbAPI.addUser(apiKeys, newUser);
	}).then(function(addUserResponse){
		return FbAPI.loginUser(user);
	}).then(function(loginResponse){
		console.log("loginResponse",loginResponse);
		uid = loginResponse.uid;
    	$("#login-container").addClass("hide");
    	$("#todo-container").removeClass("hide");
		createLogoutButton();
    	putTodoInDOM();

	});
});

$("#loginButton").on("click", function(){
	let email = $("#inputEmail").val();
	let password = $("#inputPassword").val();

	let user = {
		"email": email,
		"password": password
	};
	FbAPI.loginUser(user).then(function(loginResponse){
		uid = loginResponse.uid;
		createLogoutButton();
    	putTodoInDOM();
    	$("#login-container").addClass("hide");
    	$("#todo-container").removeClass("hide");

	});
});

$("#logout-container").on("click", "#logoutButton", function(){
	FbAPI.logoutUser();
	uid ="";
	$('#incomplete-tasks').html("");
	$('#completed-tasks').html("");
	$("#inputEmail").val("");
	$("#inputPassword").val("");
	$("#inputUsername").val("");
	$("#login-container").removeClass("hide");
	$("#todo-container").addClass("hide");
});

});
















// $(document).ready(function() {

// 	let $submitInputBtn = $("#submitInputBtn");
// 	let $inputField = $("#inputField");
// 	let $editValue = $(".editValue");


// 	$submitInputBtn.on('click', function(value) {
// 	    value = $inputField.val();

// 	    let newElement = $(`<div class = 'newToDoList' id="toDoId"><li class="editValue">${value}</li></div><br><div class="btnHolder"><button class='editBtn'>Edit</button><button class="deleteBtn">Delete</button><button class="completeBtn">Completed</button>`);
// 	    // if ($inputField.val().length === 0) { // disable button if nothing is typed not working correctly
// 	    // 	$submitInputBtn.attr("disabled", true);
// 	    // }
// 		    $("#output").append(newElement);
// 		    $inputField.val("");

// 	    // EDIT BUTTON CLICK
// 	    newElement.find(".editBtn").on("click", function() {
// 	      $inputField.focus(); /// focuses on button text
// 	      $submitInputBtn.text("Update") // just updates button text
// 	        .on("click", function() { // once its clicked

// 	          $editValue.appendTo($inputField.val());
// 	          $submitInputBtn.text("Add to List");
// 	        });
// 	    });

// 	    // DELETE BUTTON CLICK
// 	    newElement.find(".deleteBtn").on("click", function() {
// 	      newElement.remove();
// 	    });

// 	    // COMPLETE BUTTON CLICK
// 	    newElement.find(".completeBtn").on("click", function() {
// 	      $("#done").append(newElement)
// 	        .append(`<br><button class="unComplete">Un-Complete</button>`);
// 	      $(".completeBtn").hide(this);
// 	      $(".deleteBtn").hide(this);
// 	      $(".editBtn").hide(this);

// 	      // UN-COMPLETE BUTTON CLICK
// 	      let $uncomplete = $(".unComplete");
// 	      $uncomplete.on("click", function() {
// 	        $("#output").append(newElement);
// 	        $(".completeBtn").show(this);
// 	        $(".deleteBtn").show(this);
// 	        $(".editBtn").show(this);
// 	        $(".unComplete").hide();
// 	      });
// 	    });
//   });
// });

/// 1) Should I place variables to hold id/classes to make my code less shitty
//  2) Need to fix code to add to edit instead of creating new column
//  3) all buttons erase when complete button clicked
// 4) issues with my layout creating multiple inputs
// 5) give every new div a id




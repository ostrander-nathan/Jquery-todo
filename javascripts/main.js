"use strict";
$(document).ready(function() {
	// function getInput() {
	$('#submitInput').on('click', function (e) {
	        var value = $('#toDoInput').val();
	        
	        var newElement = $(`<div><li class="editValue">${value}</li><br><button class="editBtn">Edit</button><button class="deleteBtn">Delete</button><button class="completeBtn">Completed</button>`);

	        $("#output").append(newElement);
	        // console.log("value",value );
	        // EDIT BUTTON CLICK
	        newElement.find(".editBtn").on("click", function(e){
	        	$("#toDoInput").val("");
	        	$(".editValue").append(`<li>${value}</li>`);
	        });
	       // DELETE BUTTON CLICK
	        newElement.find(".deleteBtn").on("click", function(){
	        	console.log("deleteBtn working");
	        	newElement.remove();
	        });
	        // COMPLETE BUTTON CLICK
	        newElement.find(".completeBtn").on("click", function(){
  				$("#done")
  				.append($(this).parent())
  				.append(`<br><button class="unComplete">Un-Complete</button>`)
  				$(".completeBtn").remove();
	        // UN-COMPLETE BUTTON CLICK
  				$(".unComplete").on("click", function(){
  					$("#output")
  				.append($(this).parent())
  				$(".unComplete").remove();
	        	console.log("uncomplete clicked")

  				});

	        });
});
});
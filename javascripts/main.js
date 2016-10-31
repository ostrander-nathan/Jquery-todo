"use strict";
$(document).ready(function() {
	// function getInput() {
	$('#submitInput').on('click', function (e) {
	        var value = $('#toDoInput').val();
	        // var $editValue = $("<li class='editValue'>${value}</li>");
	        // console.log("$editValue",$editValue )
	        // var $newListItem.append($editBtn)
	        var newElement = $(`<div class = 'newToDoList' id="toDoId"><ol><li class="editValue">${value}</li></ol><br><button class='editBtn'>Edit</button><button class="deleteBtn">Delete</button><button class="completeBtn">Completed</button>`);
	        var $editBtn = $("<button class='editBtn'>Edit</button>");
	        // console.log("$editBtn",$editBtn );
	        $("#output").append(newElement);
	        console.log("value",value );

	        // Give new IDs to output
	        var i = 1;
	        newElement.find(".newToDoList").click(function() {
			  $("<div />", { "class":"newToDoList", id:"toDoId"+i })
			     .appendTo("#output");
			  i++;
			});

	        // EDIT BUTTON CLICK
	        newElement.find(".editBtn").on("click", function(){
	        	$("#toDoInput").focus();
	        	$('#submitInput').text("Update")
	        		.on("click", function(){
	        	$(".editValue");
	        	$(this).prev(value).append(newElement.value);
	        	$('#submitInput').text("Add to List");
	        	});
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
  				.append(`<br><button class="unComplete">Un-Complete</button>`);
  				$(".completeBtn").hide(this);
  				$(".deleteBtn").hide(this);
  				$(".editBtn").hide(this);

	        // UN-COMPLETE BUTTON CLICK
	        let $uncomplete = $(".unComplete");
  				$uncomplete.on("click", function(){
  				$("#output")
  				.append(newElement);
  				$(".completeBtn").show(this);
  				$(".deleteBtn").show(this);
  				$(".editBtn").show(this);
  				$(".unComplete").hide();
	        	console.log("uncomplete clicked");

  				});

	        });
});
});

/// 1) Should I place variables to hold id/classes to make my code less shitty
//  2) Need to fix code to add to edit instead of creating new column
//  3) all buttons erase when complete button clicked
// 4) issues with my layout creating multiple inputs
// 5) give every new div a id




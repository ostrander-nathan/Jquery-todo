"use strict";
$(document).ready(function() {

	let $submitInputBtn = $("#submitInputBtn");
	let $inputField = $("#inputField");
	let $editValue = $(".editValue");


	$submitInputBtn.on('click', function(value) {
	    value = $inputField.val();
	    
	    let newElement = $(`<div class = 'newToDoList' id="toDoId"><li class="editValue">${value}</li></div><br><div class="btnHolder"><button class='editBtn'>Edit</button><button class="deleteBtn">Delete</button><button class="completeBtn">Completed</button>`);
	    // if ($inputField.val().length === 0) { // disable button if nothing is typed not working correctly
	    // 	$submitInputBtn.attr("disabled", true);
	    // }
		    $("#output").append(newElement);
		    $inputField.val("");

	    // EDIT BUTTON CLICK
	    newElement.find(".editBtn").on("click", function() {
	      $inputField.focus(); /// focuses on button text
	      $submitInputBtn.text("Update") // just updates button text
	        .on("click", function() { // once its clicked

	          $editValue.appendTo($inputField.val());
	          $submitInputBtn.text("Add to List");
	        });
	    });

	    // DELETE BUTTON CLICK
	    newElement.find(".deleteBtn").on("click", function() {
	      newElement.remove();
	    });

	    // COMPLETE BUTTON CLICK
	    newElement.find(".completeBtn").on("click", function() {
	      $("#done").append(newElement)
	        .append(`<br><button class="unComplete">Un-Complete</button>`);
	      $(".completeBtn").hide(this);
	      $(".deleteBtn").hide(this);
	      $(".editBtn").hide(this);

	      // UN-COMPLETE BUTTON CLICK
	      let $uncomplete = $(".unComplete");
	      $uncomplete.on("click", function() {
	        $("#output").append(newElement);
	        $(".completeBtn").show(this);
	        $(".deleteBtn").show(this);
	        $(".editBtn").show(this);
	        $(".unComplete").hide();
	      });
	    });
  });
});

/// 1) Should I place variables to hold id/classes to make my code less shitty
//  2) Need to fix code to add to edit instead of creating new column
//  3) all buttons erase when complete button clicked
// 4) issues with my layout creating multiple inputs
// 5) give every new div a id




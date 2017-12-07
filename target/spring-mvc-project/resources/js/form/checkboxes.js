$(document).ready(function() {	
	$( "#myButton" ).click(function() {
		$("#myValues").html($('#myCheckBoxes :checked').map(
				function () {
					return this.value;
				}
				).get().join(","));
	});
	
	$( "#selectAllButton" ).click(function() {
		$('input[type=checkbox]').each(function() 
				{ 
				    $(this).prop('checked', true); 
				});
	});
	
	$( "#clearButton" ).click(function() {
		$('input[type=checkbox]').each(function() 
				{ 
				    $(this).prop('checked', false); 
				});
	});
	
	$( "#clearButton" ).click(function() {
		var allKeys = [];
	    $('#myCheckBoxes :checked').each(function() {
	    	allKeys.push($(this).val());
	    });
	});
});



	 
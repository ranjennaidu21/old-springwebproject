$(document).ready(function() {
	$('#button1').click(function(){
		
			   var searchObj = {
			      "pName" : "bhanu",
			      "lName" :"prasad"
			   };
			   var result;
			   $.ajax({
			      type: "POST",
			      contentType : 'application/json; charset=utf-8',
			      dataType : 'json',
			      url: "search",
			      data: JSON.stringify(searchObj), // Note it is important
			      success :function(json) {
			    	  //result = JSON.stringify(json); if want convert the object to string
			    	  result = json;
			    	  getResultObject(result);
			      }
			  }); 
		 
	});
	
	function getResultObject(result){
		var firstName = result['pName'];
		var lastName = result['lName'];
		$("#myResult").html(firstName + "<br>" +  lastName);
	}
});



	 
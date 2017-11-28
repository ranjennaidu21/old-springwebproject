$(document).ready(function() {
	$('#button1').click(function(){
		
		//send each variable in the object to controller
/*		var loginData = 
		{ 
			       memberId : "test1",
			       memberPw : "test2"
		};
		alert("loginData: " + JSON.stringify(loginData));
		
		 $.ajax({
		        type: "POST",
		        url: "myObject",
		        data: JSON.stringify(loginData),
		        success: function (result) {
		            console.log("result:" + result);
		        },
		        error: function (result) {
		        	console.log("result:" + result);
		        }
		    });*/
		
			   var searchObj = {
			      "pName" : "bhanu",
			      "lName" :"prasad"
			   };
			   
			   $.ajax({
			      type: "POST",
			      contentType : 'application/json; charset=utf-8',
			      dataType : 'json',
			      url: "search",
			      data: JSON.stringify(searchObj), // Note it is important
			      success :function(result) {
			      console.log(result);
			      }
			  });
		 
		 
	});
});



	 
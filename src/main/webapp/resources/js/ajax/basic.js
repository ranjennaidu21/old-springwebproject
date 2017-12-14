$(document).ready(function() {
	$('#button1').click(function(){
		
			   var searchObj = {
			      "pName" : "bhanu",
			      "lName" :"prasad",
			      "date"  : getDate()
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
	
	function getDate(){
		//var mydate = new Date('2014-04-03 02:01:01');
		//get date
		var localDate = new Date("2014-06-01 13:01:02");
		//covert date to string
		var localDateString = localDate.toString();
		//change date to europe/riga timezone
		var myDate    = moment.tz(localDateString, "Europe/Riga");
		//change back the date to Malaysia time
		var myDate2 = moment.tz(myDate.toString(), "Asia/Kuala_Lumpur");
		return myDate2;
	}
	
	function getResultObject(result){
		var firstName = result['pName'];
		var lastName = result['lName'];
		var date = result['date'];
		$("#myResult").html(firstName + "<br>" +  lastName + "<br>" +  date);
	}
});



	 
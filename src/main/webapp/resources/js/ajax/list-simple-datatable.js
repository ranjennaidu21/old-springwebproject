$(document).ready(function() {
    $('#example').DataTable( {
        "processing": true,
        "serverSide": true,
    	"ajax" : {
            "url" : 'datatablesearch',
            "type": 'POST',
		    "contentType" : 'application/json',
		    "dataType" : 'json',
		    "data" : function() {
				var searchObject = getSearchObject();
				return JSON.stringify(searchObject);
			 },
			 "dataSrc" : function(response) {
				 console.log("response:" +response);
				 return response;
			}
        },
    	"columnDefs" : [ {
    	    "name" : "firstName",
    	    "targets" : 0
    	}, {
    	    "name" : "lastName",
    	    "targets" : 1
    	}, 

    	{
    	    "targets" : [0, 1],
    	    'searchable' : true,
    	    'orderable' : true,
    	    'data' : function(row, type, val, meta) {
    		if (meta.col == 0)
    		    return row.pName;
    		if (meta.col == 1)
    		    return row.lName;
    	    }
    	}
    	]
    });
    
    function getSearchObject(){
    	var searchObj = {};
    	var myList = [];
    	var myObject = {};
    	myObject['pName']="Raj";
    	myObject['lName']="Kiran";
    	var myObject2 = {};
    	myObject2['pName']="Salja";
    	myObject2['lName']="Begun";
    	var myObject3 = {};
    	myObject3['pName']="Maria";
    	myObject3['lName']="Ozawa";
    	myList.push(myObject);
    	myList.push(myObject2);
    	myList.push(myObject3);
    	searchObj['list']=myList;
    	return searchObj;
    } 				
});


	 
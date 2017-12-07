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
				var searchObj = {
			      "pName" : "bhanu",
			      "lName" :"prasad"
				};
				return JSON.stringify(searchObj);
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
    		    return row;
    		if (meta.col == 1)
    		    return row;
    	    }
    	}
    	]
    });
});


	 
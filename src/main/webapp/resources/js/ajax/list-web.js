$(document).ready(function() {
    $('#example').DataTable( {
        "ajax" : {
            "url" : 'product?action=demo2',
            "type": 'GET',
            "dataSrc" : function (json) {
                var str = JSON.stringify(json);
                console.log("str" + str);
            	// return the data that DataTables is to use to draw the table
                return json.data;
            }
        }
    } );
} );


	 
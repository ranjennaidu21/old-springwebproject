$(document).ready(function() {
	$('#button1').click(function(){
		$.ajax({
			type: 'GET',
			url: 'product?action=demo1',
			headers : {
				Accept: "application/json; charset=utf-8",
				"Content-Type" : "application/json; charset=utf-8"
			},
			success: function(result){
				var product = $.parseJSON(result);
				//alert(product.id);
				document.getElementById('result1').innerHTML = 'Id: ' + product.id + '<br>Name: ' +
				product.name + '<br>Price: ' + product.price;
			}
		});
	});
	
	$('#button2').click(function(){
		$.ajax({
			type: 'GET',
			url: 'product?action=demo2',
			headers : {
				Accept: "application/json; charset=utf-8",
				"Content-Type" : "application/json; charset=utf-8"
			},
			success: function(result){
				var listProducts = $.parseJSON(result);
				var s = '';
				for(var i=0;i<listProducts.length;i++){
					s += 'Id: ' + listProducts[i].id + '<br>Name: ' +
					listProducts[i].name + '<br>Price: ' + listProducts[i].price
					+ '<br>===================================<br>';
				}
				document.getElementById('result2').innerHTML = s;
			}
		});
	});
});



	 
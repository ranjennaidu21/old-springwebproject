$(document).ready(function() {	
/*	alert("pop up js start loaded");
	tb_show('', '#TB_inline?width=630&amp;height=150&amp;inlineId=popUpContent&amp;modal=true');
	alert("pop up js end loaded");*/
	
	$('[data-confirm]').click(function(event) {
		alert("pop up js start loaded");
	    event.preventDefault();
	    var link = $(this).attr('href');
		tb_show('', '#TB_inline?width=630&amp;height=150&amp;inlineId=popUpContent&amp;modal=true');
		$("#popUpContentContinueBtn").attr("onclick", "showLoaderOverlay('#TB_ajaxContent');window.location.href = '" + link + "';closePopup();");
		alert("pop up js end loaded");
	});
});



	 
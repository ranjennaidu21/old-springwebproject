<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Learning jQuery</title>
<%@include file="../resources.jsp" %>
<meta charset="utf-8" />
<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
#circle {
width:100px;
height:100px;
background-color:green;
border-radius:100px;
}
#circle2 {
width:100px;
height:100px;
background-color:red;
border-radius:100px;
}
</style>
</head>

<body>
Animate(change width) when clicked the green circle below:
<div id="circle"></div>
<br>
Animate(change width,height,radius,position) when clicked the red circle below:
<div id="circle2"></div>
<br>
<script>
$("#circle").click(function() {
//first is what attribute to change - width
//second is amount of time for the animation in miliseconds
$(this).animate({width:"300px"},1500);
});

$("#circle2").click(function() {
//take note that the attribute is different from css, it using javascript attribute where no - and second letter is UpperCase
$(this).animate({
		width:"300px",
		height:"300px",
		borderRadius:"150px",
		marginLeft:"100px",
		marginTop:"100px"
	},800);
});

</script>
</body>
</html>
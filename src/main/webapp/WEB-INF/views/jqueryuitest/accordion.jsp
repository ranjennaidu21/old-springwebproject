<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Accordian</title>
<%@include file="../resources.jsp" %>
<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
	#square {
	height:200px;
	width:200px;
	background-color:grey;
	}
	#target {
	height:300px;
	width:300px;
	background-color:yellow;
	}
</style>
</head>
<body>
<div id="accordion">
	<h3>Title</h3>
	<div>
	<p>This is some text. This is some text. This is some text. This
	is some text. This is some text. This is some text. This is some text. This is
	some text. This is some text. This is some text. This is some text. This is some
	text. This is some text. This is some text. This is some text. This is some
	text. This is some text. This is some text. This is some text. This is some
	text. This is some text. </p>
	</div>
	<h3>Title</h3>
	<div>
	<p>This is some text. This is some text. This is some text. This
	is some text. This is some text. This is some text. This is some text. This is
	some text. This is some text. This is some text. This is some text. This is some
	text. This is some text. This is some text. This is some text. This is some
	text. This is some text. This is some text. This is some text. This is some
	text. This is some text. </p>
	</div>
	<h3>Title</h3>
	<div>
	<p>This is some text. This is some text. This is some text. This
	is some text. This is some text. This is some text. This is some text. This is
	some text. This is some text. This is some text. This is some text. This is some
	text. This is some text. This is some text. This is some text. This is some
	text. This is some text. This is some text. This is some text. This is some
	text. This is some text. </p>
	</div>
	<h3>Title</h3>
	<div>
	<p>This is some text. This is some text. This is some text. This
	is some text. This is some text. This is some text. This is some text. This is
	some text. This is some text. This is some text. This is some text. This is some
	text. This is some text. This is some text. This is some text. This is some
	text. This is some text. This is some text. This is some text. This is some
	text. This is some text. </p>
	</div>
	<h3>Title</h3>
	<div>
	<p>This is some text. This is some text. This is some text. This
	is some text. This is some text. This is some text. This is some text. This is
	some text. This is some text. This is some text. This is some text. This is some
	text. This is some text. This is some text. This is some text. This is some
	text. This is some text. This is some text. This is some text. This is some
	text. This is some text. </p>
	</div>
	<h3>Title</h3>
	<div>
	<p>This is some text. This is some text. This is some text. This
	is some text. This is some text. This is some text. This is some text. This is
	some text. This is some text. This is some text. This is some text. This is some
	text. This is some text. This is some text. This is some text. This is some
	text. This is some text. This is some text. This is some text. This is some
	text. This is some text. </p>
	</div>
</div>
<script>
$("#accordion").accordion();
</script>
</body>
</html>
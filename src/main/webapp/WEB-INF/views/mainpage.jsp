<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Main Page</title>
<%@include file="resources.jsp" %>
<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body>
		<p>
			<a href="${pageContext.request.contextPath}/customer/list">Customer Project</a>
		</p>
		<p>
			<a href="${pageContext.request.contextPath}/jquerytest/main">JQuery Test</a>
		</p>
		<p>
			<a href="${pageContext.request.contextPath}/jqueryuitest/main">JQuery UI Test</a>
		</p>
		<p>
			<a href="${pageContext.request.contextPath}/ajax/main">Ajax Test</a>
		</p>
		<p>
			<a href="${pageContext.request.contextPath}/form/main">Form Test</a>
		</p>
</body>
</html>
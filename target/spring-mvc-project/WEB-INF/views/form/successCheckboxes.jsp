<!DOCTYPE html>
<html>

<head>
<title>Form Checkbox Page</title>
<%@include file="../resources.jsp" %>
</head>

<body>
	<h2>Are you new member:</h2>
    <c:out value="${member.newMember}"/>
	<h2>The courses you selected are shown below:</h2>
    <c:forEach var="course" items="${member.courses}"> 
    <c:out value="${course}"/><br>
    </c:forEach>

</body>

</html> 












<!DOCTYPE html>
<html>

<head>
<title>Form Checkbox Page</title>
<%@include file="../resources.jsp" %>
<script src="${pageContext.request.contextPath}/resources/js/form/checkboxes.js"></script>
</head>

<body>

	<h2>The courses you selected are shown below:</h2>
    <br>
    <c:forEach var="course" items="${member.courses}"> 
    <c:out value="${course}"/><br>
    </c:forEach>

</body>

</html> 












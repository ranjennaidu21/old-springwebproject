<!DOCTYPE html>
<html>

<head>
<title>Testing PopUpBox Page</title>
<%@include file="../resources.jsp" %>
<%@include file="popUpContent.jsp" %>
<script src="${pageContext.request.contextPath}/resources/js/form/popup.js"></script>
</head>

<body>
Main Page
			<div class="set">
				<p>
					Click the link below to open pop-up box
				</p>
				<ul>
						<li><a data-confirm="true" href="<c:url value="popUpContent" />">Open Pop Up Box</a></li>
				</ul>
			</div>

</body>

</html> 












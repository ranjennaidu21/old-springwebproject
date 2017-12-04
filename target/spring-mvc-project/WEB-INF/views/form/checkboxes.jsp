<!DOCTYPE html>
<html>

<head>
<title>Form Checkbox Page</title>
<%@include file="../resources.jsp" %>
<script src="${pageContext.request.contextPath}/resources/js/form/checkboxes.js"></script>
</head>

<body>

    <form:form action="successCheckboxes" method="POST" commandName="member">
        <table>
            <tr>
                <td>Are you a new member?</td>
                <td><form:checkbox path="newMember" />
                </td>
            </tr>
            <tr>
                <td>Choose the courses you like:</td>
                <td><form:checkboxes path="courses" items="${courses}" />
                </td>
            </tr>
            <tr>
                <td><input type="submit" name="submit" value="Submit"></td>
            </tr>
            <tr>
        </table>
    </form:form>

</body>

</html> 












<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<!DOCTYPE html>
<html>

<head>
	<title>Save Customer</title>

	<link type="text/css"
		  rel="stylesheet"
		  href="${pageContext.request.contextPath}/resources/css/style.css">

	<link type="text/css"
		  rel="stylesheet"
		  href="${pageContext.request.contextPath}/resources/css/add-customer-style.css">
</head>

<body>
	
	<div id="wrapper">
		<div id="header">
			<h2>CRM - Customer Relationship Manager</h2>
		</div>
	</div>

	<div id="container">
		<h3>Save Customer</h3>
	
		<form:form action="saveCustomer" modelAttribute="customer" method="POST">
		<!-- action "saveCustomer" send to Spring MVC mapping
			 modelAttribute is bind the data to the "customer" model attribute in the actual model(controller)-->
			 
		<!-- after clicked the Update Link , this page will pre-polulate the data
		     as per the "customer" model attribute added in controller.
		     When Form is Loaded , Spring MVC will call the getter method based on path:
		     customer.getFirstName();
		     customer.getLastName();
		     When Submit the Form , Spring MVC will call the setter method based on path:
		     customer.setFirstName(..);
		     customer.setLastName(..);
		     -->
		     
		 	<!-- need to associate this data with customer id by creating hidden field
		 	and provide id for that field -->
			<form:hidden path="id" />
			<!-- When form is loaded , it talk to Customer by call customer.getId 
			and place it in this hidden form field , so when submit it submit this data
			by saying customer.setId with the approriate data. Without this line you lose
			the id of original customer , and cannot track which customer it need to perform
			update
			 -->
			
			<table>
				<tbody>
					<tr>
						<td><label>First name:</label></td>
						<td><form:input path="firstName" /></td>
						<!-- actual path , this will bind to firstName -->
					</tr>
				
					<tr>
						<td><label>Last name:</label></td>
						<td><form:input path="lastName" /></td>
					</tr>

					<tr>
						<td><label>Email:</label></td>
						<td><form:input path="email" /></td>
					</tr>

					<tr>
						<td><label></label></td>
						<td><input type="submit" value="Save" class="save" /></td>
					</tr>

				
				</tbody>
			</table>
		
		
		</form:form>
	
		<div style="clear; both;"></div>
		
		<p>
			<a href="${pageContext.request.contextPath}/customer/list">Back to List</a>
		</p>
	
	</div>

</body>

</html> 












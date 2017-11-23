package com.ranjen.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.ranjen.spring.dao.CustomerDAO;
import com.ranjen.spring.entity.Customer;
import com.ranjen.spring.service.CustomerService;

@Controller
@RequestMapping("/customer")
public class CustomerController {

	// need to inject the customer dao/customer service
	@Autowired
	//Spring will scan for component that implement the customerDAO interface , then inject it
	//private CustomerDAO customerDAO;
	//Since now Service Layer is added , Controller will communicate with Service
	//so the DAO inject above will be replaced with Service inject
	private CustomerService customerService;
	
	//@RequestMapping("/list")
	//this mapping will handle ALL HTTP methods 
	//GET request, POST request and so on 
	
	//@RequestMapping(path="/list",method=RequestMethod.GET)
	//This mapping only handle GET request
	//any other HTTP request methods will be rejected
	//@GetMapping("/list")
	//shorthand way for GET method request mapping added in Spring 4.3
	
	//@RequestMapping(path="/list",method=RequestMethod.POST)
	//This mapping only handle POST request
	//any other HTTP request methods will be rejected
	//@PostMapping("/list")
	//shorthand way for POST method request mapping added in Spring 4.3
	
	//to view all customers records
	@GetMapping("/list")
	public String listCustomers(Model theModel) {
		
		// get customers from the dao
		//List<Customer> theCustomers = customerDAO.getCustomers();
		//now replaced with service : delegate calls to service
		List<Customer> theCustomers = customerService.getCustomers();
		
		// add the customers to the model
		theModel.addAttribute("customers", theCustomers);
		
		//forward to the jsp page
		return "list-customers";
	}
	
	//to show form to add customer
	@GetMapping("/showFormForAdd")
	public String showFormForAdd(Model theModel) {
		
		// create model attribute to bind form data
		Customer theCustomer = new Customer();
		
		theModel.addAttribute("customer", theCustomer);
		
		return "customer-form";
	}
	
	//for add customer data
	@PostMapping("/saveCustomer")
	// the name of the ModelAttribute sent to here is customer and it is assigned to theCustomer
	public String saveCustomer(@ModelAttribute("customer") Customer theCustomer) {
		
		// save the customer record in database using our service
		customerService.saveCustomer(theCustomer);

		return "redirect:/customer/list";
	}
	
	//for view customer data after click Update Link
	@GetMapping("/showFormForUpdate")
	//there is a request parameter coming in which is customerId from the customer/list page so
	//so bind it here as the Id
	public String showFormForUpdate(@RequestParam("customerId") int theId,
									Model theModel) {
		
		// get the customer from our service based on Id 
		Customer theCustomer = customerService.getCustomer(theId);	
		
		// set customer as a model attribute to pre-populate the form
		// theCustomer is the value that we retrieved from database above.
		theModel.addAttribute("customer", theCustomer);
		
		// send over to our form		
		return "customer-form";
	}
	
	@GetMapping("/delete")
	//there is a request parameter coming in which is customerId from the customer/list page so
	//so bind it here as the Id
	public String deleteCustomer(@RequestParam("customerId") int theId) {
		
		// delete the customer
		customerService.deleteCustomer(theId);
		
		return "redirect:/customer/list";
	}
}



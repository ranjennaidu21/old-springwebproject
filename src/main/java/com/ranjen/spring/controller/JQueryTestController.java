package com.ranjen.spring.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/jquerytest")
public class JQueryTestController {
	
	@GetMapping("/main")
	public String mainPage() {
		return "jquerytest/main";
	}

	@GetMapping("/animating_content")
	public String listCustomers() {
		return "jquerytest/animating_content";
	}
	
}



package com.ranjen.spring.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/jqueryuitest")
public class JQueryUiTestController {
	
	@GetMapping("/main")
	public String mainPage() {
		return "jqueryuitest/main";
	}

	@GetMapping("/accordion")
	public String accordion() {
		return "jqueryuitest/accordion";
	}
	
}



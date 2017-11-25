package com.ranjen.spring.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/default")
public class MainPageController {
	
	@GetMapping("/mainpage")
	public String getMainPage() {
		return "mainpage";
	}
	
}



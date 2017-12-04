package com.ranjen.spring.controller;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.ranjen.spring.entity.Customer;
import com.ranjen.spring.entity.Member;


@Controller
@RequestMapping("/form")
public class FormController{
	
	//ALL PAGES
	@GetMapping("/checkboxes")
	public String getCheckBoxes(Model model) {
		Member member = new Member();
		List<String> preCheckedVals = new ArrayList<String>();
		preCheckedVals.add("Yoga");
		member.setCourses(preCheckedVals);
		model.addAttribute("member", member);
		Map<String,String> mapList = new HashMap<String,String>();
		mapList.put("1", "Yoga");
		mapList.put("2", "Stretching");
		mapList.put("3", "Pilates");
		mapList.put("4", "Aerobic");
		mapList.put("5", "Oriental");
		model.addAttribute("mapList", mapList);
		List<String> courses = new ArrayList<String>();
		courses.add("Yoga");
		courses.add("Stretching");
		courses.add("Pilates");
		courses.add("Aerobic");
		courses.add("Oriental");
		model.addAttribute("courses", courses);
		return "form/checkboxes";
	}
	
	@GetMapping("/main")
	public String getFormMainPage() {
		return "form/main";
	}
	
	@PostMapping("/successCheckboxes")
	public String submitForm(Model model,Member member) {
		model.addAttribute("member", member);
		return "form/successCheckboxes";
	}

}



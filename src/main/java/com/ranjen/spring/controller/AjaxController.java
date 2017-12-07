package com.ranjen.spring.controller;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.ranjen.spring.entity.input.SearchPersonInput;
import com.ranjen.spring.entity.output.SearchPersonOutput;
import com.ranjen.spring.model.*;

@Controller
@RequestMapping("/ajax")
public class AjaxController {
	
	//ALL PAGES
	@GetMapping("/list")
	public String listCustomers() {
		return "ajax/list-ajax-page";
	}
	
	@GetMapping("/basicAjax")
	public String getBasicAjax() {
		return "ajax/basic";
	}
	
	@GetMapping("/datatables")
	public String listDataTables() {
		return "ajax/list-simple-datatable";
	}
	
	@GetMapping("/main")
	public String getAjaxMainPage() {
		return "ajax/main";
	}
	
	// ALL AJAX OBJECTS RETURNING TO THE JAVASCRIPT
	@GetMapping("/product")
	protected void doGet(HttpServletRequest request,HttpServletResponse response){
		PrintWriter out;
		try {
			out = response.getWriter();
			Gson gson = new Gson();
			AjaxProductModel productModel = new AjaxProductModel();
			String action = request.getParameter("action");
			if(action.equalsIgnoreCase("demo1")){
				out.print(gson.toJson(productModel.find()));
				out.flush();
				out.close();
			} else if(action.equalsIgnoreCase("demo2")){
				out.print(gson.toJson(productModel.findAll()));
				out.flush();
				out.close();
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	@RequestMapping("/search")
	public @ResponseBody Object getSearchUserProfiles(@RequestBody SearchPersonModel mysearch, HttpServletRequest request,Model theModel){
		return mysearch;
	}
	
	@RequestMapping("/datatablesearch")
	public @ResponseBody Object getDataTableSearch(@RequestBody SearchPersonInput search, HttpServletRequest request,Model theModel){
		SearchPersonOutput output = new SearchPersonOutput();
		return output.getList(search);
	}

}



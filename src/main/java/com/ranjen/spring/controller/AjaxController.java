package com.ranjen.spring.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

//import java.util.List;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


import com.google.gson.Gson;
import com.ranjen.spring.entity.*;
import com.ranjen.spring.model.*;

@Controller
@RequestMapping("/ajax")
//@WebServlet("/product")
public class AjaxController extends HttpServlet {
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

	@GetMapping("/list")
	public String listCustomers() {
		return "list-ajax-page";
	}
	
	@GetMapping("/datatables")
	public String listDataTables() {
		return "list-web";
	}

}



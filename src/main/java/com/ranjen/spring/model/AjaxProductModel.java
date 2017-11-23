package com.ranjen.spring.model;

import java.util.*;

import com.ranjen.spring.entity.*;

public class AjaxProductModel {

	public AjaxProduct find(){
		return new AjaxProduct("p01","name 1",100);
	}
	
	public List<AjaxProduct> findAll(){
		List<AjaxProduct> result = new ArrayList<AjaxProduct>();
		result.add(new AjaxProduct("p01","name 1",100));
		result.add(new AjaxProduct("p02","name 2",200));
		result.add(new AjaxProduct("p03","name 3",300));
		return result;
		
	}
}

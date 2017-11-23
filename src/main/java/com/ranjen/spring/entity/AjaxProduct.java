package com.ranjen.spring.entity;

public class AjaxProduct {
	private String id;
	private String name;
	private long price;
	
	public AjaxProduct(String id, String name, long price) {
		super();
		this.id = id;
		this.name = name;
		this.price = price;
	}
	
	public AjaxProduct() {
		super();
	}

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public long getPrice() {
		return price;
	}
	public void setPrice(long price) {
		this.price = price;
	}
	
	
}

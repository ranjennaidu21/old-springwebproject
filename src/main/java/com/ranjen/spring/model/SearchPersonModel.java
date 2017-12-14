package com.ranjen.spring.model;

import java.io.Serializable;
import java.util.Date;

public class SearchPersonModel implements Serializable {
	
	private static final long serialVersionUID = 1L;
	private String pName;
	private String lName;
	private Date date;
	
	

	public SearchPersonModel(String pName, String lName, Date date) {
		this.pName = pName;
		this.lName = lName;
		this.date = date;
	}

	public String getpName() {
		return pName;
	}

	public void setpName(String pName) {
		this.pName = pName;
	}

	public String getlName() {
		return lName;
	}

	public void setlName(String lName) {
		this.lName = lName;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}
	
	

}

package com.ranjen.spring.model;

import java.io.Serializable;

public class SearchPersonModel implements Serializable {
	
	private static final long serialVersionUID = 1L;
	private String pName;
	private String lName;
	
	public SearchPersonModel(String pName, String lName) {
		this.pName = pName;
		this.lName = lName;
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

}

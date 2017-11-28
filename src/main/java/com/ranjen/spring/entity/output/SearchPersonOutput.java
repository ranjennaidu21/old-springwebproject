package com.ranjen.spring.entity.output;
import java.util.List;

public class SearchPersonOutput {

	private List<String> myPersonList;
	private String firstName;
	private String lastName;
	
	public SearchPersonOutput(String firstName, String lastName) {
		this.firstName = firstName;
		this.lastName = lastName;
	}

	public List<String> getMyPersonList() {
		return myPersonList;
	}

	public void setMyPersonList(List<String> myPersonList) {
		this.myPersonList = myPersonList;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	
	
	
	
	
	
	
	
	
	


}

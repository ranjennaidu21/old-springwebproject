package com.ranjen.spring.entity;

import java.util.List;
import java.util.Map;

public class Member {
	
private boolean newMember;
private List<String> courses;
private Map<String,String> mapList;
	
	public boolean isNewMember() {
		return newMember;
	}

	public void setNewMember(boolean newMember) {
		this.newMember = newMember;
	}

	public List<String> getCourses() {
		return courses;
	}

	public void setCourses(List<String> courses) {
		this.courses = courses;
	}

	public Map<String,String> getMapList() {
		return mapList;
	}

	public void setMapList(Map<String,String> mapList) {
		this.mapList = mapList;
	}
}

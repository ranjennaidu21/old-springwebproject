package com.ranjen.spring.entity.input;
import java.util.List;

import com.ranjen.spring.model.*;

public class SearchPersonInput{
	
	private List<SearchPersonModel> list;

	public List<SearchPersonModel> getList() {
		return list;
	}

	public void setList(List<SearchPersonModel> list) {
		this.list = list;
	}
}

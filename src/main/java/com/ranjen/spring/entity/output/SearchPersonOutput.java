package com.ranjen.spring.entity.output;
import java.util.ArrayList;
import java.util.List;

import com.ranjen.spring.entity.input.SearchPersonInput;
import com.ranjen.spring.model.SearchPersonModel;

public class SearchPersonOutput {

public List<SearchPersonModel> getList(SearchPersonInput list){
	List<SearchPersonModel> myList = list.getList();
	myList.add(new SearchPersonModel("Deepika", "Padukone"));
	myList.add(new SearchPersonModel("Katrina", "Kaif"));
	return myList;
}

}
	
	
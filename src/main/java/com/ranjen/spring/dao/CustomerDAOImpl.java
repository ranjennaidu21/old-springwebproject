package com.ranjen.spring.dao;

import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.ranjen.spring.entity.Customer;

//Repository applied to DAOImplementations
@Repository
public class CustomerDAOImpl implements CustomerDAO {

	// need to inject the session factory to this DAO
	// Spring will look at configuration and see there is a bean id called sessionFactory , so
	// will inject that bean id that into this DAO
	@Autowired
	private SessionFactory sessionFactory;
	
	//Transaction automatically begin and end the hibernate code 
	//without coding begin(session.beginTransaction()) and end transaction(session.getTransaction().commit())
	//If Service layer is added this @Transactional annotation will be moved to the Service, no more in this DAO
	//@Transactional -This will be removed from this DAO as defined in Service
	public List<Customer> getCustomers() {
		
		// get the current hibernate session
		Session currentSession = sessionFactory.getCurrentSession();
				
		// create a query... sort by last name
		//update in HQL and make sure use the actual OO property name regardless of
		//column name in background database.
		Query<Customer> theQuery = 
				currentSession.createQuery("from Customer order by lastName",
						Customer.class);
		
		// execute query and get result list
		List<Customer> customers = theQuery.getResultList();
				
		// return the results		
		return customers;
	}

	public void saveCustomer(Customer theCustomer) {
		// get current hibernate session
		Session currentSession = sessionFactory.getCurrentSession();
		
		// save the customer ... finally LOL
		//session.save will insert new record , session.update will update existing record
		//currentSession.save(theCustomer);
		
		//so we will use the saveOrUpdate method for both save and update
		//where it will check the id , if exist update , if not it will create a new one.
		//so same method for both insert and update
		currentSession.saveOrUpdate(theCustomer);
	}

	public Customer getCustomer(int theId) {

		// get the current hibernate session
		Session currentSession = sessionFactory.getCurrentSession();
		
		// now retrieve/read from database using the primary key
		Customer theCustomer = currentSession.get(Customer.class, theId);
		
		return theCustomer;
	}

	public void deleteCustomer(int theId) {
		// get the current hibernate session
		Session currentSession = sessionFactory.getCurrentSession();
		
		// delete object with primary key
		Query theQuery = 
				currentSession.createQuery("delete from Customer where id=:customerId");
		//make use of the parameter here by get theId and set it as value for customerId above.
		theQuery.setParameter("customerId", theId);
		
		//this executeUpdate method is generic purpose method for whatever HQL you have,
		//it will update , delete and so on.
		theQuery.executeUpdate();	
	}

}







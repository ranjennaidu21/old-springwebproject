Need to change the entity for MYSQL. Currently configured for Oracle.
Check the commented value in the dbconfig files: spring-mvc-crud-demo-servlet.xml

Example for CustomerEntity
ORACLE
1) Changes in database (for tablename = customer), execute the following sql:

// Create sequence
CREATE SEQUENCE customer_id_sequence
START WITH 1
INCREMENT BY 1;

//Create trigger for that sequence
CREATE OR REPLACE TRIGGER test_trigger
BEFORE INSERT
ON customer
REFERENCING NEW AS NEW
FOR EACH ROW
BEGIN
SELECT customer_id_sequence.nextval INTO :NEW.ID FROM dual;
END;
/


2) Changes in Customer.java
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator = "id_Sequence")
	@SequenceGenerator(name = "id_Sequence", sequenceName = "customer_id_sequence")
	@Column(name="ID")
	private int id;
	
	@Column(name="FIRST_NAME")
	private String firstName;
	
MYSQL
For MYSQL there will be autoincrement , so this IDENTITY Generation Type will work
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	
	//FOR MYSQL the column name is small letter change it here name=xx
	@Column(name="id")
	private int id;
	
	@Column(name="first_name")
	private String firstName;
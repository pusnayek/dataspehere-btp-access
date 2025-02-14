using dwc.entities as entities from '../db/dataprov.cds';

service DataService {

    function getGreeting() returns String;
    
	entity EmployeeData as projection on entities.EMPLOYEEDATA;
}
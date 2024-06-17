using dwc.entities as my from '../db/dataprov.cds';

service DataService {

    function getGreeting() returns String;

    function connect() returns String;

	@readonly entity EmployeeData as projection on my.EmployeeData;
}
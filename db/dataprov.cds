namespace dwc.entities;

@cds.persistence.exists
entity EmployeeData {
    key employeeId : String;
        name : String;
}
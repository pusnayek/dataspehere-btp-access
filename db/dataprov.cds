namespace dwc.entities;

@cds.persistence.exists
entity EMPLOYEEDATA {
    key EMPLOYEEID  : String;
        FIRSTNAME   : String;
        LASTNAME    : String;
        JOBID       : String;
        JOBLOCATION : String;
        TELEPHONE   : String;
}
using { R_GV001_DMF as external } from './external/R_GV001_DMF.csn';

@path: 'service/dwc'
service DataSphereService  {

    function getServiceAPI() returns String;

    @readonly
    entity R_GV001_DMF as projection on external.R_GV001_DMF {
        key Employee_ID, Legal_Name_First_Name, Legal_Name_Last_Name
    };

}
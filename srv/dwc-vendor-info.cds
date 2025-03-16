using { IBMSAP_Vendor_Information_View_edmx as external } from './external/IBMSAP_Vendor_Information_View.edmx';

service VendorService {

    function getGreeting() returns String;


    @readonly
    entity IBMSAP_Vendor_Information_View as projection on external.IBMSAP_Vendor_Information_View;

}
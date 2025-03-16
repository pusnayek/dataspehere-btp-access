sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'ibm/vendorinfo/sapathonui/test/integration/FirstJourney',
		'ibm/vendorinfo/sapathonui/test/integration/pages/IBMSAP_Vendor_Information_ViewList',
		'ibm/vendorinfo/sapathonui/test/integration/pages/IBMSAP_Vendor_Information_ViewObjectPage'
    ],
    function(JourneyRunner, opaJourney, IBMSAP_Vendor_Information_ViewList, IBMSAP_Vendor_Information_ViewObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('ibm/vendorinfo/sapathonui') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheIBMSAP_Vendor_Information_ViewList: IBMSAP_Vendor_Information_ViewList,
					onTheIBMSAP_Vendor_Information_ViewObjectPage: IBMSAP_Vendor_Information_ViewObjectPage
                }
            },
            opaJourney.run
        );
    }
);
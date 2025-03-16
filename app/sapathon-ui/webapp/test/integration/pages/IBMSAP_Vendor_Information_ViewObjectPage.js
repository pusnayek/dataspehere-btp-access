sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'ibm.vendorinfo.sapathonui',
            componentId: 'IBMSAP_Vendor_Information_ViewObjectPage',
            contextPath: '/IBMSAP_Vendor_Information_View'
        },
        CustomPageDefinitions
    );
});
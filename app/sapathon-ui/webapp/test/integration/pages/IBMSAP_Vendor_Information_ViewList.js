sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'ibm.vendorinfo.sapathonui',
            componentId: 'IBMSAP_Vendor_Information_ViewList',
            contextPath: '/IBMSAP_Vendor_Information_View'
        },
        CustomPageDefinitions
    );
});
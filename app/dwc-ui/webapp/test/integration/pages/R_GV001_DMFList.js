sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'dwc.ui.dwcui',
            componentId: 'R_GV001_DMFList',
            contextPath: '/R_GV001_DMF'
        },
        CustomPageDefinitions
    );
});
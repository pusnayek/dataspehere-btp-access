sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'dwc.ui.dwcui',
            componentId: 'R_GV001_DMFObjectPage',
            contextPath: '/R_GV001_DMF'
        },
        CustomPageDefinitions
    );
});
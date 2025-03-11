sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'dwc/ui/dwcui/test/integration/FirstJourney',
		'dwc/ui/dwcui/test/integration/pages/R_GV001_DMFList',
		'dwc/ui/dwcui/test/integration/pages/R_GV001_DMFObjectPage'
    ],
    function(JourneyRunner, opaJourney, R_GV001_DMFList, R_GV001_DMFObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('dwc/ui/dwcui') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheR_GV001_DMFList: R_GV001_DMFList,
					onTheR_GV001_DMFObjectPage: R_GV001_DMFObjectPage
                }
            },
            opaJourney.run
        );
    }
);
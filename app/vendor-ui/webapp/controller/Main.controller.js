sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("ibm.vendorinfo.vendorui.controller.Main", {
        onInit() {
            this.getOwnerComponent().getModel().metadataLoaded().then(function() {
                this.fetchVendors();
            }.bind(this));
        },

        fetchVendors: function() {
            var _this = this;
            var oModel = this.getOwnerComponent().getModel();
            oModel.read("/IBMSAP_Vendor_Information_View", {
                success: function(data) {
                    var results = data.results;
                    _this.getView().setModel(new JSONModel(results), "vendors");
                }
            });
        }
    });
});
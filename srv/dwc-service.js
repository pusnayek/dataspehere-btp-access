const cds = require('@sap/cds');

module.exports = cds.service.impl(async function(req, res) {
    const { R_GV001_DMF } = this.entities;
    console.log(req.headers)
    const service = await cds.connect.to('R_GV001_DMF');
    this.on('READ', R_GV001_DMF, request => {
        return service.tx(request).run(request.query);
    });

    this.on('getServiceAPI', async (req, res) => {
        // Get the user token from the request
        console.log(req.headers)
        var destApi = await cds.connect.to("R_GV001_DMF");
        // const userToken = (req.headers["authorization"]).split(" ")[1];
        // console.log("INFO: User Token>" + userToken);
        // // Get the destination for calling the Datasphere API
        // const datasphereToken = await findDestinationSAML(
        //     "DATASPHERE-DEV-API", userToken
        // );
        // console.log("INFO: DATASPHERE-DEV-API Token>" + userToken);

		// const path = Object.values(req.params).join("/");
		// const response = await axios({
		// 	method: "get",
		// 	url: `${process.env.DATASPHERE_HOST}/${path}`,
		// 	headers: {
		// 		Authorization: `Bearer datasphereToken.value`,
		// 		"Content-Type": "application/json",
		// 	},
		// });

        // res.status(response.status).json(response.data);
        return "Hello"
    })     
    

});
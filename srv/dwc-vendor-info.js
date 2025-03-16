const cds = require('@sap/cds')
const https = require('https')
const hana = require('@sap/hana-client');
const cfenv = require('cfenv')
const { resolve } = require('path');
const LOG = cds.log('dwcapi')

class VendorService extends cds.ApplicationService { init() {

  const { IBMSAP_Vendor_Information_View } = this.entities;
  const datasphereApiConst = {"client_id": "sb-094d8ec8-d752-4086-870d-d30ba01851fd!b28418|client!b655","client_secret":"ad3040e9-db1b-4fef-8ece-7034fd616fa1$lcRb7V6wOGuqNtP7e_stTZfme8HZ365V4VA2tEQWGmY=","auth_refresh_token":"21444b82793e4026a26fbec3c80d58b8-r","hostname":"international-1.us10.hcs.cloud.sap","authhostname":"international-1.authentication.us10.hana.ondemand.com"};  
  // const datasphereApiConst = JSON.parse(process.env.DATASPHERE_OAUTH_ACCESS);  
  const {client_id, client_secret, auth_refresh_token, hostname, authhostname} = datasphereApiConst

  let access_token;

  //-fetch access token  
  //-prepare the call for access token
  const tokenConfig = {
      hostname: authhostname,
      path: "/oauth/token?grant_type=refresh_token&refresh_token=".concat(auth_refresh_token),
      headers: {
          Authorization: "Basic ".concat(Buffer.from(client_id + ':' + client_secret).toString('base64'))
      }
  }

  get(tokenConfig).then((token) => {
    //-get the access token
    access_token = JSON.parse(token).access_token
    console.log("Access token fetched")
  })

  this.on('getGreeting', () => "Hello World" ) 

  this.on('CREATE', IBMSAP_Vendor_Information_View, async (req) => {
    var header = JSON.stringify(req.http.req.header)
    // console.log(req.http.req.header)
    console.log('Header'+header)
  })


  this.on('READ', IBMSAP_Vendor_Information_View, async (req) => {
    var header = JSON.stringify(req.http.req.header)
    // console.log(req.http.req.header)
    console.log('Header'+header)
    var { url } = req.http.req;
    console.log(url)
    // console.log(req.http.body)
    // const apiConfig = {
    //     hostname: hostname,
    //     path: '/api/v1/dwc/consumption/relational/SAPATHON/IBMSAP_Vendor_Information_View'.concat(url),
    //     headers: {
    //         Authorization: 'Bearer '.concat(access_token)
    //     }
    // }

    const apiConfig = {
      hostname: hostname,
      path: '/api/v1/dwc/consumption/relational/SAPATHON/IBMSAP_Vendor_Information_View/IBMSAP_Vendor_Information_View',
        headers: {
            Authorization: 'Bearer '.concat(access_token)
        }
    }
  
    const data = await get(apiConfig);
    // console.log(JSON.parse(data).value)
    return JSON.parse(data).value;
  })

  async function get(options) {
    return new Promise((resolve, reject) => {
        https.get(options, (resp) => {
            let data = ''          
            resp.on('data', (chunk) => { data += chunk })          
            resp.on('end', () => { resolve(data) })          
          }).on("error", (err) => {
            reject(err)
          })      
    })
}


  return super.init()
}}

module.exports = { VendorService }
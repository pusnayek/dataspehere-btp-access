const cds = require('@sap/cds')
const https = require('https')
const hana = require('@sap/hana-client');
const cfenv = require('cfenv')
const { resolve } = require('path');
const LOG = cds.log('dwcapi')

class DataService extends cds.ApplicationService { init() {

  const { R_GV001_DMF } = this.entities;
  const datasphereApiConst = {"client_id": "sb-0e256746-3994-4be8-89fe-597752139b9e!b174134|client!b655","client_secret":"bb5050bb-7313-4534-b0ea-55ace15fc2c4$JTuge0q2LS3cgc3ON89fwNDSyn5-toTQzrebFhkSBE8=","auth_refresh_token":"076edb93c4154a358bd05d95be8b7702-r","hostname":"ibm-q.us10.hcs.cloud.sap","authhostname":"ibm-q.authentication.us10.hana.ondemand.com"};  
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

  this.on('CREATE', R_GV001_DMF, async (req) => {
    var header = JSON.stringify(req.http.req.header)
    // console.log(req.http.req.header)
    console.log('Header'+header)
  })


  this.on('READ', R_GV001_DMF, async (req) => {
    var header = JSON.stringify(req.http.req.header)
    // console.log(req.http.req.header)
    console.log('Header'+header)
    var { url } = req.http.req;
    // console.log(req.http.body)
    // console.log(req.http.body)
    const apiConfig = {
        hostname: hostname,
        path: '/api/v1/dwc/consumption/relational/RPT_RASRV_001/R_GV001_DMF'.concat(url),
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

module.exports = { DataService }
const cds = require('@sap/cds')
const https = require('https')
const hana = require('@sap/hana-client');
const cfenv = require('cfenv')
const { resolve } = require('path');
const LOG = cds.log('dwcapi')

class DataService extends cds.ApplicationService { init() {

  const { R_GV001_DMF } = this.entities;
  const datasphereApiConst = JSON.parse(process.env.DATASPHERE_OAUTH_ACCESS);  
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

  this.on('READ', R_GV001_DMF, async (req) => {
    var { url } = req.http.req;
    console.log(url)
    const apiConfig = {
        hostname: hostname,
        path: '/api/v1/dwc/consumption/relational/RPT_RASRV_001/R_GV001_DMF'.concat(url),
        headers: {
            Authorization: 'Bearer '.concat(access_token)
        }
    }
    
    const data = await get(apiConfig);
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
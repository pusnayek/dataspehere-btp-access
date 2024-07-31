const cds = require('@sap/cds')
const https = require('https')
const hana = require('@sap/hana-client');
const cfenv = require('cfenv')
const { resolve } = require('path');
const LOG = cds.log('dwcapi')

class DataService extends cds.ApplicationService { init() {

  const { EmployeeData } = this.entities;
  
  this.on('getGreeting', () => 'Hello World' ) 

  this.on('connect', async (req, res) => {
        const result = await connect();
        return result;
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

  async function post(options) {
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

  const getDestinationServiceToken = async function(uaa_service, dest_service) {
    const sUaaCredentials = dest_service.credentials.clientid + ':' + dest_service.credentials.clientsecret;
    const post_options = {
      url: uaa_service.credentials.url + '/oauth/token',
      method: 'POST',
      headers: {
          'Authorization': 'Basic ' + Buffer.from(sUaaCredentials).toString('base64'),
          'Content-type': 'application/x-www-form-urlencoded'
      },
      form: {
          'client_id': dest_service.credentials.clientid,
          'grant_type': 'client_credentials'
      }
    }
    LOG.info(post_options)
    // console.log(post_options)
    return new Promise(function(resolve, reject) {
      post(post_options).then(function(data) {
        const token = JSON.parse(data).access_token;
        resolve(token)
        // const get_options = {
        //     url: dest_service.credentials.uri + '/destination-configuration/v1/destinations/' + sDestinationName,
        //     headers: {
        //         'Authorization': 'Bearer ' + token
        //     }
        // }
          
        // get(get_options).then(function(data) {
        //   const oDestination = JSON.parse(data);
        //   const token = oDestination.authTokens[0];
  
        //   const options = {
        //       method: 'GET',
        //       url: oDestination.destinationConfiguration.URL + sEndpoint,
        //       headers: {
        //           'Authorization': `${token.type} ${token.value}`
        //       }
        //   };
  
        //   get(options).then((s) => {
        //       console.log(s.toString())
        //   });
  
        // }).catch(function(oError) {
  
        // })
      }).catch(function(oError) {
        LOG.error(oError)
        reject(oError)
      })  
    })
  }

  const connect = async function() {
    // const uaa_service = cfenv.getAppEnv().getService('auth');
    // const dest_service = cfenv.getAppEnv().getService('destinations');
    const uaa_service = cfenv.getAppEnv().getService('datasphere-api-access-xsuaa');
    const dest_service = cfenv.getAppEnv().getService('destination-service');

    console.log(uaa_service)
    // return sUaaCredentials;
    return await getDestinationServiceToken(uaa_service, dest_service)
  }

  this.on('READ', EmployeeData, async () => {
    return await read()
  })

  this.on('CREATE', EmployeeData, async (req) => {
    var data = await create(req.data)
    LOG.info(data)
    return req.data
  })

  const read = async function() {
    var conn = hana.createConnection();
    let result = {};
    var conn_params = {
      serverNode  : '3a8e2c5d-70e3-474b-8f5e-77ed8f0c8493.hna0.prod-us10.hanacloud.ondemand.com:443',
      uid         : 'SANDBOX_002#CAP',
      pwd         : "*9[3G]]V$*L]7tqpy*wY%uy*(5^HOIY2",
      sslValidateCertificate: 'false'
    };

    return new Promise((resolve, reject) => {
      conn.connect(conn_params, function(err) {
        if (err) {
          LOG.error(err)
          reject(err)
        }
        conn.exec('SELECT * FROM "SANDBOX_002#CAP"."EMPLOYEEDATA"', [], function (err, records) {
            if (err) {
              LOG.error(err)
              reject(err)
            }
            // console.log('Rows:', records)
            // LOG.info(records)
            conn.disconnect();
            resolve(records)
          })
      });    
    })
  }

  const create = async function(data) {
    var conn = hana.createConnection();
    let result = {};
    var conn_params = {
      serverNode  : '3a8e2c5d-70e3-474b-8f5e-77ed8f0c8493.hna0.prod-us10.hanacloud.ondemand.com:443',
      uid         : 'SANDBOX_002#CAP',
      pwd         : "*9[3G]]V$*L]7tqpy*wY%uy*(5^HOIY2",
      sslValidateCertificate: 'false'
    };

    return new Promise((resolve, reject) => {
      conn.connect(conn_params, function(err) {
        if (err) {
          LOG.error(err)
          reject(err)
        }
        var sql = "INSERT INTO \"SANDBOX_002#CAP\".\"EMPLOYEEDATA\" VALUES('" + data.EMPLOYEEID + "', '" + data.FIRSTNAME + "', '" +  
                data.LASTNAME + "', '" + data.JOBID + "', '" + data.JOBLOCATION + "', '" + data.TELEPHONE + "')";
        LOG.info(sql)
        conn.exec(sql, [], function (err, records) {
            if (err) {
              LOG.error(err)
              reject(err)
            }
            // console.log('Rows:', records)
            LOG.info(records)
            conn.disconnect();
            resolve(records)
          })
      });    
    })
  }

  return super.init()
}}

module.exports = { DataService }
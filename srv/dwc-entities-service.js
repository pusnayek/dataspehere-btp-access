const cds = require('@sap/cds')
const hana = require('@sap/hana-client');
const { resolve } = require('path');
const LOG = cds.log('dwcapi')

class DataService extends cds.ApplicationService { init() {

  this.on('getGreeting', () => 'Hello World' ) 

  this.on('connect', async (req, res) => {

    // try {
        const result = await connect();
        return result;
    // } catch (e) {
    //     return e.Error;
    //     // return JSON.stringify(e);
    // } 
    // finally {
    //   return JSON.stringify(e);
    // }

    // var conn = hana.createConnection();
    // let result = {};
    // var conn_params = {
    //   serverNode  : '3a8e2c5d-70e3-474b-8f5e-77ed8f0c8493.hna0.prod-us10.hanacloud.ondemand.com:443',
    //   uid         : 'SANDBOX_002#CAP',
    //   pwd         : "*9[3G]]V$*L]7tqpy*wY%uy*(5^HOIY2",
    //   sslValidateCertificate: 'false'
    // };

    
    // // return JSON.stringify({ 'msg': 'This is not a good sign'}); 
    // await conn.connect(conn_params, async function(err) {
    //   if (err) {
    //     // return req.error(500, "Error occured connecting.." + err);
    //     // result.message = "Error occured connecting..";
    //     throw err;
    //   }
    //   await conn.exec('SELECT TOP 1 * FROM "SANDBOX_002"."H_GV001_FMS_Emp_Job"', [], async function (err, records) {
    //       if (err) {
    //         // return req.error(500, "Error occured executing sql.." + err);
    //         // result.message = "Error occured executing sql..";
    //         throw err;
    //       }
    //       result = {
    //         "name" : records[0].userId,
    //         "Tax" : records[0].payGrade
    //       };
    //       console.log('Rows:', result);
    //       conn.disconnect();
    //     })
    // });  
    // return JSON.stringify(result);
  }) 

  const connect = async function() {
    var conn = hana.createConnection();
    let result = {};
    var conn_params = {
      serverNode  : '3a8e2c5d-70e3-474b-8f5e-77ed8f0c8493.hna0.prod-us10.hanacloud.ondemand.com:443',
      uid         : 'SANDBOX_002#CAP',
      pwd         : "*9[3G]]V$*L]7tqpy*wY%uy*(5^HOIY2",
      sslValidateCertificate: 'false'
    };
    // return JSON.stringify({ 'msg': 'This is not a good sign'}); 
    return new Promise((resolve, reject) => {
      conn.connect(conn_params, function(err) {
        if (err) {
          LOG.error(err)
          reject(err)
        }
        conn.exec('SELECT TOP 1 * FROM "SANDBOX_002"."H_GV001_FMS_Emp_Job"', [], function (err, records) {
            if (err) {
              LOG.error(err)
              reject(err)
            }
            console.log('Rows:', records)
            // result = {
            //   "name" : records[0].userId,
            //   "Tax" : records[0].payGrade
            // }
            LOG.info(records)
            conn.disconnect();
            resolve(JSON.stringify(records))
          })
      });    
    })
  }

  return super.init()
}}

module.exports = { DataService }
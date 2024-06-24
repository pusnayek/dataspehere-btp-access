const cds = require('@sap/cds')
const hana = require('@sap/hana-client');
const { resolve } = require('path');
const LOG = cds.log('dwcapi')

class DataService extends cds.ApplicationService { init() {

  const { EmployeeData } = this.entities;
  
  this.on('getGreeting', () => 'Hello World' ) 

  this.on('connect', async (req, res) => {
        const result = await connect();
        return result;
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
            LOG.info(records)
            conn.disconnect();
            resolve(JSON.stringify(records))
          })
      });    
    })
  }

  this.on('READ', EmployeeData, async () => {
    return await read()
  })

  this.on('CREATE', EmployeeData, async (req) => {
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
            LOG.info(records)
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
        conn.exec('SELECT * FROM "SANDBOX_002#CAP"."EMPLOYEEDATA"', [], function (err, records) {
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
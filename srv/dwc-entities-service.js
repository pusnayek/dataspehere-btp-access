const cds = require('@sap/cds')
const https = require('https')
const hana = require('@sap/hana-client');
const cfenv = require('cfenv')
const { resolve } = require('path');
const LOG = cds.log('dwcapi')

class DataService extends cds.ApplicationService { init() {

  const { EmployeeData } = this.entities;
  
  this.on('getGreeting', () => 'Hello World' ) 

  this.on('READ', EmployeeData, async (req) => {
    return service.tx(request).run(request.query);
  })

  return super.init()
}}

module.exports = { DataService }
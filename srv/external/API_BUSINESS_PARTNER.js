const cds = require('@sap/cds');

module.exports = cds.service.impl(async srv => {

    /*
    srv.on('READ', req => {
        console.log('BUSINESS PARTNER READ');
    })
    */

    srv.on(['CREATE', 'UPDATE', 'DELETE'], req => {
        const payload = { KEY: [{ BUSINESSPARTNER: req.data.BusinessPartner }] }
    })

})
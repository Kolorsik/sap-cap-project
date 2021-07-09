const cds = require('@sap/cds');

module.exports = cds.service.impl(srv => {

    const { Phones } = srv.entities('sap.capire.phoneshop');

    srv.on('id', async (req) => {
        console.log(`[${req.timestamp}]`)
        //const { req, res } = request._;
        const { id } = req.data;
        const phone = await cds.transaction(req).run(
            SELECT.from(Phones)
            .where({ ID: id })
        )
        return phone;
    })

    srv.on('hello', req => {
        return `Hello ${req.data.to}!`;
    })
})

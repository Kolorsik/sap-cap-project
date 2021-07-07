const cds = require('@sap/cds');
const { Phones } = cds.entities;

module.exports = cds.service.impl(srv => {

    srv.after('READ', 'Phones', (each) => {
        if (each.stock > 100) each.title += ' -- 11% discount!!!'
    })

    srv.before('CREATE', 'Orders', async (req) => {
        const tx = cds.transaction(req), order = req.data;
        if (order.Items) {
            const affectedRows = await tx.run(order.Items.map(item => {
                return UPDATE(Phones).where({ID:item.phone_ID})
                    .and('stock >=', item.amount)
                    .set('stock -=', item.amount)
            }))
            affectedRows.forEach((row, i) => {
                if (row === 0) {
                    req.error(409, `${order.Items[i].amount} exceeds stock for phone#${order.Items[i].phone_ID}`);
                }
            })
        }
    })

    srv.before('*', (req) => {
        console.debug(`>>> ${req.method} | ${req.target.name}`)
    })

})

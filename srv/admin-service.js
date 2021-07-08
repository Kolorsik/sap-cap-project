const cds = require('@sap/cds');

module.exports = cds.service.impl(srv => {

    srv.before('CREATE', 'Orders', _checkCurrencyCode)

    srv.before('READ', 'Orders', (req) => {
        //console.log(req.user);
    })

    /*
    const { OrderItems } = srv.entities('sap.capire.phoneshop');

    srv.after(['READ', 'EDIT'], 'Orders', _calculateTotals);

    async function _calculateTotals (orders, req) {
        const ordersById = Array.isArray(orders)
            ? orders.reduce ((all, o) => { (all[o.ID] = o).totalPrice = 0; return all }, {})
            : { [orders.ID]: orders };

        return cds.transaction(req).run(
            SELECT.from(OrderItems).columns('parent_ID', 'netAmount')
                .where({ parent_ID: {in: Object.keys(ordersById)} })
        ).then(items => {
            items.forEach(item => {
                ordersById[item.parent_ID].totalPrice += item.netAmount;
            })
        })
    }
    */
})

function _checkCurrencyCode(req) {
    req.user.currency[0] === req.data.currency_code || req.reject(403)
}
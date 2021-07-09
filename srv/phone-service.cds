using { sap.capire.phoneshop as my } from '../db/schema';

service CatalogService @(path:'/browse') {
    @readonly entity Phones as projection on my.Phones {*,
        producer.name as producer
    } excluding { createdBy, modifiedBy };

    @requires_: 'authenticated-user'
    @insertonly entity Orders as projection on my.Orders;
}
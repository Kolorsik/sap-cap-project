using { sap.capire.phoneshop as my } from '../db/schema';

using { API_BUSINESS_PARTNER as external } from './external/API_BUSINESS_PARTNER.csn';

service CatalogService @(path:'/browse') {
    @readonly entity Phones as projection on my.Phones {*,
        producer.name as producer
    } excluding { createdBy, modifiedBy };

    @requires_: 'authenticated-user'
    @insertonly entity Orders as projection on my.Orders;

    @readonly entity BusinessPartners as projection on external.A_BusinessPartner {
        key BusinessPartner as ID,
        FirstName,
        MiddleName,
        LastName,
        BusinessPartnerIsBlocked
    }
}
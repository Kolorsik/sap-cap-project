using { sap.capire.phoneshop as my } from '../db/schema';
service AdminService @(requires:'authenticated-user') {
    entity Phones as projection on my.Phones;
    entity Movies as projection on my.Movies;
    entity Producers as projection on my.Producers;
    entity Orders as projection on my.Orders;
}

//annotate AdminService.Orders with @odata.draft.enabled;

extend service AdminService with {
    entity OrderItems as select from my.OrderItems;
}

annotate AdminService.Orders with @(restrict: [
    { grant: 'READ', to: 'admin' }
]);

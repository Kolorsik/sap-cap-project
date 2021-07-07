namespace sap.capire.phoneshop;
using { Currency, managed, cuid } from '@sap/cds/common';

entity Phones : managed, additionalInfo {
    key ID : Integer;
    title : localized String(100);
    description : localized String(1000);
    producer : Association to Producers;
    stock : Integer;
    price : Decimal(9, 2);
    currency : Currency;
}

//@cds.autoexpose
entity Producers : managed {
    key ID : Integer;
    name : String(100);
    phones : Association to many Phones on phones.producer = $self;
}

entity Orders : managed, cuid {
    OrderNo : String @title : 'Order Number';
    Items : Composition of many OrderItems on Items.parent = $self;
    total : Decimal(9, 2) @readonly;
    currency : Currency;
}

entity OrderItems : cuid {
    parent :  Association to Orders;
    phone : Association to Phones;
    amount : Integer;
}

entity Movies : additionalInfo, cuid {
    name : String(100);
}

aspect additionalInfo {
    genre : String(100);
    language : String(200);
}
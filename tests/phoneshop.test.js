const cds = require('@sap/cds');

describe('Phoneshop: OData protocol level testing', () => {
    const app = require('express')();
    const request = require('supertest')(app);

    beforeAll(async () => {
        await cds.deploy(__dirname + '/../srv/phone-service').to('sqlite::memory:');
        await cds.serve('CatalogService').from(__dirname + '/../srv/phone-service').in(app);
    })

    it('Service $metadata document', async () => {
        const response = await request
            .get('/browse/$metadata')
            .expect('Content-Type', /^application\/xml/)
            .expect(200);

        const expectedVersion = '<edmx:Edmx Version="4.0" xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx">';
        const expectedPhonesEntityList = '<EntitySet Name="Phones" EntityType="CatalogService.Phones">';
        expect(response.text.includes(expectedVersion)).toBeTruthy();
        expect(response.text.includes(expectedPhonesEntityList)).toBeTruthy();
    })

    it('Get with select, expand and localized', async () => {
        const response = await request
            .get('/browse/Phones?&$select=ID,title,description,stock,price&sap-language=de')
            .expect('Content-Type', /^application\/json/)
            .expect(200);
        
        expect(response.body.value).toEqual([
            {
              ID: 200,
              title: 'Xiaomi Redmi Note 8 -- 11% discount!!!',
              description: 'good telephone',
              stock: 200,
              price: 200.99
            },
            {
              ID: 201,
              title: 'Samsung Galaxy Note S20',
              description: 'good telephone',
              stock: 20,
              price: 399.99
            }
          ]);
    })

})

describe('Phoneshop: CDS service level testing', () => {
    let srv, Phones;

    beforeAll(async () => {
        srv = await cds.serve('CatalogService').from(__dirname + '/../srv/phone-service');
        Phones = srv.entities.Phones;
        expect(Phones).toBeDefined();
    })

    it('Get all phones', async () => {
        const phones = await srv.read(Phones, p => { p.title });

        expect(phones).toMatchObject([
            { title: 'Xiaomi Redmi Note 8' },
            { title: 'Samsung Galaxy Note S20' }
        ]);
    })
})
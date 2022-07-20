const apiController = require('../../Application/controllers/apiController.js');
const fs = require('fs');

describe('unit test for apiController', () => {

    describe('unit testing for apiController.createLocation', async () => {
        beforeEach((req, res, next) => {
            req.body = {
            address : '123 testing lane',
            price : 20,
            options : 'yes please',
            size : 2
            };
            res.locals.username = {hostName : 'bob',};
            res.locals.data = {lat: 57, lng: 57};
        })
        it('creates a new location', (req, res, next) => {
            const result = await apiController.createLocation(req, res, next)  
            expect(result).not.toBeInstanceOf(Error);
        });
        it('')
    });
});
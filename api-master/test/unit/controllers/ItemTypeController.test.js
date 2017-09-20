"use strict";

var prefix = '/v1';

var request = require('supertest');

describe(prefix + '/itemtypes', function() {
    before(function(done) {
        User.create({ username: 'itemTypeControllerTest', password: 'password', email: 'itemTypeControllerTestitemTypeControllerTest@gmail.com', firstName: 'itemTypeControllerTest', lastName: 'itemTypeControllerTest' }).then(user => {
            Department.create({ name: 'itemTypeControllerTest', creator: 1 }).then(department => {
                Building.create({ name: 'itemTypeControllerTest', creator: 1, department: 1 }).then(building => {
                    Room.create({ number: 1, creator: 1, building: 1 }).then(room => {
                        Itemtype.create({ name: 'itemTypeControllerTest', creator: 1 }).then(room => {
                            Item.create({ barcode: 1234, creator: 1, type: 1, room: 1 }).then(room => {
                                done();
                            }).catch(done);
                        }).catch(done);
                    }).catch(done);
                }).catch(done);
            }).catch(done);
        }).catch(done);
    });

    describe('/:itemTypeId/items', function() {
        it('200', function(done) {
            request(sails.hooks.http.app)
                .post(prefix + '/itemtypes/1/items')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });

        it('404', function(done) {
            request(sails.hooks.http.app)
                .post(prefix + '/itemtypes/99/items')
                .expect(404)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });
    });
});

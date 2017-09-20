"use strict";

var prefix = '/v1';

var request = require('supertest');

describe(prefix + '/rooms', function() {
    before(function(done) {
        User.create({ username: 'roomControllerTest', password: 'password', email: 'roomControllerTest@gmail.com', firstName: 'roomControllerTest', lastName: 'roomControllerTest' }).then(user => {
            Department.create({ name: 'roomControllerTest', creator: 1 }).then(department => {
                Building.create({ name: 'roomControllerTest', creator: 1, department: 1 }).then(building => {
                    Room.create({ number: 1, creator: 1, building: 1 }).then(room => {
                        done();
                    }).catch(done);
                }).catch(done);
            }).catch(done);
        }).catch(done);
    });

    describe('/:roomId/item', function() {
        it('200', function(done) {
            request(sails.hooks.http.app)
                .get(prefix + '/rooms/1/item')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });

        it('404', function(done) {
            request(sails.hooks.http.app)
                .get(prefix + '/rooms/99/item')
                .expect(404)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });
    });

    describe('/:roomId/item/:itemTypeId', function() {
        it('200', function(done) {
            request(sails.hooks.http.app)
                .get(prefix + '/rooms/1/item/1')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });

        it('404', function(done) {
            request(sails.hooks.http.app)
                .get(prefix + '/rooms/99/item/1')
                .expect(404)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });
    });

    describe('/:roomId/items', function() {
        it('200', function(done) {
            request(sails.hooks.http.app)
                .get(prefix + '/rooms/items')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });
    });

    describe('/building/:buildingId', function() {
        it('200', function(done) {
            request(sails.hooks.http.app)
                .get(prefix + '/rooms/building/1')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });

        it('404', function(done) {
            request(sails.hooks.http.app)
                .get(prefix + '/rooms/building/99')
                .expect(404)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });
    });
});

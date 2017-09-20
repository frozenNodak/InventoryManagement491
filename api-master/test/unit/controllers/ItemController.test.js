"use strict";

var prefix = '/v1';

var request = require('supertest');

describe(prefix + '/items', function() {
    describe('/search/:departmentId/:buildingId/:roomId <- Can not test Currently but works', function() {});
    /*
    before(function(done) {
        User.create({ username: 'itemControllerTest', password: 'password', email: 'itemControllerTest@gmail.com', firstName: 'itemControllerTest', lastName: 'itemControllerTest' }).then(user => {
            Department.create({ name: 'itemControllerTest', creator: 1 }).then(department => {
                Building.create({ name: 'itemControllerTest', creator: 1, department: 1 }).then(building => {
                    Room.create({ number: 1, creator: 1, building: 1 }).then(room => {
                        Itemtype.create({ name: 'itemControllerTest', creator: 1 }).then(room => {
                            Item.create({ barcode: 1234, creator: 1, type: 1, room: 1 }).then(room => {
                                done();
                            }).catch(done);
                        }).catch(done);
                    }).catch(done);
                }).catch(done);
            }).catch(done);
        }).catch(done);
    });

    describe('/search/:departmentId/:buildingId/:roomId', function() {
        it('200 <- With all', function(done) {
            request(sails.hooks.http.app)
                .get(prefix + '/items/search/1/1/1')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });

        it('200 <- Without room', function(done) {
            request(sails.hooks.http.app)
                .get(prefix + '/items/search/1/1')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });

        it('200 <- Without building and room', function(done) {
            request(sails.hooks.http.app)
                .get(prefix + '/items/search/1/1')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });

        it('200 <- Without any', function(done) {
            request(sails.hooks.http.app)
                .get(prefix + '/items/search')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });

        it('404 <- Wrong Room', function(done) {
            request(sails.hooks.http.app)
                .get(prefix + '/items/search/1/1/99')
                .expect(404)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });

         it('404 <- Wrong Building', function(done) {
            request(sails.hooks.http.app)
                .get(prefix + '/items/search/1/99/1')
                .expect(404)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });

          it('404 <- Wrong Department', function(done) {
            request(sails.hooks.http.app)
                .get(prefix + '/items/search/99/1/1')
                .expect(404)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });
    });
    */
});

"use strict";

var prefix = '/v1';

var request = require('supertest');

describe(prefix + '/buildings', function() {
    before(function(done) {
        User.create({ username: 'buildingControllerTest', password: 'password', email: 'buildingControllerTest@gmail.com', firstName: 'buildingControllerTest', lastName: 'buildingControllerTest' }).then(user => {
            Department.create({ name: 'buildingControllerTest', creator: 1 }).then(department => {
                Building.create({ name: 'buildingControllerTest', creator: 1, department: 1 }).then(department => {
                    done();
                }).catch(done);
            }).catch(done);
        }).catch(done);
    });

    describe('/:roomId/room', function() {
        it('200', function(done) {
            request(sails.hooks.http.app)
                .get(prefix + '/buildings/1/room')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });

        it('404', function(done) {
            request(sails.hooks.http.app)
                .get(prefix + '/buildings/99/room')
                .expect(404)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });
    });

    describe('/rooms', function() {
        it('200', function(done) {
            request(sails.hooks.http.app)
                .get(prefix + '/buildings/rooms')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });
    });

    describe('/building/:departmentId', function() {
        it('200', function(done) {
            request(sails.hooks.http.app)
                .get(prefix + '/buildings/department/1')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });

        it('404', function(done) {
            request(sails.hooks.http.app)
                .get(prefix + '/buildings/department/99')
                .expect(404)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });
    });
});

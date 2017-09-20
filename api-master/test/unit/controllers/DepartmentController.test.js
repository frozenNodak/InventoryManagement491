"use strict";

var prefix = '/v1';

var request = require('supertest');

describe(prefix + '/departments', function() {
    before(function(done) {
        User.create({ username: 'departmentControllerTest', password: 'password', email: 'departmentControllerTest@gmail.com', firstName: 'departmentControllerTestFirstName', lastName: 'departmentControllerTestLastName' }).then(user => {
            Department.create({ name: 'departmentControllerTest', creator: 1 }).then(department => {
                done();
            }).catch(done);
        }).catch(done);
    });

    describe('/:departmentId/building', function() {
        it('200', function(done) {
            request(sails.hooks.http.app)
                .get(prefix + '/departments/1/building')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });

        it('404', function(done) {
            request(sails.hooks.http.app)
                .get(prefix + '/departments/99/building')
                .expect(404)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });
    });
});

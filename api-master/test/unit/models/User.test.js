"use strict";

const assert = require('chai').assert;

const newUser = {
    id: 1,
    username: 'modelTest',
    password: 'password',
    email: 'modelTest@gmail.com',
    firstName: 'firstname',
    lastName: 'lastname'
};

describe('models:User', () => {
    it('Should create new user', done => {
        User.create(newUser).then(user => {
            assert.equal(user.username, newUser.username);
            done();
        }).catch(done);
    });

    it('Should Get Users and toJSON last in list', done => {
        User.find().then(user => {
            assert.isNotNull(user.pop().toJSON());
            done();
        }).catch(done);
    });

    it('Should Get Users', done => {
        User.find().then(user => {
            assert.isNotNull(user);
            done();
        }).catch(done);
    });

    it('Should Get User', done => {
        User.findOne(newUser.id).then(user => {
            assert.equal(user.id, newUser.id);
            done();
        }).catch(done);
    });

    it('Should Update User', done => {
        User.update({ id: newUser.id }, { password: 'password1' }).then(user => {
            assert.notEqual(user, newUser);
            done();
        }).catch(done);
    });

    it('Should remove user', done => {
        User.destroy({ username: newUser.username }).then(users => {
            assert.equal(users[0].username, newUser.username);
            done();
        }).catch(done);
    });
});

"use strict";

const assert = require('chai').assert;

const newItemtype = {
    id: 1,
    name: 'ItemtypeModelTest',
    creator: 1
};

describe('models:Itemtype', () => {
    before(function(done) {
        User.create({ username: 'ItemtypeModelTest', password: 'password', email: 'ItemtypeModelTest@gmail.com', firstName: 'ItemtypeModelFirstName', lastName: 'ItemtypeModelLastName' }).then(user => {
            done();
        }).catch(done);
    });

    it('Should create new a Itemtype', done => {
        Itemtype.create(newItemtype).then(itemtype => {
            assert.equal(itemtype.id, newItemtype.id);
            done();
        }).catch(done);
    });

    it('Should Get Itemtypes and toJSON last in list', done => {
        Itemtype.find().then(itemtype => {
            assert.isNotNull(itemtype.pop().toJSON());
            done();
        }).catch(done);
    });

    it('Should Get Itemtypes', done => {
        Itemtype.find().then(itemtype => {
            assert.isNotNull(itemtype);
            done();
        }).catch(done);
    });

    it('Should Get Itemtype', done => {
        Itemtype.findOne(newItemtype.id).then(itemtype => {
            assert.equal(itemtype.id, newItemtype.id);
            done();
        }).catch(done);
    });

    it('Should Update Itemtype', done => {
        Itemtype.update({ id: newItemtype.id }, { number: 2 }).then(itemtype => {
            assert.notEqual(itemtype, newItemtype);
            done();
        }).catch(done);
    });
});

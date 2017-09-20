"use strict";

const assert = require('chai').assert;

const newItem = {
    id: 1,
    barcode: '12345',
    type: 1,
    room: 1,
    creator: 1
};

describe('models:Item', () => {
    before(function(done) {
        User.create({ username: 'itemModelTest', password: 'password', email: 'itemModelTest@gmail.com', firstName: 'itemModelFirstName', lastName: 'itemModelLastName' }).then(user => {
            Department.create({ name: 'itemModelTest', creator: 1 }).then(department => {
                Building.create({ name: 'itemModelTest', creator: 1, department: 1 }).then(building => {
                    Room.create({ number: 1, creator: 1, building: 1 }).then(room => {
                        Itemtype.create({ name: 'itemModelTest', creator: 1 }).then(itemType => {
                            done();
                        });
                    });
                }).catch(done);
            }).catch(done);
        }).catch(done);
    });

    it('Should create new a Item', done => {
        Item.create(newItem).then(item => {
            assert.equal(item.id, newItem.id);
            done();
        }).catch(done);
    });

    it('Should Get Items and toJSON last in list', done => {
        Item.find().then(item => {
            assert.isNotNull(item.pop().toJSON());
            done();
        }).catch(done);
    });

    it('Should Get Items', done => {
        Item.find().then(item => {
            assert.isNotNull(item);
            done();
        }).catch(done);
    });

    it('Should Get Item', done => {
        Item.findOne(newItem.id).then(item => {
            assert.equal(item.id, newItem.id);
            done();
        }).catch(done);
    });

    it('Should Update Item', done => {
        Item.update({ id: newItem.id }, { number: 2 }).then(item => {
            assert.notEqual(item, newItem);
            done();
        }).catch(done);
    });
});

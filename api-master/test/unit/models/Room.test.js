"use strict";

const assert = require('chai').assert;

const newRoom = {
    id: 1,
    number: 1,
    creator: 1,
    building: 1
};

describe('models:Room', () => {
    before(function(done) {
        User.create({ username: 'roomModelTest', password: 'password', email: 'roomModelTest@gmail.com', firstName: 'roomModelFirstName', lastName: 'roomModelLastName' }).then(user => {
            Department.create({ name: 'roomModelTest', creator: 1 }).then(department => {
                Building.create({ name: 'roomModelTest', creator: 1, department: 1 }).then(building => {
                    done();
                }).catch(done);
            }).catch(done);
        }).catch(done);
    });

    it('Should create new a Room', done => {
        Room.create(newRoom).then(room => {
            assert.equal(room.id, newRoom.id);
            done();
        }).catch(done);
    });

    it('Should Get Rooms and toJSON last in list', done => {
        Room.find().then(room => {
            assert.isNotNull(room.pop().toJSON());
            done();
        }).catch(done);
    });

    it('Should Get Rooms', done => {
        Room.find().then(room => {
            assert.isNotNull(room);
            done();
        }).catch(done);
    });

    it('Should Get Room', done => {
        Room.findOne(newRoom.id).then(room => {
            assert.equal(room.id, newRoom.id);
            done();
        }).catch(done);
    });

    it('Should Update Room', done => {
        Room.update({ id: newRoom.id }, { number: 2 }).then(room => {
            assert.notEqual(room, newRoom);
            done();
        }).catch(done);
    });
});

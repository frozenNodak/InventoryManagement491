"use strict";

const assert = require('chai').assert;

const newBuilding = {
    id: 1,
    name: 'buildingModelTest',
    creator: 1,
    department: 1
};

describe('models:Building', () => {
    before(function(done) {
        User.create({ username: 'buildingModel', password: 'password', email: 'buildingModel@gmail.com', firstName: 'buildingModelFirstName', lastName: 'buildingModelLastName' }).then(user => {
            Department.create({ name: 'buildingModel', creator: 1 }).then(department => {
                done();
            }).catch(done);
        }).catch(done);
    });

    it('Should create new a Building', done => {
        Building.create(newBuilding).then(building => {
            assert.equal(building.id, newBuilding.id);
            done();
        }).catch(done);
    });

    it('Should Get Buildings and toJSON last in list', done => {
        Building.find().then(building => {
            assert.isNotNull(building.pop().toJSON());
            done();
        }).catch(done);
    });

    it('Should Get Buildings', done => {
        Building.find().then(building => {
            assert.isNotNull(building);
            done();
        }).catch(done);
    });

    it('Should Get Building', done => {
        Building.findOne(newBuilding.id).then(building => {
            assert.equal(building.id, newBuilding.id);
            done();
        }).catch(done);
    });

    it('Should Update Building', done => {
        Building.update({ id: newBuilding.id }, { number: 2 }).then(building => {
            assert.notEqual(building, newBuilding);
            done();
        }).catch(done);
    });
});

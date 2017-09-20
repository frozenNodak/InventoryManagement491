"use strict";

const assert = require('chai').assert;

const newDepartment = {
    id: 1,
    name: 'departmentModelTest',
    creator: 1
};

describe('models:Department', () => {
    before(function(done) {
        User.create({ username: 'departmentModelTest', password: 'password', email: 'departmentModelTest@gmail.com', firstName: 'departmentModelFirstName', lastName: 'departmentModelLastName' }).then(user => {
            done();
        }).catch(done);
    });

    it('Should create new a Department', done => {
        Department.create(newDepartment).then(department => {
            assert.equal(department.id, newDepartment.id);
            done();
        }).catch(done);
    });

    it('Should Get Departments and toJSON last in list', done => {
        Department.find().then(department => {
            assert.isNotNull(department.pop().toJSON());
            done();
        }).catch(done);
    });

    it('Should Get Departments', done => {
        Department.find().then(department => {
            assert.isNotNull(department);
            done();
        }).catch(done);
    });

    it('Should Get Department', done => {
        Department.findOne(newDepartment.id).then(department => {
            assert.equal(department.id, newDepartment.id);
            done();
        }).catch(done);
    });

    it('Should Update Department', done => {
        Department.update({ id: newDepartment.id }, { number: 2 }).then(department => {
            assert.notEqual(department, newDepartment);
            done();
        }).catch(done);
    });
});

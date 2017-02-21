'use strict';
const expect = require('chai').expect;

describe('populateController', function() {
    it('should exist', function() {
        expect(require('../../controllers/modules')).to.not.be.undefined;
    });
    
    const modules  = require('../../controllers/modules');

    describe('modules', function() {
        it('should be an object', function() {
            const expected = 'object';
            const actual = typeof modules;
            expect(actual).to.eql(expected);
        });
    });

    // describe isPagedData
    // it should return true if page key exists
    // expected true
    // actual isPagedData(stub)

    describe('hasNextPage', function() {
        it('should be a function', function() {
            const expected = 'function';
            const actual = typeof modules.hasNextPage;
            expect(actual).to.eql(expected);
        });
    });

    describe('hasNextPage', function() {
        it('should return true if total - offset >= 30', function() {
            const expected = false;
            const actual = modules.hasNextPage(882, 840, 30);
            expect(actual).to.eql(expected);
        });
    });
});
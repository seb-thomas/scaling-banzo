'use strict';
const expect = require('chai').expect;


describe('populateController', function() {
    it('should exist', function() {
        expect(require('../../controllers/populate')).to.not.be.undefined;
    });
    
    const populateController  = require('../../controllers/populate');
    const modules  = require('../../controllers/modules');

    describe('populateEpisodeIndex', function() {
        it('should be a function', function() {
            const expected = 'function';
            const actual = typeof populateController.populateEpisodeIndex;
            expect(actual).to.eql(expected);
        });
    });
    // describe isPagedData
    // it should return true if page key exists
    // expected true
    // actual isPagedData(stub)

    // describe hasNextPage
    // it should return true if total - offset >= 30
    // expected true
    // actual hasNextPage(total, offset, count)
    describe('hasNextPage', function() {
        it('should return true if total - offset >= 30', function() {
            const expected = true;
            const actual = modules.hasNextPage(882, 840, 30);
            expect(actual).to.eql(expected);
        });
    });
});
'use strict';
const expect = require('chai').expect;

describe('populateController', function() {
    it('should exist', function() {
        expect(require('../../controllers/populate')).to.not.be.undefined;
    });
    
    const populateController  = require('../../controllers/populate');

    describe('populateEpisodeIndex', function() {
        it('should be a function', function() {
            const expected = 'function';
            const actual = typeof populateController.populateEpisodeIndex;
            expect(actual).to.eql(expected);
        });
    });
});
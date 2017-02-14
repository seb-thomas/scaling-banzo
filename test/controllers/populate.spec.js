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

        it('should add two numbers', function() {
            const expected = 4;
            const actual = populateController.populateEpisodeIndex(2, 2);
            expect(actual).to.eql(expected);
        });
    });
});
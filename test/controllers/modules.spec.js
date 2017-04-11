'use strict';
const expect = require('chai').expect;
const config = require('config');

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

    describe('makeUrls', function() {
        it('should, given a path and array of values, return an array url', function() {
            const expected = ["xxx.json", "yyy.json", "zzz.json"];
            const actual = ['xxx', 'yyy', 'zzz'].map(modules.makeUrls('.json'));
            expect(actual).to.eql(expected);
        });
    });

    describe('hasKeywords', function() {
        it('should return true if a string contains any of the keywords', function() {
            const expected = true;
            const actual = modules.hasKeywords(config.testString);
            expect(actual).to.eql(expected);
        });
    });
});
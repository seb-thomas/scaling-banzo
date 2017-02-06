process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Brand = require('../models/brand');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server = require('../server');

chai.use(chaiHttp);

//Our parent block
describe('Brands', () => {
    beforeEach((done) => { //Before each test we empty the database
        Brand.remove({}, (err) => { 
            done();         
        });     
    });
    
    // Test the /GET route
    describe('/GET brand', () => {
        it('it should GET all the brands', (done) => {
            chai.request(server)
            .get('/api/brands')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
        });
    });

});
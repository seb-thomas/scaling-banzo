process.env.NODE_ENV = "test";

import mongoose from "mongoose";
import Brand from "../models/brand";

//Require the dev-dependencies
import { should, use, request } from "chai";
import chaiHttp from "chai-http";
import server from "../server";

use(chaiHttp);

//Our parent block
describe("Brands", () => {
  beforeEach(done => {
    //Before each test we empty the database
    Brand.remove({}, err => {
      done();
    });
  });

  // Test the /GET route
  describe("/GET brand", () => {
    it("it should GET all the brands", done => {
      request(server)
        .get("/api/brands")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  // Test the /POST route
  describe("/POST brand", () => {
    it("it should not POST a brand without a type field", done => {
      let brand = {
        title: "String",
        pid: "String",
        synopsis: "String",
        ownership: {
          key: "String",
          title: "String"
        }
      };
      request(server)
        .post("/api/brands")
        .send(brand)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          res.body.errors.should.have.property("type");
          res.body.errors.type.should.have.property("kind").eql("required");
          done();
        });
    });

    it("it should POST a brand ", done => {
      let brand = {
        title: "String",
        pid: "String",
        synopsis: "String",
        ownership: {
          key: "String",
          title: "String"
        },
        type: "String"
      };
      request(server)
        .post("/api/brands")
        .send(brand)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("message").eql("Brand created!");
          res.body.brand.should.have.property("title");
          res.body.brand.should.have.property("pid");
          res.body.brand.should.have.property("synopsis");
          res.body.brand.should.have.property("ownership");
          res.body.brand.should.have.deep.property("ownership.key");
          res.body.brand.should.have.deep.property("ownership.title");
          res.body.brand.should.have.property("type");
          done();
        });
    });
  });
});

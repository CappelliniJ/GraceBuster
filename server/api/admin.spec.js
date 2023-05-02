/* global describe beforeEach it */

const { expect } = require("chai");
const request = require("supertest");
const {
  db,
  models: { User },
} = require("../db");
const seed = require("../../script/seed");
const app = require("../app");

describe("User routes", () => {
  beforeEach(async () => {
    await seed();
  });

  describe("/api/users", () => {
    describe("GET /api/users", () => {
      it("returns all users (admin only)", async () => {
        const adminUser = await User.findOne({
          where: { isAdmin: true },
        });

        const res = await request(app)
          .get("/api/users")
          .set("Authorization", `Bearer ${adminUser.generateToken()}`)
          .expect(200);

        expect(res.body).to.be.an("array");
        expect(res.body.length).to.equal(2);
      });

      it("returns a 403 error if user is not an admin", async () => {
        const regularUser = await User.findOne({
          where: { isAdmin: false },
        });

        const res = await request(app)
          .get("/api/users")
          .set("Authorization", `Bearer ${regularUser.generateToken()}`)
          .expect(403);

        expect(res.body).to.be.empty;
      });
    }); // end describe('GET /api/users')

    describe("GET /api/users/:id", () => {
      it("returns a single user by id (admin only)", async () => {
        const adminUser = await User.findOne({
          where: { isAdmin: true },
        });
        const userId = adminUser.id;

        const res = await request(app)
          .get(`/api/users/${userId}`)
          .set("Authorization", `Bearer ${adminUser.generateToken()}`)
          .expect(200);

        expect(res.body).to.be.an("object");
        expect(res.body.id).to.equal(userId);
        expect(res.body.username).to.exist;
        expect(res.body.email).to.exist;
        expect(res.body.carts).to.be.an("array");
      });

      it("returns a 404 error if user is not found", async () => {
        const adminUser = await User.findOne({
          where: { isAdmin: true },
        });
        const userId = 12345;

        const res = await request(app)
          .get(`/api/users/${userId}`)
          .set("Authorization", `Bearer ${adminUser.generateToken()}`)
          .expect(404);

        expect(res.body).to.be.empty;
      });

      it("returns a 403 error if user is not an admin", async () => {
        const regularUser = await User.findOne({
          where: { isAdmin: false },
        });
        const userId = regularUser.id;

        const res = await request(app)
          .get(`/api/users/${userId}`)
          .set("Authorization", `Bearer ${regularUser.generateToken()}`)
          .expect(403);

        expect(res.body).to.be.empty;
      });
    }); // end describe('GET /api/users/:id')
  }); // end describe('/api/users')
}); // end describe('User routes')

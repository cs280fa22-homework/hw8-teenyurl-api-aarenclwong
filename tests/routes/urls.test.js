import { describe, it, expect, beforeEach, afterAll, beforeAll } from "vitest";
import app from "../../src/index.js";
import * as dotenv from "dotenv";
import supertest from "supertest";
import { faker } from "@faker-js/faker";
import { teenyDao } from "../../src/routes/urls.js";
import * as db from "../../src/data/db.js";
import mongoose from "mongoose";

dotenv.config();
const endpoint = "/urls";
const request = new supertest(app);

describe(`Test ${endpoint}`, () => {
  const numUrls = 5;
  let urls;

  beforeAll(async () => {
    db.connect(process.env.DB_TEST_URI);
    await teenyDao.deleteAll();
  });

  beforeEach(async () => {
    await teenyDao.deleteAll();
    urls = [];
    for (let index = 0; index < numUrls; index++) {
      const url = faker.internet.url();
      const user = await teenyDao.create(url);
      urls.push(user);
    }
  });

  describe("GET request", () => {
    it("Respond 405", async () => {
      // TODO Implement me
      const response = await request.get(endpoint);
      expect(response.status).toBe(405);
      expect(response.data).toBeUndefined();
    });
  });

  describe("POST request", () => {
    it("Respond 201", async () => {
      // TODO Implement me
      const url = faker.internet.url();
      const response = await request.post(endpoint).send({
        url,
      });
      expect(response.status).toBe(201);
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.long).toBe(url);
    });

    describe("Respond 400", () => {
      it("Empty url", async () => {
        // TODO Implement me
        const url = "";
        const response = await request.post(endpoint).send({
          url,
        });
        expect(response.status).toBe(400);
      });

      it("Null url", async () => {
        // TODO Implement me
        const url = null;
        const response = await request.post(endpoint).send({
          url,
        });
        expect(response.status).toBe(400);
      });

      it("Undefined url", async () => {
        // TODO Implement me
        const url = undefined;
        const response = await request.post(endpoint).send({
          url,
        });
        expect(response.status).toBe(400);
      });

      it("Invalid url", async () => {
        // TODO Implement me
        const url = faker.lorem.sentence();
        const response = await request.post(endpoint).send({
          url,
        });
        expect(response.status).toBe(400);
      });

      it("Url already mapped", async () => {
        // TODO Implement me
        const url = faker.internet.url();
        const response = await request.post(endpoint).send({
          url,
        });
        expect(response.status).toBe(201);
        const response2 = await request.post(endpoint).send({
          url,
        });
        expect(response2.status).toBe(400);
        expect(response2.body.data.id).toBeUndefined();
        expect(response2.body.data.long).toBe(url);
        expect(response2.body.data.key).toBe(response.body.data.key);
      });
    });
  });

  describe("GET request given ID", () => {
    it("Respond 200", async () => {
      // TODO Implement me
      const index = Math.floor(Math.random() * numUrls);
      const urls = await teenyDao.readAll({});
      const url = urls[index];
      const response = await request.get(`${endpoint}/${url.id}`);
      expect(response.status).toBe(200);
      expect(response.body.data.id).toBe(url.id);
      expect(response.body.data.long).toBe(url.url);
      expect(response.body.data.key).toBe(url.key);
    });

    it("Respond 400", async () => {
      // TODO Implement me
      const fake_id = faker.random.numeric();
      const response = await request.get(`${endpoint}/${fake_id}`);
      expect(response.status).toBe(400);
    });

    it("Respond 404", async () => {
      // TODO Implement me
      const response = await request.get(
        `${endpoint}/${mongoose.Types.ObjectId().toString()}`
      );
      expect(response.status).toBe(404);
    });
  });

  describe("PUT request", () => {
    it("Respond 405", async () => {
      // TODO Implement me
      const response = await request.put(
        `${endpoint}/${mongoose.Types.ObjectId().toString()}`
      );
      expect(response.status).toBe(405);
    });
  });

  describe("DELETE request", () => {
    it("Respond 200", async () => {
      // TODO Implement me
      const index = Math.floor(Math.random() * numUrls);
      const urls = await teenyDao.readAll({});
      const url = urls[index];
      const response = await request.delete(`${endpoint}/${url.id}`);
      expect(response.status).toBe(200);
      expect(response.body.data.id).toBe(url.id);
      expect(response.body.data.long).toBe(url.url);
      expect(response.body.data.key).toBe(url.key);
    });

    it("Respond 400", async () => {
      // TODO Implement me
      const fake_id = faker.random.numeric();
      const response = await request.delete(`${endpoint}/${fake_id}`);
      expect(response.status).toBe(400);
    });

    it("Respond 404", async () => {
      // TODO Implement me
      const response = await request.delete(
        `${endpoint}/${mongoose.Types.ObjectId().toString()}`
      );
      expect(response.status).toBe(404);
    });
  });

  describe("Redirect from short to long URL", () => {
    it("Respond 302", async () => {
      // TODO Implement me
      const index = Math.floor(Math.random() * numUrls);
      const urls = await teenyDao.readAll({});
      const url = urls[index];
      const response = await request.get(`/${url.key}`);
      expect(response.status).toBe(302);
    });

    it("Respond 404", async () => {
      // TODO Implement me
      const response = await request.get(
        `${endpoint}/${mongoose.Types.ObjectId().toString()}`
      );
      expect(response.status).toBe(404);
      expect(response.body).toBeDefined();
    });
  });

  afterAll(async () => {
    await teenyDao.deleteAll();
  });
});

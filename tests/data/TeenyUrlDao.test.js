import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import TeenyUrlDao from "../../src/data/TeenyUrlDao.js";
import { faker } from "@faker-js/faker";
import TeenyUrl from "../../src/model/TeenyUrl.js";
import * as db from "../../src/data/db.js";
import * as dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const teenyUrlDao = new TeenyUrlDao();

describe("Test TeenyUrlDao", () => {
  const numTeenyUrls = 5;
  let teenyUrls;

  beforeAll(async () => {
    db.connect(process.env.DB_TEST_URI);
    await teenyUrlDao.deleteAll();
  });

  beforeEach(async () => {
    await teenyUrlDao.deleteAll();
    teenyUrls = [];
    for (let index = 0; index < numTeenyUrls; index++) {
      const url = faker.internet.url();
      const key = `teenyurl${index + 1}`;
      const teenyUrl = await TeenyUrl.create({ url, key });
      teenyUrls.push(teenyUrl);
    }
  });

  it("test create()", async () => {
    const url = faker.internet.url();
    const _teenyUrl = await teenyUrlDao.create(url);
    expect(_teenyUrl.url).toBe(url);
    expect(_teenyUrl.key).toBeDefined();
    expect(_teenyUrl.id).toBeDefined();
  });

  describe("test create() throws error", () => {
    it("empty url", async () => {
      try {
        const url = "";
        await teenyUrlDao.create(url);
      } catch (err) {
        expect(err.status).toBe(400);
      }
    });

    it("null url", async () => {
      try {
        const url = null;
        await teenyUrlDao.create(url);
      } catch (err) {
        expect(err.status).toBe(400);
      }
    });

    it("undefined url", async () => {
      try {
        const url = undefined;
        await teenyUrlDao.create(url);
      } catch (err) {
        expect(err.status).toBe(400);
      }
    });

    it("invalid url", async () => {
      try {
        const url = faker.lorem.sentence();
        await teenyUrlDao.create(url);
      } catch (err) {
        expect(err.status).toBe(400);
      }
    });
  });

  it("test readAll()", async () => {
    const _teenyUrls = await teenyUrlDao.readAll({});
    expect(_teenyUrls.length).toBe(teenyUrls.length);
  });

  it("test readAll() given a url", async () => {
    const index = Math.floor(Math.random() * numTeenyUrls);
    const teenyUrl = teenyUrls[index];
    const _teenyUrls = await teenyUrlDao.readAll({ url: teenyUrl.url });
    expect(_teenyUrls.length).toBeGreaterThanOrEqual(1);
  });

  it("test readAll() given a key", async () => {
    const index = Math.floor(Math.random() * numTeenyUrls);
    const teenyUrl = teenyUrls[index];
    const _teenyUrls = await teenyUrlDao.readAll({ key: teenyUrl.key });
    expect(_teenyUrls.length).toBeGreaterThanOrEqual(1);
  });

  it("test read() given valid ID", async () => {
    const index = Math.floor(Math.random() * numTeenyUrls);
    const teenyUrl = teenyUrls[index];
    const _teenyUrl = await teenyUrlDao.read(teenyUrl.id);
    expect(_teenyUrl.url).toBe(teenyUrl.url);
    expect(_teenyUrl.key).toBe(teenyUrl.key);
    expect(_teenyUrl.id).toBe(teenyUrl.id);
  });

  it("test read() given invalid ID", async () => {
    try {
      await teenyUrlDao.read("invalid");
    } catch (err) {
      expect(err.status).toBe(400);
    }
  });

  it("test read() given valid but non-existing ID", async () => {
    try {
      await teenyUrlDao.read(mongoose.Types.ObjectId().toString());
    } catch (err) {
      expect(err.status).toBe(404);
    }
  });

  it("test update() throws not allowed operation", async () => {
    try {
      await teenyUrlDao.update();
    } catch (err) {
      expect(err.status).toBe(405);
    }
  });

  it("test delete() given valid ID", async () => {
    const index = Math.floor(Math.random() * numTeenyUrls);
    const teenyUrl = teenyUrls[index];
    const _teenyUrl = await teenyUrlDao.delete(teenyUrl.id);
    expect(_teenyUrl.url).toBe(teenyUrl.url);
    expect(_teenyUrl.key).toBe(teenyUrl.key);
    expect(_teenyUrl.id).toBe(teenyUrl.id);
  });

  it("test delete() given invalid ID", async () => {
    try {
      await teenyUrlDao.delete("invalid");
    } catch (err) {
      expect(err.status).toBe(400);
    }
  });

  it("test delete() given valid but non-existing ID", async () => {
    try {
      await teenyUrlDao.delete(mongoose.Types.ObjectId().toString());
    } catch (err) {
      expect(err.status).toBe(404);
    }
  });

  afterAll(async () => {
    await teenyUrlDao.deleteAll();
  });
});

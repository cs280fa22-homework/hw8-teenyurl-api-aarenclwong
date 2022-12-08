import { describe, beforeAll, afterAll, expect, it } from "vitest";
import TeenyUrl from "../../src/model/TeenyUrl.js";
import { faker } from "@faker-js/faker";
import * as db from "../../src/data/db.js";
import * as dotenv from "dotenv";

dotenv.config();

describe("Test teeny-url Schema & Model", () => {
  beforeAll(async () => {
    db.connect(process.env.DB_TEST_URI);
    await TeenyUrl.deleteMany({});
  });

  it("test create teeny-url", async () => {
    const url = faker.internet.url();
    const key = faker.datatype.string(6);
    const teenyUrl = await TeenyUrl.create({ url, key });
    expect(teenyUrl.url).toBe(url);
    expect(teenyUrl.key).toBe(key);
    expect(teenyUrl.id).toBeDefined();
  });

  describe("test url is required", () => {
    it("test url is null", async () => {
      try {
        const url = null;
        const key = faker.datatype.string(6);
        await TeenyUrl.create({ url, key });
      } catch (err) {
        expect(err).toBeDefined();
      }
    });

    it("test url is undefined", async () => {
      try {
        const url = undefined;
        const key = faker.datatype.string(6);
        await TeenyUrl.create({ url, key });
      } catch (err) {
        expect(err).toBeDefined();
      }
    });

    it("test url is empty", async () => {
      try {
        const url = "";
        const key = faker.datatype.string(6);
        await TeenyUrl.create({ url, key });
      } catch (err) {
        expect(err).toBeDefined();
      }
    });

    it("test url is invalid", async () => {
      try {
        const url = faker.lorem.sentence();
        const key = faker.datatype.string(6);
        await TeenyUrl.create({ url, key });
      } catch (err) {
        expect(err).toBeDefined();
      }
    });
  });

  it("test url is unique", async () => {
    try {
      const url = faker.internet.url();
      let key = faker.datatype.string(6);
      await TeenyUrl.create({ url, key });

      key = faker.datatype.string(6);
      await TeenyUrl.create({ url, key });
    } catch (err) {
      expect(err).toBeDefined();
    }
  });

  describe("test key is required", () => {
    it("test key is null", async () => {
      try {
        const url = faker.internet.url();
        const key = null;
        await TeenyUrl.create({ url, key });
      } catch (err) {
        expect(err).toBeDefined();
      }
    });

    it("test key is undefined", async () => {
      try {
        const url = faker.internet.url();
        const key = undefined;
        await TeenyUrl.create({ url, key });
      } catch (err) {
        expect(err).toBeDefined();
      }
    });

    it("test key is empty", async () => {
      try {
        const url = faker.internet.url();
        const key = "";
        await TeenyUrl.create({ url, key });
      } catch (err) {
        expect(err).toBeDefined();
      }
    });

    it("test key is fewer than 6 characters", async () => {
      try {
        const url = faker.internet.url();
        const key = faker.datatype.string(5);
        await TeenyUrl.create({ url, key });
      } catch (err) {
        expect(err).toBeDefined();
      }
    });

    it("test key is more than 10 characters", async () => {
      try {
        const url = faker.internet.url();
        const key = faker.datatype.string(11);
        await TeenyUrl.create({ url, key });
      } catch (err) {
        expect(err).toBeDefined();
      }
    });
  });

  it("test key is unique", async () => {
    try {
      let url = faker.internet.url();
      const key = faker.datatype.string(6);
      await TeenyUrl.create({ url, key });

      url = faker.internet.url();
      await TeenyUrl.create({ url, key });
    } catch (err) {
      expect(err).toBeDefined();
    }
  });

  afterAll(async () => {
    await TeenyUrl.deleteMany({});
  });
});

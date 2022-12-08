import { describe, it } from "vitest";
import * as dotenv from "dotenv";

dotenv.config();
const endpoint = "/urls";

describe(`Test ${endpoint}`, () => {
  describe("GET request", () => {
    it("Respond 405", async () => {
      // TODO Implement me
    });
  });

  describe("POST request", () => {
    it("Respond 201", async () => {
      // TODO Implement me
    });

    describe("Respond 400", () => {
      it("Empty url", async () => {
        // TODO Implement me
      });

      it("Null url", async () => {
        // TODO Implement me
      });

      it("Undefined url", async () => {
        // TODO Implement me
      });

      it("Invalid url", async () => {
        // TODO Implement me
      });

      it("Url already mapped", async () => {
        // TODO Implement me
      });
    });
  });

  describe("GET request given ID", () => {
    it("Respond 200", async () => {
      // TODO Implement me
    });

    it("Respond 400", async () => {
      // TODO Implement me
    });

    it("Respond 404", async () => {
      // TODO Implement me
    });
  });

  describe("PUT request", () => {
    it("Respond 405", async () => {
      // TODO Implement me
    });
  });

  describe("DELETE request", () => {
    it("Respond 200", async () => {
      // TODO Implement me
    });

    it("Respond 400", async () => {
      // TODO Implement me
    });

    it("Respond 404", async () => {
      // TODO Implement me
    });
  });

  describe("Redirect from short to long URL", () => {
    it("Respond 302", async () => {
      // TODO Implement me
    });

    it("Respond 404", async () => {
      // TODO Implement me
    });
  });
});

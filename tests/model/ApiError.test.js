import { expect, test } from "vitest";
import ApiError from "../../src/model/ApiError.js";

const statuses = [200, 201, 204, 400, 403, 404, 500];

const messages = [
  "ok",
  "Created",
  "No content",
  "Bad request",
  "Forbidden",
  "Not found",
  "Internal server error",
];

test("Test ApiError", () => {
  const index = Math.floor(Math.random() * statuses.length);
  const message = messages[index];
  const status = statuses[index];
  const error = new ApiError(status, message);
  expect(error.message).toBe(message);
  expect(error.status).toBe(status);
});

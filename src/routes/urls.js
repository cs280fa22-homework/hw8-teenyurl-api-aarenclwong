import express from "express";
import { factory } from "../util/debug.js";

const debug = factory(import.meta.url);
const router = express.Router();

const endpoint = "/urls";

router.get(`${endpoint}`, async (req, res, next) => {
  // TODO Implement me
});

router.get(`${endpoint}/:id`, async (req, res, next) => {
  // TODO Implement me
});

router.post(`${endpoint}`, async (req, res, next) => {
  // TODO Implement me
});

router.put(`${endpoint}/:id`, async (req, res, next) => {
  // TODO Implement me
});

router.delete(`${endpoint}/:id`, async (req, res, next) => {
  // TODO Implement me
});

router.get("/:key", async (req, res, next) => {
  // TODO Implement me
});

export default router;

import express from "express";
import { factory } from "../util/debug.js";
import teenyUrlDao from "../data/TeenyUrlDao.js";
import path from "path";

const debug = factory(import.meta.url);
const router = express.Router();
export const teenyDao = new teenyUrlDao();

const endpoint = "/urls";

const scrub = (link, basename) => {
  const { id, url, key } = link;
  const long = url;
  const short = "http://" + basename + "/" + key;
  return { id, long, key, short };
};

const bounce = (link, basename) => {
  const { id, url, key } = link;
  const long = url;
  const short = "http://" + basename + "/" + key;
  return { long, key, short };
};

router.get(`${endpoint}`, async (req, res, next) => {
  // TODO Implement me - get all urls 405
  res.status(405).json({
    status: 405,
    message: `May not retrieve all URLs`,
  });
});

router.get(`${endpoint}/:id`, async (req, res, next) => {
  // TODO Implement me - get by id
  debug(`${req.method} ${req.path} called...`);
  try {
    const { id } = req.params;
    const link = await teenyDao.read(id);
    debug(`Preparing the response payload...`);
    res.status(200).json({
      status: 200,
      message: `Successfully retrieved the following user!`,
      data: scrub(link),
    });
    debug(`Done with ${req.method} ${req.path}`);
  } catch (err) {
    debug(`There was an error processing ${req.method} ${req.path} `);
    next(err);
  }
});

router.post(`${endpoint}`, async (req, res, next) => {
  // TODO Implement me - create url
  debug(`${req.method} ${req.path} called...`);
  try {
    const { url } = req.body;
    const urls = await teenyDao.readAll({ url });
    if (urls.length > 0) {
      res.status(400).json({
        status: 400,
        message: `The url was already mapped`,
        data: bounce(urls[0], req.headers.host),
      });
    } else {
      const link = await teenyDao.create(url);
      debug(`Preparing the response payload...`);
      res.status(201).json({
        status: 201,
        message: `Successfully created the following teeny-url!`,
        data: scrub(link, req.headers.host),
      });
      debug(`Done with ${req.method} ${req.path}`);
    }
  } catch (err) {
    debug(`There was an error processing ${req.method} ${req.path} `);
    next(err);
  }
});

router.put(`${endpoint}/:id`, async (req, res, next) => {
  // TODO Implement me - put url
  const { id } = req.params;
  res.status(405).json({
    status: 405,
    message: `May not update ${id}'s url`,
  });
});

router.delete(`${endpoint}/:id`, async (req, res, next) => {
  // TODO Implement me - delete by id
  debug(`${req.method} ${req.path} called...`);
  try {
    debug(`Read ID received as request parameter...`);
    const { id } = req.params;
    const link = await teenyDao.delete(id);
    debug(`Preparing the response payload...`);
    res.status(200).json({
      status: 200,
      message: `Successfully deleted the following user!`,
      data: scrub(link, req.headers.host),
    });
    debug(`Done with ${req.method} ${req.path} `);
  } catch (err) {
    debug(`There was an error processing ${req.method} ${req.path} `);
    next(err);
  }
});

router.get("/:key", async (req, res, next) => {
  // TODO Implement me
  const { key } = req.params;
  const link = await teenyDao.readAll({ key });
  if (link.length > 0) {
    const { url } = link[0];
    res.status(302).redirect(url);
  } else {
    res.status(404).sendFile(path.resolve("./assets/404.html"));
  }
});

export default router;

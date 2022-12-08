import TeenyUrl from "../model/TeenyUrl.js";
import ApiError from "../model/ApiError.js";
import { z } from "zod";
import mongoose from "mongoose";
import { factory } from "../util/debug.js";
import { makeKey } from "../util/key.js";

const debug = factory(import.meta.url);

const validObjectId = z
  .string()
  .refine((id) => mongoose.isValidObjectId(id), "Invalid ID!");

const validUrl = z.string().url("Invalid URL!");

class TeenyUrlDao {
  // pre: url is unique (no other document with this url exist)
  // return the created teeny-url
  // throws ApiError when url is invalid
  async create(url) {
    debug("Validating the url..");
    const result = validUrl.safeParse(url);
    if (!result.success) {
      throw new ApiError(400, "Invalid URL!");
    }

    debug("Creating a unique random key..");
    let teenyUrls = [];
    let key = "";

    do {
      key = makeKey();
      teenyUrls = await TeenyUrl.find({ key });
    } while (teenyUrls.length !== 0);

    debug("Creating the teeny url document..");
    return await TeenyUrl.create({ url, key });
  }

  // return all teeny-urls
  async readAll({ url, key }) {
    const filter = {};

    if (url) {
      filter.url = url;
    }

    if (key) {
      filter.key = key;
    }

    debug("Reading all teeny url documents..");
    return await TeenyUrl.find(filter);
  }

  // return the teeny-url with the given id
  // throws ApiError if id is invalid or resource does not exist in our database
  async read(id) {
    debug("Validating the document id..");
    const result = validObjectId.safeParse(id);
    if (!result.success) {
      throw new ApiError(400, "Invalid ID!");
    }

    debug("Reading the teeny url document..");
    const teenyUrl = await TeenyUrl.findById(id);
    if (!teenyUrl) {
      throw new ApiError(404, "Resource not found!");
    }

    return teenyUrl;
  }

  // throws ApiError because this operation is not supported
  async update() {
    debug("Update is an unsupported operation..");
    throw new ApiError(405, "Method Not Allowed");
  }

  // return the deleted teeny-url
  // throws ApiError if id is invalid or resource does not exist
  async delete(id) {
    debug("Validating the document id..");
    const result = validObjectId.safeParse(id);
    if (!result.success) {
      throw new ApiError(400, "Invalid ID!");
    }

    debug("Deleting the teeny url document..");
    const teenyUrl = await TeenyUrl.findByIdAndDelete(id);
    if (!teenyUrl) {
      throw new ApiError(404, "Resource not found!");
    }

    return teenyUrl;
  }

  async deleteAll() {
    debug("Deleting all teeny url documents..");
    await TeenyUrl.deleteMany({});
  }
}

export default TeenyUrlDao;

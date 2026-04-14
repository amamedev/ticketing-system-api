import { CATEGORIES_PATH_DB } from "../config/env.js";
import { createReadStream } from "fs";

// Leer base de datos
export const readCategoriesDB = async (categories) => {
  return await new Promise((resolve, reject) => {
    const reader = createReadStream(CATEGORIES_PATH_DB, { encoding: "utf-8" });
    reader.on("data", (chunk) => {
      categories = chunk.toString();
    });

    reader.on("end", () => {
      resolve(categories);
    });

    reader.on("error", (error) => {
      reject(error);
    });
  });
};

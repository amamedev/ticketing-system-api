import { TICKETS_PATH_DB } from "../config/env.js";
import { createReadStream, createWriteStream } from "fs";

// Leer base de datos
export const readTicketsDB = async () => {
  let tickets = "";

  return await new Promise((resolve, reject) => {
    const reader = createReadStream(TICKETS_PATH_DB, { encoding: "utf-8" });
    reader.on("data", (chunk) => {
      tickets += chunk.toString();
    });

    reader.on("end", () => {
      if (tickets.trim() === "") {
        resolve([]);
        return;
      }
      const parsed = JSON.parse(tickets);
      resolve(parsed);
    });

    reader.on("error", (error) => {
      reject(error);
    });
  });
};

// Escribir en base de datos
export const writeTicketsDB = async (tickets) => {
  return await new Promise((resolve, reject) => {
    const writer = createWriteStream(TICKETS_PATH_DB, { encoding: "utf-8" });
    writer.on("error", (error) => {
      reject(error);
    });

    writer.on("finish", () => {
      resolve(true);
    });

    writer.write(JSON.stringify(tickets));
    writer.end();
  });
};

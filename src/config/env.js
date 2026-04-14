import dotenv from "dotenv";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 5000;
const TOKEN_SECRET = process.env.TOKEN_SECRET || "secret";
const TICKETS_PATH_DB = path.join(
  process.cwd(),
  "src",
  "data",
  "ticketDB.json",
);
const CATEGORIES_PATH_DB = path.join(
  process.cwd(),
  "src",
  "data",
  "categoriesDB.json",
);

export { PORT, TOKEN_SECRET, TICKETS_PATH_DB, CATEGORIES_PATH_DB };

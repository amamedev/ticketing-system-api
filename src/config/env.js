import dotenv from "dotenv";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 5000;
const TOKEN_SECRET = process.env.TOKEN_SECRET || "secret";
const PATH_DB = path.join(process.cwd(), "src", "repository", "ticketDB.json");

export { PORT, TOKEN_SECRET, PATH_DB };

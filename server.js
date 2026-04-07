import app from "./app.js";
import { PORT } from "./src/config/env.js";

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

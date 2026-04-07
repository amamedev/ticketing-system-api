import "./src/events/listeners/ticketsListener.js";
import express from "express";
import router from "./src/routes/routes.js";

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use("/tsa-api/v1", router);

app.use((err, req, res, next) => {
  const status = err.statusCode || 500; // 500 si no se especifica
  res.status(status).json({
    status,
    message: err.message || "Error interno del servidor",
  });
});

export default app;

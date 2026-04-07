import Router from "express";
import ticketController from "../controllers/ticketController.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = Router();

// Rutas
router.get("/", (req, res) => {
  res.send("Bienvenida/o al sistema de tickets");
});
router.get("/tickets", ticketController.getTickets);
router.get("/tickets/export", ticketController.exportTickets);
router.get("/tickets/:id", ticketController.getTicketByID);
router.post("/tickets", ticketController.postTicket);
router.patch("/tickets/:id", ticketController.patchTicket);
router.delete("/tickets", ticketController.deleteTickets);
router.delete("/tickets/:id", ticketController.deleteTicketByID);

// Rutas de importación de archivos
router.post(
  "/tickets/import",
  upload.single("tickets"),
  ticketController.ticketImport,
);
export default router;

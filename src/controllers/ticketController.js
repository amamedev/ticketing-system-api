import ticketService from "../services/ticketService.js";

/**
 * Controller para el manejo de peticiones y respuestas HTML
 */
const ticketController = {
  // Crear nuevo ticket
  postTicket: async (req, res, next) => {
    try {
      const ticket = req.body;
      const createdTicket = await ticketService.createTicket(ticket);

      if (!createdTicket) {
        return res.status(500).json({
          status: 500,
          message: "No se pudo registrar el ticket",
        });
      }
      return res.status(200).json({
        status: 200,
        message: "Ticket registrado correctamente",
        data: createdTicket,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Error al registrar el ticket",
      });
    }
  },

  // Obtener todos los tickets
  getTickets: async (req, res, next) => {
    try {
      const tickets = await ticketService.getTickets();

      if (tickets.length === 0) {
        return res.status(204).end();
      }

      if (!tickets) {
        return res.status(500).json({
          status: 500,
          message: "No se pudieron obtener los tickets",
        });
      }

      return res.status(200).json({
        status: 200,
        message: "Tickets obtenidos",
        total: tickets.length,
        data: tickets,
      });
    } catch (error) {
      next(error);
    }
  },

  // Obtener ticket por id
  getTicketByID: async (req, res, next) => {
    try {
      const id = req.params.id;
      const ticket = await ticketService.getTicketByID(id);
      return res.status(200).json({
        status: 200,
        message: "Ticket obtenido",
        data: ticket,
      });
    } catch (error) {
      next(error);
    }
  },

  // Actualizar ticket
  patchTicket: async (req, res, next) => {
    try {
      const id = req.params.id;
      const changes = req.body;
      const patchedTicket = await ticketService.patchTicket(id, changes);
      return res.status(200).json({
        status: 200,
        message: "Ticket actualizado",
        data: patchedTicket,
      });
    } catch (error) {
      next(error);
    }
  },

  // Eliminar todos los tickets
  deleteTickets: async (req, res, next) => {
    try {
      const deletedTickets = await ticketService.deleteTickets();
      if (!deletedTickets) {
        return res.status(404).json({
          status: 404,
          message: "No hay tickets para eliminar",
        });
      }
      return res.status(200).json({
        status: 200,
        message: "Se han eliminado todos los tickets",
        data: deletedTickets,
      });
    } catch (error) {
      next(error);
    }
  },

  // Eliminar ticket por id
  deleteTicketByID: async (req, res, next) => {
    try {
      const id = req.params.id;
      const deletedTicket = await ticketService.deleteTicketByID(id);
      if (!deletedTicket) {
        return res.status(404).json({
          status: 404,
          message: "Ticket no encontrado",
        });
      }
      return res.status(200).json({
        status: 200,
        message: "Ticket eliminado",
        data: deletedTicket,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Importación y exportación de archivos
   */
  ticketImport: async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          status: 400,
          message: "No se ha seleccionado ningún archivo",
        });
      }

      res.status(200).json({
        status: 200,
        message: "Archivo recibido correctamente, procesando...",
        data: {
          filename: req.file.filename,
          originalname: req.file.originalname,
          size: req.file.size,
        },
      });

      // Procesar el archivo CSV y crear los tickets
      console.log("Importando tickets...");
      await ticketService.importTickets(req.file.path);
    } catch (error) {
      next(error);
    }
  },

  // Exportar tickets a CSV
  exportTickets: async (req, res, next) => {
    try {
      const csv = await ticketService.exportTickets();
      res.download(csv);

      // res.status(200).download(csv);
    } catch (error) {
      next(error);
    }
  },
};

export default ticketController;

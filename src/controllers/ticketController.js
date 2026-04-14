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

      return res.status(201).json({
        message: "Ticket registrado correctamente",
        status: 201,
        success: true,
        data: {
          ticket: createdTicket,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  // Obtener todos los tickets
  getTickets: async (req, res, next) => {
    try {
      const tickets = await ticketService.getTickets();

      return res.status(200).json({
        message: "Tickets obtenidos",
        status: 200,
        success: true,
        data: {
          total: tickets.length,
          tickets: tickets,
        },
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
        success: true,
        data: {
          ticket: ticket,
        },
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
        success: true,
        data: {
          ticket: patchedTicket,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  // Eliminar todos los tickets
  deleteTickets: async (req, res, next) => {
    try {
      const deletedTickets = await ticketService.deleteTickets();
      return res.status(200).json({
        status: 200,
        message: "Se han eliminado todos los tickets",
        success: true,
        data: {
          tickets: deletedTickets,
        },
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

      return res.status(200).json({
        status: 200,
        message: "Ticket eliminado",
        success: true,
        data: {
          ticket: deletedTicket,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Importación y exportación de archivos
   */
  importTickets: async (req, res, next) => {
    try {
      // Procesar el archivo CSV y crear los tickets
      console.log("Importando tickets...");
      const importedTickets = await ticketService.importTickets(req.file);
      return res.status(200).json({
        status: 200,
        message: "Tickets importados",
        success: true,
        importedAt: new Date().toISOString(),
        data: {
          tickets: importedTickets,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  // Exportar tickets a CSV
  exportTickets: async (req, res, next) => {
    try {
      const csv = await ticketService.exportTickets();
      res.download(csv);
    } catch (error) {
      next(error);
    }
  },
};

export default ticketController;

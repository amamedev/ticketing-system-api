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
        createdAt: new Date().toISOString(),
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
  importTickets: async (req, res, next) => {
    try {
      // Procesar el archivo CSV y crear los tickets
      console.log("Importando tickets...");
      await ticketService.importTickets(req.file);
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

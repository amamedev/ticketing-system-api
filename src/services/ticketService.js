import emitter from "../events/eventBus.js";
import ticketsPipeline from "../pipelines/ticketsPipeline.js";
import ticketRepository from "../repository/ticketRepository.js";
import csvParser from "../utils/csvParser.js";
import fs from "fs";
import { HttpError } from "../errors/httpErrorHandler.js";
import { csvToJson, jsonToCsv } from "../utils/utils.js";
import path from "path";

/**
 * Service para la lógica del sistema de ticketing
 */

const ticketService = {
  // Lógica para crear un ticket
  createTicket: async (ticket) => {
    const newTicket = {
      id: "",
      titulo: ticket.titulo,
      descripcion: ticket.descripcion,
      categoria: ticket.categoria,
      prioridad: ticket.prioridad,
    };

    const processedTicket = await ticketsPipeline([newTicket]);
    const createdTicket = await ticketRepository.addTicket(processedTicket);
    emitter.emit("createdTicket", createdTicket);
    return createdTicket;
  },

  // Lógica para obtener todos los tickets
  getTickets: async () => {
    const tickets = await ticketRepository.getTickets();
    if (!tickets) {
      throw new HttpError(404, "No se encontraron tickets");
    }
    return tickets;
  },

  // Lógica paraa obtener un ticket por su id
  getTicketByID: async (id) => {
    const ticket = await ticketRepository.getTicketByID(id);
    if (!ticket) {
      throw new HttpError(404, "Ticket no encontrado");
    }
    return ticket;
  },

  // Lógica para actualizar un ticket
  patchTicket: async (id, changes) => {
    const ticket = await ticketRepository.patchTicket(id, changes);
    if (!ticket) {
      throw new HttpError(404, "Ticket no encontrado");
    }
    return ticket;
  },

  // Lógica para eliminar todos los tickets
  deleteTickets: async () => {
    const tickets = await ticketRepository.deleteTickets();
    if (!tickets) {
      throw new HttpError(404, "No se encontraron tickets para eliminar");
    }
    return tickets;
  },

  // Lógica para eliminar un ticket por su id
  deleteTicketByID: async (id) => {
    const ticket = await ticketRepository.deleteTicketByID(id);
    if (!ticket) {
      throw new HttpError(404, "Ticket no encontrado");
    }
    return ticket;
  },

  // Lógica para importar tickets desde un archivo
  importTickets: async (filePath) => {
    if (!fs.existsSync(filePath)) {
      throw new HttpError(404, "Archivo no encontrado en el servidor");
    }
    const parsedTickets = await csvToJson(filePath);
    if (parsedTickets.length === 0) {
      throw new HttpError(400, "No se encontraron tickets en el archivo");
    }
    const processedTickets = await ticketsPipeline(parsedTickets);
    const importedTickets =
      await ticketRepository.importTickets(processedTickets);
    return importedTickets;
  },

  // Logica para exportar tickets a CSV
  exportTickets: async () => {
    const tickets = await ticketRepository.exportTickets();
    const filename = "export" + Date.now() + ".csv";
    const filePath = path.join(
      process.cwd(),
      "public",
      "files",
      "exports",
      filename,
    );
    const csv = await jsonToCsv(tickets, filePath);
    if (!csv) {
      throw new HttpError(500, "Error al exportar tickets");
    }
    return filePath;
  },
};

export default ticketService;

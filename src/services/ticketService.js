import emitter from "../events/eventBus.js";
import ticketPipeline from "../pipelines/ticketPipeline.js";
import ticketRepository from "../repositories/ticketRepository.js";
import fs from "fs";
import { HttpError } from "../errors/httpErrorHandler.js";
import { csvToJson, jsonToCsv } from "../utils/importExportCsv.js";
import path from "path";
import crypto from "crypto";

/**
 * Service para la lógica del sistema de ticketing
 */

// Generar ID
const generateID = () => {
  return crypto.randomUUID();
};

const ticketService = {
  // Lógica para crear un ticket
  createTicket: async (ticket) => {
    // Crear entidad ticket
    const newTicket = {
      id: generateID(),
      titulo: ticket.titulo,
      descripcion: ticket.descripcion,
      categoria: ticket.categoria,
      prioridad: ticket.prioridad,
      createdAt: new Date().toISOString(),
    };

    // Pipeline de procesamiento
    const processedTicket = await ticketPipeline(newTicket);
    if (!processedTicket) {
      throw new HttpError(500, "Error al procesar el ticket");
    }

    // Guardar en base de datos
    let createdTicket;
    try {
      createdTicket = await ticketRepository.addTicket(processedTicket);
    } catch (error) {
      throw new HttpError(500, "Error en base de datos");
    }

    // Emitir evento
    emitter.emit("createdTicket", createdTicket);
    // Devolver ticket creado
    return createdTicket;
  },

  // Lógica para obtener todos los tickets
  getTickets: async () => {
    const tickets = await ticketRepository.getTickets();
    if (tickets.length === 0) {
      throw new HttpError(204, "No se encontraron tickets");
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
  importTickets: async (file) => {
    // Validar que se haya seleccionado un archivo
    if (!file) {
      throw new HttpError(400, "No se ha seleccionado ningún archivo");
    }
    // Validar que el archivo exista
    if (!fs.existsSync(file.path)) {
      throw new HttpError(404, "Archivo no encontrado en el servidor");
    }

    // Convertir el archivo a JSON
    let cenvertCsv;
    try {
      cenvertCsv = await csvToJson(file.path);
    } catch (error) {
      throw new HttpError(500, "Error al parsear el archivo");
    }

    // Validar que se hayan encontrado tickets en el archivo
    if (cenvertCsv.length === 0) {
      throw new HttpError(400, "No se encontraron tickets en el archivo");
    }

    // Procesar los tickets
    const processedTickets = await ticketPipeline(cenvertCsv);
    if (!processedTickets) {
      throw new HttpError(500, "Error al procesar los tickets");
    }

    // Añadir ID a cada ticket procesado
    let ticketsWithId = [];
    processedTickets.forEach((ticket) => {
      const modifyTicket = {
        id: generateID(),
        ...ticket,
      };
      ticketsWithId.push(modifyTicket);
    });

    // Importar los tickets
    let importedTickets;
    try {
      importedTickets = await ticketRepository.importTickets(ticketsWithId);
    } catch (error) {
      throw new HttpError(500, "Error de base de datos");
    }

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

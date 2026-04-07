/**
 * Respositorio para gestionar datos de base de datos (CRUD)
 */

import { createReadStream, createWriteStream } from "fs";
import { PATH_DB } from "../config/env.js";
import crypto from "crypto";

// Inicializar array de tickets
let tickets = [];

// Leer base de datos
const readDB = async () => {
  return await new Promise((resolve, reject) => {
    const reader = createReadStream(PATH_DB, { encoding: "utf-8" });
    reader.on("data", (chunk) => {
      tickets = chunk.toString();
      tickets = JSON.parse(tickets);
    });

    reader.on("end", () => {
      resolve(tickets);
    });

    reader.on("error", (error) => {
      reject(error);
    });
  });
};

// Escribir en base de datos
const writeDB = async (ticket) => {
  return await new Promise((resolve, reject) => {
    const writer = createWriteStream(PATH_DB, { encoding: "utf-8" });
    writer.on("error", (error) => {
      reject(error);
    });

    writer.on("finish", () => {
      resolve(ticket);
    });

    writer.write(JSON.stringify(tickets));
    writer.end();
  });
};

// Generar ID
const generateID = () => {
  return crypto.randomUUID();
};

/**
 * Objeto repositorio de tickets
 */
const ticketRepository = {
  // Añadir ticket a la base de datos
  addTicket: async (newTicket) => {
    try {
      await readDB();
      newTicket.id = generateID();
      tickets.push(newTicket);
      return await writeDB(newTicket);
    } catch (error) {
      throw new Error(`Error al crear el ticket, ${error}`);
    }
  },

  // Obtener todos los tickets
  getTickets: async () => {
    try {
      await readDB();
      if (tickets.length === 0) {
        return null;
      }
      return tickets;
    } catch (error) {
      throw new Error(`Error al obtener los tickets, ${error}`);
    }
  },

  // Obtener ticket por id
  getTicketByID: async (id) => {
    try {
      await readDB();
      const ticket = tickets.find((el) => el.id === id);
      if (!ticket) {
        return null;
      }
      return ticket;
    } catch (error) {
      throw new Error(`Error al obtener el ticket, ${error}`);
    }
  },

  // Actualizar ticket
  patchTicket: async (id, changes) => {
    try {
      await readDB();
      const updatedTicket = ickets.find((el) => el.id === id);
      if (!updatedTicket) {
        return null;
      }
      Object.assign(updatedTicket, changes);
      return await writeDB(updatedTicket);
    } catch (error) {
      throw new Error(`Error al actualizar el ticket, ${error}`);
    }
  },

  // Eliminar todos los tickets
  deleteTickets: async () => {
    try {
      await readDB();
      if (tickets.length === 0) {
        return null;
      }
      tickets = [];
      return await writeDB(tickets);
    } catch (error) {
      throw new Error(`Error al eliminar todos los tickets, ${error}`);
    }
  },

  // Eliminar ticket por id
  deleteTicketByID: async (id) => {
    try {
      await readDB();
      const deletedTicket = tickets.find((el) => el.id === id);
      if (!deletedTicket) {
        return null;
      }
      tickets = tickets.filter((el) => el.id !== id);
      await writeDB(tickets);
      return deletedTicket;
    } catch (error) {
      throw new Error(`Error al eliminar el ticket, ${error}`);
    }
  },

  // Importar tickets
  importTickets: async (parsedTickets) => {
    try {
      await readDB();

      parsedTickets.forEach((ticket) => {
        const modifyTicket = {
          id: generateID(),
          ...ticket,
        };
        tickets.push(modifyTicket);
      });
      return await writeDB(tickets);
    } catch (error) {
      throw new Error(`Error al importar los tickets, ${error}`);
    }
  },

  // Exportar tickets
  exportTickets: async () => {
    try {
      await readDB();
      return tickets;
    } catch (error) {
      throw new Error(`Error al exportar los tickets, ${error}`);
    }
  },
};

export default ticketRepository;

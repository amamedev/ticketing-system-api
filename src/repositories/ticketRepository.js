/**
 * Respositorio para gestionar datos de base de datos (CRUD)
 */

import crypto from "crypto";
import { readTicketsDB, writeTicketsDB } from "../utils/readWriteTicketDB.js";

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
      const tickets = await readTicketsDB();
      newTicket.id = generateID();
      tickets.push(newTicket);
      await writeTicketsDB(tickets);
      return newTicket;
    } catch (error) {
      throw new Error(`Error al crear el ticket en la base de datos, ${error}`);
    }
  },

  // Obtener todos los tickets
  getTickets: async () => {
    try {
      const tickets = await readTicketsDB();
      return tickets;
    } catch (error) {
      throw new Error(
        `Error al obtener los tickets de la base de datos, ${error}`,
      );
    }
  },

  // Obtener ticket por id
  getTicketByID: async (id) => {
    try {
      const tickets = await readTicketsDB();
      const ticket = tickets.find((el) => el.id === id);
      return ticket;
    } catch (error) {
      throw new Error(
        `Error al obtener el ticket de la base de datos, ${error}`,
      );
    }
  },

  // Actualizar ticket
  patchTicket: async (id, changes) => {
    try {
      const tickets = await readTicketsDB();
      const updatedTicket = tickets.find((el) => el.id === id);
      if (!updatedTicket) {
        return null;
      }
      Object.assign(updatedTicket, changes);
      await writeTicketsDB(tickets);
      return updatedTicket;
    } catch (error) {
      throw new Error(`Error al actualizar el ticket, ${error}`);
    }
  },

  // Eliminar todos los tickets
  deleteTickets: async () => {
    try {
      const tickets = await readTicketsDB();
      if (tickets.length === 0) {
        return null;
      }
      await writeTicketsDB();
      return tickets;
    } catch (error) {
      throw new Error(`Error al eliminar todos los tickets, ${error}`);
    }
  },

  // Eliminar ticket por id
  deleteTicketByID: async (id) => {
    try {
      const tickets = await readTicketsDB();
      const deletedTicket = tickets.find((ticket) => ticket.id === id);
      if (!deletedTicket) {
        return null;
      }
      const result = tickets.filter((ticket) => ticket.id !== id);
      await writeTicketsDB(result);
      return deletedTicket;
    } catch (error) {
      throw new Error(`Error al eliminar el ticket, ${error}`);
    }
  },

  // Importar tickets
  importTickets: async (parsedTickets) => {
    try {
      const tickets = await readTicketsDB();
      parsedTickets.forEach((ticket) => {
        const modifyTicket = {
          id: generateID(),
          ...ticket,
        };
        tickets.push(modifyTicket);
      });

      return await writeTicketsDB(tickets);
    } catch (error) {
      throw new Error(`Error al importar los tickets, ${error}`);
    }
  },

  // Exportar tickets
  exportTickets: async () => {
    try {
      const tickets = await readTicketsDB();
      return tickets;
    } catch (error) {
      throw new Error(`Error al exportar los tickets, ${error}`);
    }
  },
};

export default ticketRepository;

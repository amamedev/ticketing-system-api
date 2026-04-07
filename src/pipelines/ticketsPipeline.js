import { normalizeTicket } from "../processors/normalizeTicket.js";

const ticketsPipeline = async (tickets) => {
  const steps = [normalizeTicket];

  console.log("Procesando ticket...");

  await new Promise((resolve) => setTimeout(resolve, 3000));

  for (const step of steps) {
    await step(tickets);
  }

  console.log("Ticket procesado");
  return tickets;
};

export default ticketsPipeline;

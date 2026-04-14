import { categorizeTickets } from "../processors/categorizeTickets.js";

const ticketsPipeline = async (tickets) => {
  const steps = [categorizeTickets];

  console.log("Procesando ticket...");

  let results;

  await new Promise((resolve) => setTimeout(resolve, 3000));

  for (const step of steps) {
    results = await step(tickets);
  }

  console.log("Ticket procesado");
  return results;
};

export default ticketsPipeline;

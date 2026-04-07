import emitter from "../eventBus.js";

emitter.on("createdTicket", async (newTicket) => {
  console.log("Ticket creado");
});

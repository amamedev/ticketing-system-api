export const normalizeTicket = async (tickets) => {
  tickets.forEach((ticket) => {
    ticket.titulo = ticket.titulo.trim();
    ticket.descripcion = ticket.descripcion.trim();
    ticket.categoria = ticket.categoria.trim();
    ticket.prioridad = ticket.prioridad.trim();
  });

  return tickets;
};

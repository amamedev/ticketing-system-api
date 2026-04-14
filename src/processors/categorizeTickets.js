import categoryRepository from "../repositories/categoryRepository.js";

export const categorizeTickets = async (tickets) => {
  const avaliableCategories = await categoryRepository.getCategories();
  const categories = JSON.parse(avaliableCategories);
  if (Array.isArray(tickets)) {
    tickets.forEach((ticket) => {
      const found = categories.find((c) => c.nombre === ticket.categoria);
      ticket.categoriaID = found.id;
    });
    return tickets;
  }

  const found = categories.find((c) => c.nombre === tickets.categoria);
  tickets.categoriaID = found.id;
  return tickets;
};

import { z } from "zod";

export const ticketSchema = z.object({
  id: z.string({
    message: "El ID debe ser una cadena de texto",
  }),
  titulo: z.string({
    message: "El título debe ser una cadena de texto",
  }),
  descripcion: z.string({
    message: "La descripción debe ser una cadena de texto",
  }),
  categoria: z.string({
    message: "La categoría debe ser una cadena de texto",
  }),
  prioridad: z.string({
    message: "La prioridad debe ser una cadena de texto",
  }),
  createdAt: z.string({
    message: "La fecha de creación debe ser una cadena de texto",
  }),
});

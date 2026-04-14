import { readCategoriesDB } from "../utils/readWriteCategoriesDB.js";

let categories = [];

export const categoryRepository = {
  getCategories: async () => {
    const readCategories = await readCategoriesDB(categories);
    return readCategories;
  },
};

export default categoryRepository;

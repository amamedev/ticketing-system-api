import { json2csv, csv2json } from "json-2-csv";
import fs from "fs";

// Importación de tickets
export const jsonToCsv = async (tickets, filePath) => {
  return await new Promise((resolve, reject) => {
    try {
      const csv = json2csv(tickets, {
        excelBOM: true,
      });
      if (csv) {
        fs.writeFileSync(filePath, csv, { encoding: "utf8" });
        resolve(csv);
      }
    } catch (error) {
      reject(error);
    }
  });
};

// Exportación de tickets
export const csvToJson = async (filePath) => {
  return await new Promise((resolve, reject) => {
    try {
      const readCsv = fs.readFileSync(filePath, { encoding: "utf-8" });
      const json = csv2json(readCsv);
      resolve(json);
    } catch (error) {
      reject(error);
    }
  });
};

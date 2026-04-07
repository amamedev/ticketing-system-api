import multer from "multer";
import path from "path";

const folder = path.join(process.cwd(), "public", "files", "imports");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, folder);
  },

  filename: function (req, file, cb) {
    const uniqueSuffix =
      "import" + Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, uniqueSuffix + ".csv");
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "text/csv") {
      cb(null, true);
    } else {
      cb(new Error("El archivo debe ser de tipo csv"), false);
    }
  },
});

export default upload;

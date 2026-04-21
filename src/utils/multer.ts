import multer from "multer";
import jwt from "jsonwebtoken";


const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});
import { Router } from "express";
import multer from "multer";
const storage = multer.diskStorage({
    destination: "./blog",
    filename: (req, file, cb) => {
        cb(null,file.originalname);
    }
});

const upload = multer({ storage: storage});

import * as blog from "./request.handler/blog.handler.js";

import auth from "./auth.js"

const routerblog = Router();

routerblog.route("/signup").post(blog.signup);
routerblog.route("/signin").post(blog.signin);

routerblog.route("/add-Blog").post(upload.single("blogimg"),blog.addblog);

routerblog.route("/print-Blog").get(blog.printblog);

export default routerblog;
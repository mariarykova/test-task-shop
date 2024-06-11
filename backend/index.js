import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { registerValidation } from "./validations/auth.js";

import checkAuth from "./utils/checkAuth.js";
import {
  UserController,
  CardsController,
  GoodsController,
} from "./controllers/index.js";

mongoose
  .connect(
    "mongodb+srv://admin:16031990@shopdatabase.efstekk.mongodb.net/shop?retryWrites=true&w=majority&appName=ShopDatabase"
  )
  .then(() => console.log("DB is Ok"))
  .catch((err) => console.log("DB error", err));

const app = express();

app.use(express.json());
app.use(cors());

app.post("/auth/login", UserController.login);
app.post("/auth/register", registerValidation, UserController.register);
app.get("/auth/me", checkAuth, UserController.getMe);

app.get("/cards", CardsController.getAll);
app.get("/cards/:id", CardsController.getOne);
app.post("/cards", CardsController.create);
//app.delete("/cards", CardsController.delete);
//app.putch("/cards", CardsController.update);

app.get("/products/:model", GoodsController.getOneModel);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});

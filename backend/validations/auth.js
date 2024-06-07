import { body } from "express-validator";

export const registerValidation = [
  body("email", "Email format is incorrect").isEmail(),
  body("password", "Password length is minimum 5 symbols").isLength({ min: 5 }),
  body("fullName", "Full name length is minimum 3 symbols").isLength({
    min: 3,
  }),
  body("avatarUrl", "URL Link is incorrect").optional().isURL(),
];

import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { getAllContacts, getContactForDM } from "../controllers/ContactController.js";
export const contactRoutes = Router();
contactRoutes.get("/getContactsForDM", verifyToken, getContactForDM);
contactRoutes.get("/getAllContacts", verifyToken, getAllContacts);

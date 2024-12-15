import { Router } from "express";
import multer from "multer"
import { AddProfileImage, GetUserInfo, Login, Logout, RemoveProfileImg, SignUp, UpdateProfile } from "../controllers/AuthControllers.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { getContactUsers } from "../controllers/ContactController.js";
import { getMessages } from "../controllers/MessageController.js";
const mult = multer({ dest: "upload/profiles/" })

const authRoutes = Router();
authRoutes.post("/signup", SignUp);
authRoutes.post("/login", Login);
authRoutes.post("/addProfileImg", verifyToken, mult.single("profileImg"), AddProfileImage);
authRoutes.get("/userInfo", verifyToken, GetUserInfo);

authRoutes.post("/getMessages", verifyToken, getMessages);
authRoutes.post("/logout", Logout);
authRoutes.post("/removeProfileImg", verifyToken, RemoveProfileImg);
authRoutes.post("/updateProfile", verifyToken, UpdateProfile);
authRoutes.post("/searchTerm", verifyToken, getContactUsers);
authRoutes.delete("/deleteImg", verifyToken, RemoveProfileImg);


export default authRoutes;
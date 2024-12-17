import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { AddChannelImage, createChannel, getChannelMessages, getUserChannels, getUserChannelsWithMembers, removeChannelImage, updateChannelName, updateName } from "../controllers/ChannelController.js";
import multer from "multer";
// import multer from "multer"
const mult = multer({ dest: "upload/channelProfiles/" })

export const channelRoutes = Router();
channelRoutes.post("/createChannel", verifyToken, createChannel);
channelRoutes.post("/updateName", verifyToken, updateName);
channelRoutes.post("/updateChannelName", verifyToken, updateChannelName);
channelRoutes.post("/addChannelImg", verifyToken, mult.single("channelImg"), AddChannelImage);
channelRoutes.get("/getUserChannel", verifyToken, getUserChannels);
channelRoutes.get("/getUserChannelsWithMembers", verifyToken, getUserChannelsWithMembers);
channelRoutes.get("/getChannelMessage/:channelId", verifyToken, getChannelMessages);
channelRoutes.post("/removeChannelImage", verifyToken, removeChannelImage);


import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { AddChannelImage, createChannel, getChannelMessages, getUserChannels, getUserChannelsWithMembers, updateName } from "../controllers/ChannelController.js";
import multer from "multer"
const mult = multer({ dest: "upload/channelProfiles/" })

export const channelRoutes = Router();
channelRoutes.post("/createChannel", verifyToken, createChannel);
channelRoutes.post("/updateName", verifyToken, updateName);
channelRoutes.post("/addChannelImg", verifyToken, mult.single("channelImg"), AddChannelImage);
channelRoutes.get("/getUserChannel", verifyToken, getUserChannels);
channelRoutes.get("/getUserChannelsWithMembers", verifyToken, getUserChannelsWithMembers);
channelRoutes.get("/getChannelMessage/:channelId", verifyToken, getChannelMessages);


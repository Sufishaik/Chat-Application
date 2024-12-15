import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import authRoutes from './routes/AuthRoutes.js';
import { SetupSocket } from './socket.js';
import { contactRoutes } from './routes/contactRoutes.js';
import { channelRoutes } from './routes/channelRoute.js';
import { messageRoute } from './routes/MessageRoute.js';
import path from 'path';
dotenv.config();
const app = express();

app.use("/upload/profiles", express.static("upload/profiles"))
app.use("/upload/channelProfiles", express.static("upload/channelProfiles"))
app.use("/upload/files", express.static("upload/files"))
const PORT = process.env.PORT || 3002;
const databaseURL = process.env.DATABASE_URL;
// current working directory deployment
const _dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(_dirname1, "/chat-app/build")));
    app.get("*", (req, res) => {
        res.sendFile()
    })
} else {
    app.get("/", (req, res) => {
        res.send("API is running")
    })
}
mongoose.connect(databaseURL).then(() => console.log('Connected to database successfully')).catch((err) => console.log("Err", err));
app.use(cors({
    origin: process.env.ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
}));


app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/channel", channelRoutes);
app.use("/api/message", messageRoute);
app.use("/api/contacts", contactRoutes);
const server = app.listen(PORT, () => {
    console.log(`server is listening on port http://localhost:${PORT}`);
})
SetupSocket(server)
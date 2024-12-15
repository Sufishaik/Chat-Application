import { Server as SockerIOServer } from "socket.io"
import MessageModal from "./models/MessageModal.js";
import { ChannelModel } from "./models/ChannelModel.js";

export const SetupSocket = (server) => {
    const io = new SockerIOServer(server, {
        cors: {
            origin: "http://localhost:5174",
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    const sendMessage = async (message) => {


        const senderSocketId = useSocketMap.get(message?.sender);
        const recipientSocketId = useSocketMap.get(message?.recipient);
        const createdMessage = await MessageModal.create(message);

        const messageData = await MessageModal.findById(createdMessage._id)
            .populate("sender", "id email firstName lastName image")
            .populate("recipient", "id email firstName lastName image")
        if (recipientSocketId) {

            io.to(recipientSocketId).emit("receiveMessage", messageData);
        }
        if (senderSocketId) {


            io.to(senderSocketId).emit("receiveMessage", messageData);
        }
    }

    const sendChannelMessage = async (message) => {

        const { channelId, sender, content, recipient, messageType, fileUrl, contacts } = message;
        const createMsg = await MessageModal.create({
            sender, recipient, content, messageType, timestamp: new Date(), fileUrl
        });

        const messageData = await MessageModal.findById(createMsg._id).populate("sender", "id email firstName lastName image color").exec();
        await ChannelModel.findByIdAndUpdate(channelId, {
            $push: { messages: createMsg._id },
        });
        const channel = await ChannelModel.findById(channelId).populate("members");

        const finalData = { ...messageData._doc, channelId: channel?._id };
        if (channel && channel.members) {
            channel.members.forEach((member) => {
                const memberSocketId = useSocketMap.get(member._id.toString());
                if (memberSocketId) {
                    io.to(memberSocketId).emit("recieveChannelMessage", finalData);

                    io.to(memberSocketId).emit("contactUpdated", {
                        recipientId: member._id.toString(),
                        contacts: contacts,  // Replace with actual contacts data
                    });
                }
            })
            const adminSocketId = useSocketMap.get(channel.admin._id.toString());
            if (adminSocketId) {
                io.to(adminSocketId).emit("recieveChannelMessage", finalData);
                io.to(adminSocketId).emit("contactUpdated", {
                    recipientId: channel.admin._id.toString(),
                    contacts: contacts || [],  // Default to empty array if contacts is undefined
                });
            }
        }
    }

    const useSocketMap = new Map();
    const disconnect = (socket) => {


        for (const [userId, socketId] of useSocketMap.entries()) {

            if (socketId === socket.id) {
                useSocketMap.delete(userId);
                break;
            }
        }
    }


    io.on("connection", async (socket) => {
        const userId = socket.handshake.query.userId;
        if (userId) {
            useSocketMap.set(userId, socket.id);
            console.log('connection established with user: ', userId);
            socket.emit("setUserId", userId);
        }

        socket.on("sendMessage", async (message) => {
            await sendMessage(message);
        });
        socket.on("sent-channel-msg", async (message) => {
            await sendChannelMessage(message);
        });
        socket.on("contactUpdated", (data) => {
            const { recipientId, contacts } = data;

            const recipientSocketId = useSocketMap.get(recipientId);
            console.log("Contact update received:", { recipientId, contacts });


            if (recipientSocketId) {
                io.to(recipientSocketId).emit("contactUpdated", { contacts });
            }
        });
        socket.on("disconnect", () => {
            console.log(`Socket disconnected: ${socket.id}`);
            disconnect(socket);
        });
    });
}
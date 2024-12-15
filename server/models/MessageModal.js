import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        required: true,
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        required: false,
    },
    messageType: {
        type: String,
        enum: ["text", "file"],
        required: true,
    },
    content: {
        type: String,
        required: function () {
            return this.messageType === "text"
        },
    },
    fileUrl: {
        type: String,
        required: function () {
            return this.messageType === "file"
        }
    },
    timestamp: {
        type: Date,
        default: Date.now(),
    },
});


const MessageModal = mongoose.model("Messages", messageSchema);
export default MessageModal;
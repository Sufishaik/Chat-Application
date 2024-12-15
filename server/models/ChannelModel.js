import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    members: [
        { type: mongoose.Schema.ObjectId, ref: "Auth", required: true },
    ],
    admin: {
        type: mongoose.Schema.ObjectId, ref: "Auth", required: true
    },
    messages: [{
        type: mongoose.Schema.ObjectId, ref: "Messages", required: false
    }],
    createAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    image: {
        type: String,
        required: false,
    },
})


channelSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
})
channelSchema.pre("findOneAndUpdate", function (next) {
    this.set({ updatedAt: Date.now() })
    next();
})

export const ChannelModel = mongoose.model("Channels", channelSchema);
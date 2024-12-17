import { ChannelModel } from "../models/ChannelModel.js";
import Auth from "../models/UserModel.js";
import mongoose from "mongoose";
import { renameSync, unlinkSync } from "fs";


export const createChannel = async (req, resp, next) => {
    try {
        const { name, members, image = "" } = req.body;
        const userId = req.userId;
        const admin = await Auth.findById(userId);

        if (!admin) {
            return resp.status(400).send("Admin user not found");
        }

        const newChannel = new ChannelModel({
            name,
            members,
            admin: userId,
            image
        });
        await newChannel.save();
        return resp.status(200).json({ channel: newChannel });
    } catch (err) {
        console.log("SignUp Error", err);
        return resp.status(500).send("Internal Server Error");
    }
}


export const getUserChannels = async (req, resp, next) => {
    try {

        const userId = new mongoose.Types.ObjectId(req.userId);
        const channels = await ChannelModel.find({
            $or: [{ admin: userId }, { members: userId }]
        }).sort({ updatedAt: -1 })

        return resp.status(200).json({ channels });
    } catch (err) {
        console.log("SignUp Error", err);
        return resp.status(500).send("Internal Server Error");
    }
}

export const getUserChannelsWithMembers = async (req, resp, next) => {
    try {
        const { channelId } = req.query; // Get the channel ID from query parameters

        if (!channelId) {
            return resp.status(400).send("Channel ID is required");
        }

        const channel = await ChannelModel.findById(channelId)
            .populate('members') // Populate members with user details
            .populate('admin');

        if (!channel) {
            return resp.status(404).send("Channel not found");
        }

        const adminAsMember = channel.admin; // Get admin details
        const uniqueMembers = [
            adminAsMember,
            ...channel.members
        ].filter((member, index, self) =>
            self.findIndex(m => m._id.toString() === member._id.toString()) === index
        );

        return resp.status(200).json({ members: uniqueMembers });
    } catch (err) {
        console.error("Error fetching channel members", err);
        return resp.status(500).send("Internal Server Error");
    }
};



export const AddChannelImage = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).send("File Internal Server Error");
        }
        const { channelId } = req.body;

        const date = Date.now();
        let fileName = 'upload/channelProfiles/' + date + req.file.originalname;
        renameSync(req.file.path, fileName);

        const updatedUser = await ChannelModel.findOneAndUpdate(
            { _id: channelId, admin: req.userId },
            {
                image: fileName
            },
            { new: true, runValidators: true });

        return res.status(200).json({ image: updatedUser?.image })

    } catch (err) {
        console.log("Error", err);
        return res.status(500).send("Add Profile Image Internal Server Error");
    }
}
export const updateName = async (req, res, next) => {
    try {

        const { name, channelId } = req.body;
        if (!channelId) {
            return res.status(400).send("Channel ID is required");
        }

        const updatedUser = await ChannelModel.findOneAndUpdate(
            { _id: channelId, admin: req.userId },
            {
                name: name
            },
            { new: true, runValidators: true });

        if (!updatedUser) {
            return res.status(404).send("Channel not found or you are not authorized to update it");
        }
        console.log("updatedUser", updatedUser)
        return res.status(200).json({ name: updatedUser?.name })

    } catch (err) {
        console.log("Error", err);
        return res.status(500).send("Add Name Internal Server Error");
    }
}
export const updateChannelName = async (req, res, next) => {
    try {

        const { name, channelId } = req.body;
        if (!channelId) {
            return res.status(400).send("Channel ID is required");
        }

        const updatedUser = await ChannelModel.findOneAndUpdate(
            { _id: channelId, admin: req.userId },
            {
                name: name
            },
            { new: true, runValidators: true });

        if (!updatedUser) {
            return res.status(404).send("Channel not found or you are not authorized to update it");
        }
        console.log("updatedUser", updatedUser)
        return res.status(200).json({ name: updatedUser?.name })

    } catch (err) {
        console.log("Error", err);
        return res.status(500).send("Add Name Internal Server Error");
    }
}


export const removeChannelImage = async (req, res, next) => {
    try {
        const { channelId, name } = req.body;
        if (!channelId) {
            return res.status(400).send("Channel ID is required");
        }
        // Find the channel by ID and ensure the logged-in user is the admin
        const channel = await ChannelModel.findOne({ _id: channelId, admin: req.userId });
        if (!channel) {
            return res.status(404).send("Channel not found or you are not authorized to delete the image");
        }
        if (channel.image) {
            try {
                unlinkSync(channel.image); // Delete the file from the filesystem
                console.log("Image file deleted:", channel.image);
            } catch (err) {
                console.error("Error deleting file:", err);
                return res.status(500).send("Error deleting image file");
            }
        } else {
            return res.status(400).send("No image to delete");
        }
        channel.image = null; // Set the image field to null
        await channel.save(); // Save the updated document

        return res.status(200).json("Image removed successfully");

    } catch (err) {
        console.log("Error", err);
        return res.status(500).send("Remove Image Internal Server Error");
    }
}


export const getChannelMessages = async (req, res, next) => {
    try {
        const { channelId } = req.params;
        const channel = await ChannelModel.findById(channelId).populate({ path: "messages", populate: { path: "sender", select: "firstName lastName email _id color image" } });
        if (!channel) {
            return res.status(400).send("Channel not found");
        }
        const message = channel.messages;

        return res.status(200).json({ message });
    } catch (err) {
        console.log("Error", err);
        return res.status(500).send("Internal Server Error");
    }
}
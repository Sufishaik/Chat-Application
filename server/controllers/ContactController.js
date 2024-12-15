
import mongoose from "mongoose";
import MessageModal from "../models/MessageModal.js";
import Auth from "../models/UserModel.js";



export const getContactUsers = async (req, resp, next) => {
    try {
        const { searchTerm } = req.body;

        if (searchTerm === undefined || searchTerm === null) {
            return resp.status(400).send("Search term is required");
        }
        const sanitizedSearchTerm = searchTerm.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
        );
        const regex = new RegExp(sanitizedSearchTerm, "i");
        const contacts = await Auth.find({
            $and: [
                { _id: { $ne: req.userId } },
                { $or: [{ firstName: regex }, { lastName: regex }, { email: regex }] }
            ]
        })
        return resp.status(200).json({ contacts });
    } catch (err) {
        console.log("Error", err);
        return resp.status(500).send("Internal Server Error");

    }
}




export const getContactForDM = async (req, resp, next) => {
    try {
        let { userId } = req;

        userId = new mongoose.Types.ObjectId(userId);
        const contacts = await MessageModal.aggregate([
            {
                $match: {
                    $or: [{ sender: userId }, { recipient: userId }],
                },
            },
            {
                $sort: { timestamp: -1 },
            },
            {
                $group: {
                    _id: {
                        $cond: {
                            if: { $eq: ["$sender", userId] },
                            then: "$recipient",
                            else: "$sender",
                        }
                    },
                    lastMessageTime: { $first: "$timestamp" },
                }
            },
            {
                $lookup: {
                    from: "auths",
                    localField: "_id",
                    foreignField: "_id",
                    as: "contacts",
                }
            },
            {
                $unwind: "$contacts",
            },
            {
                $project: {
                    _id: 1,
                    lastMessageTime: 1,
                    email: "$contacts.email",
                    firstName: "$contacts.firstName",
                    lastName: "$contacts.lastName",
                    image: "$contacts.image",
                    // messageCount: 0

                },
            },
            {
                $match: {
                    "_id": { $ne: userId },  // Exclude the logged-in user's data
                },
            },
            {
                $sort: { lastMessageTime: -1 },
            }
        ])


        return resp.status(200).json({ contacts });
    } catch (err) {
        console.log("SignUp Error", err);
        return resp.status(500).send("Internal Server Error");
    }
}

export const getAllContacts = async (req, resp, next) => {
    try {
        const users = await Auth.find({ _id: { $ne: req.userId } }, "firstName lastName _id email",)
        const contacts = users.map((user) => {
            return {


                label: user?.firstName ? `${user?.firstName} - ${user?.lastName}` : user?.email,
                value: user._id,
            }
        })
        // console.log("contacts", users);
        return resp.status(200).json({ contacts });
    } catch (err) {
        console.log("SignUp Error", err);
        return resp.status(500).send("Internal Server Error");
    }
}
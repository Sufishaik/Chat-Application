import { compare } from "bcrypt";
import Auth from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import { renameSync, unlinkSync } from "fs";


const expireDays = new Date().getTime() + 60 * 60 * 24 * 7;
const createToken = (email, userId) => {
    return jwt.sign({ email, userId }, process.env.JWT_KEY, { expiresIn: '3d' });
}

export const SignUp = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email && !password) {
            return res.status(401).send("Email and Password required");
        }
        const user = await Auth.create({ email, password, });
        res.cookie("jwt", createToken(email, user.id, {
            httpOnly: true,
            expireDays,
            secure: true,
            sameSite: "None",
        }));


        return res.status(201).json({
            user: {
                id: user.id,
                email: user.email,
                profileSetup: user.profileSetup
            }
        });
    } catch (error) {
        console.log("Error", error);
        return res.status(500).send("SignUp Internal Server Error");

    }
};

export const Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email && !password) {
            return res.status(401).send("Email and Password required");
        }
        const user = await Auth.findOne({ email });
        if (!user) {
            return res.status(404).send("User not found");
        }
        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send("Invalid Credentials");
        }
        res.cookie("jwt", createToken(email, user.id, {
            httpOnly: true,
            expireDays,
            secure: true,
            sameSite: "None",
        }));
        return res.status(200).json({
            user: { id: user.id, email: user.email, profileSetup: user.profileSetup, firstName: user.firstName, lastName: user.lastName, image: user.image, color: user.color }
        });
    } catch (err) {
        console.log("Error", err
        );
        return res.status(500).send("Internal Server Error");

    }
}


export const UpdateProfile = async (req, res, next) => {
    try {

        const { firstName, lastName } = req.body;



        if (!firstName || !lastName) {
            return res.status(400).send("First Name and Last Name required");
        }
        const userD = await Auth.findById(req?.userId);

        const userData = await Auth.findByIdAndUpdate(req.userId, {
            firstName, lastName, profileSetup: true
        }, { new: true, runValidators: true });

        if (!userData) {
            return res.status(404).send("User not found");
        }


        return res.status(200).json({ id: userData?.id, email: userData?.email, profileSetup: userData?.profileSetup, firstName: userData?.firstName, lastName: userData?.lastName, image: userData?.image });
    } catch (err) {
        console.log("Error", err);
        return res.status(500).send("Update Profile Internal Server Error");

    }
}

export const AddProfileImage = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).send("File Internal Server Error");
        }
        const date = Date.now();
        let fileName = 'upload/profiles/' + date + req.file.originalname;
        renameSync(req.file.path, fileName);
        const updatedUser = await Auth.findByIdAndUpdate(
            req?.userId,
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

export const RemoveProfileImg = async (req, res, next) => {
    try {
        const { userId } = req;
        const user = await Auth.findById(userId);
        if (!user) {
            return res.status(401).send("User not found");

        }


        if (user.image) {

            unlinkSync(user.image);
        }
        user.image = null;
        await user.save();

        return res.status(200).send("Profile image removed successfully");
    } catch (err) {
        console.log("Error", err);
        return res.status(500).send("Remove Profile Image Internal Server Error");
    }
}


export const GetUserInfo = async (req, resp, next) => {
    try {
        const userData = await User.findById(req.userId);

        if (!userData) {
            return resp.status(404).send("User Not Found")
        }

        return resp.status(200).json({ id: userData.id, email: userData.email, profileSetup: userData.profileSetup, firstName: userData.firstName, lastName: userData.last, image: userData.image })
    } catch (err) {
        console.log("SignUp Error", err);
        return resp.status(500).send("Internal Server Error");
    }
}

export const Logout = async (req, res, next) => {
    try {
        res.cookie("jwt", "", { maxAge: 1, secure: true, sameSite: "None" });
        return res.status(200).send("Successfully logged out");
    } catch (err) {
        console.log("SignUp Error", err);
        return res.status(500).send("Internal Server Error");

    }
}


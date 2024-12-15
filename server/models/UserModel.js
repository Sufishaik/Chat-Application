import mongoose from 'mongoose';
import { genSalt, hash } from 'bcrypt';
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },

    profileSetup: {
        type: Boolean,
        default: false,
    },
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {  // Only hash the password if it's new or modified
        const salt = await genSalt();
        this.password = await hash(this.password, salt);
    }
    next();
});
userSchema.methods.comparePassword = async function (password) {
    return await compare(password, this.password);
};

const Auth = mongoose.model("Auth", userSchema);
export default Auth;
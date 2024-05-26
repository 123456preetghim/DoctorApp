import User from "../models/UserSchema.js";

export const updateUser = async(req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id, { $set: req.body }, { new: true });

        res.status(200).json({
            success: true,
            message: "Successfully updated",
            data: updatedUser,
        });

    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to update" });
    }
};


export const deleteUser = async(req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Successfully deleted",

        });

    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to delete" });
    }
};

export const getSingleUser = async(req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id).select('-password');

        res.status(200).json({
            success: true,
            message: "user found",
            data: user,
        });

    } catch (err) {
        res.status(404).json({ success: false, message: "user not found" });
    }
};



export const getAllUser = async(req, res) => {

    try {
        const user = await User.find({}).select('-password');

        res.status(200).json({
            success: true,
            message: "users found",
            data: users,
        });

    } catch (err) {
        res.status(404).json({ success: false, message: "users not found" });
    }
};
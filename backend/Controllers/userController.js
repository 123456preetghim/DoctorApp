import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";

export const updateUser = async(req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findByIdAndUpdate(id, {
            name: req.body.name,
            password: req.body.password,
            bloodType: req.body.bloodType,
            gender: req.body.gender,
            photo: req.body.photo,

        }, { new: true });

        res.status(200).json({
            success: true,
            message: "Successfully updated",
            data: user,
        });

    } catch (err) {
        console.log(err);
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

export const getUserProfile = async(req, res) => {
    const userId = req.userId;

    try {
        const user = await User.findById(userId);
        console.log(user);
        if (!user) {
            return res.status(404).json({ success: false, message: `User not found` });
        }

        const { password, ...rest } = user._doc;
        res.status(200).json({ success: true, message: 'Profile info retrieved successfully', data: {...rest } });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Error fetching user profile from the database" });
    }
};


export const getMyAppointments = async(req, res) => {
    try {
        // Step 1: Retrieve appointments from bookings for the specific user
        const bookings = await Booking.find({ user: req.userId });

        // Step 2: Extract doctor IDs from appointment bookings
        const doctorIds = bookings.map(el => el.doctor.id);

        // Step 3: Retrieve doctors using doctor IDs
        const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select("-password");

        res.status(200).json({
            success: true,
            message: "Appointments are being retrieved",
            data: doctors,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Something went wrong, cannot get appointments" });
    }
};
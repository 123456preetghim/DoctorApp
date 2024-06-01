import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";


export const updateDoctor = async(req, res) => {
    const id = req.params.id;
    try {
        const doctor = await Doctor.findByIdAndUpdate(id, {
            name: req.body.name,
            password: req.body.password,
            bloodType: req.body.bloodType,
            gender: req.body.gender,
            photo: req.body.photo,
            ticketPrice: +req.body.ticketPrice || 200,
        }, { new: true });

        res.status(200).json({
            success: true,
            message: "Successfully updated",
            data: doctor,
        });

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "Failed to update" });
    }
};


export const deleteDoctor = async(req, res) => {
    const id = req.params.id;
    try {
        const Doctor = await Doctor.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Successfully deleted",

        });

    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to delete" });
    }
};

export const getSingleDoctor = async(req, res) => {
    const id = req.params.id;
    try {
        const doctor = await Doctor.findById(id).populate("reviews").select('-password');

        res.status(200).json({
            success: true,
            message: "Doctor found",
            data: doctor,
        });

    } catch (err) {
        res.status(404).json({ success: false, message: "Doctor not found" });
    }
};



export const getAllDoctor = async(req, res) => {
    try {
        const { query } = req.query;
        let doctors;
        if (query) {
            doctors = await Doctor.find({
                isApproved: "approved",
                $or: [
                    { name: { $regex: query, $options: "i" } },
                    { specialization: { $regex: query, $options: "i" } }
                ]
            }).select("-password");
        } else {
            doctors = await Doctor.find({ isApproved: "approved" }).select("-password");
        }

        res.status(200).json({
            success: true,
            message: "Users found",
            data: doctors,
        });
    } catch (err) {
        res.status(404).json({ success: false, message: "Not found" });
    }
};


export const getDoctorProfile = async(req, res) => {
    const doctorId = req.userId;
    try {
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }
        const { password, ...rest } = doctor._doc;
        //const appointments = await Booking.findById({ doctor: doctorId });
        const appointments = [];
        res.status(200).json({
            success: true,
            message: "Profile info is retrieved",
            data: {...rest, appointments },
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "Something went wrong, cannot get profile info" });
    }
};
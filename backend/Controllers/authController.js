import User from '../models/UserSchema.js';
import Doctor from '../models/DoctorSchema.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


const generateToken = user => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "20d",
    });
}

export const register = async(req, res) => {
    const { email, password, name, role, photo, gender } = req.body;

    try {
        let user = null;

        // Check if the user already exists
        if (role === 'patient') {
            user = await User.findOne({ email });
        } else if (role === 'doctor') {
            user = await Doctor.findOne({ email });
        }

        if (user) {
            return res.status(409).json({ error: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        if (role === 'patient') {
            user = new User({
                email,
                password: hashedPassword,
                name,
                role,
                photo,
                gender
            });
        } else if (role === 'doctor') {
            user = new Doctor({
                email,
                password: hashedPassword,
                name,
                role,
                photo,
                gender
            });
        }

        // Save the user to the database
        await user.save();

        // Generate a token
        const token = jwt.sign({ id: user._id, role: user.role },
            process.env.JWT_SECRET, { expiresIn: '20d' } // 1 day expiration
        );

        // Send a success response
        res.status(201).json({ message: 'User registered successfully', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error registering user' });
    }
};


export const login = async(req, res) => {
    const { email, password } = req.body;

    try {
        let user = null;
        // Check if the user exists
        const patient = await User.findOne({ email });
        const doctor = await Doctor.findOne({ email });

        if (patient) {
            user = patient;
        } else if (doctor) {
            user = doctor;
        }

        // Check if user exists or not
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare password
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ status: false, message: "Invalid credentials" });
        }

        // Generate token
        const token = generateToken(user);

        // Extract necessary fields from user document
        const { password, role, appointments, ...rest } = user._doc;

        // Send success response
        res.status(200).json({ status: true, message: "Successfully logged in", token, data: {...rest }, role });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to login" });
    }
};
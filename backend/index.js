import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import authRoutes from "./Routes/auth.js";
import userRoutes from "./Routes/user.js";
import doctorRoutes from "./Routes/doctor.js";
import reviewRoutes from "./Routes/review.js";


// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
    origin: process.env.NODE_ENV === 'production' ? ' http://localhost:5173/' : true,
};

app.use(cors(corsOptions));


app.use(cookieParser());
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    if (process.env.NODE_ENV === 'production') {
        res.status(500).send('Something went wrong!');
    } else {
        res.status(500).send(err.message);
    }
});

// Use auth routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/doctors", doctorRoutes);
app.use("/api/v1/reviews", reviewRoutes);

// Database connection
mongoose.set('strictQuery', false);
const connectDB = async() => {
    const mongoUrl = process.env.MONGO_URL;
    console.log('MongoDB URL:', mongoUrl);

    if (!mongoUrl) {
        console.error("MONGO_URL environment variable is not defined.");
        process.exit(1); // Exit the application if the MongoDB URL is not defined
    }

    try {
        await mongoose.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB database is connected');
    } catch (err) {
        console.error('MongoDB database connection error:', err);
        process.exit(1); // Exit the application if the connection fails
    }
};

// Connect to the database and start the server
// Connect to the database and start the server
connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log('Server is running on port ' + port);
        });
    })
    .catch(err => {
        console.error('Failed to connect to the database:', err);
        process.exit(1); // Exit the application if the connection fails
    });
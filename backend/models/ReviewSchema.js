import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Types.ObjectId,
        ref: "Doctor",
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    reviewText: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        default: 0,
    },
}, { timestamps: true });

reviewSchema.pre(/^find/, function(next) {
    this.populate({
        path: "user",
        select: "name photo",
    });
    next();
});

reviewSchema.statics.calcAverageRatings = async function(doctorId) {
    // Aggregate pipeline to calculate statistics
    const stats = await this.aggregate([{
            $match: { doctor: doctorId }
        },
        {
            $group: {
                _id: "$doctor",
                numOfRating: { $sum: 1 },
                avgRating: { $avg: "$rating" },
            },
        },
    ]);

    // Update the Doctor model with calculated statistics
    if (stats.length > 0) {
        await Doctor.findByIdAndUpdate(doctorId, {
            totalRating: stats[0].numOfRating,
            averageRating: stats[0].avgRating,
        });
    } else {
        // Handle the case where there are no reviews for the doctor
        await Doctor.findByIdAndUpdate(doctorId, {
            totalRating: 0,
            averageRating: 0,
        });
    }
};

// Post middleware to trigger the calculation of average ratings after saving a review
reviewSchema.post("save", function() {
    this.constructor.calcAverageRatings(this.doctor);
});

// Export the model
export default mongoose.model("Review", reviewSchema);
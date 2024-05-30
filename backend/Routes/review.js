import express from "express";
import { getAllReviews, createReview } from "../Controllers/reviewController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router({ mergeParams: true });

router.route("/")
    .get(getAllReviews) // Anyone can access reviews
    .post(authenticate, restrict(["patient"]), createReview); // Only authenticated patients can create reviews

export default router;
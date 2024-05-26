import express from "express";
import {
    updateUser,
    deleteUser,
    getAllUser,
    getSingleUser,
} from "../Controllers/userController.js";

import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

// Get a single user by ID
router.get("/:id", authenticate, restrict(["patient"]), async(req, res) => {
    await getSingleUser(req, res);
});

// Get all users (restricted to admin role)
router.get("/", authenticate, restrict(["admin"]), async(req, res) => {
    await getAllUser(req, res);
});

// Update a user's information
router.put("/:id", authenticate, restrict(["patient"]), async(req, res) => {
    await updateUser(req, res);
});

// Delete a user (restricted to doctor role)
router.delete("/:id", authenticate, restrict(["patient"]), async(req, res) => {
    await deleteUser(req, res);
});

export default router;
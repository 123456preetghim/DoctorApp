import express from "express";
import {
    updateDoctor,
    deleteDoctor,
    getAllDoctor,
    getSingleDoctor,
} from "../Controllers/doctorController.js";

import { authenticate, restrict } from "../auth/verifyToken.js";


const router = express.Router();



// Get a single doctor by ID
router.get("/:id", getSingleDoctor);

// Get all doctors (restricted to admin role)
router.get("/", getAllDoctor);

// Update a doctor's information
router.put("/:id", authenticate, restrict(["doctor"]), async(req, res) => {
    await updateDoctor(req, res);
});

// Delete a doctor (restricted to doctor role)
router.delete("/:id", authenticate, restrict(["doctor"]), async(req, res) => {
    await deleteDoctor(req, res);
});

export default router;
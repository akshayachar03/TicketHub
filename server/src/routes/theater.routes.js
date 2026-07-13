import express from "express";

import {
  fetchTheaters,
  addTheater,
} from "../controllers/theater.controller.js";

const router = express.Router();

router.get("/", fetchTheaters);

router.post("/", addTheater);

export default router;

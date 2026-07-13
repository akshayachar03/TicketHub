import {
  getAllTheaters,
  createTheater,
} from "../services/theater.service.js";

export async function fetchTheaters(req, res) {
  try {
    const theaters = await getAllTheaters();

    res.status(200).json({
      success: true,
      data: theaters,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function addTheater(req, res) {
  try {
    const theater = await createTheater(req.body);

    res.status(201).json({
      success: true,
      data: theater,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

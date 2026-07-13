import Theater from "../models/theater.model.js";

export async function getAllTheaters() {
  return Theater.find({ isActive: true }).sort({ name: 1 });
}

export async function createTheater(data) {
  return Theater.create(data);
}

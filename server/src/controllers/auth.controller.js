import {
  registerUser,
  loginUser,
} from "../services/auth.service.js";

export async function register(req, res) {
  try {
    const user = await registerUser(req.body);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

export async function login(req, res) {
  try {
    const result = await loginUser(req.body);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
}

export async function profile(req, res) {
  return res.status(200).json({
    success: true,
    data: req.user,
  });
}